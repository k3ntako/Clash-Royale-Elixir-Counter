const fs = require('fs');
const config = require('../../config');
const cardsFolderDir = config.cardsFolderDir;
const cardsFileDir = config.cardsFileDir;
const fetch = require('node-fetch');

// interface ICardInfoResponse {
//   key: string,
//   name: string,
//   elixir: number,
//   type: string,
//   rarity: string,
//   arena: number,
//   description: string,
//   id: number,
// }

const writeCardsFile = async (outputStr) => {// : string, : Promise<void>
  if (!fs.existsSync(cardsFolderDir)) {
    fs.mkdirSync(cardsFolderDir);
  }

  fs.writeFileSync(cardsFileDir, outputStr);
};

const readCardsFile = () => {//: ICardInfoResponse[] | null
  try {
    const data = fs.readFileSync(cardsFileDir, "utf8");

    return JSON.parse(data);
  } catch (err) {
    console.error("cardUtils.readCardsFile", err.message);
    return null;
  }
};

const get = async (url, options = {}) => { //: Promise<ICardInfoResponse[]>
  try {
    // Options
    const defaultOptions = { method: 'GET' };
    options = Object.assign(defaultOptions, options);

    const response = await fetch(url, options);
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }

};

module.exports = {
  writeCardsFile,
  readCardsFile,
  get,
}