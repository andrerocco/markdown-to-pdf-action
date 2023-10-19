import { convertMarkdownToPdf } from '@index';

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const markdownPath = core.getInput('markdown_path');
        const outputDir = core.getInput('output_dir');
        const outputFilename = core.getInput('output_filename');
        const cssPath = core.getInput('css_path');

        console.log(`markdown_path: ${markdownPath}`);
        console.log(`output_dir: ${outputDir}`);
        console.log(`output_filename: ${outputFilename}`);
        console.log(`css_path: ${cssPath}`);

        await convertMarkdownToPdf(
            {
                path: markdownPath,
            },
            {
                outputDir,
                outputFilename,
                cssFiles: [cssPath],
                htmlConfig: {
                    lang: 'en',
                    title: 'Test',
                },
            },
        );
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
