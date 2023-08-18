/**
 * @interface IHtmlConfig
 * @property {string | undefined} lang - The language of the HTML document. Example: 'en'.
 * @property {string | undefined} title - The title of the HTML document. Example: 'My resume'.
 * @property {string[] | undefined} css - An array of paths to CSS files to be used in the HTML document. Example: ['./css/template.css'].
 */
interface IHtmlConfig {
    lang?: string | undefined;
    title?: string | undefined;
    css?: string[] | string | undefined;
}

/**
 * @interface IHtmlFileConfig
 * @extends IHtmlConfig
 * @property {boolean | undefined} writeHtmlFile - Whether to write the HTML into a file or not. Example: true.
 * @property {string | undefined} htmlOutputPath - Path (not including file name) to the output HTML file (example: ./output/).
 * Defaults to the same path as the input file.
 * @property {string | undefined} htmlOutputFilename - Name of the output HTML file (example: my-file.html). Defaults to the same
 * name as the input file.
 */
interface IHtmlFileConfig extends IHtmlConfig {
    writeHtmlFile?: boolean;
    htmlOutputPath?: string;
    htmlOutputFilename?: string;
}

/**
 * @interface IHtmlWrapper
 * @extends IHtmlConfig
 * @property {string[]} css - An array of paths to CSS files to be used in the HTML document. Example: ['./css/template.css'].
 * @property {string} content - The content of the HTML document. Example: '<h1>Hello world!</h1>'.
 */
interface IHtmlWrapper extends IHtmlConfig {
    css: string[];
    content?: string;
}

export { IHtmlConfig, IHtmlFileConfig, IHtmlWrapper };
