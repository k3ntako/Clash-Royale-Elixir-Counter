import Game from '../models/Game';
import { assert } from 'chai';

describe('Timer', (): void => {
  describe('Game class', (): void => {
    it('should have a field called timer that is initiated as null', (): void => {
      const game = new Game();
      assert.strictEqual(game.timer, null);
    });

    it('should have a method called start', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.start, 'function');
    });

    it('should have a method called start that sets game.timer to an interval', (): void => {
      const game = new Game();
      game.start();
      assert.strictEqual(game.timer && game.timer.constructor.name, 'Timeout');
      game.timer && clearInterval(game.timer);
    });

    it('should have a method called stop', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.stop, 'function');
    });

    it('should have a method called stop that stops the timer and sets game.timer to null', (): void => {
      const game = new Game();
      game.start();
      game.stop();

      assert.strictEqual(game.timer, null);
    });

    it('should have a method called start that sets game.timer to an interval of 1000 ms', (): void => {
      const game = new Game();
      game.start();
      assert.strictEqual(game.timer && game.timer._repeat, 2800);
      game.stop();
    });

    it('should add one elixir every 2.8 seconds when start is called', (done: Mocha.Done) => {
      const game = new Game();
      game.start();

      setTimeout((): void => {
        assert.strictEqual(game.getElixir(), 1);

        setTimeout((): void => {
          assert.strictEqual(game.getElixir(), 2);
          game.stop();
          done();
        }, 2900);

      }, 2900);
    }).timeout(6500); // extends timeout from 2000ms (default) to 6500 ms
  });
});