import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { createRef, useEffect } from "react";
import { Text, TextInput } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { resolveTokens } from "@minerva/core";
import { getByRoleDeep, queryPart } from "../../../test/queries";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { Button } from "../Button";
import { Checkbox, CheckboxGroup } from "../Checkbox";
import { Input } from "../Input";
import { NumberInput } from "../NumberInput";
import { RadioGroup } from "../Radio";
import { Rating } from "../Rating";
import { Switch } from "../Switch";
import { Textarea } from "../Textarea";
import { Form, useForm, useFormContext, type FormInstance } from "./Form";
import { FormField } from "./FormField";
import type { FormApi } from "./formStore";

const t = resolveTokens({ design: { preset: "touch" } });
const flush = () => act(() => new Promise<void>((r) => setTimeout(r, 0)));

function SubmitButton() {
  const form = useFormContext();
  return <Button onPress={() => form?.submit()}>Submit</Button>;
}

describe("FormField", () => {
  it("renders label (required indicator), control and helper text", async () => {
    await render(
      <FormField label="Email" required helperText="We never share it">
        <Input />
      </FormField>,
    );
    expect(screen.getByLabelText("Email, required")).toBeTruthy();
    expect(queryPart("required-indicator", "form-field")).toBeTruthy();
    // the control is named by the label
    expect(screen.getByLabelText("Email").props.value).toBe("");
    expect(screen.getByText("We never share it")).toBeTruthy();
  });

  it("validates on blur and shows the error as a polite alert", async () => {
    await render(
      <FormField label="Email" rules={{ required: true, email: true }}>
        <Input />
      </FormField>,
    );
    const field = screen.getByLabelText("Email");
    await fireEvent(field, "blur");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Please fill out this field.");
    expect(alert.props.accessibilityLiveRegion).toBe("polite");
    expect(alert).toHaveStyle({ color: t.colors["danger-color"] });
    // the control gets the invalid state and the message as its hint
    expect(queryPart("wrapper", "input")).toHaveStyle({
      borderColor: t.colors["danger-color"],
    });
    expect(screen.getByLabelText("Email").props.accessibilityHint).toBe(
      "Please fill out this field.",
    );
    // once validated, every change re-validates
    await fireEvent.changeText(screen.getByLabelText("Email"), "nope");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a valid email address.",
    );
    await fireEvent.changeText(screen.getByLabelText("Email"), "a@b.co");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("validateOn change, minLength / pattern / custom messages", async () => {
    await render(
      <FormField
        label="Code"
        validateOn="change"
        rules={{
          minLength: 3,
          pattern: /[a-z]+/,
          validate: (v) => v !== "bad" || "No bad words",
        }}
      >
        <Input />
      </FormField>,
    );
    await fireEvent.changeText(screen.getByLabelText("Code"), "ab");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please use at least 3 characters.",
    );
    await fireEvent.changeText(screen.getByLabelText("Code"), "AB1");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please match the requested format.",
    );
    await fireEvent.changeText(screen.getByLabelText("Code"), "bad");
    expect(screen.getByRole("alert")).toHaveTextContent("No bad words");
  });

  it("custom required message", async () => {
    await render(
      <FormField label="Name" rules={{ required: "Tell us your name" }}>
        <Input />
      </FormField>,
    );
    await fireEvent(screen.getByLabelText("Name"), "blur");
    expect(screen.getByRole("alert")).toHaveTextContent("Tell us your name");
  });

  it("translates the messages", async () => {
    await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <FormField label="邮箱" required>
          <Input />
        </FormField>
      </MinervaProvider>,
    );
    expect(screen.getByLabelText("邮箱, 必填")).toBeTruthy();
    await fireEvent(screen.getByLabelText("邮箱"), "blur");
    expect(screen.getByRole("alert")).toHaveTextContent("请填写此字段。");
  });

  it("errorMessage makes it invalid; invalid={false} hides it; helper hidden while invalid", async () => {
    const { rerender } = await render(
      <FormField label="A" helperText="help" errorMessage="Server says no">
        <Input />
      </FormField>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Server says no");
    expect(screen.queryByText("help")).toBeNull();
    await rerender(
      <FormField
        label="A"
        helperText="help"
        errorMessage="Server says no"
        invalid={false}
      >
        <Input />
      </FormField>,
    );
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByText("help")).toBeTruthy();
  });

  it("render-function children get the control props and the field state", async () => {
    await render(
      <FormField label="Bio" rules={{ required: true }}>
        {(control, meta) => (
          <>
            <TextInput
              accessibilityLabel="bio"
              value={control.value as string}
              onChangeText={control.onChange as (v: string) => void}
              onBlur={control.onBlur}
            />
            <Text>{`status:${meta.status} touched:${meta.touched}`}</Text>
          </>
        )}
      </FormField>,
    );
    expect(screen.getByText("status:idle touched:false")).toBeTruthy();
    await fireEvent(screen.getByLabelText("bio"), "blur");
    expect(screen.getByText("status:invalid touched:true")).toBeTruthy();
    await fireEvent.changeText(screen.getByLabelText("bio"), "hello");
    expect(screen.getByText("status:valid touched:true")).toBeTruthy();
  });

  it("checked controls validate on change (Switch / Checkbox required)", async () => {
    await render(
      <>
        <FormField name="agree" rules={{ required: true }}>
          <Checkbox label="I agree" />
        </FormField>
      </>,
    );
    await fireEvent.press(screen.getByRole("checkbox", { name: "I agree" }));
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.queryByRole("alert")).toBeNull();
    await fireEvent.press(screen.getByRole("checkbox"));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please check this box if you want to proceed.",
    );
    expect(queryPart("control", "checkbox")).toHaveStyle({
      borderColor: t.colors["danger-color"],
    });
  });
});

