import * as logUpdate from "log-update";
import { Spinner } from "./spinner";

export { Spinner };

export class SpinnerList {
  private spinners: Map<string, Spinner>;
  private interval: NodeJS.Timeout;

  public constructor() {
    this.spinners = new Map();
    this.interval = setInterval(() => this.render(), 80);
  }

  public set(id: string, spinner: Spinner) {
    this.spinners.set(id, spinner);
  }

  public get(id: string) {
    const spinner = this.spinners.get(id);

    if (!spinner) {
      throw new Error(`Spinner does not exist: ${id}`);
    }

    return spinner;
  }

  public done() {
    clearInterval(this.interval);
    this.render();
    logUpdate.done();
  }

  public toString() {
    const spinners = Array.from(this.spinners.values());
    const messages = spinners.map(spinner => spinner.toString());
    return `\n${messages.join("\n")}`;
  }

  public render() {
    logUpdate(this.toString());

    for (const spinner of this.spinners.values()) {
      spinner.rotate();
    }
  }
}
