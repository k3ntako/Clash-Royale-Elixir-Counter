import SearchInput from './components/SearchInput';
import ElixirCounter from './components/ElixirCounter';
import Game from './models/Game';

window.customElements.define('search-input', SearchInput);
window.customElements.define('elixir-counter', ElixirCounter);


export default class HomePage extends HTMLElement{
  game: Game;
  elixirCounter?: ElixirCounter;
  searchInput?: SearchInput;
  constructor() {
    super();


    this.attachShadow({ mode: "open" });
  }

  async connectedCallback(){
    this.game = await Game.initialize();

    this.render();
    this.game.start(this.elixirCounter.onChange);
    this.elixirCounter.game = this.game;

    this.searchInput.cardNames = this.game.cards.cardNames;
  }

  render(){
    const div = document.createElement('div');

    const h1 = document.createElement('h1');
    h1.innerText = "Clash Royale Elixir Counter";
    div.appendChild(h1);

    this.elixirCounter = <ElixirCounter>document.createElement('elixir-counter');
    div.appendChild(this.elixirCounter);

    this.searchInput = <SearchInput>document.createElement('search-input');
    this.searchInput.cardNames = [];

    div.appendChild(this.searchInput);

    this.shadowRoot && this.shadowRoot.appendChild(div);
  }
}

window.customElements.define('home-page', HomePage);