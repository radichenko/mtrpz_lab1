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
    const markers = ['**', '`', '_'];
    let pre = false;
    let stack = [];

    for (let i = 0; i < data.length; i++) {
        if (data.startsWith('```', i)) {
            pre = !pre;
            i += 2;
            continue;
        }

        if (pre) continue;

        for (const marker of markers) {
            if (data.startsWith(marker, i)) {
                if (marker === '_') {
                    if ((i > 0 && data[i - 1].match(/\w/)) && (i < data.length - 1 && data[i + 1].match(/\w/))) {
                        continue;
                    }
                    if ((i > 0 && data[i - 1].match(/[^\w\s]/)) && (i < data.length - 1 && data[i + 1].match(/[^\w\s]/))) {
                        continue;
                    }
                }

                if (stack.length > 0 && stack[stack.length - 1] !== marker) {
                    return false;
                }
                if (stack.length > 0 && stack[stack.length - 1] === marker) {
                    stack.pop();
                } else {
                    stack.push(marker);
                }
                i += marker.length - 1;
                break;
            }
        }
    }

    return true;
};

module.exports = { checkMarkers, checkNesting };
