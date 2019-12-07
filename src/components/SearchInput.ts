import Cards from '../models/Cards';
import Game from '../models/Game';

export default class SearchInput extends HTMLElement {
  search: string;
  value?: string;
  cardNames: string[];
  game: Game;

  constructor() {
    super();
    this.search = "";
    this.cardNames = [];
  }

  connectedCallback(){
    this.render();
  }

  suggestionSortFunc(a: string, b: string, searchStr: string): number{
    const aStartsWith = a.toLowerCase().startsWith(searchStr);
    const bStartsWith = b.toLowerCase().startsWith(searchStr);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return 0;
  }

  sortSuggestions(value, cardNames){
    const searchRegex = new RegExp(value, "i"); // Case insensitive regex search
    const suggestions = cardNames.filter(name => searchRegex.test(name));

    return suggestions.sort((a,b) => this.suggestionSortFunc(a,b, value)).slice(0,10);
  }

  onSuggestionClick = (key) => {
    this.game.playCard(key);
  }

  onChange = (e: any) => {
    const oldDiv = this.querySelector('div');
    oldDiv && oldDiv.remove();

    this.search = e.target.value.trim();
    this.value = this.search;

    const suggestions = this.sortSuggestions(this.value.toLowerCase(), this.cardNames);

    let div = document.createElement("div");
    suggestions.forEach(suggestion => {
      let suggestionDiv = document.createElement("div");
      suggestionDiv.className = "suggestion";
      suggestionDiv.onclick = () => this.onSuggestionClick(Cards.keyFromName(suggestion));

      let img = document.createElement("img")
      img.src = `https://royaleapi.github.io/cr-api-assets/cards-75/${Cards.keyFromName(suggestion)}.png`
      suggestionDiv.appendChild(img);

      let span = document.createElement('span');
      span.innerText = suggestion;
      suggestionDiv.appendChild(span);

      div.appendChild(suggestionDiv);
    });

    this.append(div);
  }

  render() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search Cards");
    input.addEventListener('input', this.onChange);
    input.classList.add("searchInput");

    this.append(input);
  }
}
