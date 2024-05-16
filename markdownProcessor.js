const { htmlConverter } = require('./htmlConverter');

const checkMarkers = (data) => {
    let bold = false;
    let monospace = false;
    let italic = false;
    let preformatted = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] === '*' && i + 1 < data.length && data[i + 1] === '*') {
            if (!(i > 0 && data[i - 1] === '\\')) {
                bold = !bold;
                i++;
            }
        } else if (data[i] === '`' && (i < 1 || data[i - 1] !== '`')) {
            if (!(i > 0 && data[i - 1] === '\\')) {
                monospace = !monospace;
            }
        } else if (data[i] === '_') {
            if (!(i > 0 && data[i - 1] === '\\')) {
                const hasSpace = (i > 0 && data[i - 1] === ' ') || (i < data.length - 1 && data[i + 1] === ' ');
                const hasQuote = (i > 0 && data[i - 1] === '‘') || (i < data.length - 1 && data[i + 1] === '’');
                const partOfWord = (i > 0 && data[i - 1].match(/\w/)) && (i < data.length - 1 && data[i + 1].match(/\w/));

                if (!hasSpace && !hasQuote && !partOfWord) {
                    italic = !italic;
                }
            }
        } else if (data[i] === '`' && i + 2 < data.length && data[i + 1] === '`' && data[i + 2] === '`') {
            preformatted++;
            i += 2;
        }
    }

    return !(bold || monospace || italic || preformatted % 2 !== 0);
};

const checkNesting = (data) => {

}

module.exports = { checkMarkers, checkNesting };
