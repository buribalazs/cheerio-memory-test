const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('./test-data/test.html');

console.log(cheerio.load(html).html());