const { By } = require('selenium-webdriver');
import { assert } from 'chai';
import HomePage from '../../src';

let homepage: HomePage;

describe('CardSearch', (): void => {
  beforeEach(async (): Promise<void> => {
    homepage = await driver.findElement(By.tagName('home-page'));
  });

  it('should have input where the "value" is updated with the user typing', async (): Promise<void> => {
    const cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    const input = await cardSearch.findElement(By.tagName('input'));

    const placeholder = await input.getAttribute('placeholder');

    assert.strictEqual(placeholder, 'Search Cards');

    await input.sendKeys('knight');
    assert.strictEqual(await input.getAttribute('value'), 'knight');

    input.clear();
  }).timeout(6500);

  it('should suggests cards based on search term (case insensitive)', async (): Promise<void> => {
    const cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    const input = await cardSearch.findElement(By.tagName('input'));
    await input.sendKeys('SKeleton');

    const suggestions = await cardSearch.findElements(By.className('suggestion'));
    assert.lengthOf(suggestions, 4, 'should have 4 suggestions');

    const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
    const cardNames = await Promise.all(cardNamePromises);

    assert.include(cardNames, 'Skeletons');
    assert.include(cardNames, 'Skeleton Army');
    assert.include(cardNames, 'Giant Skeleton');
    assert.include(cardNames, 'Skeleton Barrel');

    input.clear();
  }).timeout(6500);

  it('should only suggest first 20 suggestions in alphabetical order', async (): Promise<void> => {
    const cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    const input = await cardSearch.findElement(By.tagName('input'));
    await input.sendKeys('a');

    const suggestions = await cardSearch.findElements(By.className('suggestion'));
    assert.lengthOf(suggestions, 20, 'should have 20 suggestions');

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
    assert.strictEqual(cardNames[9], 'Battle Healer');

    input.clear();
  }).timeout(6500);

  it('should should push a result to top if result starts with the query (test with "z")', async (): Promise<void> => {
    const cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    const input = await cardSearch.findElement(By.tagName('input'));
    await input.clear();
    await input.sendKeys('z');

    const suggestions = await cardSearch.findElements(By.className('suggestion'));

    const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
    const cardNames = await Promise.all(cardNamePromises);

    assert.lengthOf(cardNames, 6);

    assert.strictEqual(cardNames[0], 'Zap');
    assert.strictEqual(cardNames[1], 'Zappies');
    assert.strictEqual(cardNames[2], 'Electro Wizard');
    assert.strictEqual(cardNames[3], 'Freeze');
    assert.strictEqual(cardNames[4], 'Ice Wizard');
    assert.strictEqual(cardNames[5], 'Wizard');
  }).timeout(6500);

  it('should should push a result to top if result starts with the query (test with "g")', async (): Promise<void> => {
    const cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    const input = await cardSearch.findElement(By.tagName('input'));
    await input.clear();
    await input.sendKeys('g');

    const suggestions = await cardSearch.findElements(By.className('suggestion'));

    const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
    const cardNames = await Promise.all(cardNamePromises);

    assert.strictEqual(cardNames[0], 'Giant');
    assert.strictEqual(cardNames[1], 'Giant Skeleton');
    assert.strictEqual(cardNames[2], 'Giant Snowball');
    assert.strictEqual(cardNames[3], 'Goblin Barrel');
    assert.strictEqual(cardNames[4], 'Goblin Cage');
    assert.strictEqual(cardNames[5], 'Goblin Gang');
    assert.strictEqual(cardNames[6], 'Goblin Giant');
    assert.strictEqual(cardNames[7], 'Goblin Hut');
    assert.strictEqual(cardNames[8], 'Goblins');
    assert.strictEqual(cardNames[9], 'Golem');
  }).timeout(6500);

  it('should should push a result to top if result starts with the query (test with "S")', async (): Promise<void> => {
    const cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    const input = await cardSearch.findElement(By.tagName('input'));
    await input.clear();
    await input.sendKeys('S');

    const suggestions = await cardSearch.findElements(By.className('suggestion'));

    const cardNamePromises = suggestions.map(async suggestion => await suggestion.getText());
    const cardNames = await Promise.all(cardNamePromises);

    assert.strictEqual(cardNames[0], 'Skeleton Army');
    assert.strictEqual(cardNames[1], 'Skeleton Barrel');
    assert.strictEqual(cardNames[2], 'Skeletons');
    assert.strictEqual(cardNames[3], 'Sparky');
    assert.strictEqual(cardNames[4], 'Spear Goblins');
    assert.strictEqual(cardNames[5], 'Archers');
    assert.strictEqual(cardNames[6], 'Arrows');
    assert.strictEqual(cardNames[7], 'Barbarians');
    assert.strictEqual(cardNames[8], 'Bats');
    assert.strictEqual(cardNames[9], 'Elite Barbarians');
  }).timeout(6500);
});
