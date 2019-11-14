const {Builder, By} = require('selenium-webdriver');
import { assert } from 'chai';

describe('Game class', (): void => {
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
});
