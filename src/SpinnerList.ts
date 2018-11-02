import { Spinner, SpinnerOptions } from "./Spinner";
import { Spinnable } from "./Spinnable";
import { renderMany } from "./render";

export class SpinnerList extends Spinnable {
  private spinners: Map<string, Spinner> = new Map();

  public static start() {
    return new SpinnerList().spin();
  }

  public set(id: string, label: string, options: SpinnerOptions = {}) {
    const spinner = new Spinner(label, {
      render: renderMany,
      ...options
    });

    this.spinners.set(id, spinner);
  }

  public get(id: string) {
    const spinner = this.spinners.get(id);

    if (!spinner) {
      throw new Error(`Spinner does not exist: ${id}`);
    }

    return spinner;
  }

  public finish() {
    this.stopSpinning();
    return this;
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
