import { IOptions, IWrapper } from '@interfaces/convert-md-to-html.interfaces';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const htmlWrapper = (props: IWrapper) => `
<!DOCTYPE html>
<html ${props?.lang && `lang="${props.lang}"`}>
    <head>
        <meta charset="utf-8">${props?.title ? `<title>${props.title}</title>` : ''}${
            props?.css ? '\n' + props.css.map((css) => `<link rel="stylesheet" href="${css}">`).join('\n') : ''
        }
    </head>
    <body>
        ${props?.content}
    </body>
</html>
`;

/*
 * Converts a Markdown file to HTML
 */
function convertMarkdownToHtml(markdownFile: string, options?: IOptions) {
    const startTime = process.cpuUsage();

    // Normalize allows multi-platform support (example: Windows uses / and Unix uses \)
    const normalizedPath = path.normalize(markdownFile);

    // Read the Markdown file
    const markdown = fs.readFileSync(normalizedPath, 'utf8');
    let html = marked(markdown);

    // Wrap HTML in a wrapper
    html = htmlWrapper({
        lang: options?.lang,
        title: options?.title,
        css: options?.css,
        content: html,
    });

    fs.writeFileSync('test-files/test.html', html);

    const elapsedTime = process.cpuUsage(startTime).user / 1000;
    console.log(
        `Finished converting Markdown file ('${normalizedPath}') to HTML file ('test-files/test.html') in ${elapsedTime} ms`,
    );

    return html;
}

export { convertMarkdownToHtml };
