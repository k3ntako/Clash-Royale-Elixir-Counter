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


before(async (): Promise<void> => {
  // Makes following variables available globally during webpage testing
  Object.assign(global, {
    driver,
    getShadowRoot,
    findShadowRootElements,
    findShadowRootElement,
  });

  await driver.get('http://localhost:3000');
});

after(async (): Promise<void> => {
  await driver.quit();
});

