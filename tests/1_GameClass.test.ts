import Game from '../models/Game';
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

    it('should have a method called setElixir', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.setElixir, 'function');
    });

    it('should have a method called setElixir that sets the elixir equal to the argument', (): void => {
      const game = new Game();
      game.setElixir(5);
      assert.strictEqual(game.getElixir(), 5);
    });

    it('should have a method called addElixir', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.addElixir, 'function');
    });

    it('should have a method called addElixir that adds the argument to the elixir field', (): void => {
      const game = new Game();
      game.addElixir(3);
      assert.strictEqual(game.getElixir(), 3);
    });

    it('addElixir should never allow elixir count to be more than 10', () => {
      const game = new Game();
      game.setElixir(9);
      game.addElixir(2);
      assert.isAtMost(game.getElixir(), 10);
    });

    it('if the total is greater than 10, addElixir should set the field to 10', () => {
      const game = new Game();
      game.setElixir(9);
      game.addElixir(2);
      assert.strictEqual(game.getElixir(), 10);
    });

    it('should have a method called subtractElixir', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.subtractElixir, 'function');
    });

    it('should have a method called subtractElixir that subtracts the argument from the elixir field', (): void => {
      const game = new Game();
      game.setElixir(7);
      game.subtractElixir(3);
      assert.strictEqual(game.getElixir(), 4);
    });

    it('subtractElixir should never allow elixir count to be less than 0', (): void => {
      const game = new Game();
      game.setElixir(2);
      game.subtractElixir(3);
      assert.isAtLeast(game.getElixir(), 0);
    });

    it('if the result is less than 0, subtractElixir should set the field to 0', () => {
      const game = new Game();
      game.setElixir(2);
      game.subtractElixir(3);
      assert.strictEqual(game.getElixir(), 0);
    });

    it('should have a method called playCard', (): void => {
      const game = new Game();
      assert.strictEqual(typeof game.playCard, 'function');
    });
  });
});