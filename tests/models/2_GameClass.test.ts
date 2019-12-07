import Game from '../../src/models/Game';
import { assert } from 'chai';
import sinon from 'sinon';

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

    it('should have a method called start that sets game.timer to an interval of 1000 ms', async (): Promise<void> => {
      const game = await Game.initialize();
      game.start();
      assert.strictEqual(game.timer && game.timer._repeat, 2800);
      game.stop();
    });

    it('should add one elixir every 2.8 seconds when start is called', (done: Mocha.Done) => {
      Game.initialize().then(game => {
        game.start();
        return game;
      }).then(game =>  {
        setTimeout((): void => {
          assert.strictEqual(game.getElixir(), 1);

          setTimeout((): void => {
            assert.strictEqual(game.getElixir(), 2);
            game.stop();
            done();
          }, 2900);

        }, 2900);
      });
    }).timeout(6500);

    it('should take a callback that is called when elixir count changes', (done: Mocha.Done) => {
      Game.initialize().then(game => {
        game.start();
        return game;
      }).then(game => {
        const onChangeSpy = sinon.spy();

        game.start(onChangeSpy);

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
});