import { isValidFilename } from './file-validation';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

interface IFiles {
    htmlFile: string;
    cssFile?: string;
    // Complete path and filename of the PDF file to be generated (example: /home/user/myfile.pdf or myfile.pdf)
    pdfOutputFile: string;
}

interface IOptions {
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

/*
 * Converts an HTML file (possibly styled by an external CSS file) to a PDF file
 */
async function convertHtmlToPdf(file: IFiles, options?: IOptions) {
    // Validate pdf path and filename
    const normalizedPath = path.normalize(file.pdfOutputFile);
    const filename = path.basename(normalizedPath);

    if (!isValidFilename(filename)) {
        throw new Error(`Error during HTML to PDF conversion: 'pdfOutputFile' has an invalid filename: ${filename}`);
    }

    // Initialize Puppeteer's browser
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Read HTML and CSS files
    const html = fs.readFileSync(file.htmlFile, 'utf8');
    const css = fs.readFileSync(file.cssFile, 'utf8');

    // Convert HTML to PDF
    await page.setContent(html);
    await page.addStyleTag({ content: css });
    await page.pdf({
        ...options,
        path: file.pdfOutputFile,
        format: options?.format ? options.format : 'A4',
        margin: options?.margin
            ? options.margin
            : {
                  top: '1cm',
                  bottom: '1cm',
                  left: '1cm',
                  right: '1cm',
              },
    });
}

convertHtmlToPdf({
    htmlFile: 'index.html',
    cssFile: 'index.css',
    pdfOutputFile: 'index.pdf',
});

export { convertHtmlToPdf };
