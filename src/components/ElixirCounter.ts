import Game from '../models/Game';
import ElixirSetterButton from './ElixirSetterButton';
window.customElements.define('elixir-setter-button', ElixirSetterButton);


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
    const div = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.innerText = "0";
    div.appendChild(h3);

    for (let i = 0; i <= 10; i++){
      const button = document.createElement("elixir-setter-button");
      button.innerText = String(i);
      button.onclick = () => this.game.setElixir(i);
      div.appendChild(button);
    }

    this.shadowRoot && this.shadowRoot.appendChild(div);
  }
}
