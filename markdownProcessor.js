const { start } = require('repl');
const { htmlConverter } = require('./htmlConverter');

const tags = {
    bold: [
        /(?:\s|^)\*\*(?:\S)/,
        /(?:\S)\*\*(?:\s|$)/,
    ],
    italic: [
        /(?:\s|^)_(?:\S)/,
        /(?:\S)_(?:\s|$)/
    ],
    monospace: [
        /(?:\s|^)`(?:\S)`/,
        /(?:\S)`(?:\s|$)/,
    ],
}
module.exports = (data) => {
    let bold = false;
    let monospace = false;
    let italic = false;
    let preformatted = 0;
    const lines = data.split(/\n|\r\n/);
    const tags = [];


    for (const line of lines) {
        if (line.trim() === '```') {
            preformatted++;
            continue;
        }
        for (const tagName in tags) {
            const tag = tags[tagName];
            for (let i = 0; i < 2; i++) {
                while (true) {
                    const match = line.exec(tag[i]);
                    if (match.index === -1) break
    
                    tags.push({
                        start: match.index,
                        closing: i === 0,
                        type: tagName
                    })
                }
            }
        }
    }

    if (preformatted % 2 !== 0) {
        throw new Error('Unmatched preformatted code block');
    }
    tags.sort((a, b) => a.start - b.start);
    let expected = '';

    for (const tag of tags) {
        if (expected === '') {
            if (tag.closing) {
                throw new Error('Unmatched closing tag');
            }

            expected = tag.type;
        } else {
            if (!tag.closing) {
                throw new Error('Unmatched opening tag');
            }
            if (expected !== tag.type) {
                throw new Error('Mismatched tags');
            }
            expected = '';
        }
    }
};
