// script.js

const { jsPDF } = window.jspdf;

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT SELECTION ---
    const editorContainer = document.getElementById('editor-container');
    const htmlOutput = document.getElementById('html-output');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    const customStyleTag = document.getElementById('custom-user-styles');

    // --- DEFINE CUSTOM MARKDOWN MODE FOR CODEMIRROR ---
    CodeMirror.defineMode("custom-markdown", function(config, parserConfig) {
        const markdownMode = CodeMirror.getMode(config, "markdown");
        const overlay = {
            token: function(stream) {
                // Highlight @style blocks
                if (stream.match(/^@style/)) {
                    stream.skipToEnd();
                    return "meta";
                }
                if (stream.match(/^@endstyle/)) {
                    stream.skipToEnd();
                    return "meta";
                }
                // Highlight admonition syntax
                if (stream.match(/^> \[!/)) {
                    stream.eatWhile(/[^]]/);
                    stream.eat("]");
                    return "keyword";
                }
                while (stream.next() != null && !stream.match(/^@style/, false) && !stream.match(/^@endstyle/, false) && !stream.match(/^> \[!/, false)) {}
                return null;
            }
        };
        return CodeMirror.overlayMode(markdownMode, overlay);
    });

    // --- INITIALIZE CODEMIRROR EDITOR ---
    const editor = CodeMirror(editorContainer, {
        mode: "custom-markdown",
        theme: "material-darker",
        lineNumbers: true,
        lineWrapping: true,
    });

    // --- INITIALIZE SHOWDOWN CONVERTER ---
    const converter = new showdown.Converter();
    converter.setOption('tables', true);
    converter.setOption('strikethrough', true);
    converter.setOption('parseImgDimensions', true);

    // --- CORE RENDERING PIPELINE ---
    const renderContent = () => {
        const rawText = editor.getValue();

        // --- Step 1: Pre-process Raw Text into Pure Markdown ---
        const convertToPureMarkdown = (text) => {
            let processedText = text;
            return processedText.replace(/@style\s*([\s\S]*?)\s*@endstyle/, '');
        };
        
        // --- Step 2: Apply Custom CSS from @style block ---
        const applyCustomStyles = (text) => {
            const match = text.match(/@style\s*([\s\S]*?)\s*@endstyle/);
            let css = '';
            let codeRadius = '8px', imageRadius = '12px';
            htmlOutput.style.backgroundColor = '#ffffff';

            if (match) {
                const styleContent = match[1];
                const bgMatch = styleContent.match(/@background:\s*(.*?);/);
                const codeRadiusMatch = styleContent.match(/@code-radius:\s*(.*?);/);
                const imageRadiusMatch = styleContent.match(/@image-radius:\s*(.*?);/);

                if (bgMatch) htmlOutput.style.backgroundColor = bgMatch[1].trim();
                if (codeRadiusMatch) codeRadius = codeRadiusMatch[1].trim();
                if (imageRadiusMatch) imageRadius = imageRadiusMatch[1].trim();
            }
            css += `#html-output pre { border-radius: ${codeRadius}; overflow: hidden; }\n`;
            css += `#html-output img { border-radius: ${imageRadius}; max-width: 100%; height: auto; display: block; margin: 1em auto; }\n`;
            customStyleTag.innerHTML = css;
        };

        // --- Step 3: Post-process for GitHub-style admonitions ---
        const processAdmonitions = (html) => {
            const container = document.createElement('div');
            container.innerHTML = html;
            const admonitionTypes = ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'];
            
            container.querySelectorAll('blockquote').forEach(quote => {
                const firstP = quote.querySelector('p:first-child');
                if (!firstP) return;

                const match = firstP.innerHTML.match(/\[!(\w+)\]/);
                if (match && admonitionTypes.includes(match[1].toUpperCase())) {
                    const type = match[1].toUpperCase();
                    const title = type.charAt(0) + type.slice(1).toLowerCase();
                    
                    const admonitionDiv = document.createElement('div');
                    admonitionDiv.className = `admonition admonition-${title.toLowerCase()}`;
                    
                    const titleP = document.createElement('p');
                    titleP.innerHTML = `<strong>${title}</strong>`;
                    admonitionDiv.appendChild(titleP);
                    
                    firstP.innerHTML = firstP.innerHTML.replace(/\[!\w+\]\s*/, '');
                    
                    if (firstP.innerHTML.trim() !== '') {
                        admonitionDiv.appendChild(firstP);
                    }
                    
                    let currentElement = firstP.nextElementSibling;
                    while (currentElement) {
                        admonitionDiv.appendChild(currentElement);
                        currentElement = firstP.nextElementSibling;
                    }
                    
                    quote.parentNode.replaceChild(admonitionDiv, quote);
                }
            });
            return container.innerHTML;
        };

        // --- Step 4: Post-process for advanced image attributes ---
        const postprocessHtml = (html) => {
            const container = document.createElement('div');
            container.innerHTML = html;
            container.querySelectorAll('img').forEach(img => {
                const alt = img.getAttribute('alt') || '';
                const attrMatch = alt.match(/{(.*?)}/);
                if (attrMatch) {
                    img.setAttribute('alt', alt.replace(attrMatch[0], '').trim());
                    attrMatch[1].split(' ').forEach(attr => {
                        const [key, value] = attr.split('=');
                        if (key === 'width') img.style.width = value;
                        if (key === 'align') {
                            img.style.float = value;
                            img.style.margin = value === 'left' ? '0.5em 1.5em 0.5em 0' : '0.5em 0 0.5em 1.5em';
                        }
                    });
                }
            });
            return container.innerHTML;
        };

        // --- EXECUTION PIPELINE ---
        applyCustomStyles(rawText);
        const pureMarkdown = convertToPureMarkdown(rawText);
        let finalHtml = converter.makeHtml(pureMarkdown);
        finalHtml = processAdmonitions(finalHtml);
        finalHtml = postprocessHtml(finalHtml);
        htmlOutput.innerHTML = finalHtml;
        htmlOutput.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    };

    // --- HELPER FUNCTIONS (COMPLETE AND UNABRIDGED) ---
    const copyHtml = () => {
        navigator.clipboard.writeText(htmlOutput.innerHTML).then(() => {
            copyHtmlBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyHtmlBtn.textContent = 'Copy HTML';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy HTML: ', err);
            alert('Could not copy HTML.');
        });
    };

    const downloadPDF = async () => {
        downloadPdfBtn.textContent = 'Generating...';
        downloadPdfBtn.disabled = true;

        const contentToRender = htmlOutput.cloneNode(true);
        contentToRender.style.position = 'absolute';
        contentToRender.style.left = '-9999px';
        contentToRender.style.width = `${htmlOutput.offsetWidth}px`;
        document.body.appendChild(contentToRender);

        const images = Array.from(contentToRender.querySelectorAll('img'));

        const waitForImageLoad = (img) => {
            return new Promise((resolve, reject) => {
                if (img.complete) return resolve();
                img.onload = () => resolve();
                img.onerror = () => reject(new Error('Image failed to load'));
            });
        };

        const toDataURL = async (url) => {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
            try {
                const response = await fetch(proxyUrl);
                if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.warn(`Could not convert image ${url} to data URL.`, error);
                return url;
            }
        };

        const imageLoadPromises = images.map(async (img) => {
            if (img.src && !img.src.startsWith('data:')) {
                const dataUrl = await toDataURL(img.src);
                img.src = dataUrl;
                try {
                    await waitForImageLoad(img);
                } catch (error) {
                    console.error(error);
                }
            }
        });

        try {
            await Promise.all(imageLoadPromises);

            Array.from(contentToRender.querySelectorAll('img[style*="float"]')).forEach(img => {
                img.style.float = 'none';
                img.style.display = 'block';
                img.style.margin = '1em auto';
            });

            const canvas = await html2canvas(contentToRender, {
                scale: 2,
                logging: false,
                backgroundColor: htmlOutput.style.backgroundColor,
            });
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('weby-document.pdf');
        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('An error occurred during PDF generation. Check the console for more details.');
        } finally {
            document.body.removeChild(contentToRender);
            downloadPdfBtn.textContent = 'Download PDF';
            downloadPdfBtn.disabled = false;
        }
    };
    
    // --- EVENT LISTENERS ---
    editor.on('change', renderContent);
    downloadPdfBtn.addEventListener('click', downloadPDF);
    copyHtmlBtn.addEventListener('click', copyHtml);

    // --- INITIAL TEXT ---
    const initialText = `# The Great Peanut Butter Panic\n\nIt was a Tuesday. Sir Reginald, a hamster of distinguished taste, discovered his personal stash of peanut butter was alarmingly low.\n\n> [!IMPORTANT]\n> A hamster's peanut butter supply is critical for global stability. This cannot be overstated.\n\nHe immediately assembled his team.\n\n![Sir Reginald's Team{align=right width=50%}](https://yas.ct.ws/cdn/uploads/687a414a6c532.png)\n\nThis text is wrapping around the team meeting. As you can see, they are very serious. Sir Reginald is on the right, looking concerned.\n\n## The Plan\n\nThe plan was simple: infiltrate the human's kitchen and secure more peanut butter.\n\n> [!TIP]\n> The best time to raid the kitchen is during the human's \"work from home\" video calls. They are distracted by talking to a glowing rectangle.\n\nThe mission parameters were as follows:\n\n<table>\n  <thead>\n    <tr>\n      <th>Agent</th>\n      <th>Codename</th>\n      <th>Task</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Bartholomew</td>\n      <td>The Shadow</td>\n      <td>Distraction</td>\n    </tr>\n    <tr>\n      <td>Penelope</td>\n      <td>Tiny Paws</td>\n      <td>Acquisition</td>\n    </tr>\n     <tr>\n      <td>Sir Reginald</td>\n      <td>The Brains</td>\n      <td>Supervision</td>\n    </tr>\n  </tbody>\n</table>\n\n## The Heist\n\nThe operation was a success. Bartholomew created a diversion by running on his wheel at an unprecedented speed, generating a miniature sonic boom.\n\n> [!WARNING]\n> Do not attempt to break the sound barrier in a standard hamster wheel. It requires special equipment.\n\nPenelope, using her expert climbing skills, secured the jar. The code for this maneuver is highly classified:\n\n\`\`\`javascript\nfunction securePeanutButter(agent) {\n  if (agent.name === \"Penelope\") {\n    return \"SUCCESS\";\n  } else {\n    return \"FAILURE\";\n  }\n}\n\`\`\`\n\n> [!CAUTION]\n> The peanut butter jar is often guarded by a lid. Lid removal is a complex, two-hamster operation.\n\nWith the mission accomplished, Sir Reginald retired to his study to enjoy the spoils.\n\n> [!NOTE]\n> The story you have just read is mostly true. Some details may have been exaggerated for dramatic effect. Check out more of Sir Reginald's adventures [here](https://www.google.com/search?q=funny+hamster+stories).\n\n`;
    editor.setValue(initialText);

    // --- INITIAL RENDER ---
    renderContent();
});