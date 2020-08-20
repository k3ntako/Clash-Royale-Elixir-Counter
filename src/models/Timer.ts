export default class Timer {
  oneElixirTime: number; // time it takes to gain one elixir
  intervalTime: number; // how often the timer will update
  timer: NodeJS.Timeout | null;
  timePassed: number;
  onIntervalCBs: Function[];
  onElixirCBs: Function[];
  running: boolean;
  constructor() {
    this.oneElixirTime = 2800;
    this.intervalTime = 70;
    this.timer = null;
    this.timePassed = 0;
    this.onIntervalCBs = [];
    this.onElixirCBs = [];
    this.running = false;
  }

  start(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timePassed += this.intervalTime;

      if (this.timePassed >= this.oneElixirTime) {
        this.timePassed = 0;
        this.onElixir();
        this.onInterval();
      } else {
        this.onInterval();
      }
    }, this.intervalTime);
    this.running = true;
  }

  stop() {
    clearInterval(this.timer);
    this.timePassed = 0;
    this.running = false;
  }

  private setSpeed(oneElixirTime: number) {
    if (this.oneElixirTime !== oneElixirTime) {
      this.oneElixirTime = oneElixirTime;
      this.start();
    }
  }

  singleSpeed = (): void => {
    this.setSpeed(2800);
  };

  doubleSpeed = (): void => {
    this.setSpeed(1400);
  };

  tripleSpeed = (): void => {
    this.setSpeed(700);
  };

  registerOnInterval = (cb: Function) => {
    this.onIntervalCBs.push(cb);
  };

  onInterval = () => {
    this.onIntervalCBs.forEach((cb) => cb(this.timePassed, this.oneElixirTime));
  };

  registerOnElixir = (cb: Function) => {
    this.onElixirCBs.push(cb);
  };

  onElixir() {
    this.onElixirCBs.forEach((cb) => cb());
  }
}
