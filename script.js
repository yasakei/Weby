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
    const copyHtml = async () => {
        try {
            // Map external CSS to hosted versions using full URLs - including localhost/development URLs
            const hostedCssMap = {
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Fira+Code&display=swap': 'https://yasakei.is-a.dev/Weby/libs/fonts.css',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css': 'https://yasakei.is-a.dev/Weby/libs/highlight.css',
                'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css': 'https://yasakei.is-a.dev/Weby/libs/codemirror.css',
                'https://cdn.jsdelivr.net/npm/codemirror@5.65.16/theme/material-darker.css': 'https://yasakei.is-a.dev/Weby/libs/codemirror-theme.css',
                './style.css': 'https://yasakei.is-a.dev/Weby/libs/style.css',
                'style.css': 'https://yasakei.is-a.dev/Weby/libs/style.css'
            };
            
            // Create CSS link tags for hosted files
            const cssLinks = [];
            const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
            
            linkElements.forEach(link => {
                const href = link.getAttribute('href');
                let hostedUrl = null;
                
                // Check direct mapping first
                hostedUrl = hostedCssMap[link.href] || hostedCssMap[href];
                
                // Handle localhost and development server URLs
                if (!hostedUrl && href) {
                    if (href.includes('style.css') || href.endsWith('style.css')) {
                        hostedUrl = 'https://yasakei.is-a.dev/Weby/libs/style.css';
                    } else if (href.includes('fonts.googleapis.com')) {
                        hostedUrl = 'https://yasakei.is-a.dev/Weby/libs/fonts.css';
                    } else if (href.includes('highlight.js') || href.includes('atom-one-dark')) {
                        hostedUrl = 'https://yasakei.is-a.dev/Weby/libs/highlight.css';
                    } else if (href.includes('codemirror') && href.includes('material-darker')) {
                        hostedUrl = 'https://yasakei.is-a.dev/Weby/libs/codemirror-theme.css';
                    } else if (href.includes('codemirror') && !href.includes('theme')) {
                        hostedUrl = 'https://yasakei.is-a.dev/Weby/libs/codemirror.css';
                    }
                }
                
                if (hostedUrl) {
                    cssLinks.push(`    <link rel="stylesheet" href="${hostedUrl}">`);
                } else {
                    // Fallback to original URL only if it's not a localhost URL
                    if (!href.includes('127.0.0.1') && !href.includes('localhost')) {
                        cssLinks.push(`    <link rel="stylesheet" href="${link.href}">`);
                    }
                }
            });
            
            // Ensure main style.css is included
            if (!cssLinks.some(link => link.includes('style.css'))) {
                cssLinks.push(`    <link rel="stylesheet" href="https://yasakei.is-a.dev/Weby/libs/style.css">`);
            }
            
            // Get only essential custom styles (user @style blocks and preview background)
            const customStyles = customStyleTag.innerHTML;
            const previewStyles = htmlOutput.style.backgroundColor ? 
                `#html-output { background-color: ${htmlOutput.style.backgroundColor}; }` : '';
            
            const inlineStyles = [customStyles, previewStyles].filter(s => s.trim()).join('\n');
            
            // Create complete HTML document with hosted CSS references and JavaScript for syntax highlighting
            const completeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weby Document</title>
${cssLinks.join('\n')}${inlineStyles ? `
    <style>
${inlineStyles}
    </style>` : ''}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
</head>
<body>
    <div id="html-output">
${htmlOutput.innerHTML}
    </div>
    <script>
        // Initialize syntax highlighting
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        });
    </script>
