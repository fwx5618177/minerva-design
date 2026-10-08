// A sign-up form built from the Vue components: labels and descriptions are
// wired by FormControl, submitting with missing fields shows the errors
// (aria-invalid + aria-describedby on the controls), fixing them submits the
// values of v-model.
import { describe, expect, it } from "vitest";
import { defineComponent, h, reactive, ref } from "vue";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SelectItem,
} from "../../src";
import { renderApp, settle } from "./utils";

const SignUp = defineComponent({
  emits: ["submit"],
  setup(_, { emit }) {
    const values = reactive({
      email: "",
      plan: undefined as string | undefined,
      terms: false,
    });
    const submitted = ref(false);
    const errors = () => ({
      email: !/^\S+@\S+$/.test(values.email),
      plan: !values.plan,
      terms: !values.terms,
    });
    const onSubmit = (event: Event) => {
      event.preventDefault();
      submitted.value = true;
      const e = errors();
      if (!e.email && !e.plan && !e.terms) emit("submit", { ...values });
    };
    return () => {
      const e = submitted.value
        ? errors()
        : { email: false, plan: false, terms: false };
      return h(
        "form",
        { onSubmit, novalidate: true, "aria-label": "Sign up" },
        [
          h(FormControl, { invalid: e.email, required: true }, () => [
            h(FormLabel, null, () => "Email"),
            h(Input, {
              type: "email",
              modelValue: values.email,
              "onUpdate:modelValue": (v: string) => (values.email = v),
            }),
            h(FormHelperText, null, () => "We never share it"),
            h(FormErrorMessage, null, () => "Enter a valid email"),
          ]),
          h(FormControl, { invalid: e.plan, required: true }, () => [
            h(FormLabel, null, () => "Plan"),
            h(
              Select,
              {
                placeholder: "Choose a plan",
                modelValue: values.plan,
                "onUpdate:modelValue": (v: string) => (values.plan = v),
              },
              () => [
                h(SelectItem, { value: "free" }, () => "Free"),
                h(SelectItem, { value: "pro" }, () => "Pro"),
              ],
            ),
            h(FormErrorMessage, null, () => "Choose a plan"),
          ]),
          h(Checkbox, {
            label: "I accept the terms",
            modelValue: values.terms,
            error: e.terms,
            "onUpdate:modelValue": (v: boolean) => (values.terms = v),
          }),
          h(Button, { type: "submit" }, () => "Create account"),
        ],
      );
    };
  },
});

describe("form submission with validation", () => {
  it("shows the errors, then submits the v-model values", async () => {
    let result: unknown;
    const { user } = renderApp(() =>
      h(SignUp, { onSubmit: (values: unknown) => (result = values) }),
    );
    // helper texts / error messages register once mounted
    await settle();
    const email = document.querySelector<HTMLInputElement>(
      'input[type="email"]',
    )!;
    // the label names the control, the helper text describes it
    const label = Array.from(document.querySelectorAll("label")).find((l) =>
      l.textContent?.startsWith("Email"),
    )!;
    expect(label.htmlFor).toBe(email.id);
    expect(email.getAttribute("aria-required")).toBe("true");
    const helper = document.getElementById(
      email.getAttribute("aria-describedby")!.split(" ")[0],
    );
    expect(helper?.textContent).toBe("We never share it");

    await user.click(document.querySelector('button[type="submit"]')!);
    await settle();
    expect(result).toBeUndefined();
    expect(email.getAttribute("aria-invalid")).toBe("true");
    const error = document.getElementById(
      email.getAttribute("aria-describedby")!.split(" ")[0],
    );
    expect(error?.textContent).toBe("Enter a valid email");
    expect(
      document.querySelector('[data-minerva="form-control"][data-invalid]'),
    ).not.toBeNull();

    await user.type(email, "ada@example.com");
    const plan = document.querySelector<HTMLElement>('[role="combobox"]')!;
    await user.click(plan);
    await settle(10);
    await user.click(
      Array.from(document.querySelectorAll('[role="option"]')).find(
        (o) => o.textContent?.trim() === "Pro",
      )!,
    );
    await settle(10);
    await user.click(
      document.querySelector('[role="checkbox"], input[type="checkbox"]')!,
    );
    await user.click(document.querySelector('button[type="submit"]')!);
    await settle();
    expect(result).toEqual({
      email: "ada@example.com",
      plan: "pro",
      terms: true,
    });
    expect(email.getAttribute("aria-invalid")).not.toBe("true");
  });
});
