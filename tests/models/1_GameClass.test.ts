import sinon from 'sinon';
import {assert} from 'chai';
import Game from '../../src/models/Game';
import Cards from '../../src/models/Cards';
import { allCards, getCardByKey } from '../_test_utilities/_cards.utils';

const knightCard = getCardByKey('knight');

describe('Game class', (): void => {
  describe('.initialize', (): void => {
    it('should return a Game instance', async (): Promise<void> => {
      const game = await Game.initialize();

      assert.instanceOf(game, Game);
    });

    it('should initialize cards and set it to .cards', async (): Promise<void> => {
      const initializeCardsSpy = sinon.spy(Cards, "initialize");

      const game = await Game.initialize();

      sinon.assert.calledOnce(initializeCardsSpy);
      assert.instanceOf(game.cards, Cards);
      assert.lengthOf(game.cards.cards, allCards.length);
    });
  });

  describe('constructor', (): void => {
    it('should have a elixir field equal to 0', async (): Promise<void> => {
      const game = await Game.initialize();
      assert.strictEqual(game.elixir, 0);
    });
  });

  describe('#getElixir', (): void => {
    it('should return value of game.elixir', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.elixir = 4;
      assert.strictEqual(game.getElixir(), 4);
    });
  });

  describe('#setElixir', (): void => {
    it('should set the elixir equal to the argument', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.setElixir(5);
      assert.strictEqual(game.getElixir(), 5);
    });
  });

  describe('#addElixir', (): void => {
    it('should add the argument to the elixir field', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.addElixir(3);
      assert.strictEqual(game.getElixir(), 3);
    });

    it('should never allow elixir count to be more than 10', async (): Promise<void> => {
      const game = await Game.initialize();
      game.setElixir(9);
      game.addElixir(2);
      assert.isAtMost(game.getElixir(), 10);
    });

    it('should set the field to 10 if the total is greater than 10', async (): Promise<void> => {
      const game = await Game.initialize();
      game.setElixir(9);
      game.addElixir(2);
      assert.strictEqual(game.getElixir(), 10);
    });
  });

  describe('#subtractElixir', (): void => {
    it('should subtract the argument from the elixir field', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.setElixir(7);
      game.subtractElixir(3);
      assert.strictEqual(game.getElixir(), 4);
    });

    it('should never allow elixir count to be less than 0', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.setElixir(2);
      game.subtractElixir(3);
      assert.isAtLeast(game.getElixir(), 0);
    });

    it('should not do anything, if the result would be less than 0', async (): Promise<void> => {
      const game = await Game.initialize();
      game.setElixir(2);
      game.subtractElixir(3);
      assert.strictEqual(game.getElixir(), 2);
    });

    it('should allow result to be 0', async (): Promise<void> => {
      const game = await Game.initialize();
      game.setElixir(2);
      game.subtractElixir(2);
      assert.strictEqual(game.getElixir(), 0);
    });
  });

  describe('#playCard', (): void => {
    it('should take an object with an elixir field, and subtract that value from game.elixir', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.setElixir(4);
      game.playCard(knightCard.key);
      assert.strictEqual(game.getElixir(), 1);
    });

    it('should not subtract any elixir if game.elixir is less than the elixir count provided', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.setElixir(2);
      game.playCard(knightCard.key);
      assert.strictEqual(game.getElixir(), 2);
    });

    it('should add card to playedCards', async (): Promise<void>=> {
      const game = await Game.initialize();
      game.setElixir(10);
      game.playCard(knightCard.key);

      assert.include(game.playedCards, knightCard.key);
    });
  });
});