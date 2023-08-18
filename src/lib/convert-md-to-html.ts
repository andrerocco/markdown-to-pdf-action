import { IHtmlConfig, IHtmlFileConfig, IHtmlWrapper } from '@interfaces/convert-md-to-html.interfaces';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const htmlWrapper = (props: IHtmlWrapper) => `
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

function verifyCssFiles(cssFiles: string | string[] | undefined) {
    // Check for type string or string[], converts to string[] if string
    // Normalize all paths
    let cssPaths: string[] = [];

    if (typeof cssFiles === 'string') {
        cssPaths = [path.normalize(cssFiles)];
    } else if (Array.isArray(cssFiles)) {
        cssPaths = cssFiles.map((cssFile) => path.normalize(cssFile));
    }

    return cssPaths;
}

/**
 * Converts a Markdown file to HTML
 * @returns {string} - The HTML string
 */
function convertMarkdownToHtml(markdownFile: string, options?: IHtmlFileConfig) {
    const startTime = process.cpuUsage();

    // Normalize allows multi-platform support (example: Windows uses / and Unix uses \)
    const normalizedPath = path.normalize(markdownFile);
    let cssPaths: string[] = [];
    if (options?.css) {
        cssPaths = verifyCssFiles(options?.css);
    }

    // Read the Markdown file
    const markdown = fs.readFileSync(normalizedPath, 'utf8');
    let html = marked(markdown);

    // Wrap HTML in a wrapper
    html = htmlWrapper({
        lang: options?.lang,
        title: options?.title,
        css: cssPaths,
        content: html,
    });

    let outputPath = '';
    if (options?.writeHtmlFile) {
        let outputPath = options?.htmlOutputPath ? options.htmlOutputPath : path.dirname(normalizedPath);
        let outputFilename = options?.htmlOutputFilename
            ? options.htmlOutputFilename
            : path.basename(normalizedPath, '.md') + '.html';
        outputPath = path.join(outputPath, outputFilename);
        fs.writeFileSync(outputPath, html);
    }

    const elapsedTime = process.cpuUsage(startTime).user / 1000;
    console.log(
        outputPath
            ? `Finished converting Markdown file ('${normalizedPath}') to HTML (file generated at '${outputPath}') in ${elapsedTime} ms`
            : `Finished converting Markdown file ('${normalizedPath}') to HTML in ${elapsedTime} ms`,
    );

    return html;
}

export { convertMarkdownToHtml };
