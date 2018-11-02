import chalk from "chalk";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const formatDuration = (startedAt: number, finishedAt: number = Date.now()) => {
  return ((finishedAt - startedAt) / 1000).toFixed(2);
}

export class Spinner {
  private label: string;
  private frame: number = 0;
  private color: string = "blue";
  private startedAt: number = Date.now();
  private finishedAt?: number;

  public constructor(label: string) {
    this.label = label;
  }

  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public setLabel(label: string) {
    this.label = label;
    return this;
  }

  public finish() {
    this.finishedAt = Date.now();
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
  };
}
