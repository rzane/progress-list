import chalk from "chalk";
import { Spinnable } from "./Spinnable";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const formatDuration = (startedAt: number, finishedAt: number) => {
  return ((finishedAt - startedAt) / 1000).toFixed(2);
};

export class Spinner extends Spinnable {
  private label: string;
  private color: string;
  private frame: number = 0;
  private startedAt: number = Date.now();
  private finishedAt?: number;

  public static start(label: string) {
    return new Spinner(label).start();
  }

  public constructor(label: string, color: string = "blue") {
    super();
    this.label = label;
    this.color = color;
  }

  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public setLabel(label: string) {
    this.label = label;
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
    if (!this.finishedAt) {
      return chalk` {${this.color} ${FRAMES[this.frame]}} ${this.label}`;
    }

    const duration = formatDuration(this.startedAt, this.finishedAt);
    return chalk`   ${this.label} {gray (${duration}s)}`;
  }
}
