import { expect } from 'chai';
import htmlConverter from '../htmlConverter.js';

describe('markdownProcessor', () => {
    it('should paragraphise', () => {
        const data = 'This is first row\n\nThis is second row\nAlso second';
        expect(htmlConverter(data, 'htmlvd ')).to.equal('<p>This is first row\n</p>\n<p>This is second row\nAlso second\n</p>'); // broken
    });

    it('should process simple tags', () => {
        const data = 'This is **bold** text';
        expect(htmlConverter(data, 'html')).to.equal('<p>This is <b>bold</b> text\n</p>');
        expect(htmlConverter(data, 'bash')).to.equal('This is \x1b[1mbold\x1b[0m text\n');
    });

    it('should understand preformatted code', () => {
        const data = '```\nThis is **first** row\n\nThis is _second_ row\n```';
        expect(htmlConverter(data, 'html')).to.equal('<p><pre>This is **first** row\n\nThis is _second_ row\n</pre>\n</p>');
        expect(htmlConverter(data, 'bash')).to.equal('\x1b[7mThis is **first** row\n\nThis is _second_ row\n\x1b[0m\n');
    });

    it('should work with empty string', () => {
        expect(htmlConverter('', 'html')).to.equal('<p></p>');
        expect(htmlConverter('', 'bash')).to.equal('');
    });
})