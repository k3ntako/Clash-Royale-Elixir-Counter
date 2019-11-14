import Cards from '../../src/models/Cards';
import chai, { assert, expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);
import fs from 'fs';
import { ICardInfoResponse } from '../../src/utilities/interfaces';

const testOutputDir = './tests/cards.json';

describe('Cards', (): void => {
  describe('Fundamentals', (): void => {
    before(async (): Promise<void> => {
      // deletes test output file before running the tests in this describe block
      // This is just in case. The after() should have deleted it after the previous run.
      if (fs.existsSync(testOutputDir)) {
        await fs.unlinkSync(testOutputDir);
      }

    });

    after(async (): Promise<void> => {
      await fs.unlinkSync(testOutputDir); // deletes test output file after running the tests in this describe block
    });

    it('should be a function (JS classes are special functions)', (): void => {
      assert.strictEqual(typeof Cards, 'function');
    });

    it('should have outputDir field initiated as "./cards.json"', (): void => {
      assert.strictEqual(Cards.outputDir, './cards.json');

      // From here, the output directory will be inside the test folder so dev/production files are not altered
      Cards.outputDir = testOutputDir;

      assert.strictEqual(Cards.outputDir, testOutputDir);
    });

    it('should have cards field initiated as an empty array', (): void => {
      assert.strictEqual(typeof Cards, 'function');
    });

    it('should have a method called readFile', (): void => {
      const cards = new Cards();
      assert.strictEqual(typeof cards.readFile, 'function');
    });

    // No need for done, because  this is an async test that returns a Promise<void>.
    // Only use done OR return a promise
    it('readFile should be an async function that returns null', async (): Promise<void> => {
      const cards = new Cards();
      const data = await cards.readFile();
      assert.strictEqual(data, null);
    });

    it('should have a method called writeFile', (): void => {
      const cards = new Cards();
      assert.strictEqual(typeof cards.writeFile, 'function');
    });

    it('writeFile should be an async function writes cards.cards to the a file', async (): Promise<void> => {
      const cards = new Cards();
      await cards.writeFile();

      const data: string = await fs.readFileSync(Cards.outputDir, "utf8");
      const cardInfo: {}[] = JSON.parse(data);
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf(cards.cards.length);
    });

    it('readFile should be an async function reads card info from file', async (): Promise<void> => {
      const cards = new Cards();
      await cards.writeFile();

      const cardsJSON: ICardInfoResponse[] |  null = await cards.readFile();
      expect(cardsJSON).to.be.an('array');
      expect(cardsJSON).to.have.lengthOf(cards.cards.length);
    });

    it('should have a method called getCards', (): void => {
      const cards = new Cards();
      assert.strictEqual(typeof cards.getCards, 'function');
    });

    it('getCards() should get Clash Royale card info from RoyaleAPI.com and assign it to cards.cards', async (): void => {
      await fs.unlinkSync(testOutputDir); // deletes test output file before running the tests in this it block

      const cards = new Cards();
      await cards.getCards();

      const cardInfo = cards.cards;
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf.above(1);

      const firstCard = cardInfo[0];
      expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
    });

    it('getCards() should get card info from the Royale API if file fails', async (): void => {
      await fs.unlinkSync(testOutputDir); // deletes test output file before running the tests in this it block

      const cards = new Cards();
      chai.spy.on(cards, 'readFile');
      chai.spy.on(cards, 'fetch');

      expect(cards.readFile).to.be.spy;
      expect(cards.fetch).to.be.spy;

      await cards.getCards();
      expect(cards.readFile).to.have.been.called();
      expect(cards.fetch).to.have.been.called();

      const cardInfo = cards.cards;
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf.above(1);

      const firstCard = cardInfo[0];
      expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
    });

    it('getCards() should fetch cards from Royale API, if file does not exist', async (): void => {
      await fs.unlinkSync(testOutputDir); // deletes test output file before running the tests in this it block

      const cards = new Cards();
      chai.spy.on(cards, 'readFile');
      chai.spy.on(cards, 'writeFile');
      chai.spy.on(cards, 'fetch');

      expect(cards.readFile).to.be.spy;
      expect(cards.writeFile).to.be.spy;
      expect(cards.fetch).to.be.spy;

      await cards.getCards();
      expect(cards.readFile).to.have.been.called();
      expect(cards.fetch).to.have.been.called();
      expect(cards.writeFile).to.have.been.called();

      const data: string = await fs.readFileSync(Cards.outputDir, "utf8");
      const cardInfo: {}[] = JSON.parse(data);
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf(cards.cards.length);
      const firstCard = cardInfo[0];
      expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
    });

    it('getCards() should not fetch if file already exists', async (): void => {
      // file exists from previous it block
      const cards = new Cards();
      chai.spy.on(cards, 'readFile');
      chai.spy.on(cards, 'writeFile');
      chai.spy.on(cards, 'fetch');

      expect(cards.readFile).to.be.spy;
      expect(cards.writeFile).to.be.spy;
      expect(cards.fetch).to.be.spy;

      await cards.getCards();
      expect(cards.readFile).to.have.been.called();
      expect(cards.fetch).to.not.have.been.called();
      expect(cards.writeFile).not.to.have.been.called();

      const data: string = await fs.readFileSync(Cards.outputDir, "utf8");
      const cardInfo: {}[] = JSON.parse(data);
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf(cards.cards.length);
      const firstCard = cardInfo[0];
      expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
    });
  });
});