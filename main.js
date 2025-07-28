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
    let inUnorderedList = false;
    let inOrderedList = false;

    lines.forEach(line => {
        if (line.startsWith('# ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<h1 class="md-h1">${parseInlineMarkdown(line.substring(2))}</h1>`;
        } else if (line.startsWith('## ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<h2 class="md-h2">${parseInlineMarkdown(line.substring(3))}</h2>`;
        } else if (line.startsWith('### ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<h3 class="md-h3">${parseInlineMarkdown(line.substring(4))}</h3>`;
        } else if (line.startsWith('#### ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<h4 class="md-h4">${parseInlineMarkdown(line.substring(5))}</h4>`;
        } else if (line.startsWith('##### ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<h5 class="md-h5">${parseInlineMarkdown(line.substring(6))}</h5>`;
        } else if (line.startsWith('###### ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<h6 class="md-h6">${parseInlineMarkdown(line.substring(7))}</h6>`;
        } else if (line.startsWith('> ')) {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<blockquote class="md-blockquote">${parseInlineMarkdown(line.substring(2))}</blockquote>`;
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!inUnorderedList) {
                // Start a new unordered list
                html += '<ul class="md-ul">';
                inUnorderedList = true;
                // Close any open ordered list
                if (inOrderedList) {
                    html += '</ol>';
                    inOrderedList = false;
                }
            }
            html += `<li>${parseInlineMarkdown(line.substring(2))}</li>`;
        } else if (line.match(/^\d+\. /)) {
            if (!inOrderedList) {
                // Start a new ordered list
                html += '<ol class="md-ol">';
                inOrderedList = true;
                // Close any open unordered list
                if (inUnorderedList) {
                    html += '</ul>';
                    inUnorderedList = false;
                }
            }
            html += `<li>${parseInlineMarkdown(line.substring(line.indexOf('. ') + 2))}</li>`;
        } else {
            // Close any open lists
            if (inUnorderedList) {
                html += '</ul>';
                inUnorderedList = false;
            }
            if (inOrderedList) {
                html += '</ol>';
                inOrderedList = false;
            }
            html += `<p class="md-p">${parseInlineMarkdown(line)}</p>`;
        }
    });

    // Close any remaining open lists
    if (inUnorderedList) {
        html += '</ul>';
    }
    if (inOrderedList) {
        html += '</ol>';
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
