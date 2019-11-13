import { ICardInfoResponse } from '../utilities/interfaces';

export default class Game {
  elixir: number;
  timer: NodeJS.Timeout | null;
  constructor(){
    this.elixir = 0;
    this.timer = null;
  }

  getElixir(): number{
    return this.elixir;
  }

  setElixir(elixir: number): void {
    this.elixir = elixir;
  }

  addElixir(elixir: number): void{
    const newElixir: number = this.elixir + elixir;
    if (newElixir > 10) {
      this.elixir = 10;
    } else if (newElixir < 0) {
      this.elixir = 0;
    } else {
      this.elixir = newElixir;
    }
  }

  subtractElixir(elixir: number): void {
    this.addElixir(-1 * elixir);
  }

  playCard(card: ICardInfoResponse): void {
    if( this.elixir >= card.elixir) {
      this.elixir -= card.elixir;
    }
  }

  start(): void{
    this.timer = setInterval(this.addElixir.bind(this, 1), 2800);
  }

  stop(): void {
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }
}