import { ICardInfoResponse } from "../utilities/interfaces";
import { get } from "../utilities/fetchUtils";

export default class Cards {
  cards: ICardInfoResponse[];
  cardNames: string[];
  constructor(cards: ICardInfoResponse[], cardNames: string[]) {
    this.cards = cards;
    this.cardNames = cardNames;
  }

  static async initialize() {
    try {
      const [cards, cardNames] = await Cards.all();

      return new Cards(cards, cardNames);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async all(): Promise<[ICardInfoResponse[], string[]]> {
    try {
      const cards = await get("/api/cards");

      if (!cards || !cards.length) {
        throw new Error("No cards received!");
      }

      const cardNames = cards.map((card) => card.name).sort();

      return [cards, cardNames];
    } catch (err) {
      throw err;
    }
  }

  static keyFromName = (name): string => {
    const spaceRegex = /\s/gi;
    const outputName = name.replace(spaceRegex, "-");

    const periodRegex = /\./gi;
    return outputName.replace(periodRegex, "").toLowerCase();
  };

  static nameFromKey = (key): string => {
    if (key === "x-bow") return "X-Bow"; // X-Bow is the only name with hyphen

    const nameArr = key.split("-").map((word) => {
      let name = word.charAt(0).toUpperCase() + word.slice(1);
      name = name.replace("Pekka", "P.E.K.K.A"); // the PEKKA and Mini PEKKA are the only ones with periods
      return name;
    });

    return nameArr.join(" ");
  };

  getCardByKey = (key) => {
    if (!this.cards.length) {
      throw new Error("Cards not loaded");
    }

    if (!key) {
      throw new Error("No ID provided");
    }

    return this.cards.find((card) => card.key === key);
  };
}
