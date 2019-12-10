import Cards from '../models/Cards';

export default class CR_Card extends HTMLElement {
  cardName: string;

  constructor() {
    super();
  }

  connectedCallback(){
    this.cardName = this.innerText;
    this.innerText = "";
    this.render();
  }

  render() {
    const div = document.createElement("div");
    div.className = 'cr-card'

    let img = document.createElement("img")
    img.src = `https://royaleapi.github.io/cr-api-assets/cards-75/${Cards.keyFromName(this.cardName)}.png`
    div.appendChild(img);

    let span = document.createElement('span');
    span.innerText = this.cardName;
    div.appendChild(span);

    this.append(div);
  }
}
