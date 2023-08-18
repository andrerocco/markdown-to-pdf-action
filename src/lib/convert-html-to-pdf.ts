import { IFiles, IPdfFileConfig } from '@interfaces/convert-html-to-pdf.interfaces';
import { isValidFilename } from './file-validation';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/*
 * Converts an HTML string (possibly styled by an external CSS file) to a PDF file
 */
async function convertHtmlToPdf(file: IFiles, options?: IPdfFileConfig) {
    const startTime = process.cpuUsage();

    // Validate pdf path and filename
    file.pdfOutputPath = path.normalize(file.pdfOutputPath); // TODO - Do checking

    // Initialize Puppeteer's browser
    const browser = await puppeteer.launch({ headless: 'new', args: ['--font-render-hinting=none'] });
    const page = await browser.newPage();

    // Read HTML and CSS (if specified) files
    const html = file.htmlString;
    await page.setContent(html);
    if (file.cssFiles) {
        for (const cssFile of file.cssFiles) {
            const css = fs.readFileSync(cssFile, 'utf8');
            await page.addStyleTag({ content: css });
        }
    }

    // Wait for webfont to load
    await page.evaluateHandle('document.fonts.ready');

    // Convert HTML to PDF
    await page.pdf({
        ...options,
        path: file.pdfOutputPath,
        format: options?.format ? options.format : 'A4',
        margin: options?.margin,
    });

    // Close Puppeteer's browser
    await browser.close();

    // Calculate elapsed time
    const elapsedTime = process.cpuUsage(startTime).user / 1000;

    console.log(`Finished converting HTML to PDF file ('${file.pdfOutputPath}') in ${elapsedTime} ms`);
}

export { convertHtmlToPdf };
