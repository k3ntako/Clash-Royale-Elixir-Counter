require('dotenv').config();


import fetch from  'node-fetch';
import chalk from 'chalk';
import {assert} from 'chai';

import { allCards } from '../_test_utilities/_cards.utils';

const keys = ["key", "name", "elixir", "type", "rarity", "arena", "description", "id"];


export default async () => {
  // get cards from Royale API
  let json;
  try {
    const options = { headers: { auth: process.env.ROYALE_API_KEY } };
    const res = await fetch('https://api.royaleapi.com/constant/cards', options);
    json = await res.json();

    if(!json.length) throw new Error('no cards received from Royale API')
  } catch (error) {
    throw new Error("Unable to fetch cards: " + error.message)
  }

  // test if Royale APIs data matches our data
  let failedTests: string[] = [];
  try {
    const cards = json.sort((first, second) => {
      let firstParsed = first.name.toLowerCase();
      let secondParsed = second.name.toLowerCase();

      return firstParsed > secondParsed ? 1 : -1;
    });

    assert.lengthOf(allCards, cards.length);

    allCards.forEach((allCard, idx) => {
      try {
        assert.hasAllKeys(allCard, keys);
        assert.hasAllKeys(cards[idx], keys);

        keys.forEach(key => {
          assert.strictEqual(allCard[key], cards[idx][key], `"${key}" should be the same`);
        });
      } catch (error) {
        failedTests.push(error.message);
      }
    });
  } catch (error) {
    failedTests.push(error.message);
  }

  if(failedTests.length){
    console.error(chalk.bold('Failed tests:'))
    failedTests.forEach(failedTest => {
      console.error(chalk.red(failedTest));
    });
    console.log('\n')

    throw new Error('"preset_test_cards.json" is not up to date. Please see errors above and update before continuing.');
  }
};