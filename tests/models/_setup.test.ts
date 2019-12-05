import fetchMock from 'fetch-mock';
import { knightCard, babyDragaonCard } from '../_test_utilities/_cards.utils';

beforeEach(() => {
  fetchMock.mock('/api/cards', {
    status: 200,
    body: [knightCard, babyDragaonCard]
  });
});

afterEach(() => {
  fetchMock.restore();
});