import { IPdfFileConfig } from './convert-html-to-pdf.interfaces';
import { IHtmlConfig } from './convert-md-to-html.interfaces';

/**
 * @interface IInput
 * @property {string} path - Path to the input markdown file (example: ./input/my-file.md)
 */
interface IInput {
    path: string;
}

/**
 * @interface IConfig
 * @property {string} outputPath - Path (not including file name) to the output PDF file (example: ./output/).
 * Defaults to the same path as the input file.
 * @property {string} outputFilename - Name of the output PDF file (example: my-file.pdf). Defaults to the same.
 * name as the input file.
 * @property {string[]} cssFiles - The path and filename of the CSS file to be used (example:['./user/template.css', 'extra.css'] or ['template.css'])
 * @property {boolean} generateHtmlFile - Whether to generate the HTML file or not. Defaults to false.
 * @property {IHtmlConfig} htmlConfig - Configuration for the HTML file.
 * @property {string} htmlOutputPath - Path (not including file name) to the output HTML file (example: ./output/).
 * Defaults to the same path as the input file.
 * @property {string} htmlOutputFilename - Name of the output HTML file (example: my-file.html). Defaults to the same
 * name as the input file.
 */
interface IConfig {
    outputPath?: string;
    outputFilename?: string;
    cssFiles?: string[];
    generateHtml?: boolean;
    htmlConfig?: Omit<IHtmlConfig, 'css'>;
    htmlOutputPath?: string;
    htmlOutputFilename?: string;
    pdfConfig?: IPdfFileConfig;
}

/**
 * @interface IMergedConfig
 * @property {string} outputPath - Path (not including file name) to the output PDF file (example: ./output/).
 */
interface IMergedConfig extends IConfig {
    outputFile?: string;
}

export { IInput, IConfig, IMergedConfig };
