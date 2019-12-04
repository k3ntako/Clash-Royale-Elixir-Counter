import cardsUtils from '../../../server/utilities/cardsUtils';
import { assert, expect } from 'chai';
import fs from 'fs';
import {ICardInfoResponse} from '../../../server/types/interfaces';
import { knightCard, babyDragaonCard } from '../../_test_utilities/_cards.utils';


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
});