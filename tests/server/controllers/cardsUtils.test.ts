import cardsUtils from '../../../server/utilities/cardsUtils';
import chai, { assert, expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);
import fs from 'fs';
import { ICardInfoResponse } from '../../../server/types/interfaces';


const knightCard: ICardInfoResponse = {
  key: "knight",
  name: "Knight",
  elixir: 3,
  type: "Troop",
  rarity: "Common",
  arena: 0,
  description: "A tough melee fighter. The Barbarian's handsome, cultured cousin. Rumor has it that he was knighted based on the sheer awesomeness of his mustache alone.",
  id: 26000000
};

const babyDragaonCard: ICardInfoResponse = {
  key: "baby-dragon",
  name: "Baby Dragon",
  elixir: 4,
  type: "Troop",
  rarity: "Epic",
  arena: 0,
  description: "Burps fireballs from the sky that deal area damage. Baby dragons hatch cute, hungry and ready for a barbeque.",
  id: 26000015
};

const json = [ knightCard, babyDragaonCard ];
const jsonStr = JSON.stringify(json);


const testOutputDir = './tests/cards.json';

describe('cardsUtils', (): void => {
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

  describe('.readFile', (): void => {
    it('should return null', async (): Promise<void> => {
      const data = cardsUtils.readFile();
      assert.strictEqual(data, null);
    });

    it('should read card info from file', async (): Promise<void> => {
      cardsUtils.writeFile(jsonStr);

      const cardsJSON: ICardInfoResponse[] | null = cardsUtils.readFile();
      expect(cardsJSON).to.be.an('array');
      expect(cardsJSON).to.have.lengthOf(json.length);
    });
  });

  describe('.writeFile', (): void => {
    it('should writes string to a file', async (): Promise<void> => {
      cardsUtils.writeFile(jsonStr);

      const data: string = await fs.readFileSync(testOutputDir, "utf8");
      const cardInfo: {}[] = JSON.parse(data);
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf(json.length);
    });
  });

  describe('.fetch', (): void => {
    it('should make requests to the specified url', async (): Promise<void> => {
      const response = await cardsUtils.fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2");
    });
  });
});