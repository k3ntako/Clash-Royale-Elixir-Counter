export default class SearchInput extends HTMLElement {
  get observedAttributes() { return ["name"] };
  search: string;
  value?: string;

  constructor() {
    super();
    this.search = "";
    this.attachShadow({ mode: "open" })
    this.render();
  }

  onChange(e: any){
    this.search = e.target.value;
    this.value = this.search;
  }

  render() {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search Cards");
    input.addEventListener('input', this.onChange);
    input.classList.add("searchInput");

    this.shadowRoot && this.shadowRoot.appendChild(input);
  }
}
