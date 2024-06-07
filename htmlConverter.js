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

                line = line.replace(/(\s|^)\*\*(\S.*?\S|\S)\*\*(\s|$)/g, '$1<b>$2</b>$3')
                    .replace(/(\s|^)_(\S.*?\S|\S)_(\s|$)/g, '$1<i>$2</i>$3')
                    .replace(/(\s|^)`(\S.*?\S|\S)`(\s|$)/g, '$1<tt>$2</tt>$3');

                html += line + '\n';
            } else {
                newLineCount++;
            }
        }
    });
    return html + '</p>';
};

module.exports = htmlConverter;