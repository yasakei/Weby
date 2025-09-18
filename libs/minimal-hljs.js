// Minimal highlight.js fallback for offline usage
window.hljs = window.hljs || {
    highlightElement: function(element) {
        // Basic syntax highlighting fallback
        const language = element.className.match(/language-(\w+)/);
        if (!language) return;
        
        const lang = language[1];
        let content = element.textContent;
        
        // Basic JavaScript highlighting
        if (lang === 'javascript' || lang === 'js') {
            content = content
                .replace(/(function|const|let|var|if|else|for|while|return|class|import|export)\b/g, '<span style="color: #c792ea;">$1</span>')
                .replace(/(true|false|null|undefined)\b/g, '<span style="color: #ff5370;">$1</span>')
                .replace(/(".*?"|'.*?')/g, '<span style="color: #c3e88d;">$1</span>')
                .replace(/(\/\/.*$)/gm, '<span style="color: #546e7a;">$1</span>');
        }
        // Basic CSS highlighting
        else if (lang === 'css') {
            content = content
                .replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span style="color: #82aaff;">$1</span>')
                .replace(/(#[a-fA-F0-9]{3,6}|rgba?\([^)]+\))/g, '<span style="color: #f78c6c;">$1</span>')
                .replace(/(".*?"|'.*?')/g, '<span style="color: #c3e88d;">$1</span>');
        }
        // Basic HTML highlighting
        else if (lang === 'html') {
            content = content
                .replace(/(&lt;\/?)(\w+)/g, '$1<span style="color: #f07178;">$2</span>')
                .replace(/(\w+)(?==)/g, '<span style="color: #c792ea;">$1</span>')
                .replace(/(".*?")/g, '<span style="color: #c3e88d;">$1</span>');
        }
        
        element.innerHTML = content;
        element.style.color = '#abb2bf';
    }
};