import { Spinner } from "./spinner";

describe("Spinner", () => {
  test("rotate", () => {
    const spinner = new Spinner("Hi");
    expect(spinner.frame).toEqual(0);

    spinner.rotate();
    expect(spinner.frame).toEqual(1);
  });

  test("finish", () => {
    const spinner = new Spinner("Hi");
    expect(spinner.finishedAt).toBeUndefined();

    spinner.finish();
    expect(spinner.finishedAt).toEqual(expect.any(Number));
  });

  test("toString", () => {
    const spinner = new Spinner("Hi");
    expect(spinner.toString()).toMatchInlineSnapshot(`" [34m⠋[39m Hi"`);

    spinner.rotate();
    expect(spinner.toString()).toMatchInlineSnapshot(`" [34m⠙[39m Hi"`);
  });
});
