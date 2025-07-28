document.addEventListener('DOMContentLoaded', function () {
    const markdownDiv = document.querySelector('div[md]');
    if (markdownDiv) {
        const markdownFile = markdownDiv.getAttribute('md');

        // Fetch the Markdown file
        fetch(markdownFile)
            .then(response => response.text())
            .then(markdownText => {
                // Convert Markdown to HTML
                const htmlContent = convertMarkdownToHtml(markdownText);
                // Insert the HTML content into the div
                markdownDiv.innerHTML = htmlContent;
            })
            .catch(error => console.error('Error loading the Markdown file:', error));
    }
});

function convertMarkdownToHtml(markdown) {
    // Split the markdown content into lines
    const lines = markdown.split('\n');
    let html = '';
    let listStack = []; // Stack to keep track of nested lists

    lines.forEach(line => {
        const unorderedListMatch = line.match(/^(\s*)[-*]\s+(.*)/);
        const orderedListMatch = line.match(/^(\s*)\d+\.\s+(.*)/);

        if (unorderedListMatch) {
            const indent = unorderedListMatch[1].length;
            const content = unorderedListMatch[2];

            // Close lists that are deeper than the current indent
            while (listStack.length > indent) {
                html += '</' + listStack.pop() + '>';
            }

            // Open new lists if the current indent is deeper than the stack
            while (listStack.length < indent) {
                html += '<ul class="md-ul">';
                listStack.push('ul');
            }

            // Add the list item
            html += `<li>${parseInlineMarkdown(content)}</li>`;
        } else if (orderedListMatch) {
            const indent = orderedListMatch[1].length;
            const content = orderedListMatch[2];

            // Close lists that are deeper than the current indent
            while (listStack.length > indent) {
                html += '</' + listStack.pop() + '>';
            }

            // Open new lists if the current indent is deeper than the stack
            while (listStack.length < indent) {
                html += '<ol class="md-ol">';
                listStack.push('ol');
            }

            // Add the list item
            html += `<li>${parseInlineMarkdown(content)}</li>`;
        } else {
            // Close all open lists if the line is not a list item
            while (listStack.length > 0) {
                html += '</' + listStack.pop() + '>';
            }

            // Handle other Markdown elements
            if (line.startsWith('# ')) {
                html += `<h1 class="md-h1">${parseInlineMarkdown(line.substring(2))}</h1>`;
            } else if (line.startsWith('## ')) {
                html += `<h2 class="md-h2">${parseInlineMarkdown(line.substring(3))}</h2>`;
            } else if (line.startsWith('### ')) {
                html += `<h3 class="md-h3">${parseInlineMarkdown(line.substring(4))}</h3>`;
            } else if (line.startsWith('#### ')) {
                html += `<h4 class="md-h4">${parseInlineMarkdown(line.substring(5))}</h4>`;
            } else if (line.startsWith('##### ')) {
                html += `<h5 class="md-h5">${parseInlineMarkdown(line.substring(6))}</h5>`;
            } else if (line.startsWith('###### ')) {
                html += `<h6 class="md-h6">${parseInlineMarkdown(line.substring(7))}</h6>`;
            } else if (line.startsWith('> ')) {
                html += `<blockquote class="md-blockquote">${parseInlineMarkdown(line.substring(2))}</blockquote>`;
            } else {
                html += `<p class="md-p">${parseInlineMarkdown(line)}</p>`;
            }
        }
    });

    // Close any remaining open lists
    while (listStack.length > 0) {
        html += '</' + listStack.pop() + '>';
    }

    return html;
}

function parseInlineMarkdown(text) {
    // Replace links ([text](url))
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    // Replace bold (**text**)
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Replace italic (*text*)
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Replace underline (<u>text</u>)
    text = text.replace(/_(.+?)_/g, '<u>$1</u>');
    // Replace strikethrough (~~text~~)
    text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');
    return text;
}
