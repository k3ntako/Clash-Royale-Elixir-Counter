export default class Game {
  elixir: number;
  timer: NodeJS.Timeout | null;
  constructor(){
    this.elixir = 0;
    this.timer = null;

    this.addOne = this.addOne.bind(this);
  }

  getElixir(): number{
    return this.elixir;
  }

  setElixir(elixir: number): void {
    this.elixir = elixir;
  }

  addOne(): void{
    this.elixir++;
  }

  start(): void{
    this.timer = setInterval(this.addOne, 2800);
  }

  stop(): void {
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }
}