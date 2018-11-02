import { Spinner } from "./Spinner";
import { SpinnerList } from "./SpinnerList";

describe("SpinnerList", () => {
  test("toString", () => {
    const spinner = new SpinnerList();
    spinner.set("one", new Spinner("One"));
    spinner.set("two", new Spinner("Two").finish());
    spinner.set("three", new Spinner("Three"));
    expect(spinner.toString()).toMatchInlineSnapshot(`
" [34m⠋[39m One
   Two [90m(0.00s)[39m
 [34m⠋[39m Three"
`);
  });
});
