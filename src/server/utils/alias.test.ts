import { validateAlias, generateAlias } from "./alias";

describe("utils / alias", () => {
  describe("validateAlias", () => {
    it("returns true a valid alias", () => {
      expect(validateAlias("fb")).toBe(true);
      expect(validateAlias("80")).toBe(true);
      expect(validateAlias("fb789")).toBe(true);
      expect(validateAlias("HELLO_world")).toBe(true);
    });

    it("return false for an invalid alias", () => {
      expect(validateAlias("")).toBe(false);
      expect(validateAlias("%#@")).toBe(false);
      expect(validateAlias("real*world")).toBe(false);
    });
  });

  describe("generateAlias", () => {
    it("returns a valid alias", () => {
      const alias = generateAlias();

      expect(validateAlias(alias)).toBe(true);
    });

    it("returns an alias with the specified length", () => {
      expect(generateAlias()).not.toEqual(generateAlias());
    });

    it("returns two different aliases when executed", () => {
      expect(generateAlias(10).length).toBe(10);
      expect(generateAlias(20).length).toBe(20);
      expect(generateAlias(3).length).toBe(3);
    });
  });
});
