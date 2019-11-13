require('dotenv').config()

module.exports = {
  'should display title': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.containsText('h1', 'Clash Royale Elixir Counter');
  },

  'should have input with class name, .searchInput': (browser) => {
    browser
      .waitForElementVisible('search-input');

    const elem = browser.element('search-input', 'shadowRoot',(e) => {
      console.log('---');
      console.log("element", e);
      console.log('---');
      return e;
    });

    // const elem = browser.element('css selector','search-input', (e) => {
    //   console.log('---');
    //   console.log("element", e);
    //   console.log('---');
    //   return e;
    // });
    // console.log(elem);

    // browser.assert.visible('.searchInput');
    // console.log(browser.element('#searchInput'))

    browser.end();
  }
};
