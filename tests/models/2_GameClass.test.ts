import Game from '../../src/models/Game';
import { assert } from 'chai';
import sinon from 'sinon';
import { allCards } from '../_test_utilities/_cards.utils';

describe('Game class', (): void => {
  describe('constructor', (): void => {
    it('should have a field called timer that is initiated as null', async (): Promise<void> => {
      const game = await Game.initialize();
      assert.strictEqual(game.timer, null);
    });
  });

  describe('#start', (): void => {
    it('should set game.timer to an interval', async (): Promise<void> => {
      const game = await Game.initialize();
      game.start();
      assert.strictEqual(game.timer && game.timer.constructor.name, 'Timeout');
      game.timer && clearInterval(game.timer);
    });

    it('should add one elixir every 2.8 seconds when start is called', (done: Mocha.Done) => {
      Game.initialize().then(game => {
        game.start();
        return game;
      }).then(game =>  {
        setTimeout((): void => {
          assert.strictEqual(game.elixir, 1);

          setTimeout((): void => {
            assert.strictEqual(game.elixir, 2);
            game.stop();
            done();
          }, 2900);

        }, 2900);
      });
    }).timeout(6500);
  });
  describe('#registerOnElixirChange', () => {
    it('should take a callback that is called when elixir count changes', (done: Mocha.Done) => {
      Game.initialize().then(game => {
        game.start();
        return game;
      }).then(game => {
        const onChangeSpy = sinon.spy();

        game.registerOnElixirChange(onChangeSpy)
        game.start();

        setTimeout((): void => {
          assert.strictEqual(onChangeSpy.getCall(0).args[0], 1);

          setTimeout((): void => {
            assert.isAtLeast(onChangeSpy.callCount, 2);
            assert.strictEqual(onChangeSpy.getCall(1).args[0], 2);
            game.stop();
            done();
          }, 2900);

        }, 2900);
      })
    }).timeout(6500); // extends timeout from 2000ms (default) to 6500 ms
  });

  describe('#stop', (): void => {
    it('should stop the timer and sets game.timer to null', async (): Promise<void> => {
      const game = await Game.initialize();
      game.start();
      game.stop();

      assert.strictEqual(game.timer, null);
    });

    it('should prevent #addElixir from being called', (done): void => {
      Game.initialize().then(game => {
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

  describe('#registerOnPlayedCardsChanged and #onPlayedCardsChanged', () => {
    it('should call functions that were registered', async (): Promise<void> => {
      const game = await Game.initialize();
      const onPlayedCardsChangedSpy1 = sinon.spy();
      const onPlayedCardsChangedSpy2 = sinon.spy();
      game.registerOnPlayedCardsChanged(onPlayedCardsChangedSpy1);
      game.registerOnPlayedCardsChanged(onPlayedCardsChangedSpy2);

      assert.lengthOf(game.onPlayedCardsChangedCBs, 2);

      game.setElixir(10);
      game.playCard(allCards[3].key);

      sinon.assert.calledOnce(onPlayedCardsChangedSpy1);
      sinon.assert.calledOnce(onPlayedCardsChangedSpy2);
    });
  })
});