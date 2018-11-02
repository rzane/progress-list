import { Spinner } from "./Spinner";
import { Spinnable } from "./Spinnable";

export class SpinnerList extends Spinnable {
  private spinners: Map<string, Spinner> = new Map();

  public static start() {
    return new SpinnerList().start();
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

  public toString() {
    const spinners = Array.from(this.spinners.values());
    const messages = spinners.map(spinner => spinner.toString());
    return messages.join("\n");
  }

  public rotate() {
    for (const spinner of this.spinners.values()) {
      spinner.rotate();
    }

    return this;
  }
}
