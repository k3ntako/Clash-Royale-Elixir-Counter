import { ICardInfoResponse } from '../utilities/interfaces';
import { get } from '../utilities/fetchUtils';

export default class Cards {
  cards: ICardInfoResponse[];
  cardNames: string[];
  loaded: boolean;
  constructor() {
    this.loaded = false;
    this.cards = [];
    this.cardNames = [];
    this.all();
  }

  all = async (): Promise<void> => {
    try{
      if (!this.cards.length) {
        this.cards = await get('/api/cards');

        this.cardNames = this.cards.map(card => card.name);
        this.loaded = true;
      }
    } catch(err) {
      this.cards = [];
      this.cardNames = [];
      this.loaded = false;
      throw new Error(err);
    }
  }

  }
}