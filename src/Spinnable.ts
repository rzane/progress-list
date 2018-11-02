import * as logUpdate from "log-update";

export abstract class Spinnable {
  private interval?: NodeJS.Timer;

  public abstract toString(): string;
  public abstract rotate(): this;

  public spin() {
    if (!this.interval) {
      this.interval = setInterval(() => this.render(), 80);
    }

    return this;
  }

  public stopSpinning() {
    if (this.interval) {
      clearInterval(this.interval);
      this.render();
      logUpdate.done();
    }

    return this;
  }

  public render() {
    logUpdate(this.toString());
    this.rotate();
    return this;
  }
}
