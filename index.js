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

const html = convertToHtml(data);

function processContent(data, output) {

}