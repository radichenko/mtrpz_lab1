const readSource = require('./fileReader');
const writeDestination = require('./fileWriter');
const processor = require('./markdownProcessor');
const convertToHtml = require('./htmlConverter');

const args = process.argv.slice(2);
let source = null;
let destination = null;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--out') {
        destination = args[i + 1];
        i++;
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

    const html = convertToHtml(data);

    if (output) {
        writeDestination(output, html);
    } else {
        console.log(html);
    }
}