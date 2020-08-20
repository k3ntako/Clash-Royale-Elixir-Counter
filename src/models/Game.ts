import Cards from "./Cards";
import Timer from "./Timer";
export default class Game {
  elixir: number;
  timer: Timer;
  cards: Cards;
  playedCards: string[];
  onElixirChangedCBs: Function[];
  onPlayedCardsChangedCBs: Function[];
  onIntervalChangedCBs: Function[];
  intervalLength: number;
  singleSpeed: Function;
  doubleSpeed: Function;
  tripleSpeed: Function;
  constructor(cards) {
    const timer = new Timer();
    timer.registerOnElixir(this.onElixir);
    timer.registerOnInterval(this.onInterval);

    this.timer = timer;
    this.elixir = 5; // opponent's elixir count
    this.cards = cards; // Cards class
    this.playedCards = [];
    this.onPlayedCardsChangedCBs = [];
    this.onElixirChangedCBs = [];
    this.onIntervalChangedCBs = [];

    this.singleSpeed = this.timer.singleSpeed;
    this.doubleSpeed = this.timer.doubleSpeed;
    this.tripleSpeed = this.timer.tripleSpeed;
  }

  static async initialize(): Promise<Game> {
    const cards = await Cards.initialize();
    return new Game(cards);
  }

  // Timers
  onElixir = () => {
    this.addElixir(1);
  };

  onInterval = (timePassed: number, oneElixirTime: number) => {
    this.onIntervalChanged(this.elixir, timePassed, oneElixirTime);
  };

  start(): void {
    this.timer.start();
  }

  stop(): void {
    this.timer.stop();
  }

  // Elixir
  private setElixir = (elixir: number): void => {
    // Only place where this.elixir should be changed
    if (this.timer.running && elixir >= 10) {
      this.stop();
    } else if (!this.timer.running && elixir < 10) {
      this.start();
    }

    this.elixir = elixir;
    this.onElixirChanged(elixir);
  };

  manualSetElixir = (elixir: number) => {
    // elixir being set outside timer
    this.stop();
    this.setElixir(elixir);

    if (elixir < 10) {
      this.start(); // restart timer if less than 10
    } else if (elixir === 10) {
      // if user selects 10, the onChange functions are not called because they are triggered by the timer.
      // this manually triggers the onChange function once
      this.onElixirChanged(this.elixir);
      this.onIntervalChanged(this.elixir, 0, this.timer.oneElixirTime);
    }
  };

  private addElixir = (elixir: number): void => {
    if (typeof elixir !== "number")
      throw new Error("Elixir has to be a number");

    const newElixir: number = this.elixir + elixir;

    if (newElixir > 10) {
      // 10+
      this.setElixir(10);
      throw new Error("Elixir cannot be set to greater than 10");
    } else if (newElixir >= 0) {
      // 0 to 10
      this.setElixir(newElixir);
    } else {
      // less than 0
      // if less than 0, don't do anything
      throw new Error("Not enough elixir");
    }
  };

  private subtractElixir(elixir: number): void {
    this.addElixir(-1 * elixir);
  }

  registerOnElixirChange(onElixirChange: Function): void {
    this.onElixirChangedCBs.push(onElixirChange);
  }

  private onElixirChanged(elixir: number) {
    this.onElixirChangedCBs.forEach((cb) => cb(elixir));
  }

  registerOnIntervalChange(onIntervalChange: Function): void {
    this.onIntervalChangedCBs.push(onIntervalChange);
  }

  private onIntervalChanged(
    elixir: number,
    timePassed: number,
    oneElixirTime: number
  ) {
    this.onIntervalChangedCBs.forEach((cb) =>
      cb(elixir, timePassed, oneElixirTime)
    );
  }

  // Cards
  registerOnPlayedCardsChanged(cb) {
    this.onPlayedCardsChangedCBs.push(cb);
  }

  private onPlayedCardsChanged() {
    this.onPlayedCardsChangedCBs.forEach((cb) => cb());
  }

  playCard(key: string, onErr: Function): void {
    try {
      const card = this.cards.getCardByKey(key);
      this.subtractElixir(card.elixir);

      // this.subtractElixir() throws error if card was not played
      // so following won't execute if card was not played
      if (!this.playedCards.includes(key)) {
        this.playedCards.push(key);
        this.onPlayedCardsChanged();
      }
    } catch (err) {
      onErr(err);
    }
  }
}
