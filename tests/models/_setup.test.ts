import fetchMock from 'fetch-mock';
import { knightCard, babyDragaonCard } from '../_test_utilities/_cards.utils';

before(() => {
  fetchMock.mock('/api/cards', {
    status: 200,
    body: [knightCard, babyDragaonCard]
  });
});

after(() => {
  fetchMock.restore();
})