import chalk from "chalk";

export interface RenderContext {
  label: string;
  frame: string;
  runtime: number;
  startedAt: number;
  finishedAt?: number;
}

export type RenderFunction = (context: RenderContext) => string;

export const renderMany = ({
  label,
  frame,
  runtime,
  finishedAt
}: RenderContext) => {
  if (!finishedAt) {
    return chalk` {blue ${frame}} ${label}`;
  }

  return chalk`   ${label} {gray (${runtime.toFixed(2)}s)}`;
};

export const renderOne = ({
  label,
  frame,
  runtime,
  finishedAt
}: RenderContext) => {
  if (!finishedAt) {
    return chalk`${label} {blue ${frame}}`;
  }

  return chalk`${label} {gray (${runtime.toFixed(2)}s)}`;
};
