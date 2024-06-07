const htmlConverter = (data) => {
    let html = '<p>';
    const lines = data.split(/\n|\r\n/);
    let inPre = false;
    //let newParagraph = true;
    let newLineCount = 0;

    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            inPre = !inPre;
            html += inPre ? '<pre>' : '</pre>\n';
            //newParagraph = true;
        } else if (inPre) {
            html += `${line}\n`;
        } else {
            if (line.trim() !== '') {
                //newParagraph = false;
                if (newLineCount !== 0) {
                    html += '</p>\n<p>';
                    newLineCount = 0;
                }

                line = line.replace(/(?:\s|^)\*\*(\S.*?\S|\S)\*\*(?:\s|$)/g, '<b>$1</b>')
                    .replace(/(?:\s|^)_(\S.*?\S|\S)_(?:\s|$)/g, '<i>$1</i>')
                    .replace(/(?:\s|^)`(\S.*?\S|\S)`(?:\s|$)/g, '<code>$1</code>');

                html += line + '\n';
            } else {
                newLineCount++;
            }
        }
    });
    return html + '</p>';
};

module.exports = htmlConverter;