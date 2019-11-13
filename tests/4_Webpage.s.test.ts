const {Builder, By} = require('selenium-webdriver');
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
const findShadowRootElement = async (elem, locator) => {
  return (await findShadowRootElements(elem, locator))[0];
}

import { assert } from 'chai';

describe('Game class', (): void => {
  describe('Timer', (): void => {
    before(async (): Promise<void> => {
      await driver.get('http://localhost:3000');
    });

    after(async (): Promise<void> => {
      await driver.quit();
    });

    it('should have website title', async (): Promise<void> => {
      const websiteTitle = await driver.findElement(By.tagName('h1'));
      const websiteTitleText = await websiteTitle.getText();

      assert.strictEqual(websiteTitleText, 'Clash Royale Elixir Counter');
    }).timeout(6500);

    it('should have input where the "value" is updated with the user typing', async (): Promise<void> => {
      const searchInput = await driver.findElement(By.tagName('search-input'));
      const input = await findShadowRootElement(searchInput, By.tagName('input'));
      const placeholder = await input.getAttribute('placeholder');

      assert.strictEqual(placeholder, 'Search Cards');

      await input.sendKeys('knight');
      assert.strictEqual(await input.getAttribute('value'), 'knight');

      input.clear();
    }).timeout(6500);

    it('should suggests cards based on search term (case insensitive)', async (): Promise<void> => {
      const searchInput = await driver.findElement(By.tagName('search-input'));
      const input = await findShadowRootElement(searchInput, By.tagName('input'));
      await input.sendKeys('skeleton');

      const suggestions = await findShadowRootElements(searchInput, By.css('li'));
      assert.lengthOf(suggestions, 4, 'should have 4 suggestions');

      const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
      const cardNames = await Promise.all(cardNamePromises);

      assert.include(cardNames, 'Skeletons');
      assert.include(cardNames, 'Skeleton Army');
      assert.include(cardNames, 'Giant Skeleton');
      assert.include(cardNames, 'Skeleton Barrel');

      input.clear();
    }).timeout(6500);

    it('should only suggest first 10 suggestions in alphabetical order', async (): Promise<void> => {
      const searchInput = await driver.findElement(By.tagName('search-input'));
      const input = await findShadowRootElement(searchInput, By.tagName('input'));
      await input.sendKeys('a');

      const suggestions = await findShadowRootElements(searchInput, By.css('li'));
      assert.lengthOf(suggestions, 10, 'should have 10 suggestions');

      const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
      const cardNames = await Promise.all(cardNamePromises);

      assert.strictEqual(cardNames[0], 'Archers');
      assert.strictEqual(cardNames[1], 'Arrows');
      assert.strictEqual(cardNames[2], 'Baby Dragon');
      assert.strictEqual(cardNames[3], 'Balloon');
      assert.strictEqual(cardNames[4], 'Bandit');
      assert.strictEqual(cardNames[5], 'Barbarian Barrel');
      assert.strictEqual(cardNames[6], 'Barbarian Hut');
      assert.strictEqual(cardNames[7], 'Barbarians');
      assert.strictEqual(cardNames[8], 'Bats');
      assert.strictEqual(cardNames[9], 'Battle Ram');

      input.clear();
    }).timeout(6500);

    it('should should push a result to top if result starts with the query', async (): Promise<void> => {
      const searchInput = await driver.findElement(By.tagName('search-input'));
      const input = await findShadowRootElement(searchInput, By.tagName('input'));
      await input.sendKeys('g');

      const suggestions = await findShadowRootElements(searchInput, By.css('li'));

      const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
      const cardNames = await Promise.all(cardNamePromises);

      assert.strictEqual(cardNames[0], 'Giant');
      assert.strictEqual(cardNames[1], 'Giant Skeleton');
      assert.strictEqual(cardNames[2], 'Giant Snowball');
      assert.strictEqual(cardNames[3], 'Goblin Barrel');
      assert.strictEqual(cardNames[4], 'Goblin Cage');
      assert.strictEqual(cardNames[5], 'Baby Dragon');
      assert.strictEqual(cardNames[6], 'Dart Goblin');
      assert.strictEqual(cardNames[7], 'Electro Dragon');
      assert.strictEqual(cardNames[8], 'Elixir Golem');
      assert.strictEqual(cardNames[9], 'Flying Machine');
    }).timeout(6500);
  });
});