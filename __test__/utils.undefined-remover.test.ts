import { removeUndefined } from "../lib/utils";

describe("removeUndefined", () => {
  test("removes undefined properties from an object", () => {
    const input = { a: 1, b: undefined, c: 2 };

    expect(removeUndefined(input)).toEqual({
      a: 1,
      c: 2,
    });
  });

  test("works recursively on nested objects", () => {
    const input = {
      a: 1,
      b: {
        c: undefined,
        d: 2,
      },
    };

    expect(removeUndefined(input)).toEqual({
      a: 1,
      b: {
        d: 2,
      },
    });
  });

  test("keeps null values", () => {
    const input = { a: null, b: undefined };

    expect(removeUndefined(input)).toEqual({
      a: null,
    });
  });

  test("keeps false, 0, and empty string", () => {
    const input = {
      a: false,
      b: 0,
      c: "",
      d: undefined,
    };

    expect(removeUndefined(input)).toEqual({
      a: false,
      b: 0,
      c: "",
    });
  });

  test("removes undefined values from arrays", () => {
    const input = [1, undefined, 2, undefined, 3];

    expect(removeUndefined(input)).toEqual([1, 2, 3]);
  });

  test("handles arrays with nested objects", () => {
    const input = [
      { a: 1, b: undefined },
      { c: undefined, d: 2 },
    ];

    expect(removeUndefined(input)).toEqual([
      { a: 1 },
      { d: 2 },
    ]);
  });

  test("returns primitives as-is", () => {
    expect(removeUndefined(5)).toBe(5);
    expect(removeUndefined("x")).toBe("x");
    expect(removeUndefined(null)).toBe(null);
  });
});
