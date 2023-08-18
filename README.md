# Markdown to PDF converter/generator - Github Action

_Read this in other languages: [English](./README.md), [Português (Brasil)](./README.pt-BR.md)_.

This is a Github Action that converts Markdown files to PDF. It supports markdown styling (with CSS). Since the
conversion proccess consists in converting the Markdown into an HTML file and then converting the HTML file into a PDF
file, it is also able to automate the conversion of Markdown files into HTML files.

## Table of Contents

-   [Built With](#built-with)
-   [Authors](#authors)

## Built With

-   [Node.js](https://nodejs.org/en/) - JavaScript runtime
-   [Marked](https://marked.js.org/) - Used for converting Markdown to HTML content.
-   [Puppeteer](https://pptr.dev/) - Used for converting HTML to PDF. The Puppeteer was made because it supports CSS
    file inputting, enabling the styling of the HTML content previously generated.
-   [Vercel's NCC](https://github.com/vercel/ncc) - Enables the compilation of Node.js projects into a single file.

## Authors

-   **André Rocco** - _Full development_ - [@andre-rocco](https://www.linkedin.com/in/andre-rocco/)
