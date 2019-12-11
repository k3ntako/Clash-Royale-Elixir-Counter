export default class Timer {
  oneElixirTime: number; // time it takes to gain one elixir
  intervalTime: number; // how often the timer will update
  timer: NodeJS.Timeout | null;
  timePassed: number;
  onIntervalCBs: Function[];
  onElixirCBs: Function[];
  running: boolean;
  constructor(){
    this.oneElixirTime = 2800;
    this.intervalTime = 100;
    this.timer = null;
    this.timePassed = 0;
    this.onIntervalCBs = [];
    this.onElixirCBs = [];
    this.running = false;
  }

  start(): void{
    this.stop();
    this.timePassed = 0;

    this.timer = setInterval(() => {
      this.timePassed += this.intervalTime;

      if(this.timePassed >= this.oneElixirTime){
        this.timePassed = 0;
        this.onElixir();
      }else{
        this.onInterval();
      }
    }, this.intervalTime);
    this.running = true;
  }

  stop(){
    clearInterval(this.timer);
    this.running = false;
  }

  private setSpeed(intevalTime: number){
    this.stop();
    this.oneElixirTime = intevalTime;
    this.start();
  }

  singleSpeed(): void{
    this.setSpeed(2800);
  }

  doubleSpeed(): void{
    this.setSpeed(1400);
  }

  tripleSpeed(): void{
    this.setSpeed(700);
  }

  registerOnInterval = (cb: Function) => {
    this.onIntervalCBs.push(cb);
  }

  private onInterval(){
    this.onIntervalCBs.forEach(cb => cb());
  }

  registerOnElixir = (cb: Function) => {
    this.onElixirCBs.push(cb);
  }

  private onElixir(){
    this.onElixirCBs.forEach(cb => cb());
  }
}