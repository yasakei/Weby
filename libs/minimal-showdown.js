// Minimal Showdown fallback for offline usage
window.showdown = window.showdown || {
    Converter: function() {
        this.options = {};
        
        this.setOption = function(key, value) {
            this.options[key] = value;
        };
        
        this.makeHtml = function(text) {
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
                // Images
                .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2">')
                // Lists
                .replace(/^\* (.+$)/gim, '<li>$1</li>')
                .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
                // Blockquotes
                .replace(/^> (.+$)/gim, '<blockquote><p>$1</p></blockquote>')
                // Tables (basic)
                .replace(/\|(.+)\|/gim, (match, content) => {
                    const cells = content.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
                    return `<tr>${cells}</tr>`;
                })
                .replace(/(<tr>.*<\/tr>)/gims, '<table>$1</table>')
                // Line breaks and paragraphs
                .replace(/\n\n/gim, '</p><p>')
                .replace(/^(?!<h|<pre|<\/p>|<ul|<table|<blockquote|$)/gim, '<p>')
                .replace(/(?!<\/h\d>|<\/pre>|<\/p>|<\/ul>|<\/table>|<\/blockquote>)$/gim, '</p>')
                // Clean up empty paragraphs
                .replace(/<p><\/p>/gim, '');
        };
    }
};