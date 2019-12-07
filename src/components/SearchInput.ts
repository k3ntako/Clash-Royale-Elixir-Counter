export default class SearchInput extends HTMLElement {
  search: string;
  value?: string;
  cardNames: string[];

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

  onChange = (e: any) => {
    const oldDiv = this.querySelector('div');
    oldDiv && oldDiv.remove();

    this.search = e.target.value.trim();
    this.value = this.search;

    const suggestions = this.sortSuggestions(this.value.toLowerCase(), this.cardNames);

    let div = document.createElement("div");;
    suggestions.forEach(suggestion => {
      let li = document.createElement("li");
      li.innerText = suggestion;
      div.appendChild(li);
    })

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
