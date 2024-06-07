import { expect } from 'chai';
import markdownProcessor from '../markdownProcessor.js';

describe('markdownProcessor', () => {
    it('should not throw on empty string', () => {
        expect(() => markdownProcessor('')).to.not.throw();
    });

    it('should not throw on simple string', () => {
        expect(() => markdownProcessor('This is **simple** string')).to.not.throw();
    });

    it('should throw on unmatched tags', () => {
        expect(() => markdownProcessor('This is **bold**unmatched text')).to.throw();
    });

    it('should throw on nested tags', () => {
        expect(() => markdownProcessor('This is **bold _nested_ text**')).to.throw();
    });

    it('should throw on unmatched preformatted code block', () => {
        expect(() => markdownProcessor('This is **bold** text\n```\nThis is **first** row\n\nThis is _second_ row\n')).to.throw();
    });
})