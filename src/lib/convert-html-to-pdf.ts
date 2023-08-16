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
    const browser = await puppeteer.launch({ headless: 'new', args: ['--font-render-hinting=none'] });
    const page = await browser.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
    );

    // Read HTML file
    const html = fs.readFileSync(file.htmlFile, 'utf8');

    // Convert HTML to PDF
    await page.setContent(html);
    if (file.cssFile) {
        const css = fs.readFileSync(file.cssFile, 'utf8');
        await page.addStyleTag({ content: css });
    }

    // Wait for webfont to load
    await page.evaluateHandle('document.fonts.ready');

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

    console.log(`Finished converting HTML file ('${file.htmlFile}') to PDF file ('${file.pdfOutputFile}')`);
}

export { convertHtmlToPdf };
