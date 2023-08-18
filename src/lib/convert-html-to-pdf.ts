import { IFiles, IOptions } from '@interfaces/convert-html-to-pdf.interfaces';
import { isValidFilename } from './file-validation';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/*
 * Converts an HTML file (possibly styled by an external CSS file) to a PDF file
 */
async function convertHtmlToPdf(file: IFiles, options?: IOptions) {
    const startTime = process.cpuUsage();

    // Validate pdf path and filename
    const normalizedPath = path.normalize(file.pdfOutputFile);
    const filename = path.basename(normalizedPath);

    if (!isValidFilename(filename)) {
        throw new Error(`Error during HTML to PDF conversion: 'pdfOutputFile' has an invalid filename: ${filename}`);
    }

    // Initialize Puppeteer's browser
    const browser = await puppeteer.launch({ headless: 'new', args: ['--font-render-hinting=none'] });
    const page = await browser.newPage();

    // Read HTML and CSS (if specified) files
    const html = fs.readFileSync(file.htmlFile, 'utf8');
    await page.setContent(html);
    if (file.cssFile) {
        const css = fs.readFileSync(file.cssFile, 'utf8');
        await page.addStyleTag({ content: css });
    }

    // Wait for webfont to load
    await page.evaluateHandle('document.fonts.ready');

    // Convert HTML to PDF
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

    // Close Puppeteer's browser
    await browser.close();

    // Calculate elapsed time
    const elapsedTime = process.cpuUsage(startTime).user / 1000;

    console.log(
        `Finished converting HTML file ('${file.htmlFile}') to PDF file ('${file.pdfOutputFile}') in ${elapsedTime} ms`,
    );
}

export { convertHtmlToPdf };
