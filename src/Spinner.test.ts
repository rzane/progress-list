import { Spinner } from "./spinner";

describe("Spinner", () => {
  test("rotate", () => {
    const spinner = new Spinner("Hi");
    expect(spinner["frame"]).toEqual(0);

    expect(spinner.rotate()).toEqual(spinner);
    expect(spinner["frame"]).toEqual(1);
  });

  test("stop", () => {
    const spinner = new Spinner("Hi");
    expect(spinner["finishedAt"]).toBeUndefined();

    expect(spinner.stop()).toEqual(spinner);
    expect(spinner["finishedAt"]).toEqual(expect.any(Number));
  });

  test("toString with default render", () => {
    const spinner = new Spinner("Hi");
    expect(spinner.toString()).toMatchInlineSnapshot(`" [34m⠋[39m Hi"`);

    spinner.rotate();
    expect(spinner.toString()).toMatchInlineSnapshot(`" [34m⠙[39m Hi"`);

    spinner.stop();
    expect(spinner.toString()).toMatchInlineSnapshot(`"   Hi [90m(0.00s)[39m"`);
  });

  test("toString has a different default renderer when started", () => {
    const spinner = Spinner.start("Hi");
    expect(spinner.toString()).toMatchInlineSnapshot(`"Hi [34m⠋[39m"`);

    spinner.rotate();
    expect(spinner.toString()).toMatchInlineSnapshot(`"Hi [34m⠙[39m"`);

    spinner.stop();
    expect(spinner.toString()).toMatchInlineSnapshot(`"Hi [90m(0.00s)[39m"`);
  });

  test("toString with custom renderer", () => {
    const spinner = new Spinner("Hi", context => context.label);
    expect(spinner.toString()).toEqual("Hi");
  });

  test("setLabel", () => {
    const spinner = new Spinner("Hello");
    expect(spinner.setLabel("Goodbye")).toEqual(spinner);
    expect(spinner.label).toEqual("Goodbye");
  });
});
