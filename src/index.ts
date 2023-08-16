const path = require('path');

interface IInput {
    /*
     * Path to the markdown file
     */
    path: string;
}

interface IConfig {
    /*
     * Path (not including file name) to the output PDF file (example: ./output/)
     * Default: Same path as the input file
     */
    outputPath?: string;
    /*
     * Name of the output PDF file (example: my-file.pdf)
     * Default: Same name as the input file
     */
    outputFilename?: string;
}

interface IMergedConfig extends IConfig {
    /*
     * Path to the output PDF file (example: ./output/my-file.pdf)
     */
    outputFile?: string;
}

/*
 * Entry point function - Runs the markdown to PDF routine
 * 1. Validates input
 * 2. Converts Markdown to HTML
 * 3. Converts HTML to PDF
 */
async function convertMarkdownToPdf(input: IInput, config: IConfig = {}) {
    // Validate input
    if (!input.path) {
        throw new Error("markdownToPdf 'path' argument is required");
    }
    if (!input.path.endsWith('.md')) {
        throw new Error("markdownToPdf 'path' argument must be a .md file");
    }
    if (!config.outputPath) {
        // If outputPath is not defined, set it to the same path as the input file
        const inputDir = path.dirname(input.path); // Get the directory of the input file
        config.outputPath = inputDir;
    } else {
        // If outputPath is defined, make sure it is valid
        config.outputPath = path.normalize(config.outputPath); // Normalize the output path
    }

    // Generates the mergedConfig object from the input config and the default config
    let mergedConfig: IMergedConfig = {
        ...config,
    };

    mergedConfig.outputFilename = config.outputFilename || path.basename(input.path, '.md') + '.pdf'; // Set the output filename
    mergedConfig.outputFile = path.join(mergedConfig.outputPath || '', mergedConfig.outputFilename); // Set the output file path

    console.log(mergedConfig);

    // Convert markdown to HTML
    // const html = await markdownToHtml(props);

    // Convert HTML to PDF
    // await htmlToPdf(html, props.destination);
}

convertMarkdownToPdf({ path: './teste.md' });

/* const fs = require('fs');
const { marked } = require('marked');

var args = process.argv.slice(2);
console.log(args);

// Parse teste.md file  
const markdown = fs.readFileSync('./teste.md', 'utf8');

// Convert markdown to html
const html = marked(markdown);
console.log(html); */
