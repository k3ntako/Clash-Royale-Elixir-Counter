export default class ElixirTracker {
  elixir: number;
  constructor() {
    this.elixir = 5; // opponent's elixir count
  }

  set = (elixir: number) => {
    if (typeof elixir !== "number") {
      throw new Error("Elixir has to be a number");
    }

    if (elixir > 10) {
      // 10+
      this.elixir = 10;
      throw new Error("Elixir cannot be set to greater than 10");
    } else if (elixir >= 0) {
      // 0 to 10
      this.elixir = elixir;
    } else {
      // less than 0
      // Does not change the elixir value
      throw new Error("Not enough elixir");
    }
  };

  get = (): number => {
    return this.elixir;
  };
}
