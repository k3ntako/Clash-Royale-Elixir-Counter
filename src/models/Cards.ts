import { ICardInfoResponse } from '../utilities/interfaces';


export default class Cards {
  cards: ICardInfoResponse[];
  constructor() {
    this.cards = [];
  }
}