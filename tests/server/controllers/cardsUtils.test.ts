import cardsUtils from '../../../server/utilities/cardsUtils';
import { assert } from 'chai';
import fs from 'fs';
import {ICardInfoResponse} from '../../../server/types/interfaces';
import { firstFifteenCards } from '../../_test_utilities/_cards.utils';



const firstFifteenCardsStr = JSON.stringify(firstFifteenCards);

import config from '../../../config';
const testOutputDir = config.cardsFileDir;


describe('cardsUtils', (): void => {
  before((): void => {
    // deletes test output file before running the tests in this describe block
    // This is just in case. The after() should have deleted it after the previous run.
    if (fs.existsSync(testOutputDir)) {
      fs.unlinkSync(testOutputDir);
    }
  });

  after((): void => {
    if (fs.existsSync(testOutputDir)) {
      fs.unlinkSync(testOutputDir);
    }
  });

  describe('.readCardsFile', (): void => {
    it('should return null', (): void => {
      const data = cardsUtils.readCardsFile();
      assert.strictEqual(data, null);
    });

    it('should read card info from file', (): void => {
      cardsUtils.writeCardsFile(firstFifteenCardsStr);

      const cardsJSON: ICardInfoResponse[] | null = cardsUtils.readCardsFile();
      assert(Array.isArray(cardsJSON));
      assert.sameDeepMembers(cardsJSON, firstFifteenCards);
      assert.lengthOf(cardsJSON, firstFifteenCards.length);
    });
  });

  describe('.writeCardsFile', (): void => {
    it('should writes string to a file', (): void => {
      cardsUtils.writeCardsFile(firstFifteenCardsStr);

      const data: string = fs.readFileSync(testOutputDir, "utf8");
      const cardInfo: {}[] = JSON.parse(data);

      assert(Array.isArray(cardInfo));
      assert.sameDeepMembers(cardInfo, firstFifteenCards);
      assert.lengthOf(cardInfo, firstFifteenCards.length);
    });
  });
});