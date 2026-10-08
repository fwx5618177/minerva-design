import { describe, expect, it, vi } from "vitest";
import { createTranslator } from "../i18n/translate";
import { messages, SUPPORTED_LANGUAGES } from "../i18n";
import {
  createFieldMachine,
  fieldValidators as v,
  isEmptyFieldValue,
  isFieldInvalid,
  toFieldError,
} from "./field";

describe("field validators", () => {
  it("required", () => {
    for (const empty of [undefined, null, "", false, []]) {
      expect(isEmptyFieldValue(empty)).toBe(true);
      expect(v.required()(empty)).toEqual({ key: "validation.valueMissing" });
    }
    expect(v.required()("x")).toBeNull();
    expect(v.required("validation.checkMissing")(false)).toEqual({
      key: "validation.checkMissing",
    });
  });

  it("min / max (numbers only)", () => {
    expect(v.min(2)(1)).toEqual({
      key: "validation.rangeUnderflow",
      params: { min: 2 },
    });
    expect(v.min(2)(2)).toBeNull();
    expect(v.min(2)("1")).toBeNull();
    expect(v.max(2)(3)).toEqual({
      key: "validation.rangeOverflow",
      params: { max: 2 },
    });
    expect(v.max(2)(null)).toBeNull();
  });

  it("minLength / maxLength (texts and lists, empty accepted)", () => {
    expect(v.minLength(3)("ab")).toEqual({
      key: "validation.tooShort",
      params: { min: 3 },
    });
    expect(v.minLength(3)("")).toBeNull();
    expect(v.minLength(2)(["a"])).not.toBeNull();
    expect(v.minLength(2)(5)).toBeNull();
    expect(v.maxLength(2)("abc")).toEqual({
      key: "validation.tooLong",
      params: { max: 2 },
    });
    expect(v.maxLength(2)(["a", "b"])).toBeNull();
    expect(v.maxLength(2)(undefined)).toBeNull();
  });

  it("pattern matches the whole value", () => {
    const digits = v.pattern(/\d+/g);
    expect(digits("123")).toBeNull();
    expect(digits("12a")).toEqual({ key: "validation.patternMismatch" });
    // no lastIndex state between calls
    expect(digits("456")).toBeNull();
    expect(v.pattern("[a-z]{2}")("ab")).toBeNull();
    expect(v.pattern("[a-z]{2}")("abc")).not.toBeNull();
    expect(v.pattern("x")("")).toBeNull();
    expect(v.pattern(/x/i)("X")).toBeNull();
  });

  it("email", () => {
    expect(v.email()("a@b.co")).toBeNull();
    expect(v.email()("first.last+tag@sub.example.org")).toBeNull();
    expect(v.email()("nope")).toEqual({ key: "validation.emailMismatch" });
    expect(v.email()("a@")).not.toBeNull();
    expect(v.email()("")).toBeNull();
  });

  it("custom", () => {
    const even = v.custom<number>((n) => n % 2 === 0);
    expect(even(2)).toBeNull();
    expect(even(3)).toEqual({ key: "validation.badInput", message: undefined });
    expect(
      v.custom<number>(() => false, { key: "my.key", message: "Nope" })(1),
    ).toEqual({ key: "my.key", message: "Nope" });
  });
});

describe("validation messages", () => {
  it("are translated in every built-in language", () => {
    const keys = [
      "valueMissing",
      "tooShort",
      "tooLong",
      "rangeUnderflow",
      "rangeOverflow",
      "patternMismatch",
      "emailMismatch",
      "badInput",
    ];
    for (const language of SUPPORTED_LANGUAGES) {
      const t = createTranslator({ messages, language, fallbackLanguage: "" });
      for (const key of keys) {
        const message = t(`validation.${key}`, { min: 3, max: 9 });
        expect(message, `${language} ${key}`).not.toBe(`validation.${key}`);
        expect(message).not.toContain("{{");
      }
    }
  });

  it("toFieldError uses the translator, an explicit message or the key", () => {
    expect(
      toFieldError({ key: "validation.tooShort", params: { min: 3 } }),
    ).toEqual({
      key: "validation.tooShort",
      params: { min: 3 },
      message: "Please use at least 3 characters.",
    });
    const fr = createTranslator({ messages, language: "fr" });
    expect(toFieldError({ key: "validation.emailMismatch" }, fr).message).toBe(
      "Veuillez saisir une adresse e-mail valide.",
    );
    expect(toFieldError({ key: "x", message: "Custom" }).message).toBe(
      "Custom",
    );
    expect(toFieldError({ key: "missing.key" }).message).toBe("missing.key");
  });
});

