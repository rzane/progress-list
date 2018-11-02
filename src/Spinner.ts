import { Spinnable } from "./Spinnable";
import { RenderFunction, renderMany, renderOne } from "./render";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const getRuntime = (startedAt: number, finishedAt: number = Date.now()) => {
  return (finishedAt - startedAt) / 1000;
};

export class Spinner extends Spinnable {
  public label: string;
  public startedAt: number = Date.now();
  public finishedAt?: number;

  private frame: number = 0;
  private renderer: RenderFunction;

  public static start(label: string, renderer: RenderFunction = renderOne) {
    return new Spinner(label, renderer).start();
  }

  public constructor(label: string, renderer: RenderFunction = renderMany) {
    super();
    this.label = label;
    this.renderer = renderer;
  }

  public setLabel(label: string) {
    this.label = label;
    return this;
  }

  public renderWith(renderer: RenderFunction) {
    this.renderer = renderer;
    return this;
  }

  public stop() {
    this.finishedAt = Date.now();
    return super.stop();
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
