import { StrictMode } from "react";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllableState } from "./useControllableState";

describe("useControllableState", () => {
  it("is uncontrolled when value is undefined", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 1, onChange }),
    );
    expect(result.current[0]).toBe(1);
    act(() => result.current[1]((v) => v + 1));
    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(2);
  });

  it("mirrors the controlled value and only reports changes", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) =>
        useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 5 } },
    );
    act(() => result.current[1](6));
    expect(result.current[0]).toBe(5);
    expect(onChange).toHaveBeenCalledWith(6);
    rerender({ value: 9 });
    expect(result.current[0]).toBe(9);
  });

  it("does not call onChange when the value is unchanged", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: "a", onChange }),
    );
    act(() => result.current[1]("a"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("calls onChange once per update under StrictMode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(
      () => useControllableState({ defaultValue: false, onChange }),
      { wrapper: StrictMode },
    );
    act(() => result.current[1]((v) => !v));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(true);
  });
});

describe("useControllableState (controlled rejection)", () => {
  it("does not remember a change the parent rejected", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ value: false, defaultValue: false, onChange }),
    );
    act(() => result.current[1]((v) => !v));
    act(() => result.current[1]((v) => !v));
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, true);
  });
});