describe("field machine", () => {
  it("tracks value, dirty and touched; validates on blur by default", () => {
    const onValueChange = vi.fn();
    const field = createFieldMachine({
      defaultValue: "",
      validators: [v.required(), v.minLength(3)],
      onValueChange,
    });
    field.send({ type: "CHANGE", value: "ab" });
    expect(field.getState()).toMatchObject({
      value: "ab",
      dirty: true,
      touched: false,
      status: "idle",
      errors: [],
    });
    field.send({ type: "CHANGE", value: "ab" }); // no-op
    expect(onValueChange).toHaveBeenCalledTimes(1);
    field.send({ type: "BLUR" });
    expect(field.getState()).toMatchObject({
      touched: true,
      status: "invalid",
    });
    expect(field.getState().errors.map((e) => e.message)).toEqual([
      "Please use at least 3 characters.",
    ]);
    expect(isFieldInvalid(field.getState())).toBe(true);
    // once validated, changes re-validate
    field.send({ type: "CHANGE", value: "abc" });
    expect(field.getState()).toMatchObject({ status: "valid", errors: [] });
    field.send({ type: "BLUR" }); // already touched
    field.send({ type: "CHANGE", value: "" });
    expect(field.getState().dirty).toBe(false);
    expect(field.getState().errors[0].key).toBe("validation.valueMissing");
  });

  it("validateOn change / submit", () => {
    const onChange = createFieldMachine({
      defaultValue: "",
      validators: [v.email()],
      validateOn: "change",
    });
    onChange.send({ type: "CHANGE", value: "x" });
    expect(onChange.getState().status).toBe("invalid");

    const onSubmit = createFieldMachine({
      defaultValue: "",
      validators: [v.required()],
      validateOn: "submit",
    });
    onSubmit.send({ type: "BLUR" });
    expect(onSubmit.getState()).toMatchObject({
      touched: true,
      status: "idle",
    });
    onSubmit.send({ type: "VALIDATE" });
    expect(onSubmit.getState().status).toBe("invalid");
    // validated: later blurs validate again
    onSubmit.send({ type: "CHANGE", value: "ok" });
    onSubmit.send({ type: "BLUR" });
    expect(onSubmit.getState().status).toBe("valid");
  });

  it("translates with the given translator", () => {
    const t = createTranslator({ messages, language: "ja" });
    const field = createFieldMachine({
      defaultValue: 5,
      validators: [v.max(3)],
      translate: t,
    });
    field.send({ type: "VALIDATE" });
    expect(field.getState().errors[0].message).toBe(
      "3 以下の値を入力してください。",
    );
  });

  it("resets to the default or a given value", () => {
    const field = createFieldMachine({
      defaultValue: "a",
      validators: [v.minLength(5)],
    });
    field.send({ type: "CHANGE", value: "abc" });
    field.send({ type: "VALIDATE" });
    field.send({ type: "RESET" });
    expect(field.getState()).toMatchObject({
      value: "a",
      dirty: false,
      touched: false,
      validated: false,
      status: "idle",
      errors: [],
    });
    field.send({ type: "RESET", value: "zz" });
    expect(field.getState()).toMatchObject({ value: "zz", dirty: true });
  });

  it("runs async validators after the sync ones and drops stale results", async () => {
    const resolvers: ((r: { key: string } | null) => void)[] = [];
    const taken = (value: string) =>
      new Promise<{ key: string } | null>((resolve) => {
        resolvers.push(resolve);
        void value;
      });
    const field = createFieldMachine({
      defaultValue: "",
      validators: [v.required()],
      asyncValidators: [taken],
      validateOn: "change",
    });
    // sync failure: no async run
    field.send({ type: "CHANGE", value: "a" });
    field.send({ type: "CHANGE", value: "" });
    expect(resolvers).toHaveLength(1);
    field.send({ type: "CHANGE", value: "bob" });
    expect(field.getState().status).toBe("validating");
    expect(resolvers).toHaveLength(2);
    // the first (stale) run resolves with an error: dropped
    resolvers[0]({ key: "validation.badInput" });
    resolvers[1]({ key: "custom.taken" });
    const settled = await field.whenSettled();
    expect(settled.status).toBe("invalid");
    expect(settled.errors).toEqual([
      { key: "custom.taken", message: "custom.taken" },
    ]);
    field.send({ type: "CHANGE", value: "alice" });
    resolvers[2](null);
    expect((await field.whenSettled()).status).toBe("valid");
    // a late result after a reset is ignored
    field.send({ type: "ASYNC_RESULT", run: 1, errors: [] });
    expect(field.getState().status).toBe("valid");
    expect(await field.whenSettled()).toBe(field.getState());
  });

  it("a rejected async validator counts as invalid", async () => {
    const field = createFieldMachine<string>({
      defaultValue: "",
      asyncValidators: [() => Promise.reject(new Error("offline"))],
    });
    field.send({ type: "VALIDATE" });
    const state = await field.whenSettled();
    expect(state.status).toBe("invalid");
    expect(state.errors[0].key).toBe("validation.badInput");
  });

  it("controlled value with a custom equality", () => {
    const onValueChange = vi.fn();
    const field = createFieldMachine<string[]>({
      value: ["a"],
      defaultValue: ["a"],
      equals: (a, b) => a.join() === b.join(),
      onValueChange,
    });
    expect(field.getState().dirty).toBe(false);
    field.send({ type: "CHANGE", value: ["b"] });
    expect(onValueChange).toHaveBeenCalledWith(["b"]);
    expect(field.getState().value).toEqual(["a"]);
    field.setProps({ value: ["b"] });
    expect(field.getState().dirty).toBe(true);
    field.send({ type: "UNKNOWN" } as never);
  });
});
