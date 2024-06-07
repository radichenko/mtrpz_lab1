const tags = {
    bold: [
        /(?:\s|^)\*\*(?:\S)/g,
        /(?:\S)\*\*(?:\s|$)/g,
    ],
    italic: [
        /(?:\s|^)_(?:\S)/g,
        /(?:\S)_(?:\s|$)/g,
    ],
    monospace: [
        /(?:\s|^)`(?:\S)/g,
        /(?:\S)`(?:\s|$)/g,
    ],
}
export default (data) => {
    let preformatted = 0;
    const lines = data.split(/\n|\r\n/);


    for (const line of lines) {
        if (line.trim() === '```') {
            preformatted++;
            continue;
        }
        if (preformatted % 2 === 1) {
            continue;
        }

        const foundTags = [];

        for (const tagName in tags) {
            const tag = tags[tagName];
            for (let i = 0; i < 2; i++) {
                while (true) {
                    const match = tag[i].exec(line);
                    if (!match) break;

                    foundTags.push({
                        start: match.index,
                        closing: i === 1,
                        type: tagName
                    })
                }
            }

            foundTags.sort((a, b) => a.start - b.start);
            let expected = '';

            for (const tag of foundTags) {
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

            if (expected !== '') {
                throw new Error('Unmatched opening tag');
            }
        }
    }

    if (preformatted % 2 !== 0) {
        throw new Error('Unmatched preformatted code block');
    }
};
