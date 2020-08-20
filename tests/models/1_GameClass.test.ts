import sinon from "sinon";
import { assert } from "chai";
import Game from "../../src/models/Game";
import Cards from "../../src/models/Cards";
import { allCards, getCardByKey } from "../_test_utilities/_cards.utils";
import ElixirTracker from "../../src/models/ElixirTracker";

const knightCard = getCardByKey("knight");

describe("Game class", (): void => {
  describe(".initialize", (): void => {
    it("should return a Game instance", async (): Promise<void> => {
      const game = await Game.initialize(new ElixirTracker());

      assert.instanceOf(game, Game);
    });

    it("should initialize cards and set it to .cards", async (): Promise<
      void
    > => {
      const initializeCardsSpy = sinon.spy(Cards, "initialize");

      const game = await Game.initialize(new ElixirTracker());

      sinon.assert.calledOnce(initializeCardsSpy);
      assert.instanceOf(game.cards, Cards);
      assert.lengthOf(game.cards.cards, allCards.length);
    });
  });

  describe("#playCard", (): void => {
    it("should take an object with an elixir field, and subtract that value from game.elixir", async (): Promise<
      void
    > => {
      const elixirTracker = new ElixirTracker();
      const game = await Game.initialize(elixirTracker);
      elixirTracker.set(4);

      let isCalled = false;
      game.playCard(knightCard.key, () => {
        isCalled = true;
      });
      assert.strictEqual(elixirTracker.get(), 1);
      assert.isFalse(isCalled);
      game.stop();
    });

    it("should not subtract any elixir if game.elixir is less than the elixir count provided", async (): Promise<
      void
    > => {
      const elixirTracker = new ElixirTracker();
      const game = await Game.initialize(elixirTracker);
      elixirTracker.set(2);
      game.playCard(knightCard.key, (err) => {
        assert.instanceOf(err, Error);
        assert.strictEqual(err.message, "Not enough elixir");
      });
      assert.strictEqual(elixirTracker.get(), 2);
      game.stop();
    });

    it("should add card to playedCards", async (): Promise<void> => {
      const elixirTracker = new ElixirTracker();
      const game = await Game.initialize(elixirTracker);
      elixirTracker.set(10);

      let isCalled = false;
      game.playCard(knightCard.key, () => {
        isCalled = true;
      });

      assert.isFalse(isCalled);

      assert.include(game.playedCards, knightCard.key);
      game.stop();
    });
  });
});
