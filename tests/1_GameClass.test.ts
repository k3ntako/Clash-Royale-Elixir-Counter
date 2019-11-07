import Game from '../index';
import {assert} from 'chai';

describe('Fundamentals', (): void => {
  describe('Game class', (): void => {
    it('should be a function (JS classes are special functions)', (): void => {
      assert.strictEqual(typeof Game, 'function');
    });

    it('should have a elixir field equal to 0', (): void => {
      const game = new Game();
      assert.strictEqual(game.elixir, 0);
    });

    it('should have a method called getElixir', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.getElixir, 'function');
    });

    it('should have a method called getElixir that returns 0', (): void => {
      const game = new Game();
      assert.strictEqual(game.getElixir(), 0);
    });

    it('should have a method called addOne', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.addOne, 'function');
    });

    it('should have a method called addOne that adds 1 to elixir field', (): void => {
      const game = new Game();
      game.addOne();
      assert.strictEqual(game.elixir, 1);
    });

    it('should have a method called addOne that adds 2 to elixir field if called twice', (): void => {
      const game = new Game();
      game.addOne();
      game.addOne();
      assert.strictEqual(game.getElixir(), 2);
    });

    it('should have a method called setElixir', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.setElixir, 'function');
    });

    it('should have a method called setElixir that sets the elixir equal to the argument', (): void => {
      const game = new Game();
      game.setElixir(5);
      assert.strictEqual(game.getElixir(), 5);
    });

  });
});