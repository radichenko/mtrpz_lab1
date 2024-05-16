const { checkMarkers, checkNesting } = require('./markdownProcessor');
const convertToHtml = require('./htmlConverter');

const source = process.argv[2];
const destination = process.argv[4];

if (!source) {
    console.error('Error: No source specified');
    process.exit(1);
}

const readSource = (input, destination, processContent) => {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading from: ${input}`, err);
            process.exit(1);
        }

        processContent(data, destination); 
    });
};

function processContent(data, output) {

}