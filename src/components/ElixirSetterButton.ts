export default class ElixirSetterButton extends HTMLElement {
  elixirValue: number;
  constructor() {
    super();
    this.elixirValue = -1;
  }

  connectedCallback(){
    this.render();
  }

  render() {
    this.elixirValue = Number(this.innerText);
    this.innerText = "";

    let button = document.createElement("button");
    button.innerText = String(this.elixirValue);
    this.appendChild(button);
  }
}
