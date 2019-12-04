import Cards from '../../src/models/Cards';
import chai, { assert, expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);
import fs from 'fs';
import { ICardInfoResponse } from '../../src/utilities/interfaces';

const testOutputDir = './tests/cards.json';

describe('Cards', (): void => {
  before(async (): Promise<void> => {
    // deletes test output file before running the tests in this describe block
    // This is just in case. The after() should have deleted it after the previous run.
    if (fs.existsSync(testOutputDir)) {
      await fs.unlinkSync(testOutputDir);
    }

  });

  after(async (): Promise<void> => {
    await fs.unlinkSync(testOutputDir); // deletes test output file after running the tests in this describe block
  });

  describe('constructor', (): void => {
    it('should have cards field initiated as an empty array', (): void => {
      const cards = new Cards();
      assert(Array.isArray(cards.cards));
    });
  });
});