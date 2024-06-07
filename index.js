const readSource = require('./fileReader');
const writeDestination = require('./fileWriter');
const processor = require('./markdownProcessor');
const convertToHtml = require('./htmlConverter');

const args = process.argv.slice(2);
let source = null;
let destination = null;
let format = 'html';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') {
        destination = args[i + 1];
        i++;
        continue;
    }
    if (args[i].startsWith('--format=')) {
        format = args[i].replace('--format=', '');
        if (format !== 'html' && format !== 'bash') throw new Error('Unsupported format');
        continue;
    }

    source = args[i];
}

if (!source) {
    console.error('Error: No source specified');
    process.exit(1);
}

readSource(source, destination, processContent);

function processContent(data, output) {
    processor(data);

    const html = convertToHtml(data, format);

    if (output) {
        writeDestination(output, html);
    } else {
        console.log(html);
    }
}