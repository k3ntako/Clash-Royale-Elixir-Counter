import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import { allCards } from '../_test_utilities/_cards.utils';
import apiTest from './_api_test';

if(process.env.WITH_API_CHECK && process.env.WITH_API_CHECK === "true"){
  // runs before all the tests
  before(apiTest);
}

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
