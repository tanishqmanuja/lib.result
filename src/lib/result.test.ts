import { describe, expect, expectTypeOf, it } from "vitest";
import {
  Result,
  isResultError,
  isResultOk,
  computeResult,
  resultError,
  resultOk,
  isResult,
} from "./result";

describe("result", () => {
  it("resultOk", () => {
    const value = 1;
    const resultOkValue = resultOk(value);
    expect(resultOkValue).toEqual({ ok: true, value });

    expect(isResult(resultOkValue)).toBeTruthy();
    expect(isResultOk(resultOkValue)).toBeTruthy();
    expect(isResultError(resultOkValue)).toBeFalsy();

    const resultValue = computeResult(() => value);
    expect(resultValue).toEqual(resultOkValue);
  });

  it("resultError", () => {
    const error = new Error("test error");
    const resultErrorValue = resultError(error);
    expect(resultErrorValue).toEqual({ ok: false, error });

    expect(isResult(resultErrorValue)).toBeTruthy();
    expect(isResultOk(resultErrorValue)).toBeFalsy();
    expect(isResultError(resultErrorValue)).toBeTruthy();

    const resultValue = computeResult(() => {
      throw error;
    });

    expect(resultValue).toEqual(resultErrorValue);
  });

  it("returnTypes", () => {
    const value = 1;
    const error = new Error("test error");

    function thrower() {
      throw Error("test error");
    }

    const resultValue = computeResult(() => value);
    const resultErrorValue = computeResult(thrower);

    expectTypeOf(resultValue).toEqualTypeOf<Result<number, Error>>();
    expectTypeOf(resultErrorValue).toEqualTypeOf<Result<void, Error>>();

    const resultResolveValue = computeResult(() => Promise.resolve(value));
    const resultRejectValue = computeResult(() => Promise.reject(error));

    expectTypeOf(resultResolveValue).toEqualTypeOf<
      Promise<Result<number, Error>>
    >();
    expectTypeOf(resultRejectValue).toEqualTypeOf<
      Promise<Result<never, Error>>
    >();
  });
});
