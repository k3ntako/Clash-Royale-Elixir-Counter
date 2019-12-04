const { Builder, By } = require('selenium-webdriver');
const driver = new Builder()
  .forBrowser('chrome')
  .build();

const getShadowRoot = async (elem) => {
  return await driver.executeScript("return arguments[0].shadowRoot", elem);
}
const findShadowRootElements = async (elem, locator): Promise<Array<any>> => {
  const shadowRoot = await getShadowRoot(elem);
  return await shadowRoot.findElements(locator);
}
const findShadowRootElement = async (elem, locator): Promise<any> => {
  return (await findShadowRootElements(elem, locator))[0];
}

before(async function (): Promise<void> {
  // Sets timeout to get webpage to 5 secs
  // don't use arrow functions for "before()" callback,
  // because they bind "this" and makes "this.timeout" inaccessible
  this.timeout(5000);

  // Makes following variables available globally during webpage testing
  Object.assign(global, {
    driver,
    getShadowRoot,
    findShadowRootElements,
    findShadowRootElement,
  });

  // Get the webpage
  await driver.get('http://localhost:3000');
});

after(async (): Promise<void> => {
  await driver.quit();
});

