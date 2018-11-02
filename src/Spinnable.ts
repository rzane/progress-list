import * as logUpdate from "log-update";

export abstract class Spinnable {
  private interval?: NodeJS.Timer;

  public abstract toString(): string;
  public abstract rotate(): this;

  public spin(): this {
    if (!this.interval) {
      this.interval = setInterval(() => this.render(), 80);
    }

    return this;
  }

  public stopSpinning(): this {
    if (this.interval) {
      clearInterval(this.interval);
      this.render();
      logUpdate.done();
    }

    return this;
  }

  public render(): this {
    logUpdate(this.toString());
    this.rotate();
    return this;
  }
}
