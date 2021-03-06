
Feature('Inline editing');


Scenario('should be able to type into a nodeType in the guest frame.', (I) => {
    I.login();

    I.amOnPage('/neos!/');

    I.waitForElement({css: '#neos__contentCanvas iframe'}, 30);
    I.focusAndEditInGuestFrame('Hello Worlds');
});

Scenario('should be able to display the publish dropdown contents after the publish dropdown chevron was clicked.', (I) => {
    I.login();

    I.dontSeeElementInViewport('#neos__primaryToolbar__publishDropDown__contents');
    I.click('#neos__primaryToolbar__publishDropDown__btn');
    I.seeElementInViewport('#neos__primaryToolbar__publishDropDown__contents');

});
