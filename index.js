const fs = require('fs');
const replaceEditables = require('@emartech/content-blocks-replace-editables').replaceEditables;
const replaceVariables = require('@emartech/content-blocks-replace-variables').replaceVariables;
const replaceForms = require('./replaceForms/index.js');
const cheerio = require('cheerio');

let lowest = 10000000;
let highest = 0;
let stream = fs.createWriteStream('./output/log.tsv');

function log(str){
    console.log(str);
    stream.write(`${str}\n`)
}


console.clear();
log('count\tmemory used\tmin memory used\tmax memory used');
function logMemory (count) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    lowest = Math.min(used, lowest);
    highest = Math.max(used, highest);
    log(`${count}\t${used.toFixed(2)}\t${lowest.toFixed(2)}\t${highest.toFixed(2)}`);
}

const html = fs.readFileSync('./test-data/test.html').toString();
const content = JSON.parse(fs.readFileSync('./test-data/content.json'));
const variables = JSON.parse(fs.readFileSync('./test-data/variables.json'));

let i;
for (i = 0; i < 200000; i++) {
    replaceForms(html, content);

    if (!(i % 1000)) {
        logMemory(i);
    }
}
logMemory(i);
stream.end();
