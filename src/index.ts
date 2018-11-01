import chalk from "chalk";
import * as logUpdate from "log-update";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

interface Task {
  action: string;
  label: string;
  frame: number;
  startedAt: number;
  took?: number;
  failed?: boolean;
}

export class SpinnerList {
  private tasks: Map<string, Task>;
  private interval: NodeJS.Timeout;

  public constructor() {
    this.tasks = new Map();
    this.interval = setInterval(this.render, 80);
  }

  public start(id: string, action: string, label: string) {
    this.tasks.set(id, {
      action,
      label,
      frame: 0,
      failed: false,
      startedAt: Date.now()
    });
  }

  public success(id: string) {
    const now = Date.now();
    const task = this.tasks.get(id);

    if (task) {
      task.took = (now - task.startedAt) / 1000;
    }
  }

  public failure(id: string) {
    const now = Date.now();
    const task = this.tasks.get(id);

    if (task) {
      task.took = (now - task.startedAt) / 1000;
      task.failed = true;
    }
  }

  public done() {
    clearInterval(this.interval);
    this.render();
    logUpdate.done();
  }

  private render = () => {
    const tasks = Array.from(this.tasks.values());
    const message = tasks.map(this.renderTask).join("\n");
    logUpdate(`\n${message}`);

    for (const task of tasks) {
      task.frame = ++task.frame % FRAMES.length;
    }
  };

  private renderTask = ({
    action,
    label,
    frame,
    failed,
    took = 0
  }: Task): string => {
    const state = failed ? "red" : took ? "green" : "blue";
    const seconds = took.toFixed(2);

    if (!took) {
      return chalk` {${state} ${FRAMES[frame]} ${action}:} ${label}`;
    }

    return chalk`   {${state} ${action}:} ${label} {gray (${seconds}s)}`;
  };
}
