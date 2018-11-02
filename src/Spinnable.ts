import * as logUpdate from "log-update";

export abstract class Spinnable {
  private interval?: NodeJS.Timer;

  public abstract toString(): string;
  public abstract rotate(): void;

  public spin() {
    if (!this.interval) {
      this.interval = setInterval(() => this.render(), 80);
    }
  }

  public done() {
    if (this.interval) {
      clearInterval(this.interval);
      this.render();
      logUpdate.done();
    }
  }

  public render() {
    logUpdate(this.toString());
    this.rotate();
  }
}
