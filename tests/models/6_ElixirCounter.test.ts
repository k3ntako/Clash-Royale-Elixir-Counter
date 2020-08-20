import { assert } from "chai";
import ElixirTracker from "../../src/models/ElixirTracker";

describe("ElixirTracker class", (): void => {
  describe("set and get elixir count", (): void => {
    it("should set elixir count to specified number and return it", (): void => {
      const elixirTracker = new ElixirTracker();

      elixirTracker.set(2);
      const elixir = elixirTracker.get();

      assert.equal(elixir, 2);
    });

    it("should allow 10", (): void => {
      const elixirTracker = new ElixirTracker();

      elixirTracker.set(10);
      const elixir = elixirTracker.get();

      assert.equal(elixir, 10);
    });

    it("should throw error argument is not a number", (): void => {
      const elixirTracker = new ElixirTracker();

      assert.throws(
        elixirTracker.set.bind(null, null),
        "Elixir has to be a number"
      );
    });

    it("should throw error if value is greater than 10", (): void => {
      const elixirTracker = new ElixirTracker();

      assert.throws(
        elixirTracker.set.bind(null, 11),
        "Elixir cannot be set to greater than 10"
      );
    });

    it("should throw error if value is less than 0", (): void => {
      const elixirTracker = new ElixirTracker();
      assert.throws(elixirTracker.set.bind(null, -1), "Not enough elixir");
    });
  });
});
