import { Spinnable } from "./Spinnable";
import { RenderFunction, renderOne } from "./render";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const getRuntime = (startedAt: number, finishedAt: number = Date.now()) => {
  return (finishedAt - startedAt) / 1000;
};

export interface SpinnerOptions {
  render?: RenderFunction;
}

export class Spinner extends Spinnable {
  public label: string;
  public startedAt: number = Date.now();
  public finishedAt?: number;

  private frame: number = 0;
  private renderer: RenderFunction;

  public static start(label: string, options?: SpinnerOptions) {
    return new Spinner(label, options).spin();
  }

  public constructor(label: string, { render = renderOne }: SpinnerOptions = {}) {
    super();
    this.label = label;
    this.renderer = render;
  }

  public setLabel(label: string) {
    this.label = label;
    return this;
  }

  public finish(label?: string) {
    this.finishedAt = Date.now();
    this.label = label ? label : this.label;
    this.stopSpinning();
    return this;
  }

  public rotate() {
    this.frame = ++this.frame % FRAMES.length;
    return this;
  }

  public toString() {
    return this.renderer({
      label: this.label,
      frame: FRAMES[this.frame],
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      runtime: getRuntime(this.startedAt, this.finishedAt)
    });
  }
}
