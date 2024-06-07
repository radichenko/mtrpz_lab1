const htmlConverter = (data, format) => {
    let html = '';
    const lines = data.split(/\n|\r\n/);
    let inPre = false;
    //let newParagraph = true;
    let newLineCount = 0;
    const isHtml = format === 'html';

    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            inPre = !inPre;
            if (!isHtml) {
                html += inPre ? '\x1b[7m' : '\x1b[0m\n';
                return;
            }
            html += inPre ? '<pre>' : '</pre>\n';
            //newParagraph = true;
        } else if (inPre) {
            html += `${line}\n`;
        } else {
            if (line.trim() !== '') {
                //newParagraph = false;
                if (newLineCount !== 0) {
                    if (isHtml) html += '</p>\n<p>';
                    newLineCount = 0;
                }

                line = line.replace(/(\s|^)\*\*(\S.*?\S|\S)\*\*(\s|$)/g, isHtml ? '$1<b>$2</b>$3' : '$1\x1b[1m$2\x1b[0m$3')
                    .replace(/(\s|^)_(\S.*?\S|\S)_(\s|$)/g, isHtml ? '$1<i>$2</i>$3' : '$1\x1b[3m$2\x1b[0m$3')
                    .replace(/(\s|^)`(\S.*?\S|\S)`(\s|$)/g, isHtml ? '$1<tt>$2</tt>$3' : '$1\x1b[7m$2\x1b[0m$3');

                html += line + '\n';
            } else {
                newLineCount++;
            }
        }
    });
    return isHtml ? '<p>' + html + '</p>' : html;
};

module.exports = htmlConverter;