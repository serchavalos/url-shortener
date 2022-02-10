import { validateURL } from "./url";

describe("url / validateURL", () => {
  it("returns true with a valid URL", () => {
    expect(validateURL("https://www.facebook.com")).toBe(true);
    expect(validateURL("https://petli.app")).toBe(true);
  });

  it("returns false with an invalid URL", () => {
    expect(validateURL("facebook")).toBe(false);
    expect(validateURL("petli")).toBe(false);
  });
});
