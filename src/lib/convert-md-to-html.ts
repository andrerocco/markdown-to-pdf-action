/* export assync function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString(); */

const fs = require('fs');
const { marked } = require('marked');

/* var args = process.argv.slice(2);
console.log(args); */

// Parse teste.md file
const markdown = fs.readFileSync('.test-files/test.md', 'utf8');

// Convert markdown to html
const generatedHtml = marked(markdown);

/* const fs = require('fs');
const { marked } = require('marked');

var args = process.argv.slice(2);
console.log(args);

// Parse teste.md file  
const markdown = fs.readFileSync('./teste.md', 'utf8');

// Convert markdown to html
const html = marked(markdown);
console.log(html); */
