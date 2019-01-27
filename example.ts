import chalk from "chalk";
import { Spinner, SpinnerList } from "./src";

const delay = (n: number) => {
  return new Promise(resolve => setTimeout(resolve, n));
};

const run = async () => {
  console.log("===>> Spinner");
  const spinner = Spinner.start("Loading...");
  await delay(2489);
  spinner.finish();

  console.log("===>> SpinnerList");
  const tasks = SpinnerList.start();

  tasks.set("build:web", chalk`{blue build:} web`);
  tasks.set("build:nginx", chalk`{blue build:} nginx`);
  tasks.set("build:assets", chalk`{blue build:} assets`);

  await delay(2404);
  tasks.get("build:nginx").finish(chalk`{green build:} nginx`);

  await delay(429);
  tasks.get("build:assets").finish(chalk`{green build:} assets`);

  await delay(944);
  tasks.get("build:web").finish(chalk`{green build:} web`);

  tasks.set("push:web", chalk`{blue push:} web`);
  tasks.set("push:nginx", chalk`{blue push:} nginx`);
  tasks.set("push:assets", chalk`{blue push:} assets`);

  await delay(999);
  tasks.get("push:assets").finish(chalk`{green push:} assets`);

  await delay(2456);
  tasks.get("push:web").finish(chalk`{red push:} web`);
  tasks.get("push:nginx").finish(chalk`{red push:} nginx`);

  await delay(300);
  tasks.finish();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
