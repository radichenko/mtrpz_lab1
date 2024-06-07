import { writeFile } from 'fs';

const writeDestination = (output, content) => {
    writeFile(output, content, (err) => {
        if (err) {
            console.error(`Error writing to: ${output}`, err);
            process.exit(1);
        }
        console.log(`Content written to: ${output}`);
    });
};

export default writeDestination;