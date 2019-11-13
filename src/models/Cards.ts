require('dotenv').config()
const fs = require('fs');
const https = require('https');
import { ICardInfoResponse } from '../utilities/interfaces';


export default class Cards {
  static outputDir: string = './cards.json';
  cards: ICardInfoResponse[];

  constructor() {
    this.cards = [];
  }

  async getCards(): Promise<void> {
    let cards: ICardInfoResponse[] | null  = await this.readFile();
    if(cards && cards.length){
      this.cards = cards;
    }else{
      const options = { headers: { auth: process.env.ROYALE_API_KEY } };
      this.cards = await this.fetch('https://api.royaleapi.com/constant/cards', options);
      this.writeFile();
    }
  }

  async readFile(): Promise<ICardInfoResponse[] | null>{
    try{
      const data = await fs.readFileSync(Cards.outputDir, "utf8");
      return JSON.parse(data);
    }catch(err){
      return null;
    }
  }

  async writeFile(): Promise<void>{
    fs.writeFileSync(Cards.outputDir, JSON.stringify(this.cards));
  }

  fetch(url: string, options: {} = {}): Promise<ICardInfoResponse[]>{
    return new Promise((resolve, reject) => {
      // Options
      const defaultOptions = { method: 'GET' };
      options = Object.assign(defaultOptions, options);

      // Callback
      const callback = (response: http.IncomingMessage) => {
        response.setEncoding('utf8');
        let responseJSONStr: string = '';
        response.on('data', (chunk: string): void => { responseJSONStr += chunk });
        response.on('end', (): void => { resolve(JSON.parse(responseJSONStr)) });
      }

      // Request
      const req = https.request(url, options, callback).on('error', (e: Error) => console.error(e));

      // Reject error
      req.on('error', (err: Error) => reject(err));

      req.end();
    });
  }
}