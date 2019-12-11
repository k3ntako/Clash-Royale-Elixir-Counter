import Timer from '../../src/models/Timer';
import { assert } from 'chai';
import sinon from 'sinon';
import { allCards } from '../_test_utilities/_cards.utils';

describe('Game class', (): void => {
  describe('#registerOnInterval and #onInterval', (): void => {
    it('should register a callback and call it', (): void => {
      const timer = new Timer();
      const onElixirSpy = sinon.spy();

      timer.registerOnElixir(onElixirSpy);
      timer.onElixir();

      sinon.assert.calledOnce(onElixirSpy);
    }).timeout(6500);
  });

  describe('#registerOnElixir and #onElixir', (): void => {
    it('should register a callback and call it', (): void => {
      const timer = new Timer();
      const onIntervalSpy = sinon.spy();

      timer.registerOnInterval(onIntervalSpy);
      timer.onInterval();

      sinon.assert.calledOnce(onIntervalSpy);
    }).timeout(6500);
  });

  describe('start', (): void => {
    it('should should call onInterval every 100ms, and call onElixir every 2800ms', (done: Mocha.Done): void => {
      const timer = new Timer();
      const onElixirSpy = sinon.spy();
      const onIntervalSpy = sinon.spy();

      timer.registerOnElixir(onElixirSpy);
      timer.registerOnInterval(onIntervalSpy);

      timer.start();

      // onInterval is called every 100 ms, but onElixir is called every 2800ms
      setTimeout(() => sinon.assert.calledOnce(onIntervalSpy), 150);
      setTimeout(() => sinon.assert.notCalled(onElixirSpy), 200);

      setTimeout(() => sinon.assert.calledOnce(onElixirSpy), 2900);
      setTimeout(() => sinon.assert.calledTwice(onElixirSpy), 5800);
      setTimeout(() => assert.isAtLeast(onIntervalSpy.callCount, 54), 5800);

      setTimeout(() => done(), 6000);
    }).timeout(6500);
  });

  describe('stop', (): void => {
    it('should stop timers and not call any more onInterval or onElixir', (done: Mocha.Done): void => {
      const timer = new Timer();
      const onElixirSpy = sinon.spy();
      const onIntervalSpy = sinon.spy();

      timer.registerOnElixir(onElixirSpy);
      timer.registerOnInterval(onIntervalSpy);

      timer.start();
      assert.strictEqual(timer.running, true);

      timer.stop();
      assert.strictEqual(timer.running, false);

      setTimeout(() => sinon.assert.notCalled(onIntervalSpy), 150);
      setTimeout(() => sinon.assert.notCalled(onElixirSpy), 200);

      setTimeout(() => sinon.assert.notCalled(onIntervalSpy), 2900);
      setTimeout(() => sinon.assert.notCalled(onElixirSpy), 5800);

      setTimeout(() => done(), 6000);
    }).timeout(6500);
  });

  describe('#doubleSpeed', (): void => {
    it('should call onElixir every 1.4 secs', (done: Mocha.Done): void => {
      const timer = new Timer();
      const onElixirSpy = sinon.spy();

      timer.registerOnElixir(onElixirSpy);

      timer.start();
      timer.doubleSpeed();

      setTimeout(() => sinon.assert.calledOnce(onElixirSpy), 1500);
      setTimeout(() => sinon.assert.calledTwice(onElixirSpy), 2900);

      setTimeout(() => done(), 2950);
    }).timeout(3000);
  });

  describe('#tripleSpeed', (): void => {
    it('should call onElixir every 0.7 secs', (done: Mocha.Done): void => {
      const timer = new Timer();
      const onElixirSpy = sinon.spy();

      timer.registerOnElixir(onElixirSpy);

      timer.start();
      timer.tripleSpeed();

      setTimeout(() => sinon.assert.calledOnce(onElixirSpy), 800);
      setTimeout(() => sinon.assert.calledTwice(onElixirSpy), 1500);

      setTimeout(() => done(), 1600);
    })
  });
});