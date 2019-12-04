import Cards from '../../src/models/Cards';
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
});