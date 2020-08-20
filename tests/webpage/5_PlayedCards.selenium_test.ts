const { By } = require("selenium-webdriver");
import { driver, findShadowRootElement } from "./0_Setup.selenium_test";
import { assert } from "chai";
import HomePage from "../../src";

let homepage: HomePage;
let playedCards, cardSearch, input, buttons, elixirCounter;

describe("Played cards", (): void => {
  beforeEach(
    async (): Promise<void> => {
      homepage = await driver.findElement(By.tagName("home-page"));

      playedCards = await findShadowRootElement(
        homepage,
        By.tagName("played-cards")
      );

      cardSearch = await findShadowRootElement(
        homepage,
        By.tagName("card-search")
      );
      input = await cardSearch.findElement(By.tagName("input"));
      input.clear();

      elixirCounter = await findShadowRootElement(
        homepage,
        By.tagName("elixir-counter")
      );
      const buttonsDiv = await elixirCounter.findElement(
        By.className("elixir-setter-buttons")
      );
      buttons = await buttonsDiv.findElements(By.tagName("button"));
    }
  );

  it("should display cards that have been played", async (): Promise<void> => {
    // set elixir to 10
    await buttons[10].click();

    await input.sendKeys("mini");
    // click on first suggestion
    const suggestions = await cardSearch.findElements(By.tagName("cr-card"));
    await suggestions[0].click();

    // find second card in played cards
    const cards = await playedCards.findElements(By.className("cr-card"));
    await cards[0].click();

    const cardName = await cards[1].getText(); // index 0 is Skeleton Army from a previous test
    assert.strictEqual(cardName, "Mini P.E.K.K.A");
  }).timeout(6500);

  it("should play a card if clicked on but should not add another copy to the playedCards list", async (): Promise<
    void
  > => {
    // set elixir to 10
    await buttons[10].click();

    // click on first played card
    const cards = await playedCards.findElements(By.tagName("cr-card"));
    const originalCount = cards.length;
    await cards[1].click(); // Mini P.E.K.K.A from previous test

    const elixirCounter = await findShadowRootElement(
      homepage,
      By.tagName("elixir-counter")
    );
    const opponentElixir = await elixirCounter.findElement(By.tagName("h3"));
    const opponentElixirText = await opponentElixir.getText();

    assert.strictEqual(opponentElixirText, "6"); // Mini P.E.K.K.A is 4, so 10 - 4 = 6

    // find playedCards after Mini P.E.K.K.A has been played for a second time
    const newCards = await playedCards.findElements(By.tagName("cr-card"));

    assert.lengthOf(newCards, originalCount);
    assert.lengthOf(newCards, 2); // Skeleton Army from a previous test, and the Mini P.E.K.K.A
  }).timeout(6500);

  it("should not add card to playedCards if there is not enough elixir", async (): Promise<
    void
  > => {
    // set elixir to 0
    await buttons[0].click();

    // search
    await input.sendKeys("x-bow");

    // play first suggestion
    const suggestions = await cardSearch.findElements(By.tagName("cr-card"));
    await suggestions[0].click();

    // get opponent elixir count
    const elixirCounter = await findShadowRootElement(
      homepage,
      By.tagName("elixir-counter")
    );
    const opponentElixir = await elixirCounter.findElement(By.tagName("h3"));
    const opponentElixirText = await opponentElixir.getText();

    assert.strictEqual(opponentElixirText, "0");

    const cards = await playedCards.findElements(By.tagName("cr-card"));

    assert.lengthOf(cards, 2); // Skeleton Army and Mini P.E.K.K.A from previous tests
  }).timeout(6500);

  it("should display error message if there is not enough elixir", async (): Promise<
    void
  > => {
    // set elixir to 0
    await buttons[0].click();

    // search
    await input.sendKeys("baby");

    // play first suggestion
    const suggestions = await cardSearch.findElements(By.tagName("cr-card"));
    await suggestions[0].click();

    const error = await findShadowRootElement(
      homepage,
      By.className("notification")
    );
    assert(error);
    const errorMessage = await error.getText();
    assert.strictEqual(errorMessage, "Not enough elixir");
  }).timeout(6500);

  it("should shake elixir text and turn it red if there is not enought elixir", async (): Promise<
    void
  > => {
    // set elixir to 0
    await buttons[0].click();

    // search
    await input.sendKeys("x-bow");

    // play first suggestion
    const suggestions = await cardSearch.findElements(By.tagName("cr-card"));
    await suggestions[0].click();

    // get opponent elixir count
    const elixirCounter = await findShadowRootElement(
      homepage,
      By.tagName("elixir-counter")
    );
    const opponentElixir = await elixirCounter.findElement(By.tagName("h3"));

    const color = await opponentElixir.getCssValue("color");
    assert.strictEqual(color, "rgba(255, 17, 17, 1)");

    const animation = await opponentElixir.getCssValue("animation");
    assert.strictEqual(animation, "0.15s ease 0s 3 normal none running shake");
  }).timeout(6500);
});
