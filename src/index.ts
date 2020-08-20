import CardSearch from "./components/CardSearch";
import ElixirCounter from "./components/ElixirCounter";
import PlayedCards from "./components/PlayedCards";
import CR_Card from "./components/CR_Card";
import Game from "./models/Game";
import css from "./css";
import ElixirTracker from "./models/ElixirTracker";

window.customElements.define("card-search", CardSearch);
window.customElements.define("elixir-counter", ElixirCounter);
window.customElements.define("played-cards", PlayedCards);
window.customElements.define("cr-card", CR_Card);

export default class HomePage extends HTMLElement {
  game: Game;
  elixirCounter?: ElixirCounter;
  cardSearch?: CardSearch;
  playedCards?: PlayedCards;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.game = await Game.initialize(new ElixirTracker());
    this.game.start();

    this.render();
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = css;

    const h1 = document.createElement("h1");
    h1.innerText = "Clash Royale Elixir Counter";
    div.appendChild(h1);

    this.elixirCounter = <ElixirCounter>(
      document.createElement("elixir-counter")
    );
    this.game.registerOnElixirChange(this.elixirCounter.onChange);

    this.elixirCounter.game = this.game;
    div.appendChild(this.elixirCounter);

    this.playedCards = <PlayedCards>document.createElement("played-cards");
    this.playedCards.game = this.game;
    div.appendChild(this.playedCards);

    this.cardSearch = <CardSearch>document.createElement("card-search");
    this.cardSearch.cardNames = [];
    this.cardSearch.cardNames = this.game.cards.cardNames;
    this.cardSearch.game = this.game;

    div.appendChild(this.cardSearch);

    this.shadowRoot && this.shadowRoot.appendChild(div);
  }
}

window.customElements.define("home-page", HomePage);
