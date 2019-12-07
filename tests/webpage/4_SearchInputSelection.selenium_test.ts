const { By } = require('selenium-webdriver');
import { assert } from 'chai';
import HomePage from '../../src';

let homepage: HomePage;
let searchInput, input, buttons, elixirCounter;


describe('Search input', (): void => {
  beforeEach(async (): Promise<void> => {
    homepage = await driver.findElement(By.tagName('home-page'));

    searchInput = await findShadowRootElement(homepage, By.tagName('search-input'));
    input = await searchInput.findElement(By.tagName('input'));
    input.clear();

    elixirCounter = await findShadowRootElement(homepage, By.tagName('elixir-counter'));
    buttons = await elixirCounter.findElements(By.tagName('elixir-setter-button'));
  });

  it('should subtract the cost of the card selected from opponent elixir', async (): Promise<void> => {
    // set elixir to 10
    await buttons[10].click();

    await input.sendKeys('skEl');

    // click on first suggestion
    const suggestions = await searchInput.findElements(By.className('suggestion'));
    await suggestions[0].click();

    const opponentElixir = await elixirCounter.findElement(By.tagName('h3'));
    const opponentElixirText = await opponentElixir.getText();

    assert.strictEqual(opponentElixirText, String(7)); // Card should be Skeleton Army (cost: 3 elixir)

    const cardName = await suggestions[0].getText();
    assert.strictEqual(cardName, 'Skeleton Army');
  }).timeout(6500);
});
