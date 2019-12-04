import { assert } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import {knightCard, babyDragaonCard} from '../../_test_utilities/_cards.utils';

import CardsController from '../../../server/controllers/CardsController';
import cardsUtils from '../../../server/utilities/cardsUtils';

import config from '../../../config';
const testOutputDir = config.cardsFileDir;

const mockCards = [knightCard, babyDragaonCard];
const mockCardsStr = JSON.stringify(mockCards);

let getFake;

describe('CardsController', (): void => {
  beforeEach((): void => {
    // deletes test output file before running the tests in this describe block
    // This is just in case. The after() should have deleted it after the previous run.
    if (fs.existsSync(testOutputDir)) {
      fs.unlinkSync(testOutputDir);
    }

    getFake = sinon.fake.returns(mockCards); // mockCards are the cards from Royale API
    sinon.replace(cardsUtils, 'get', getFake);
  });

  afterEach((): void => {
    sinon.restore();
  })

  after((): void => {
    if (fs.existsSync(testOutputDir)) {
      fs.unlinkSync(testOutputDir); // deletes test output file after running the tests in this describe block
    }
  });

  describe('.all', (): void => {
    it('should get card info from the Royale API, if file does not exist', (done): void => {
      const readCardsFileFake = sinon.fake.returns(null); // returns null because file does not exist
      sinon.replace(cardsUtils, 'readCardsFile', readCardsFileFake);

      const req = {};
      const res = {
        json: (response) => {
          sinon.assert.calledOnce(readCardsFileFake);
          sinon.assert.calledOnce(getFake);

          assert(Array.isArray(response), "should return an array");
          assert.lengthOf(response, mockCards.length);
          assert.sameDeepMembers(response, mockCards);
        }
      }

      CardsController.all(req, res, done);
    });

    it('should save cards to file after fetch (when file does not exist)', (done): void => {
      const readCardsFileFake = sinon.fake.returns(null);  // returns null because file does not exit
      sinon.replace(cardsUtils, 'readCardsFile', readCardsFileFake);

      const req = {};
      const res = {
        json: (response) => {
          sinon.assert.calledOnce(readCardsFileFake);
          sinon.assert.calledOnce(getFake);


          const fileData: string = fs.readFileSync(testOutputDir, "utf8");
          const cardsFromFile: {}[] = JSON.parse(fileData);
          assert(Array.isArray(response), "should return an array");

          assert.lengthOf(cardsFromFile, response.length);
          assert.lengthOf(cardsFromFile, mockCards.length);

          assert.sameDeepMembers(cardsFromFile, response);
          assert.sameDeepMembers(cardsFromFile, mockCards);
        }
      }

      CardsController.all(req, res, done);
    });

    it('getCards() should not fetch if file already exists', (done): void => {
      fs.writeFileSync(testOutputDir, mockCardsStr);

      const readCardsFileFake = sinon.fake.returns(mockCards); // returns mockCards because file exists
      sinon.replace(cardsUtils, 'readCardsFile', readCardsFileFake);

      const writeCardsFileFake = sinon.fake();
      sinon.replace(cardsUtils, 'writeCardsFile', writeCardsFileFake);

      const req = {};
      const res = {
        json: (response) => {
          sinon.assert.calledOnce(readCardsFileFake);
          sinon.assert.notCalled(writeCardsFileFake);
          sinon.assert.notCalled(getFake);

          // manually read file created by CardsController.all()
          const fileData: string = fs.readFileSync(testOutputDir, "utf8");
          const cardsFromFile: {}[] = JSON.parse(fileData);

          assert(Array.isArray(cardsFromFile));
          assert.lengthOf(cardsFromFile, mockCards.length);
          assert.lengthOf(cardsFromFile, response.length);
          assert.sameDeepMembers(cardsFromFile, mockCards);
          assert.sameDeepMembers(cardsFromFile, response);
        }
      }

      CardsController.all(req, res, done);
    });
  });
});