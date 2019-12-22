import Game from '../models/Game';


export default class ElixirCounter extends HTMLElement {
  game: Game; // set by parent
  constructor() {
    super();
  }

  connectedCallback(){
    if(!this.game){
      throw new Error("No game assigned to this.game");
    }

    this.game.registerOnIntervalChange(this.onIntervalChange);

    this.render();
  }

  onChange = (elixir) => {
    const h3 = this.querySelector("h3");
    h3.innerText = String(elixir);
  }

  onButtonChange = (speed: number) => { // speed is 1, 2, or 3 (representing 1x, 2x, or 3x)
    const speedIdx = speed - 1;

    // find active button and remove "active" className
    let activeButton = this.querySelector('button.active');
    activeButton.className = "";

    // find all buttons and add "active" className to the one that was clicked
    const buttons = this.querySelectorAll('.speed-buttons button');
    const button = buttons[speedIdx];
    button.className = "active";

    // choose the appropriate function based on speed
    const changeSpeedFunc = [this.game.singleSpeed, this.game.doubleSpeed, this.game.tripleSpeed][speedIdx];
    changeSpeedFunc();
  }

  onIntervalChange = (elixir: number, timePassed: number, oneElixirTime: number) => {
    const buttons = this.querySelectorAll('.elixir-setter-buttons button');
    buttons.forEach((button, idx) => {
      const oldFill = button.querySelector('div');
      oldFill && button.removeChild(oldFill)

      if( idx <= elixir ){
        button.className = "filled";
      } else if (idx === elixir + 1) {
        button.className = "partially-filled";

        const fill = document.createElement('div');
        fill.className = 'fill';
        fill.style.width = `${timePassed/oneElixirTime * 100}%`;

        button.append(fill);
      } else {
        button.className = "";
      }
    });
  }

  render() {
    const div = document.createElement("div");
    div.className = "elixirCounter"

    // buttons to manually set elixir count
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons elixir-setter-buttons";
    for (let i = 0; i <= 10; i++){
      const button = document.createElement("button");
      button.innerText = String(i);
      button.onclick = () => this.game.manualSetElixir(i);
      buttonsDiv.appendChild(button);
    }

    // speed buttons
    const speedsDiv = document.createElement("div");
    speedsDiv.className = "buttons speed-buttons";
    for (let i = 1; i <= 3; i++ ){
      const button = document.createElement("button");
      i === 1 && (button.className = 'active'); // first button has className "active"
      button.innerText = String(i) + 'x';
      button.onclick = () => this.onButtonChange(i);
      speedsDiv.appendChild(button);
    }

    const buttonsWrapperDiv = document.createElement("div");
    buttonsWrapperDiv.className = "buttonsWrapper";
    buttonsWrapperDiv.append(buttonsDiv);
    buttonsWrapperDiv.append(speedsDiv);
    div.append(buttonsWrapperDiv);


    const h3 = document.createElement("h3");
    h3.id = "elixirCount";
    h3.innerText = String(this.game.elixir);
    div.appendChild(h3);

    this.append(div);
  }
}
