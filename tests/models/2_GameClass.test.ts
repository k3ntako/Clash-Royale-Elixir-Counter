import Game from "../../src/models/Game";
import { assert } from "chai";
import sinon from "sinon";
import { allCards } from "../_test_utilities/_cards.utils";
import Timer from "../../src/models/Timer";
import ElixirTracker from "../../src/models/ElixirTracker";

describe("Game class", (): void => {
  describe("#start", (): void => {
    it("should add one elixir every 2.8 seconds when start is called", (done: Mocha.Done) => {
      const elixirTracker = new ElixirTracker();

      Game.initialize(elixirTracker)
        .then((game) => {
          game.start();
          return game;
        })
        .then((game) => {
          setTimeout((): void => {
            assert.strictEqual(elixirTracker.get(), 6);

            setTimeout((): void => {
              assert.strictEqual(elixirTracker.get(), 7);
              game.stop();
              done();
            }, 4000);
          }, 3000);
        });
    }).timeout(9000);
  });

  describe("#registerOnElixirChange", () => {
    it("should take a callback that is called when elixir count changes", (done: Mocha.Done) => {
      const elixirTracker = new ElixirTracker();

      Game.initialize(elixirTracker)
        .then((game) => {
          game.start();
          return game;
        })
        .then((game) => {
          const onChangeSpy = sinon.spy();

          game.registerOnElixirChange(onChangeSpy);
          game.start();

          setTimeout((): void => {
            assert.strictEqual(onChangeSpy.getCall(0).args[0], 6);

            setTimeout((): void => {
              assert.isAtLeast(onChangeSpy.callCount, 2);
              assert.strictEqual(onChangeSpy.getCall(1).args[0], 7);
              game.stop();
              done();
            }, 3000);
          }, 3000);
        });
    }).timeout(9000); // extends timeout from 2000ms (default) to 6500 ms
  });

  describe("#stop", (): void => {
    it("should stop the timer and sets game.timer to a instance of Timer", async (): Promise<
      void
    > => {
      const elixirTracker = new ElixirTracker();

      const game = await Game.initialize(elixirTracker);
      game.start();
      game.stop();

      assert.instanceOf(game.timer, Timer);
    });

    it("should prevent #addElixir from being called", (done): void => {
      const elixirTracker = new ElixirTracker();

      Game.initialize(elixirTracker).then((game) => {
        game.start();
        game.stop();

        // spy after it has been stopped (spy won't count the calls prior to stop)
        // addElixir is called every 2.8 secs if the timer is going
        const addElixirSpy = sinon.spy(game, "addElixir");

        setTimeout((): void => {
          assert(addElixirSpy.notCalled);
          done();
        }, 2900);

        assert.strictEqual(game.timer, null);
      });
    }).timeout(6500); // extends timeout from 2000ms (default) to 6500 ms
  });

  describe("#registerOnPlayedCardsChanged and #onPlayedCardsChanged", () => {
    it("should call functions that were registered", async (): Promise<
      void
    > => {
      const elixirTracker = new ElixirTracker();

      const game = await Game.initialize(elixirTracker);
      const onPlayedCardsChangedSpy1 = sinon.spy();
      const onPlayedCardsChangedSpy2 = sinon.spy();
      game.registerOnPlayedCardsChanged(onPlayedCardsChangedSpy1);
      game.registerOnPlayedCardsChanged(onPlayedCardsChangedSpy2);

      assert.lengthOf(game.onPlayedCardsChangedCBs, 2);

      elixirTracker.set(10);

      let onErrCalled = false;
      game.playCard(allCards[3].key, () => {
        onErrCalled = true;
      });

      sinon.assert.calledOnce(onPlayedCardsChangedSpy1);
      sinon.assert.calledOnce(onPlayedCardsChangedSpy2);
      assert.isFalse(onErrCalled);
    });
  });

  describe("#doubleSpeed", (): void => {
    it("should add one elixir every 1.4 seconds when start is called", (done: Mocha.Done) => {
      const elixirTracker = new ElixirTracker();

      Game.initialize(elixirTracker)
        .then((game) => {
          game.start();
          game.doubleSpeed();
          return game;
        })
        .then((game) => {
          setTimeout((): void => {
            assert.strictEqual(elixirTracker.get(), 6);

            setTimeout((): void => {
              assert.strictEqual(elixirTracker.get(), 7);
              game.stop();
              done();
            }, 1500);
          }, 1500);
        });
    }).timeout(6500);
  });
});
