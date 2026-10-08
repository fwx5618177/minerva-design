import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../Input";
import { Form } from "./Form";
import { FormField } from "./FormField";

describe("FormField (react-native-web)", () => {
  it("shows the error as an alert and marks the input invalid", async () => {
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <FormField name="email" label="Email" rules={{ required: true }}>
          <Input />
        </FormField>
      </Form>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    fireEvent.blur(input);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Please fill out this field.",
      ),
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("form")).toHaveAttribute("data-minerva", "form");
  });
});
