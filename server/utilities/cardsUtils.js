const fs = require('fs');
const config = require('../../config');
const cardsFolderDir = config.cardsFolderDir;
const cardsFileDir = config.cardsFileDir;
const https = require('https');

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
    console.error("cardUtils.readFile", err.message);
    return null;
  }
};

const fetch = async (url, options = {}) => { //: Promise<ICardInfoResponse[]>
  return new Promise((resolve, reject) => {
    // Options
    const defaultOptions = { method: 'GET' };
    options = Object.assign(defaultOptions, options);

    // Callback
    const callback = (response) => {
      response.setEncoding('utf8');
      let responseJSONStr = '';
      response.on('data', (chunk) => { responseJSONStr += chunk }); //:string :void
      response.on('end', () => { resolve(JSON.parse(responseJSONStr)) }); //:void
    }

    // Request
    const req = https.request(url, options, callback);

    // Reject error
    req.on('error', (err) => reject(err));//: Error

    req.end();
  });
};

module.exports = {
  writeCardsFile,
  readCardsFile,
  fetch,
}