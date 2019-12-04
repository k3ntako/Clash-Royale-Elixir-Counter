const {By} = require('selenium-webdriver');
import { assert } from 'chai';

describe('Opponent elixir counter', (): void => {
  describe('Timer', (): void => {
    it('should have elixir count that increases every 2.8 secs', async (): Promise<void> => {
      const elixirCounter = await driver.findElement(By.tagName('elixir-counter'));
      const opponentElixir = await findShadowRootElement(elixirCounter, By.tagName('h3'));
      const opponentElixirText = await opponentElixir.getText();

      assert.strictEqual(opponentElixirText, '0');

      await driver.sleep(3000);

      const opponentElixirTextAfter3Secs = await opponentElixir.getText();
      assert.strictEqual(opponentElixirTextAfter3Secs, '1');
    }).timeout(6500);
  });

  describe('Elixir setter buttons', (): void => {
    it('should have button from 0 to 10 to set elixir count', async (): Promise<void> => {
      const elixirCounter = await driver.findElement(By.tagName('elixir-counter'));
      const buttons = await findShadowRootElements(elixirCounter, By.tagName('elixir-setter-button'));

      for(let [idx, elixirSetterButton] of buttons.entries()){
        const button = await elixirSetterButton.findElement(By.tagName('button'))
        const buttonText = await button.getText();

        assert.strictEqual(buttonText, String(idx));
      }
    }).timeout(6500);

    it('should set elixir opponent elixir count to the value displayed on the button', async (): Promise<void> => {
      const elixirCounter = await driver.findElement(By.tagName('elixir-counter'));
      const opponentElixir = await findShadowRootElement(elixirCounter, By.tagName('h3'));
      const buttons = await findShadowRootElements(elixirCounter, By.tagName('elixir-setter-button'));

      // The elixir count goes up by 1 every 2.8 secs.
      // The order of buttons were reversed 10 to 0,
      // so that change of elixir count is coming from the buttons, not the timer.
      for (let [idx, elixirSetterButton] of buttons.reverse().entries()) {
        const num = 10 - idx;
        const button = await elixirSetterButton.findElement(By.tagName('button'));
        await button.click();

       const opponentElixirText = await opponentElixir.getText();

        assert.strictEqual(opponentElixirText, String(num));
      }
    }).timeout(6500);
  });
});
