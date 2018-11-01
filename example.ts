import { SpinnerList } from "./src";

const delay = (n: number) => {
  return new Promise(resolve => setTimeout(resolve, n));
};

const run = async () => {
  const tasks = new SpinnerList();

  tasks.start("build:web", "build", "web");
  tasks.start("build:nginx", "build", "nginx");
  tasks.start("build:assets", "build", "assets");

  await delay(2404);
  tasks.success("build:nginx");

  await delay(429);
  tasks.success("build:assets");

  await delay(944);
  tasks.success("build:web");

  tasks.start("push:web", "push", "web");
  tasks.start("push:nginx", "push", "nginx");
  tasks.start("push:assets", "push", "assets");

  await delay(999);
  tasks.success("push:assets");

  await delay(2456);
  tasks.failure("push:web");
  tasks.failure("push:nginx");

  await delay(300);
  tasks.done();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
