import { Spinner, SpinnerList } from "./src";

const delay = (n: number) => {
  return new Promise(resolve => setTimeout(resolve, n));
};

const run = async () => {
  console.log('===>> Spinner\n');
  const spinner = Spinner.start('Loading...');
  await delay(2489);
  spinner.stop();

  console.log('\n===>> SpinnerList\n');
  const tasks = SpinnerList.start();

  tasks.set("build:web", new Spinner("Building web..."));
  tasks.set("build:nginx", new Spinner("Building nginx..."));
  tasks.set("build:assets", new Spinner("Building assets..."));

  await delay(2404);
  tasks.get("build:nginx").setLabel("Built nginx").stop();

  await delay(429);
  tasks.get("build:assets").setLabel("Built assets").stop();

  await delay(944);
  tasks.get("build:web").setLabel("Built web").stop();

  tasks.set("push:web", new Spinner("Pushing web..."));
  tasks.set("push:nginx", new Spinner("Pushing nginx..."));
  tasks.set("push:assets", new Spinner("Pushing assets..."));

  await delay(999);
  tasks.get("push:assets").setLabel("Pushed assets").stop();

  await delay(2456);
  tasks.get("push:web").setLabel("Pushed web").stop();
  tasks.get("push:nginx").setLabel("Pushed web").stop();

  await delay(300);
  tasks.stop();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
