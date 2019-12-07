import { ICardInfoResponse } from '../utilities/interfaces';
import Cards from './Cards';
export default class Game {
  elixir: number;
  timer: NodeJS.Timeout | null;
  onElixirChange: Function;
  cards: Cards;
  constructor(cards){
    this.elixir = 0;
    this.timer = null;
    this.onElixirChange = () => {};
    this.cards = cards;
  }

  getElixir(): number{
    return this.elixir;
  }

  setElixir = (elixir: number): void => {
    this.elixir = elixir;
    this.onElixirChange(this.elixir);
  }

  addElixir(elixir: number): void{
    const newElixir: number = this.elixir + elixir;
    if (newElixir > 10) {
      this.setElixir(10);
    } else if (newElixir >= 0) {
      this.setElixir(newElixir);
    }

    // if less than 0, don't do anything
  }

  subtractElixir(elixir: number): void {
    this.addElixir(-1 * elixir);
  }

  playCard(key: string): void {
    const card = this.cards.getCardByKey(key);

    const newElixir: number = this.elixir - card.elixir;
    if (newElixir >= 0) {
      this.setElixir(newElixir);
    }
  }

  static async initialize(): Promise<Game>{
    const cards = await Cards.initialize();
    return new Game(cards);
  }

  async start(onElixirChange: Function = () => {}): Promise<void>{
    this.onElixirChange = onElixirChange;
    this.timer = setInterval(this.addElixir.bind(this, 1), 2800);
  }

  stop(): void {
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }
}