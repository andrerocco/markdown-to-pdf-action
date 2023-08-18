/**
 * @interface IWrapper
 * @property {string} lang - The language of the HTML document
 * @property {string} title - The title of the HTML document
 * @property {string[]} css - An array of CSS files to be included in the HTML document
 * @property {string} content - The content of the HTML document
 */
interface IWrapper {
    lang?: string;
    title?: string;
    css?: string[];
    content?: string;
}

/**
 * @interface IOptions
 * @property {string} lang - The language of the HTML document
 * @property {string} title - The title of the HTML document
 * @property {string[]} css - An array of CSS files to be included in the HTML document
 */
interface IOptions {
    lang?: string;
    title?: string;
    css?: string[];
}

export { IWrapper, IOptions };
