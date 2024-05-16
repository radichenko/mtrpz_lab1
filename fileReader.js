const fs = require('fs');

const readSource = (input, destination, processContent) => {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading from: ${input}`, err);
            process.exit(1);
        }

        processContent(data, destination); 
    });
};

module.exports = readSource;