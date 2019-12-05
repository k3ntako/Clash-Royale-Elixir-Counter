import Cards from '../../src/models/Cards';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import { assert } from 'chai';
import { knightCard, babyDragaonCard } from '../_test_utilities/_cards.utils';


describe('Cards', (): void => {
  describe('constructor', (): void => {
    it('should have cards and cardNames fields initiated as empty arrays', (): void => {
      const cards = new Cards();
      assert(Array.isArray(cards.cards));
      assert(Array.isArray(cards.cardNames));

      assert.lengthOf(cards.cards, 0);
      assert.lengthOf(cards.cardNames, 0);
    });
  });

  describe('all', (): void => {
    it('should get cards from server and set it to cards array', async (): Promise<void> => {
      const cards = new Cards();

      await cards.all();

      assert.lengthOf(cards.cards, 2);
      assert.sameDeepMembers(cards.cards, [knightCard, babyDragaonCard]);
    });

    it('should add the names to cardNames', async (): Promise<void> => {
      const cardNames = [knightCard, babyDragaonCard].map(card => card.name);
      const cards = new Cards();

      await cards.all();

      assert.sameMembers(cards.cardNames, cardNames);
    });
  });

  describe('getCardByKey', (): void => {
    it('should throw an error if cards have not loaded', (): void => {
      fetchMock.restore(); // removes fetchMoch in setup

      // API call returns empty array
      fetchMock.mock('/api/cards', {
        status: 200,
        body: []
      });



      const cards = new Cards();
      const spy = sinon.spy(cards, "getCardByKey");

      try {
        cards.getCardByKey(babyDragaonCard.key);
      } catch (error) {
      }

      assert(spy.threw());

      sinon.restore();
    });

    it('should get card info given a key', (done): void => {
      const cards = new Cards();

      setTimeout(() => { // waits for cards to be loaded
        const card = cards.getCardByKey(babyDragaonCard.key);
        assert.deepEqual(card, babyDragaonCard);
        done();
      }, 1000);
    });
  });
});