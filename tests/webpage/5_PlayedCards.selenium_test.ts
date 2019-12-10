const { By } = require('selenium-webdriver');
import { assert } from 'chai';
import HomePage from '../../src';
import { Driver } from 'selenium-webdriver/chrome';

let homepage: HomePage;
let playedCards, cardSearch, input, buttons, elixirCounter;


describe('Played cards', (): void => {
  beforeEach(async (): Promise<void> => {
    homepage = await driver.findElement(By.tagName('home-page'));

    playedCards = await findShadowRootElement(homepage, By.tagName('played-cards'));

    cardSearch = await findShadowRootElement(homepage, By.tagName('card-search'));
    input = await cardSearch.findElement(By.tagName('input'));
    input.clear();

    elixirCounter = await findShadowRootElement(homepage, By.tagName('elixir-counter'));
    buttons = await elixirCounter.findElements(By.tagName('elixir-setter-button'));
  });

  it('should display cards that have been played', async (): Promise<void> => {
    // set elixir to 10
    await buttons[10].click();

    await input.sendKeys('mini');
    // click on first suggestion
    const suggestions = await cardSearch.findElements(By.tagName('cr-card'));
    await suggestions[0].click();

    // find second card in played cards
    const cards = await playedCards.findElements(By.className('cr-card'));
    await cards[0].click();

    const cardName = await cards[1].getText(); // index 0 is Skeleton Army from a previous test
    assert.strictEqual(cardName, 'Mini P.E.K.K.A');
  }).timeout(6500);
});
