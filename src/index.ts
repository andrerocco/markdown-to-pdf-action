import { IInput, IConfig, IMergedConfig } from './interfaces/markdown-to-pdf.interfaces';
import { convertHtmlToPdf } from './lib/convert-html-to-pdf';
import { convertMarkdownToHtml } from './lib/convert-md-to-html';

const path = require('path');

/*
 * Entry point function - Runs the markdown to PDF routine
 * 1. Validates input
 * 2. Converts Markdown to HTML
 * 3. Converts HTML to PDF
 */
async function convertMarkdownToPdf(input: IInput, config: IConfig = {}) {
    const startTime = process.cpuUsage();

    // Validate input
    if (!input.path) {
        throw new Error("markdownToPdf 'path' argument is required");
    }
    if (!input.path.endsWith('.md')) {
        throw new Error("markdownToPdf 'path' argument must be a .md file");
    }
    if (!config.outputPath) {
        // If outputPath is not defined, set it to the same path as the input file
        const inputDir = path.dirname(input.path);
        config.outputPath = inputDir;
    } else {
        // If outputPath is defined, make sure it is valid
        // Normalize allows multi-platform support (example: Windows uses / and Unix uses \)
        config.outputPath = path.normalize(config.outputPath);
    }

    // Generates the mergedConfig object from the input config and the default config
    let mergedConfig: IMergedConfig = {
        ...config,
    };

    mergedConfig.outputFilename = config.outputFilename || path.basename(input.path, '.md') + '.pdf'; // Set the output filename
    mergedConfig.outputFile = path.join(mergedConfig.outputPath || '', mergedConfig.outputFilename); // Set the output file path

    console.log(mergedConfig);

    // Convert markdown to HTML
    const html = await convertMarkdownToHtml(input.path, {
        lang: 'pt-br',
        css: ['template.css'], // TODO - Fix path
    }); // Await the function call

    // Convert HTML to PDF
    await convertHtmlToPdf({
        htmlFile: 'test-files/test.html', // You should use the 'html' variable here
        cssFile: 'test-files/template.css',
        pdfOutputFile: 'test-files/test.pdf', // You might want to use 'mergedConfig.outputFile' here
    });

    const elapsedTime = process.cpuUsage(startTime).user / 1000;
    console.log(
        `Finished converting Markdown file ('${input.path}') to PDF file ('${mergedConfig.outputFile}') in ${elapsedTime} ms`,
    );
}

convertMarkdownToPdf({ path: 'test-files/test.md' });

export { convertMarkdownToPdf };
