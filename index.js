const readSource = require('./fileReader');
const writeDestination = require('./fileWriter');
const { checkMarkers, checkNesting } = require('./markdownProcessor');
const convertToHtml = require('./htmlConverter');

const source = process.argv[2];
const destination = process.argv[4];

if (!source) {
    console.error('Error: No source specified');
    process.exit(1);
}

readSource(source, destination, processContent);

function processContent(data, output) {
    if (!checkMarkers(data)) {
        console.error('Error: Unmatched markers found');
        process.exit(1);
    }

    if (!checkNesting(data)) {
        console.error('Error: Nesting issue detected');
        process.exit(1);
    }

    const html = convertToHtml(data);

    if (output) {
        writeDestination(output, html);
    } else {
        console.log(html);
    }
}