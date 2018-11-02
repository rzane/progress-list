import { Spinner, SpinnerList } from "./src";

const delay = (n: number) => {
  return new Promise(resolve => setTimeout(resolve, n));
};

const run = async () => {
  const tasks = new SpinnerList();

  tasks.set("build:web", new Spinner("Building web..."));
  tasks.set("build:nginx", new Spinner("Building nginx..."));;
  tasks.set("build:assets", new Spinner("Building assets..."));

  await delay(2404);
  tasks.get("build:nginx").setLabel("Built nginx").finish();

  await delay(429);
  tasks.get("build:assets").setLabel("Built assets").finish();

  await delay(944);
  tasks.get("build:web").setLabel("Built web").finish();

  tasks.set("push:web", new Spinner("Pushing web..."));
  tasks.set("push:nginx", new Spinner("Pushing nginx..."));
  tasks.set("push:assets", new Spinner("Pushing assets..."));

  await delay(999);
  tasks.get("push:assets").setLabel("Pushed assets").finish();

  await delay(2456);
  tasks.get("push:web").setLabel("Pushed web").finish();
  tasks.get("push:nginx").setLabel("Pushed web").finish();

  await delay(300);
  tasks.done();
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
