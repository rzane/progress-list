import { Spinner } from "../src/Spinner";
import { SpinnerList } from "../src/SpinnerList";

describe("SpinnerList", () => {
  test("set", () => {
    const list = new SpinnerList();
    const spinner = list.set("one", "One");
    expect(spinner).toBeInstanceOf(Spinner);
  });

  test("get", () => {
    const list = new SpinnerList();
    const spinner = list.set("one", "One");

    expect(list.get("one")).toEqual(spinner);
    expect(() => list.get("foo")).toThrow();
  });

  test("toString with default render", () => {
    const spinner = new SpinnerList();
    spinner.set("one", "One");
    spinner.set("two", "Two").finish();
    spinner.set("three", "Three");
    expect(spinner.toString()).toMatchInlineSnapshot(`
" [34m⠋[39m One
   Two [90m(0.00s)[39m
 [34m⠋[39m Three"
`);
  });

  test("toString with custom render", () => {
    const spinner = new SpinnerList();
    spinner.set("one", "One", {
      render: ctx => ctx.label
    });

    spinner.set("two", "Two", {
      render: ctx => ctx.runtime.toString()
    });

    expect(spinner.toString()).toMatchInlineSnapshot(`
"One
0"
`);
  });
});
