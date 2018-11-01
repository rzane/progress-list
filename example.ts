import { Progress } from "./src";

const delay = (n: number) => {
  return new Promise(resolve => setTimeout(resolve, n));
};

const run = async () => {
  const progress = new Progress();

  progress.start("build:web", "build", "web");
  progress.start("build:nginx", "build", "nginx");
  progress.start("build:assets", "build", "assets");

  await delay(2404);
  progress.success("build:nginx");

  await delay(429);
  progress.success("build:assets");

  await delay(944);
  progress.success("build:web");

  progress.start("push:web", "push", "web");
  progress.start("push:nginx", "push", "nginx");
  progress.start("push:assets", "push", "assets");

  await delay(999);
  progress.success("push:assets");

  await delay(2456);
  progress.failure("push:web");
  progress.failure("push:nginx");

  await delay(300);
  progress.done();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
