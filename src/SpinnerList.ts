import { Spinner, SpinnerOptions } from "./Spinner";
import { Spinnable } from "./Spinnable";
import { renderMany } from "./render";

export class SpinnerList extends Spinnable {
  private spinners: Map<string, Spinner> = new Map();

  public static start(): SpinnerList {
    return new SpinnerList().spin();
  }

  public set(id: string, label: string, options: SpinnerOptions = {}): Spinner {
    const spinner = new Spinner(label, {
      render: renderMany,
      ...options
    });

    this.spinners.set(id, spinner);
    return spinner;
  }

  public get(id: string): Spinner {
    const spinner = this.spinners.get(id);

    if (!spinner) {
      throw new Error(`Spinner does not exist: ${id}`);
    }

    return spinner;
  }

  public finish(): this {
    this.stopSpinning();
    return this;
  }

  public toString(): string {
    const spinners = Array.from(this.spinners.values());
    const messages = spinners.map(spinner => spinner.toString());
    return `\n${messages.join("\n")}\n`;
  }

  public rotate(): this {
    for (const spinner of this.spinners.values()) {
      spinner.rotate();
    }

    return this;
  }
}
