import Cards from '../../src/models/Cards';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import { assert } from 'chai';
import { firstFifteenCards, firstFifteenCardNames } from '../_test_utilities/_cards.utils';


describe('Cards', (): void => {
  // Executes after the beforeEach in setup to overwrite the fetchMock
  // for all the "it" blocks in this "describe"
  beforeEach(() => {
    fetchMock.restore();

    fetchMock.mock('/api/cards', {
      status: 200,
      body: firstFifteenCards,
    });
  });

  describe('.all', (): void => {
    it('should get cards from server and set it to cards array', async (): Promise<void> => {
      const [cards] = await Cards.all();

      assert.lengthOf(cards, firstFifteenCards.length);
      assert.sameDeepMembers(cards, firstFifteenCards);
    });

    it('should add the names to cardNames', async (): Promise<void> => {
      const [cards, cardNames] = await Cards.all();

      assert.sameMembers(cardNames, firstFifteenCardNames);
    });
  });

  describe('.initialize', (): void => {
    it('should return a Cards instance', async (): Promise<void> => {
      const cards = await Cards.initialize();

      assert.instanceOf(cards, Cards);
    });

    it('should return Cards instance with .cards and .cardNames', async (): Promise<void> => {
      const cards = await Cards.initialize();

      assert.exists(cards.cards);
      assert.exists(cards.cardNames);
      assert(Array.isArray(cards.cards));
      assert(Array.isArray(cards.cardNames));
      assert.lengthOf(cards.cards,firstFifteenCards.length);
      assert.lengthOf(cards.cardNames, firstFifteenCards.length);
    });
  });

  describe('#getCardByKey', (): void => {
    it('should throw an error if cards have not loaded', async (): Promise<void> => {
      const firstCard = firstFifteenCards[0];
      let getCardByKeySpy;
      try{
        const cards = await Cards.initialize();
        cards.cards = [];
        getCardByKeySpy = sinon.spy(cards, "getCardByKey");

        cards.getCardByKey(firstCard.key);

      } catch (err) {
        assert(getCardByKeySpy.threw());
      }
    });

    it('should get card info given a key', async (): Promise<void> => {
      const secondCard = firstFifteenCards[1];
      const cards = await Cards.initialize();
      const card = cards.getCardByKey(secondCard.key);
      assert.deepEqual(card, secondCard);
    });
  });
});