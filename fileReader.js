import { readFile } from 'fs';

const readSource = (input, destination, processContent) => {
    readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading from: ${input}`, err);
            process.exit(1);
        }

        processContent(data, destination); 
    });
};

export default readSource;