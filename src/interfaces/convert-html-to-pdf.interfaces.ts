/**
 * @interface IFiles
 * @property {string} html - The HTML content to be converted to PDF // TODO - Change to path OR content
 * @property {string[]} cssFiles - The path and filename of the CSS file to be used (example:['./user/template.css', 'extra.css'] or ['template.css'])
 * @property {string} pdfOutputFile - The path and filename of the PDF file to be generated (example: /home/user/myfile.pdf or myfile.pdf)
 */
interface IFiles {
    htmlString: string;
    cssFiles?: string[];
    pdfOutputPath?: string;
}

/**
 * @interface IOptions
 * @property {boolean} displayHeaderFooter - Display header and footer
 * @property {string} footerTemplate - HTML template for the print footer
 * @property {string} headerTemplate - HTML template for the print header
 * @property {string} format - Paper format. If set, takes priority over width or height options. Defaults to 'A4'
 * @property {string | number} height - Paper height, accepts values labeled with units
 * @property {string | number} width - Paper width, accepts values labeled with units
 * @property {boolean} landscape - Paper orientation. Defaults to false
 * @property {object} margin - Paper margins, defaults to none
 * @property {boolean} omitBackground - Print background graphics. Defaults to false
 * @property {string} pageRanges - Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages
 * @property {boolean} preferCSSPageSize - Give any CSS @page size declared in the page priority over what is declared in width and height or format options
 * @property {boolean} printBackground - Print background graphics. Defaults to false
 * @property {number} scale - Scale of the webpage rendering. Defaults to 1
 * @property {number} timeout - Maximum time in milliseconds to wait for the PDF to be generated. Defaults to 30000 (30 seconds). Pass 0 to disable timeout
 */
interface IPdfFileConfig {
    displayHeaderFooter?: boolean;
    footerTemplate?: string;
    headerTemplate?: string;
    format?: 'Letter' | 'Legal' | 'Tabloid' | 'Ledger' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6';
    height?: string | number;
    width?: string | number;
    landscape?: boolean;
    margin?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
    };
    omitBackground?: boolean;
    pageRanges?: string;
    preferCSSPageSize?: boolean;
    printBackground?: boolean;
    scale?: number;
    timeout?: number;
}

export { IFiles, IPdfFileConfig };
