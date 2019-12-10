import { ICardInfoResponse } from '../utilities/interfaces';
import Cards from './Cards';
export default class Game {
  elixir: number;
  timer: NodeJS.Timeout | null;
  cards: Cards;
  playedCards: string[];
  onElixirChangedCBs: Function[];
  onPlayedCardsChangedCBs: Function[];
  constructor(cards){
    this.elixir = 0;
    this.timer = null;
    this.cards = cards;
    this.playedCards = [];
    this.onPlayedCardsChangedCBs = [];
    this.onElixirChangedCBs = [];
  }

  static async initialize(): Promise<Game>{
    const cards = await Cards.initialize();
    return new Game(cards);
  }

  // Timers
  start(): void{
    this.timer = setTimeout(this.addElixir.bind(this, 1), 2800);
  }

  stop(): void {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }

  // Elixir
  private setElixir = (elixir: number): void => { // Only place where this.elixir should be changed
    this.elixir = elixir;
    this.onElixirChangedCBs.forEach(cb => cb(elixir));
  }

  manualSetElixir = (elixir: number) => { // elixir being set outside timer
    this.stop(); // stop exisiting timer
    this.start(); // restart timer
    this.setElixir(elixir);
  }

  private addElixir(elixir: number): void{
    const newElixir: number = this.elixir + elixir;
    if (newElixir > 10) {
      this.setElixir(10);
    } else if (newElixir >= 0) {
      this.start();
      this.setElixir(newElixir);
    }

    // if less than 0, don't do anything
  }

  private subtractElixir(elixir: number): void {
    this.addElixir(-1 * elixir);
  }

  registerOnElixirChange(onElixirChange?: Function): void{
    this.onElixirChangedCBs.push(onElixirChange)
  }

  private onElixirChanged(elixir: number){
    this.onElixirChangedCBs.forEach(cb => cb(elixir));
  }

  // Cards
  registerOnPlayedCardsChanged(cb){
    this.onPlayedCardsChangedCBs.push(cb);
  }

  private onPlayedCardsChanged(){
    this.onPlayedCardsChangedCBs.forEach(cb => cb());
  }

  playCard(key: string): void {
    const card = this.cards.getCardByKey(key);

    const newElixir: number = this.elixir - card.elixir;
    if (newElixir >= 0) {
      this.setElixir(newElixir);
      if(!this.playedCards.includes(key)){
        this.playedCards.push(key);
        this.onPlayedCardsChanged();
      }
    }
  }
}