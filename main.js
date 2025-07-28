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

        lines.forEach(line => {
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
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                html += `<ul class="md-ul"><li>${parseInlineMarkdown(line.substring(2))}</li></ul>`;
            } else if (line.startsWith('1. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else if (line.startsWith('2. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else if (line.startsWith('3. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else if (line.startsWith('4. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else if (line.startsWith('5. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else if (line.startsWith('6. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else if (line.startsWith('7. ')) {
                html += `<ol class="md-ol"><li>${parseInlineMarkdown(line.substring(3))}</li></ol>`;
            } else {
                html += `<p class="md-p">${parseInlineMarkdown(line)}</p>`;
            }
        });

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

    ////////////////////////////
    //////// Mistral IA ////////
    ////////////////////////////
    ///// Lasertie Zyglonk /////
    ////////////////////////////