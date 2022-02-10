import { normalize } from "./string";

describe("string / normilize", () => {
  it("trims any whitespaces", () => {
    expect(normalize("   hello world    ")).toEqual("hello world");
  });

  it("changes anything to lowercase", () => {
    expect(normalize("   heLLo wOrld    ")).toEqual("hello world");
  });
});
