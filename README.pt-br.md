# Conversor de Markdown para PDF - Github Action

_Leia isso em outros idiomas: [English](./README.md), [Português (Brasil)](./README.pt-BR.md)_.

Essa é uma Github Action que converte arquivos Markdown para PDF. Ela suporta estilização do Markdown (com CSS). Como o
processo de conversão consiste em converter o Markdown para um arquivo HTML e então converter o arquivo HTML para um
arquivo PDF, ela também é capaz de automatizar a conversão de arquivos Markdown para arquivos HTML.

## Tabela de Conteúdos

-   [Construído com](#construído-com)
-   [Autores](#autores)

## Construído com

-   [Node.js](https://nodejs.org/en/) - JavaScript runtime
-   [Marked](https://marked.js.org/) - Usado para converter Markdown para conteúdo HTML.
-   [Puppeteer](https://pptr.dev/) - Usado para converter HTML para PDF. O Puppeteer foi escolhido porque ele suporta
    entrada de arquivos CSS, possibilitando a estilização do conteúdo HTML previamente gerado.
-   [Vercel's NCC](https://github.com/vercel/ncc) - Permite a compilação de projetos Node.js em um único arquivo.

## Autores

-   **André Rocco** - _Desenvolvimento completo_ - [@andre-rocco](https://www.linkedin.com/in/andre-rocco/)
