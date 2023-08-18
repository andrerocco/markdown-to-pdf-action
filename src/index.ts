import { config } from 'process';
import { IInput, IConfig, IMergedConfig } from './interfaces/markdown-to-pdf.interfaces';
import { convertHtmlToPdf } from './lib/convert-html-to-pdf';
import { convertMarkdownToHtml } from './lib/convert-md-to-html';

const path = require('path');

/**
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
    mergedConfig.outputFilename = config.outputFilename ? config.outputFilename : path.basename(input.path, '.md'); // Set the output file name
    mergedConfig.outputFile = path.join(mergedConfig.outputPath || '', mergedConfig.outputFilename); // Set the output file path

    // Convert markdown to HTML
    const html = await convertMarkdownToHtml(input.path, {
        lang: mergedConfig?.htmlConfig?.lang,
        title: mergedConfig?.htmlConfig?.title,
        css: mergedConfig?.cssFiles,
    }); // Await the function call

    // Convert HTML to PDF
    await convertHtmlToPdf({
        htmlString: html,
        cssFiles: mergedConfig?.cssFiles,
        pdfOutputPath: mergedConfig?.outputFile,
    });

    const elapsedTime = process.cpuUsage(startTime).user / 1000;
    console.log(
        `Finished converting Markdown file ('${input.path}') to PDF file ('${mergedConfig.outputFile}') in ${elapsedTime} ms`,
    );
}

convertMarkdownToPdf(
    {
        path: './test-files/test.md',
    },
    {
        outputPath: './test-files',
        outputFilename: 'output.pdf',
        cssFiles: ['./test-files/template.css'],
        htmlConfig: {
            lang: 'en',
            title: 'Test',
        },
    },
);

export { convertMarkdownToPdf };