describe("Form", () => {
  it("submit validates every field: onSubmitFailed, then onSubmit with the values", async () => {
    const onSubmit = vi.fn();
    const onSubmitFailed = vi.fn();
    await render(
      <Form onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
        <FormField
          name="email"
          label="Email"
          rules={{ required: true, email: true }}
        >
          <Input />
        </FormField>
        <FormField name="age" label="Age" rules={{ min: 18 }}>
          <NumberInput />
        </FormField>
        <SubmitButton />
      </Form>,
    );
    expect(getByRoleDeep("form")).toBeTruthy();
    await fireEvent.press(screen.getByRole("button", { name: "Submit" }));
    await flush();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onSubmitFailed).toHaveBeenCalledWith({
      email: [expect.objectContaining({ key: "validation.valueMissing" })],
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please fill out this field.",
    );

    await fireEvent.changeText(
      screen.getByLabelText("Email"),
      "ada@example.com",
    );
    await fireEvent.changeText(screen.getByLabelText("Age"), "16");
    await fireEvent(screen.getByLabelText("Age"), "blur");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Value must be 18 or more.",
    );
    await fireEvent.changeText(screen.getByLabelText("Age"), "30");
    await fireEvent(screen.getByLabelText("Age"), "blur");
    await fireEvent.press(screen.getByRole("button", { name: "Submit" }));
    await flush();
    expect(onSubmit).toHaveBeenCalledWith({
      email: "ada@example.com",
      age: 30,
    });
  });

  it("awaits the async validators before submitting", async () => {
    const onSubmit = vi.fn();
    const onSubmitFailed = vi.fn();
    const form = createRef<FormApi>();
    await render(
      <Form ref={form} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
        <FormField
          name="user"
          label="User"
          defaultValue="taken"
          rules={{
            validateAsync: async (v) =>
              new Promise((r) =>
                setTimeout(() => r(v !== "taken" || "Name taken"), 10),
              ),
          }}
        >
          <Input />
        </FormField>
      </Form>,
    );
    let result: boolean | undefined;
    await act(async () => {
      result = await form.current!.submit();
    });
    expect(result).toBe(false);
    expect(onSubmitFailed).toHaveBeenCalledWith({
      user: [expect.objectContaining({ message: "Name taken" })],
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Name taken");
    await fireEvent.changeText(screen.getByLabelText("User"), "free");
    await act(async () => {
      result = await form.current!.submit();
    });
    expect(result).toBe(true);
    expect(onSubmit).toHaveBeenCalledWith({ user: "free" });
  });

  it("wires every control kind and reports their values", async () => {
    const onSubmit = vi.fn();
    await render(
      <Form
        onSubmit={onSubmit}
        initialValues={{ plan: "pro", qty: 2, tags: ["a"] }}
      >
        <FormField name="notes" label="Notes">
          <Textarea />
        </FormField>
        <FormField name="news" label="News">
          <Switch />
        </FormField>
        <FormField name="terms">
          <Checkbox label="Terms" />
        </FormField>
        <FormField name="plan" label="Plan">
          <RadioGroup options={["free", "pro"]} />
        </FormField>
        <FormField name="tags" label="Tags">
          <CheckboxGroup options={["a", "b"]} />
        </FormField>
        <FormField name="qty" label="Qty">
          <NumberInput />
        </FormField>
        <FormField name="score" label="Score">
          <Rating />
        </FormField>
        <SubmitButton />
      </Form>,
    );
    await fireEvent.changeText(screen.getByLabelText("Notes"), "hi");
    await fireEvent.press(screen.getByRole("switch", { name: "News" }));
    await fireEvent.press(screen.getByRole("checkbox", { name: "Terms" }));
    await fireEvent.press(screen.getByRole("radio", { name: "free" }));
    await fireEvent.press(screen.getByRole("checkbox", { name: "b" }));
    expect(screen.getByRole("adjustable", { name: "Qty" })).toHaveDisplayValue(
      "2",
    );
    await fireEvent(
      screen.getByRole("adjustable", { name: "Score" }),
      "accessibilityAction",
      {
        nativeEvent: { actionName: "increment" },
      },
    );
    await fireEvent.press(screen.getByRole("button", { name: "Submit" }));
    await flush();
    expect(onSubmit).toHaveBeenCalledWith({
      notes: "hi",
      news: true,
      terms: true,
      plan: "free",
      tags: ["a", "b"],
      qty: 2,
      score: 1,
    });
  });

  it("useForm: reactive values / errors, reset, setFieldValue", async () => {
    const holder: { form?: FormInstance } = {};
    function Demo() {
      const form = useForm();
      useEffect(() => {
        holder.form = form;
      });
      return (
        <Form form={form}>
          <FormField name="name" label="Name" rules={{ required: true }}>
            <Input />
          </FormField>
          <Text>{`valid:${form.isValid} dirty:${form.isDirty} name:${String(form.values.name)}`}</Text>
        </Form>
      );
    }
    await render(<Demo />);
    expect(screen.getByText("valid:true dirty:false name:")).toBeTruthy();
    await act(async () => {
      await holder.form!.submit();
    });
    expect(screen.getByText("valid:false dirty:false name:")).toBeTruthy();
    expect(holder.form!.errors.name[0].key).toBe("validation.valueMissing");
    await act(() => holder.form!.setFieldValue("name", "Ada"));
    expect(screen.getByText("valid:true dirty:true name:Ada")).toBeTruthy();
    expect(screen.getByLabelText("Name")).toHaveDisplayValue("Ada");
    await act(() => holder.form!.reset());
    expect(screen.getByText("valid:true dirty:false name:")).toBeTruthy();
    expect(screen.getByLabelText("Name")).toHaveDisplayValue("");
    await act(() => holder.form!.reset({ name: "Bob" }));
    expect(screen.getByLabelText("Name")).toHaveDisplayValue("Bob");
  });

  it("disabled / readOnly forms pass the state to the controls", async () => {
    await render(
      <>
        <Form disabled>
          <FormField name="a" label="A">
            <Input />
          </FormField>
        </Form>
        <Form readOnly>
          <FormField name="b" label="B">
            <Input />
          </FormField>
        </Form>
      </>,
    );
    expect(screen.getByLabelText("A")).toBeDisabled();
    expect(screen.getByLabelText("B").props.editable).toBe(false);
  });

  it("a removed field leaves the values", async () => {
    const onSubmit = vi.fn();
    const form = createRef<FormApi>();
    const { rerender } = await render(
      <Form ref={form} onSubmit={onSubmit}>
        <FormField name="a" label="A" defaultValue="1">
          <Input />
        </FormField>
        <FormField name="b" label="B" defaultValue="2">
          <Input />
        </FormField>
      </Form>,
    );
    expect(form.current!.getValues()).toEqual({ a: "1", b: "2" });
    await rerender(
      <Form ref={form} onSubmit={onSubmit}>
        <FormField name="a" label="A" defaultValue="1">
          <Input />
        </FormField>
      </Form>,
    );
    expect(form.current!.getValues()).toEqual({ a: "1" });
  });
});
