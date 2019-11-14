import Game from '../models/Game';

export default class ElixirCounter extends HTMLElement {
  game: Game;
  constructor() {
    super();
    this.game = new Game();
    this.game.start(this.onChange);
    this.attachShadow({ mode: "open" })
    this.render();
  }

  onChange = (elixir) => {
    const h3 = this.shadowRoot.querySelector("h3");
    h3.innerText = String(elixir);
  }

  render() {
    let h3 = document.createElement("h3");
    h3.innerText = "0";

    this.shadowRoot && this.shadowRoot.appendChild(h3);
  }
}
