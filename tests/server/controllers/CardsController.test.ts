import chai, { assert, expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);
import fs from 'fs';
import { ICardInfoResponse } from '../../../server/types/interfaces';

import CardsController from '../../../server/controllers/CardsController';
import cardsUtils from '../../../server/utilities/cardsUtils';

const testOutputDir = './tests/cards.json';

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

const mockCards = [knightCard, babyDragaonCard];
const mockCardsStr = JSON.stringify(mockCards);

describe('CardsController', (): void => {
  beforeEach(async (): Promise<void> => {
    // deletes test output file before running the tests in this describe block
    // This is just in case. The after() should have deleted it after the previous run.
    if (fs.existsSync(testOutputDir)) {
      await fs.unlinkSync(testOutputDir);
    }
  });

  after(async (): Promise<void> => {
    await fs.unlinkSync(testOutputDir); // deletes test output file after running the tests in this describe block
  });

  describe('.all', (): void => {
    it('getCards() should get Clash Royale card info from RoyaleAPI.com and assign it to cards.cards', (done): void => {
      const req = {};
      const res = {
        json: (response) => {
          const responseJSON = JSON.parse(response);
          const cardInfo = responseJSON.cards;
          expect(cardInfo).to.be.an('array');
          expect(cardInfo).to.have.lengthOf.above(1);

          const firstCard = cardInfo[0];
          expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
        }
      }

      CardsController.all(req, res, done);
    });

    it('getCards() should get card info from the Royale API if file fails', (done): void => {
      chai.spy.on(cardsUtils, 'readFile');
      chai.spy.on(cardsUtils, 'fetch');

      expect(cardsUtils.readFile).to.be.spy;
      expect(cardsUtils.fetch).to.be.spy;

      const req = {};
      const res = {
        json: (response) => {
          expect(cardsUtils.readFile).to.have.been.called();
          expect(cardsUtils.fetch).to.have.been.called();

          const responseJSON = JSON.parse(response);
          expect(responseJSON).to.be.an('array');
          expect(responseJSON).to.have.lengthOf.above(1);

          const firstCard = responseJSON[0];
          expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
        }
      }

      CardsController.all(req, res, done);
    });

    it('getCards() should fetch cards from Royale API, if file does not exist', (done): void => {
      chai.spy.on(cardsUtils, 'readFile');
      chai.spy.on(cardsUtils, 'writeFile');
      chai.spy.on(cardsUtils, 'fetch');

      expect(cardsUtils.readFile).to.be.spy;
      expect(cardsUtils.writeFile).to.be.spy;
      expect(cardsUtils.fetch).to.be.spy;

      const req = {};
      const res = {
        json: (response) => {
          // TODO: mock fetch with sinon or something else
          expect(cardsUtils.readFile).to.have.been.called();
          expect(cardsUtils.fetch).to.have.been.called();
          expect(cardsUtils.writeFile).to.have.been.called();

          const responseJSON = JSON.parse(response);
          const data: string = fs.readFileSync(testOutputDir, "utf8");
          const cardInfo: {}[] = JSON.parse(data);
          expect(cardInfo).to.be.an('array');
          expect(cardInfo).to.have.lengthOf(responseJSON.length); // TODO: this length should be compared with mock response
          const firstCard = cardInfo[0];
          expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
        }
      }

      CardsController.all(req, res, done);
    });

    it('getCards() should not fetch if file already exists', (done): void => {
      fs.writeFileSync(testOutputDir, mockCardsStr);

      chai.spy.on(cardsUtils, 'readFile');
      chai.spy.on(cardsUtils, 'writeFile');
      chai.spy.on(cardsUtils, 'fetch');

      expect(cardsUtils.readFile).to.be.spy;
      expect(cardsUtils.writeFile).to.be.spy;
      expect(cardsUtils.fetch).to.be.spy;

      const req = {};
      const res = {
        json: (response) => {
          const responseJSON = JSON.parse(response);

          expect(cardsUtils.readFile).to.have.been.called();
          expect(cardsUtils.fetch).to.not.have.been.called();
          expect(cardsUtils.writeFile).not.to.have.been.called();

          const data: string = fs.readFileSync(testOutputDir, "utf8");
          const cardInfo: {}[] = JSON.parse(data);
          expect(cardInfo).to.be.an('array');
          expect(cardInfo).to.have.lengthOf(mockCards.length);
          const firstCard = cardInfo[0];
          expect(firstCard).to.have.all.keys("key", "name", "elixir", "type", "rarity", "arena", "description", "id");
          // controller response
          expect(responseJSON).to.have.deep.members(mockCards);
          // file
          expect(cardInfo).to.have.deep.members(mockCards);
        }
      }

      CardsController.all(req, res, done);
    });
  });
});