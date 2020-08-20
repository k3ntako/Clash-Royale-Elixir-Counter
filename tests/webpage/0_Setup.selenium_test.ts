const { Builder, By } = require("selenium-webdriver");
export const driver = new Builder().forBrowser("chrome").build();

export const getShadowRoot = async (elem) => {
  return await driver.executeScript("return arguments[0].shadowRoot", elem);
};
export const findShadowRootElements = async (
  elem,
  locator
): Promise<Array<any>> => {
  const shadowRoot = await getShadowRoot(elem);
  return await shadowRoot.findElements(locator);
};
export const findShadowRootElement = async (elem, locator): Promise<any> => {
  return (await findShadowRootElements(elem, locator))[0];
};

before(async function (): Promise<void> {
  // Sets timeout to get webpage to 5 secs
  // don't use arrow functions for "before()" callback,
  // because they bind "this" and makes "this.timeout" inaccessible
  this.timeout(5000);

  // Get the webpage
  await driver.get("http://localhost:3000");
});

after(
  async (): Promise<void> => {
    await driver.quit();
  }
);

import fetchMock from "fetch-mock";
import { allCards } from "../_test_utilities/_cards.utils";

beforeEach(() => {
  fetchMock.mock("/api/cards", {
    status: 200,
    body: allCards,
  });
});

afterEach(() => {
  fetchMock.restore();
});
