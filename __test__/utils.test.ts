import { Config } from "jest";
import nextJest from 'next/jest'
import { objectsDifferenceCallculator } from "../lib/utils";


describe("objectsDifferenceCallculator", () => {

  test("returns empty object when objects are identical", () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 2 };

    expect(objectsDifferenceCallculator(a, b)).toEqual({});
  });

  test("detects primitive value changes", () => {
    const a = { x: 1 };
    const b = { x: 2 };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      x: 2
    });
  });

  test("detects nested object changes", () => {
    const a = {
      user: { name: "Ali", age: 20 }
    };

    const b = {
      user: { name: "Ali", age: 21 }
    };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      "user.age": 21
    });
  });

  test("detects added properties", () => {
    const a = { x: 1 };
    const b = { x: 1, y: 2 };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      y: 2
    });
  });

  test("detects removed properties", () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1 };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      y: undefined
    });
  });

  test("detects changes in deeply nested structures", () => {
    const a = {
      config: {
        network: {
          port: 8080
        }
      }
    };

    const b = {
      config: {
        network: {
          port: 3000
        }
      }
    };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      "config.network.port": 3000
    });
  });

  test("handles null values correctly", () => {
    const a = { x: null };
    const b = { x: 5 };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      x: 5
    });
  });

  test("handles array differences by index", () => {
    const a = { list: [1, 2, 3] };
    const b = { list: [1, 4, 3] };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      "list.1": 4
    });
  });

  test("handles type changes (object to primitive)", () => {
    const a = { x: { y: 1 } };
    const b = { x: 10 };

    expect(objectsDifferenceCallculator(a, b)).toEqual({
      x: 10
    });
  });

});
