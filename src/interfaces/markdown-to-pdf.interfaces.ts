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
* Defaults to the same path as the input file
* @property {string} outputFilename - Name of the output PDF file (example: my-file.pdf). Defaults to the same
* name as the input file
*/
interface IConfig {
    outputPath?: string;
    outputFilename?: string;
}

/**
 * @interface IMergedConfig
 * @property {string} outputPath - Path (not including file name) to the output PDF file (example: ./output/). 
 */
interface IMergedConfig extends IConfig {
    outputFile?: string;
}

export {
    IInput,
    IConfig,
    IMergedConfig
}