import { ICardInfoResponse } from '../utilities/interfaces';
import Cards from './Cards';
export default class Game {
  elixir: number;
  timer: NodeJS.Timeout | null;
  onElixirChange: Function;
  cards: Cards;
  constructor(){
    this.elixir = 0;
    this.timer = null;
    this.onElixirChange = () => {};
    this.cards = new Cards();
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
    } else if (newElixir < 0) {
      this.setElixir(0);
    } else {
      this.setElixir(newElixir);
    }
  }

  subtractElixir(elixir: number): void {
    this.addElixir(-1 * elixir);
  }

  playCard(card: ICardInfoResponse): void {
    const newElixir: number = this.elixir - card.elixir;
    if (newElixir >= 0) {
      this.setElixir(newElixir);
    }
  }

  start(onElixirChange: Function = () => {}): void{
    this.onElixirChange = onElixirChange;
    this.timer = setInterval(this.addElixir.bind(this, 1), 2800);
  }

  stop(): void {
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }
}