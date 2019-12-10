import Cards from '../models/Cards';
import Game from '../models/Game';

const removePunctionations = (str: string) => str.replace(/[^0-9a-z\s]/gi, '');

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
    const aStartsWith = removePunctionations(a.toLowerCase()).startsWith(searchStr);
    const bStartsWith = removePunctionations(b.toLowerCase()).startsWith(searchStr);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return 0;
  }

  sortSuggestions(value, cardNames){
    const searchRegex = new RegExp(value, "i"); // Case insensitive regex search
    const suggestions = cardNames.filter(name => {
      return searchRegex.test(removePunctionations(name));
    });

    return suggestions.sort((a,b) => this.suggestionSortFunc(a,b, value)).slice(0,20);
  }

  onCardClick = (cardName) => {
    this.game.playCard(Cards.keyFromName(cardName));
  }

  onChange = (e: any) => {
    const oldDiv = this.querySelector('div');
    oldDiv && oldDiv.remove();

    this.search = e.target.value.trim();
    this.value = this.search;

    const parsedVal = removePunctionations(this.value.toLowerCase());

    const suggestions = this.sortSuggestions(parsedVal, this.cardNames);

    let div = document.createElement("div");
    div.className = "suggestions"
    suggestions.forEach(suggestion => {
      let crCard = document.createElement("cr-card");
      crCard.className = "suggestion";
      crCard.onclick = () => this.onCardClick(suggestion);
      crCard.innerText = suggestion;

      div.appendChild(crCard);
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
