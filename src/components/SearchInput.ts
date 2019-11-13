const cardNames: string[] = [
  'Knight', 'Archers', 'Goblins', 'Giant',
  'P.E.K.K.A', 'Minions', 'Balloon', 'Witch',
  'Barbarians', 'Golem', 'Skeletons', 'Valkyrie',
  'Skeleton Army', 'Bomber', 'Musketeer', 'Baby Dragon',
  'Prince', 'Wizard', 'Mini P.E.K.K.A', 'Spear Goblins',
  'Giant Skeleton', 'Hog Rider', 'Minion Horde', 'Ice Wizard',
  'Royal Giant', 'Guards', 'Princess', 'Dark Prince',
  'Three Musketeers', 'Lava Hound', 'Ice Spirit', 'Fire Spirits',
  'Miner', 'Sparky', 'Bowler', 'Lumberjack',
  'Battle Ram', 'Inferno Dragon', 'Ice Golem', 'Mega Minion',
  'Dart Goblin', 'Goblin Gang', 'Electro Wizard', 'Elite Barbarians',
  'Hunter', 'Executioner', 'Bandit', 'Royal Recruits',
  'Night Witch', 'Bats', 'Royal Ghost', 'Ram Rider',
  'Zappies', 'Rascals', 'Cannon Cart', 'Mega Knight',
  'Skeleton Barrel', 'Flying Machine', 'Wall Breakers', 'Royal Hogs',
  'Goblin Giant', 'Fisherman', 'Magic Archer', 'Electro Dragon',
  'Elixir Golem', 'Cannon', 'Goblin Hut', 'Mortar',
  'Inferno Tower', 'Bomb Tower', 'Barbarian Hut', 'Tesla',
  'Elixir Collector', 'X-Bow', 'Tombstone', 'Furnace',
  'Goblin Cage', 'Fireball', 'Arrows', 'Rage',
  'Rocket', 'Goblin Barrel', 'Freeze', 'Mirror',
  'Lightning', 'Zap', 'Poison', 'Graveyard',
  'The Log', 'Tornado', 'Clone', 'Earthquake',
  'Barbarian Barrel', 'Heal', 'Giant Snowball'
].sort();

export default class SearchInput extends HTMLElement {
  search: string;
  value?: string;

  constructor() {
    super();
    this.search = "";


    this.attachShadow({ mode: "open" })
    this.render();
  }

  sortSuggestions(a: string, b: string, searchStr: string): number{
    const aStartsWith = a.toLowerCase().startsWith(searchStr);
    const bStartsWith = b.toLowerCase().startsWith(searchStr);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return 0;
  }

  onChange = (e: any) => {
    const oldDiv = this.shadowRoot.querySelector('div');
    oldDiv && oldDiv.remove();

    this.search = e.target.value.trim();
    this.value = this.search;
    const searchRegex = new RegExp(this.value, "i"); // Case insensitive regex search
    const suggestions = cardNames.filter(name => searchRegex.test(name)).slice(0,10);
    suggestions.sort((a,b) => this.sortSuggestions(a,b, this.value));

    let div = document.createElement("div");;
    suggestions.forEach(suggestion => {
      let li = document.createElement("li");
      li.innerText = suggestion;
      div.appendChild(li);
    })

    this.shadowRoot.appendChild(div)
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
