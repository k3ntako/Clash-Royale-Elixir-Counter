const path = require('path');
const cardsFileName = 'cards.json';
const cardsFolderDir = path.join(__dirname, './server/utilities/data');
const cardsFileDir = path.join(cardsFolderDir, cardsFileName);

const testCardsFileName = 'test_cards.json';
const testCardsFolderDir = path.join(__dirname, './tests/server/data');
const testcardsFileDir = path.join(testCardsFolderDir, testCardsFileName);

const config = {
  development: {
    cardsFileName,
    cardsFolderDir,
    cardsFileDir,
  },
  test: {
    cardsFileName: testCardsFileName,
    cardsFolderDir: testCardsFolderDir,
    cardsFileDir: testcardsFileDir,
  },
  production: {
    cardsFileName,
    cardsFolderDir,
    cardsFileDir,
  }
}


module.exports = config[process.env.NODE_ENV || "production"];