</body>
</html>`;

            await navigator.clipboard.writeText(completeHtml);
            copyHtmlBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyHtmlBtn.textContent = 'Copy HTML';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy HTML: ', err);
            alert('Could not copy HTML with styles.');
        }
    };

    const downloadPDF = async () => {
        downloadPdfBtn.textContent = 'Generating...';
        downloadPdfBtn.disabled = true;

        try {
            // Create a more appropriate container for PDF generation
            const pdfContainer = document.createElement('div');
            pdfContainer.style.width = '210mm'; // A4 width
            pdfContainer.style.padding = '20mm'; // Standard margins
            pdfContainer.style.boxSizing = 'border-box';
            pdfContainer.style.backgroundColor = 'white';
            
            // Clone and modify the HTML content for PDF
            const htmlContent = document.getElementById('html-output').cloneNode(true);
            htmlContent.style.padding = '0'; // Remove extra padding for PDF
            htmlContent.style.backgroundColor = 'white';
            
            // Fix code blocks for PDF
            htmlContent.querySelectorAll('pre code').forEach(block => {
                // Ensure code blocks don't overflow
                block.style.whiteSpace = 'pre-wrap';
                block.style.wordWrap = 'break-word';
                block.style.overflowWrap = 'break-word';
            });
            
            // Create a style element with essential CSS for PDF
            const style = document.createElement('style');
            style.textContent = `
                body {
                    font-family: 'Inter', sans-serif;
                    font-size: 11pt;
                    line-height: 1.6;
                    color: #212529;
                    margin: 0;
                    padding: 0;
                }
                
                h1, h2, h3, h4, h5, h6 {
                    margin-top: 0;
                    margin-bottom: 0.5em;
                    font-weight: 700;
                }
                
                h1 {
                    font-size: 24pt;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 0.3em;
                }
                
                h2 {
                    font-size: 20pt;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 0.3em;
                }
                
                h3 {
                    font-size: 16pt;
                }
                
                h4 {
                    font-size: 14pt;
                }
                
                p {
                    margin-top: 0;
                    margin-bottom: 1em;
                    text-align: justify;
                }
                
                blockquote {
                    margin: 0 0 1em 0;
                    padding: 0.5em 1em;
                    border-left: 5px solid #dee2e6;
                    color: #6c757d;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1em 0;
                    font-size: 10pt;
                }
                
                th, td {
                    border: 1px solid #dee2e6;
                    padding: 0.5em;
                    text-align: left;
                }
                
                th {
                    background-color: #f8f9fa;
                    font-weight: 600;
                }
                
                tr:nth-of-type(even) {
                    background-color: #fcfcfd;
                }
                
                pre {
                    background-color: #282c34;
                    padding: 1em;
                    border-radius: 4px;
                    font-family: 'Fira Code', monospace;
                    font-size: 8pt;
                    line-height: 1.4;
                    margin: 1em 0;
                    color: #abb2bf;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    max-width: 100%;
                }
                
                code {
                    font-family: 'Fira Code', monospace;
                }
                
                :not(pre) > code {
                    background-color: #e9ecef;
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-size: 9pt;
                }
                
                img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 1em 0;
                }
                
                ul, ol {
                    margin-top: 0;
                    margin-bottom: 1em;
                    padding-left: 2em;
                }
                
                li {
                    margin-bottom: 0.25em;
                }
                
                /* Admonitions */
                .admonition {
                    padding: 1em;
                    margin: 1em 0;
                    border-left: 5px solid #0969da;
                    border-radius: 4px;
                    background-color: #f6f8fa;
                }
                
                .admonition-note {
                    border-color: #0d6efd;
                    background-color: #cfe2ff;
                }
                
                .admonition-tip {
                    border-color: #198754;
                    background-color: #d1e7dd;
                }
                
                .admonition-important {
                    border-color: #6f42c1;
                    background-color: #e2d9f3;
                }
                
                .admonition-warning {
                    border-color: #ffc107;
                    background-color: #fff3cd;
                }
                
                .admonition-caution {
                    border-color: #dc3545;
                    background-color: #f8d7da;
                }
                
                .admonition p:first-child {
                    font-weight: 700;
                    margin-top: 0;
                }
                
                .admonition p:last-child {
                    margin-bottom: 0;
                }
                
                /* Ensure proper page breaks */
                h1, h2, h3, h4 {
                    page-break-after: avoid;
                }
                
                pre, table {
                    page-break-inside: avoid;
                }
            `;
            
            pdfContainer.appendChild(style);
            pdfContainer.appendChild(htmlContent);
            
            // Create a new jsPDF instance with better settings for text
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Add the HTML content to the PDF
            await pdf.html(pdfContainer, {
                callback: function (pdf) {
                    pdf.save('weby-document.pdf');
                },
                margin: [20, 15, 20, 15], // Top, Right, Bottom, Left margins in mm
                autoPaging: 'text',
                width: 170, // 210mm (A4 width) - 15mm (left margin) - 15mm (right margin)
                windowWidth: 794, // Approximate pixel width of A4 at 96 DPI
                x: 0,
                y: 0,
                fontFaces: [
                    {
                        family: 'Inter',
                        src: [
                            { url: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2', format: 'woff2' }
                        ]
                    },
                    {
                        family: 'Fira Code',
                        src: [
                            { url: 'https://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2', format: 'woff2' }
                        ]
                    }
                ]
            });

        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('An error occurred during PDF generation. Check the console for more details.');
        } finally {
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