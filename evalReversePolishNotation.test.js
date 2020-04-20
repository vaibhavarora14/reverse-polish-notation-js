import { evalReversePolishNotation } from "./evalReversePolishNotation";

describe("evalReversePolishNotation", () => {
  test("should return expected values in correct input", () => {
    expect(evalReversePolishNotation("2 -")).toBe(-2);
    expect(evalReversePolishNotation("1 1 +")).toBe(2);
    expect(evalReversePolishNotation("-4 5 +")).toBe(1);
    expect(evalReversePolishNotation("5 2 /")).toBe(2.5);
    expect(evalReversePolishNotation("5 2.5 /")).toBe(2);
    expect(evalReversePolishNotation("4 13 5 / +")).toBe(6.6);
    expect(evalReversePolishNotation("4 13 5 / + - -")).toBe(6.6);
    expect(evalReversePolishNotation("2 1 + 3 *")).toBe(9);
    expect(evalReversePolishNotation("5 1 2 + 4 * 3 - +")).toBe(14);
    expect(evalReversePolishNotation("4 2 5 * + 1 3 2 * + /")).toBe(2);
    expect(evalReversePolishNotation("4 2 5 * + 1 3 2 * + /")).toBe(2);
    expect(evalReversePolishNotation("2 5 * 4 + 3 2 * 1 + /")).toBe(2);
    expect(evalReversePolishNotation("2 5 * 4 + 3 2 * 1 + / -")).toBe(-2);
  });
  test("show throw error when expression is incorrect", () => {
    expect(() => evalReversePolishNotation("2 /")).toThrow(Error);
    expect(() => evalReversePolishNotation("2 *")).toThrow(Error);
    expect(() =>
      evalReversePolishNotation("5 1 2 + 4 * 3 - + 5 5 5 5 5 5 /")
    ).toThrow(Error);
  });
  test("error handling", () => {
    expect(() => evalReversePolishNotation()).toThrowError();
    expect(() => evalReversePolishNotation([])).toThrowError(/[A-Za-z0-9]+/g);
    expect(() => evalReversePolishNotation("")).toThrowError(/[A-Za-z0-9]+/g);
  });
  describe("basic usage of operators", () => {
    it("addition", () => {
      const result = evalReversePolishNotation("7 3 +");
      expect(result).toEqual(10);
    });
    it("basic multiplication", () => {
      const result = evalReversePolishNotation("2 2 *");
      expect(result).toEqual(4);
    });
    it("multiple additions", () => {
      const result = evalReversePolishNotation("1 1 1 + +");
      expect(result).toEqual(3);
    });
  });
  describe("combined usage", () => {
    it("add and multiply", () => {
      const result = evalReversePolishNotation("2 5 3 + *");
      expect(result).toEqual(16);
    });
    test("more combined operators", () => {
      expect(evalReversePolishNotation("5 2 /")).toBeCloseTo(2.5);
      expect(evalReversePolishNotation("5 2.5 /")).toEqual(2);
      expect(evalReversePolishNotation("5 1 2 + 4 * 3 - +")).toEqual(14);
      expect(evalReversePolishNotation("4 2 5 * + 1 3 2 * + /")).toEqual(2);
    });
  });
  describe("some edge cases", () => {
    test("incorrect postfix expression", () => {
      expect(() => evalReversePolishNotation("2 4 5 -")).toThrowError(
        /[A-Za-z0-9]+/g
      );
      expect(() => evalReversePolishNotation("*")).toThrowError();
      expect(() => evalReversePolishNotation("1 \t +")).toThrowError();
    });
    test("negative operands", () => {
      expect(evalReversePolishNotation("-1 +1 +")).toBe(0);
    });
    test("empty string", () => {
      expect(() => evalReversePolishNotation("")).toThrow();
    });
    test("every operand should be a number", () => {
      expect(() => evalReversePolishNotation("1 a +")).toThrow();
    });
    test("unrecognized operators", () => {
      expect(() => evalReversePolishNotation("1 2 5 + 8 * 8 - %")).toThrow();
    });
    test("division by zero should give Infinity and/or NaN", () => {
      expect(evalReversePolishNotation("2 0 /")).toBe(Infinity);
      expect(evalReversePolishNotation("0 0 /")).toBe(NaN);
    });
    test("NaN should throw", () => {
      expect(() => evalReversePolishNotation("1 NaN +")).toThrow();
    });
    test("multiple and different spaces between operands and operators", () => {
      expect(evalReversePolishNotation("1 \t\t 2\t+")).toBe(3);
    });
  });
});
