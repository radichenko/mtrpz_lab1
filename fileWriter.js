const fs = require('fs');

const writeDestination = (output, content) => {
    fs.writeFile(output, content, (err) => {
        if (err) {
            console.error(`Error writing to: ${output}`, err);
            process.exit(1);
        }
        console.log(`Content written to: ${output}`);
    });
};

module.exports = writeDestination;