import cardsUtils from '../../../server/utilities/cardsUtils';
import { assert, expect } from 'chai';
import fs from 'fs';
import {ICardInfoResponse} from '../../../server/types/interfaces';
import { knightCard, babyDragaonCard } from '../../_test_utilities/_cards.utils';


const json = [ knightCard, babyDragaonCard ];
const jsonStr = JSON.stringify(json);


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
      cardsUtils.writeCardsFile(jsonStr);

      const cardsJSON: ICardInfoResponse[] | null = cardsUtils.readCardsFile();
      expect(cardsJSON).to.be.an('array');
      expect(cardsJSON).to.have.lengthOf(json.length);
    });
  });

  describe('.writeCardsFile', (): void => {
    it('should writes string to a file', (): void => {
      cardsUtils.writeCardsFile(jsonStr);

      const data: string = fs.readFileSync(testOutputDir, "utf8");
      const cardInfo: {}[] = JSON.parse(data);
      expect(cardInfo).to.be.an('array');
      expect(cardInfo).to.have.lengthOf(json.length);
    });
  });
});