const { By } = require('selenium-webdriver');
import { assert } from 'chai';
import HomePage from '../../src';

let homepage: HomePage;

describe('Webpage title', () => {
  beforeEach(async (): Promise<void> => {
    homepage = await driver.findElement(By.tagName('home-page'));
  });

  it('should have website title', async (): Promise<void> => {
    const websiteTitle = await findShadowRootElement(homepage, By.tagName('h1'));

    const websiteTitleText = await websiteTitle.getText();

    assert.strictEqual(websiteTitleText, 'Clash Royale Elixir Counter');
  }).timeout(6500);
});
