import { Spinnable } from "./Spinnable";
import { RenderFunction, renderMany, renderOne } from "./render";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const getRuntime = (startedAt: number, finishedAt: number = Date.now()) => {
  return (finishedAt - startedAt) / 1000;
};

export class Spinner extends Spinnable {
  private label: string;
  private frame: number = 0;
  private startedAt: number = Date.now();
  private finishedAt?: number;
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
    super.stop();
    return this;
  }

  public rotate() {
    this.frame = ++this.frame % FRAMES.length;
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
