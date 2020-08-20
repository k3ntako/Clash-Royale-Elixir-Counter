import fs from "fs";
import path from "path";
import { ICardInfoResponse } from "../../server/types/interfaces";

const cardsFileDir = path.join(__dirname, "preset_test_cards.json");
const cardsStr: string = fs.readFileSync(cardsFileDir, "utf8");

export const allCards: ICardInfoResponse[] = JSON.parse(cardsStr);

export const cardNames: string[] = allCards.map((card) => card.name);

export const getCardByKey = (key: string): ICardInfoResponse => {
  const parsedKey = key.trim().toLowerCase();
  return allCards.find((card) => card.key.toLowerCase() === parsedKey);
};

export const firstFifteenCards = allCards.slice(0, 15);
export const firstFifteenCardNames = firstFifteenCards.map((card) => card.name);

// Card totals by alphabet (updated 12/7/2019)
// {
//   a: 2,
//   b: 12,
//   c: 3,
//   d: 2,
//   e: 7,
//   f: 6,
//   g: 12,
//   h: 3,
//   i: 5,
//   k: 1,
//   l: 3,
//   m: 10,
//   n: 1,
//   p: 4,
//   r: 8,
//   s: 5,
//   t: 5,
//   v: 1,
//   w: 3,
//   x: 1,
//   z: 2
// }
