// script.js

// Fallback for missing jsPDF
const { jsPDF } = window.jspdf || {};

document.addEventListener('DOMContentLoaded', () => {
    // Check for essential dependencies and provide fallbacks
    const checkDependencies = () => {
        const missing = [];
        if (typeof CodeMirror === 'undefined') missing.push('CodeMirror');
        if (typeof showdown === 'undefined') missing.push('Showdown');
        if (typeof hljs === 'undefined') missing.push('Highlight.js');
        if (!jsPDF) missing.push('jsPDF');
        
        if (missing.length > 0) {
            console.warn('Missing dependencies:', missing.join(', '));
            // Disable PDF functionality if jsPDF is missing
            if (!jsPDF) {
                const pdfBtn = document.getElementById('download-pdf-btn');
                if (pdfBtn) {
                    pdfBtn.disabled = true;
                    pdfBtn.textContent = 'PDF Unavailable';
                }
            }
        }
    };
    
    checkDependencies();
    // --- DOM ELEMENT SELECTION ---
    const editorContainer = document.getElementById('editor-container');
    const htmlOutput = document.getElementById('html-output');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    const saveWmdBtn = document.getElementById('save-wmd-btn');
    const importWmdBtn = document.getElementById('import-wmd-btn');
    const importWmdInput = document.getElementById('import-wmd-input');
    const customStyleTag = document.getElementById('custom-user-styles');

    // --- DEFINE CUSTOM MARKDOWN MODE FOR CODEMIRROR (WITH FALLBACK) ---
    if (typeof CodeMirror !== 'undefined') {
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
    }

    // --- INITIALIZE CODEMIRROR EDITOR (WITH FALLBACK) ---
    let editor;
    if (typeof CodeMirror !== 'undefined') {
        editor = CodeMirror(editorContainer, {
            mode: "custom-markdown",
            theme: "material-darker",
            lineNumbers: true,
            lineWrapping: true,
        });
    } else {
        // Fallback to textarea with enhanced styling
        const textarea = document.createElement('textarea');
        textarea.id = 'fallback-editor';
        textarea.style.cssText = `
            width: 100%; 
            height: 100%; 
            border: none; 
            padding: 1rem; 
            font-family: 'Fira Code', monospace; 
            font-size: 14px;
            line-height: 1.7;
            background-color: #263238;
            color: #eeffff;
            resize: none;
            outline: none;
        `;
        textarea.placeholder = 'Start typing your markdown here...';
        editorContainer.appendChild(textarea);
        
        editor = {
            getValue: () => textarea.value,
            setValue: (value) => textarea.value = value,
            on: (event, callback) => {
                if (event === 'change') {
                    textarea.addEventListener('input', callback);
                }
            }
        };
    }

    // --- INITIALIZE SHOWDOWN CONVERTER (WITH FALLBACK) ---
    let converter;
    if (typeof showdown !== 'undefined') {
        converter = new showdown.Converter();
        converter.setOption('tables', true);
        converter.setOption('strikethrough', true);
        converter.setOption('parseImgDimensions', true);
    } else {
        // Enhanced markdown fallback
        converter = {
            makeHtml: (text) => {
                return text
                    // Headers
                    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                    // Bold and italic
                    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                    // Code blocks
                    .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
                    .replace(/`([^`]+)`/gim, '<code>$1</code>')
                    // Links
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
                    // Line breaks and paragraphs
                    .replace(/\n\n/gim, '</p><p>')
                    .replace(/^(?!<h|<pre|<\/p>|$)/gim, '<p>')
                    .replace(/(?!<\/h\d>|<\/pre>|<\/p>)$/gim, '</p>')
                    // Clean up empty paragraphs
                    .replace(/<p><\/p>/gim, '');
            }
        };
    }

    // --- PERFORMANCE OPTIMIZATIONS ---
    let renderTimeout;
    let lastRenderedContent = '';
    let tempElements = new Set(); // Track temporary elements for cleanup
    
    // Debounced rendering to improve performance
    const debouncedRender = () => {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(renderContent, 100); // 100ms debounce
    };
    
    // Memory cleanup utility
    const cleanupTempElements = () => {
        tempElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        tempElements.clear();
    };
    
    // --- CORE RENDERING PIPELINE (OPTIMIZED) ---
    const renderContent = () => {
        const renderStart = performance.now();
        const rawText = editor.getValue();
        
        // Skip rendering if content hasn't changed
        if (rawText === lastRenderedContent) return;
        lastRenderedContent = rawText;

        // --- Step 1: Pre-process Raw Text into Pure Markdown ---
        const convertToPureMarkdown = (text) => {
            let processedText = text;
            return processedText.replace(/@style\s*([\s\S]*?)\s*@endstyle/, '');
        };
        
        // --- Step 2: Apply Custom CSS from @style block (optimized) ---
        const applyCustomStyles = (text) => {
            const match = text.match(/@style\s*([\s\S]*?)\s*@endstyle/);
            if (!match) {
                // Reset to defaults if no custom styles
                htmlOutput.style.backgroundColor = '#ffffff';
                customStyleTag.innerHTML = `
                    #html-output pre { border-radius: 8px; overflow: hidden; }
                    #html-output img { border-radius: 12px; max-width: 100%; height: auto; display: block; margin: 1em auto; }
                `;
                return;
            }

            const styleContent = match[1];
            const bgMatch = styleContent.match(/@background:\s*(.*?);/);
            const codeRadiusMatch = styleContent.match(/@code-radius:\s*(.*?);/);
            const imageRadiusMatch = styleContent.match(/@image-radius:\s*(.*?);/);

            // Apply background
            htmlOutput.style.backgroundColor = bgMatch ? bgMatch[1].trim() : '#ffffff';
            
            // Build CSS efficiently
            const codeRadius = codeRadiusMatch ? codeRadiusMatch[1].trim() : '8px';
            const imageRadius = imageRadiusMatch ? imageRadiusMatch[1].trim() : '12px';
            
            customStyleTag.innerHTML = `
                #html-output pre { border-radius: ${codeRadius}; overflow: hidden; }
                #html-output img { border-radius: ${imageRadius}; max-width: 100%; height: auto; display: block; margin: 1em auto; }
            `;
        };

        // --- Step 3: Post-process for GitHub-style admonitions (optimized) ---
        const processAdmonitions = (html) => {
            const admonitionTypes = new Set(['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION']);
            
            return html.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g, (match, content) => {
                const firstPMatch = content.match(/<p[^>]*>\[!(\w+)\]([\s\S]*?)<\/p>/);
                
                if (firstPMatch && admonitionTypes.has(firstPMatch[1].toUpperCase())) {
                    const type = firstPMatch[1].toUpperCase();
                    const title = type.charAt(0) + type.slice(1).toLowerCase();
                    const remainingContent = firstPMatch[2] + content.substring(firstPMatch[0].length);
                    
                    return `<div class="admonition admonition-${title.toLowerCase()}">
                        <p><strong>${title}</strong></p>
                        ${remainingContent ? `<p>${remainingContent}</p>` : ''}
                    </div>`;
                }
                return match;
            });
        };

        // --- Step 4: Post-process for advanced image attributes (optimized) ---
        const postprocessHtml = (html) => {
            return html.replace(/<img([^>]*)alt="([^"]*)"([^>]*)>/g, (match, before, alt, after) => {
                const attrMatch = alt.match(/{(.*?)}/);
                if (!attrMatch) return match;
                
                const cleanAlt = alt.replace(attrMatch[0], '').trim();
                let styles = '';
                
                attrMatch[1].split(' ').forEach(attr => {
                    const [key, value] = attr.split('=');
                    if (key === 'width') styles += `width: ${value}; `;
                    if (key === 'align') {
                        styles += `float: ${value}; `;
                        styles += `margin: ${value === 'left' ? '0.5em 1.5em 0.5em 0' : '0.5em 0 0.5em 1.5em'}; `;
                    }
                });
                
                return `<img${before}alt="${cleanAlt}"${after}${styles ? ` style="${styles}"` : ''}>`;
            });
        };

        // --- EXECUTION PIPELINE (OPTIMIZED) ---
        applyCustomStyles(rawText);
        const pureMarkdown = convertToPureMarkdown(rawText);
        let finalHtml = converter.makeHtml(pureMarkdown);
        finalHtml = processAdmonitions(finalHtml);
        finalHtml = postprocessHtml(finalHtml);
        htmlOutput.innerHTML = finalHtml;
        
        // Optimized syntax highlighting - use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            const codeBlocks = htmlOutput.querySelectorAll('pre code');
            for (const block of codeBlocks) {
                if (!block.hasAttribute('data-highlighted')) {
                    if (typeof hljs !== 'undefined') {
                        hljs.highlightElement(block);
                    }
                    block.setAttribute('data-highlighted', 'true');
                }
            }
            
            // Performance monitoring (development only)
            const renderTime = performance.now() - renderStart;
            if (renderTime > 50) { // Only log if render takes more than 50ms
                console.log(`Render took ${renderTime.toFixed(2)}ms`);
            }
        });
    };

    // --- OPTIMIZED HELPER FUNCTIONS ---
    const copyHtml = async () => {
        try {
            // Simplified CSS mapping for hosted versions
            const cssLinks = [
                'https://yasakei.is-a.dev/Weby/libs/fonts.css',
                'https://yasakei.is-a.dev/Weby/libs/highlight.css',
                'https://yasakei.is-a.dev/Weby/libs/codemirror.css',
                'https://yasakei.is-a.dev/Weby/libs/codemirror-theme.css',
                'https://yasakei.is-a.dev/Weby/libs/style.css'
            ].map(url => `    <link rel="stylesheet" href="${url}">`);
            
            // Get essential custom styles efficiently
            const customStyles = customStyleTag.innerHTML;
            const previewBg = htmlOutput.style.backgroundColor;
            const inlineStyles = [
                customStyles,
                previewBg ? `#html-output { background-color: ${previewBg}; }` : ''
            ].filter(Boolean).join('\n');
            
            // Create optimized HTML document
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
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('pre code').forEach(hljs.highlightElement);
        });
    </script>
</body>
</html>`;

            await navigator.clipboard.writeText(completeHtml);
            copyHtmlBtn.textContent = 'Copied!';
            setTimeout(() => copyHtmlBtn.textContent = 'Copy HTML', 2000);
        } catch (err) {
            console.error('Failed to copy HTML: ', err);
            alert('Could not copy HTML with styles.');
        }
    };

    // --- SAVE AS .WMD FILE FUNCTION ---
    const saveAsWmd = () => {
        try {
            const content = editor.getValue();
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.wmd';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Temporary feedback
            saveWmdBtn.textContent = 'Saved!';
            setTimeout(() => saveWmdBtn.textContent = 'Save as .wmd', 2000);
        } catch (err) {
            console.error('Failed to save .wmd file: ', err);
            alert('Could not save .wmd file.');
        }
    };

    // --- IMPORT .WMD FILE FUNCTION ---
    const importWmd = () => {
        importWmdInput.click();
    };

    const handleFileImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                editor.setValue(content);
                renderContent(); // Trigger re-render after import
                
                // Temporary feedback
                importWmdBtn.textContent = 'Imported!';
                setTimeout(() => importWmdBtn.textContent = 'Import .wmd', 2000);
            } catch (err) {
                console.error('Failed to import .wmd file: ', err);
                alert('Could not import .wmd file.');
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    };

    // --- PDF STYLES (EXTRACTED FOR PERFORMANCE) ---
    const PDF_STYLES = `
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
        h1 { font-size: 24pt; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        h2 { font-size: 20pt; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        h3 { font-size: 16pt; }
        h4 { font-size: 14pt; }
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
        .admonition {
            padding: 1em;
            margin: 1em 0;
            border-left: 5px solid #0969da;
            border-radius: 4px;
            background-color: #f6f8fa;
        }
        .admonition-note { border-color: #0d6efd; background-color: #cfe2ff; }
        .admonition-tip { border-color: #198754; background-color: #d1e7dd; }
        .admonition-important { border-color: #6f42c1; background-color: #e2d9f3; }
        .admonition-warning { border-color: #ffc107; background-color: #fff3cd; }
        .admonition-caution { border-color: #dc3545; background-color: #f8d7da; }
        .admonition p:first-child {
            font-weight: 700;
            margin-top: 0;
        }
        .admonition p:last-child {
            margin-bottom: 0;
        }
        h1, h2, h3, h4 {
            page-break-after: avoid;
        }
        pre, table {
            page-break-inside: avoid;
        }
    `;

    const downloadPDF = async () => {
        // Check if PDF functionality is available
        if (!jsPDF) {
            alert('PDF generation is not available. Please ensure jsPDF library is loaded.');
            return;
        }
        
        downloadPdfBtn.textContent = 'Generating...';
        downloadPdfBtn.disabled = true;

        try {
            // Optimized PDF container creation
            const pdfContainer = document.createElement('div');
            pdfContainer.style.cssText = 'width: 210mm; padding: 20mm; box-sizing: border-box; background-color: white;';
            tempElements.add(pdfContainer); // Track for cleanup
            
            // Clone content efficiently
            const htmlContent = htmlOutput.cloneNode(true);
            htmlContent.style.cssText = 'padding: 0; background-color: white;';
            
            // Optimize code blocks for PDF in one pass
            const codeBlocks = htmlContent.querySelectorAll('pre code');
            for (const block of codeBlocks) {
                block.style.cssText = 'white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;';
            }
            
            // Create optimized style element
            const style = document.createElement('style');
            style.textContent = PDF_STYLES;
            
            pdfContainer.appendChild(style);
            pdfContainer.appendChild(htmlContent);
            
            // Temporarily append to body for rendering
            document.body.appendChild(pdfContainer);
            
            // Optimized jsPDF configuration
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Streamlined PDF generation
            await pdf.html(pdfContainer, {
                callback: (pdf) => {
                    pdf.save('weby-document.pdf');
                    // Cleanup immediately after PDF generation
                    cleanupTempElements();
                },
                margin: [20, 15, 20, 15],
                autoPaging: 'text',
                width: 170,
                windowWidth: 794,
                x: 0,
                y: 0
            });

        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('An error occurred during PDF generation. Check the console for more details.');
            cleanupTempElements(); // Cleanup on error
        } finally {
            downloadPdfBtn.textContent = 'Download PDF';
            downloadPdfBtn.disabled = false;
        }
    };
    
    // --- EVENT LISTENERS ---
    editor.on('change', debouncedRender);
    downloadPdfBtn.addEventListener('click', downloadPDF);
    copyHtmlBtn.addEventListener('click', copyHtml);
    saveWmdBtn.addEventListener('click', saveAsWmd);
    importWmdBtn.addEventListener('click', importWmd);
    importWmdInput.addEventListener('change', handleFileImport);

    // --- INITIAL TEXT (OPTIMIZED FOR PERFORMANCE) ---
    const initialText = `# Welcome to Weby

A fast, lightweight Markdown editor with real-time preview.

## Features

- **Live Preview**: See your rendered Markdown instantly
- **Fast Rendering**: Optimized for performance
- **PDF Export**: Download your documents as PDF
- **GitHub Flavored Markdown**: Tables, code blocks, and more

## Quick Test

Here's some code:

\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

> [!NOTE]
> This is an optimized version with improved performance!

Start editing to see the real-time preview in action.
`;
    editor.setValue(initialText);

    // --- INITIAL RENDER ---
    renderContent();
});