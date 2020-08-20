require("dotenv").config();
const cardUtils = require("../utilities/cardsUtils");

module.exports = {
  all: async function (req, res, next) {
    try {
      let cards = cardUtils.readCardsFile(); //: ICardInfoResponse[] | null

      if (!cards || !cards.length) {
        const options = { headers: { auth: process.env.ROYALE_API_KEY } };
        cards = await cardUtils.get(
          "https://api.royaleapi.com/constant/cards",
          options
        );

        cardUtils.writeCardsFile(JSON.stringify(cards));
      }

      res.json(cards);
      next();
    } catch (err) {
      next(err);
    }
  },
};
