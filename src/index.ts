import SearchInput from './components/SearchInput';
import ElixirCounter from './components/ElixirCounter';
import ElixirSetterButton from './components/ElixirSetterButton';
import PlayedCards from './components/PlayedCards';
import CR_Card from './components/CR_Card';
import Game from './models/Game';
import css from './css';

window.customElements.define('search-input', SearchInput);
window.customElements.define('elixir-counter', ElixirCounter);
window.customElements.define('played-cards', PlayedCards);
window.customElements.define('cr-card', CR_Card);
window.customElements.define('elixir-setter-button', ElixirSetterButton);


export default class HomePage extends HTMLElement{
  game: Game;
  elixirCounter?: ElixirCounter;
  searchInput?: SearchInput;
  playedCards?: PlayedCards;
  constructor() {
    super();


    this.attachShadow({ mode: "open" });
  }

  async connectedCallback(){
    this.game = await Game.initialize();

    this.render();
  }

  render(){
    const div = document.createElement('div');
    div.innerHTML = css;

    const h1 = document.createElement('h1');
    h1.innerText = "Clash Royale Elixir Counter";
    div.appendChild(h1);

    this.elixirCounter = <ElixirCounter>document.createElement('elixir-counter');
    this.game.start(this.elixirCounter.onChange);
    this.elixirCounter.game = this.game;
    div.appendChild(this.elixirCounter);

    this.playedCards = <PlayedCards>document.createElement('played-cards');
    this.playedCards.game = this.game;
    div.appendChild(this.playedCards);

    this.searchInput = <SearchInput>document.createElement('search-input');
    this.searchInput.cardNames = [];
    this.searchInput.cardNames = this.game.cards.cardNames;
    this.searchInput.game = this.game;

    div.appendChild(this.searchInput);

    this.shadowRoot && this.shadowRoot.appendChild(div);
  }
}

window.customElements.define('home-page', HomePage);