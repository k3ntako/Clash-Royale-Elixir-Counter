import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import { allCards } from '../_test_utilities/_cards.utils';

beforeEach(() => {
  fetchMock.mock('/api/cards', {
    status: 200,
    body: allCards,
  });
});

afterEach(() => {
  fetchMock.restore();
  sinon.restore();
});