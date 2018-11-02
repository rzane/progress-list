import { Spinner, SpinnerList } from "./src";

const delay = (n: number) => {
  return new Promise(resolve => setTimeout(resolve, n));
};

const run = async () => {
  console.log("===>> Spinner\n");
  const spinner = Spinner.start("Loading...");
  await delay(2489);
  spinner.finish();

  console.log("\n===>> SpinnerList\n");
  const tasks = SpinnerList.start();

  tasks.set("build:web", "Building web...");
  tasks.set("build:nginx", "Building nginx...");
  tasks.set("build:assets", "Building assets...");

  await delay(2404);
  tasks.get("build:nginx").finish("Built nginx");

  await delay(429);
  tasks.get("build:assets").finish("Built assets");

  await delay(944);
  tasks.get("build:web").finish("Built web");

  tasks.set("push:web", "Pushing web...");
  tasks.set("push:nginx", "Pushing nginx...");
  tasks.set("push:assets", "Pushing assets...");

  await delay(999);
  tasks.get("push:assets").finish("Pushed assets");

  await delay(2456);
  tasks.get("push:web").finish("Pushed web");
  tasks.get("push:nginx").finish("Pushed nginx")

  await delay(300);
  tasks.finish();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
