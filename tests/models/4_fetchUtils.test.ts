import {get} from '../../src/utilities/fetchUtils';
import { assert } from 'chai';
import { knightCard, babyDragaonCard } from '../_test_utilities/_cards.utils';


describe('fetchUtils', (): void => {
  describe('get', (): void => {
    it('should fetch', async (): Promise<void> => {
      const res = await get('/api/cards');

      assert.sameDeepMembers(res, [knightCard, babyDragaonCard]);
    });
  });
});