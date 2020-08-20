const { By } = require("selenium-webdriver");
import { driver, findShadowRootElement } from "./0_Setup.selenium_test";
import { assert } from "chai";
import HomePage from "../../src";

let homepage: HomePage;

describe("Opponent elixir counter", (): void => {
  describe("Timer", (): void => {
    beforeEach(
      async (): Promise<void> => {
        homepage = await driver.findElement(By.tagName("home-page"));
      }
    );

    it("should have elixir count that increases every 2.8 secs", async (): Promise<
      void
    > => {
      const elixirCounter = await findShadowRootElement(
        homepage,
        By.tagName("elixir-counter")
      );

      const opponentElixir = await elixirCounter.findElement(By.tagName("h3"));
      const opponentElixirText = await opponentElixir.getText();

      assert.strictEqual(opponentElixirText, "5");

      await driver.sleep(3000);

      const opponentElixirTextAfter3Secs = await opponentElixir.getText();
      assert.strictEqual(opponentElixirTextAfter3Secs, "6");
    }).timeout(6500);
  });

  describe("Elixir setter buttons", (): void => {
    it("should have button from 0 to 10 to set elixir count", async (): Promise<
      void
    > => {
      const elixirCounter = await findShadowRootElement(
        homepage,
        By.tagName("elixir-counter")
      );
      const buttonsDiv = await elixirCounter.findElement(
        By.className("elixir-setter-buttons")
      );
      const buttons = await buttonsDiv.findElements(By.className("button"));

      for (let [idx, elixirSetterButton] of buttons.entries()) {
        const button = await elixirSetterButton.findElement(
          By.tagName("button")
        );
        const buttonText = await button.getText();

        assert.strictEqual(buttonText, String(idx));
      }
    }).timeout(6500);

    it("should set elixir opponent elixir count to the value displayed on the button", async (): Promise<
      void
    > => {
      const elixirCounter = await findShadowRootElement(
        homepage,
        By.tagName("elixir-counter")
      );
      const opponentElixir = await elixirCounter.findElement(By.tagName("h3"));
      const buttonsDiv = await elixirCounter.findElement(
        By.className("elixir-setter-buttons")
      );
      const buttons = await buttonsDiv.findElements(By.className("button"));

      // The elixir count goes up by 1 every 2.8 secs.
      // The order of buttons were reversed 10 to 0,
      // so that change of elixir count is coming from the buttons, not the timer.
      for (let [idx, elixirSetterButton] of buttons.reverse().entries()) {
        const num = 10 - idx;
        const button = await elixirSetterButton.findElement(
          By.tagName("button")
        );
        await button.click();

        const opponentElixirText = await opponentElixir.getText();

        assert.strictEqual(opponentElixirText, String(num));
      }
    }).timeout(6500);
  });
});
