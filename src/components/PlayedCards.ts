
import Cards from '../models/Cards';
import Game from '../models/Game';

export default class SearchInput extends HTMLElement {
  game: Game;
  constructor() {
    super();
  }

  connectedCallback(){
    this.render();
    this.game.registerOnPlayedCardsChanged(this.render.bind(this));
  }

  onCardClick = (cardName) => {
    this.game.playCard(Cards.keyFromName(cardName));
  }

  render() {
    const oldDiv = this.querySelector('div');
    oldDiv && oldDiv.remove();

    const div = document.createElement("div");
    div.className = "playedCards";

    this.game.playedCards.forEach(playedCard => {
      let crCard = document.createElement("cr-card");
      crCard.onclick = () => this.onCardClick(playedCard);
      crCard.innerText = Cards.nameFromKey(playedCard);

      div.appendChild(crCard);
    });


    this.append(div);
  }
}
