const expect = require('unexpected');

expect.use(require('unexpected-webdriver')());

console.log('yeah');

describe('Navigate Button', () => {
    it('should have "Navigate" as a label.', () => {
        const el = se.find('#neos__primaryToolbar__leftSideBarToggler');

        return expect(el, 'to contain text', 'Navigate');
    });
});
