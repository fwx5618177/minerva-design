// A sign-up form built from React form controls, filled in by a user.
import { useState } from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  ConfigProvider,
  FormField,
  Input,
  Radio,
  RadioGroup,
  Switch,
  TagInput,
  TimePicker,
  ToastProvider,
  toast,
  type CascaderOption,
} from "minerva-design";

const countries = ["France", "Germany", "Japan", "China", "Canada"].map(
  (name) => ({ label: name, value: name.toLowerCase() }),
);
const interests = ["Design", "React", "Accessibility", "Testing"];

const offices: CascaderOption[] = [
  {
    value: "eu",
    label: "Europe",
    children: [
      { value: "paris", label: "Paris" },
      { value: "berlin", label: "Berlin" },
    ],
  },
  { value: "asia", label: "Asia" }, // loaded lazily
];

interface SignUpData {
  name: string;
  email: string;
  plan: string | number;
  country: string;
  interests: string[];
  office: (string | number)[];
  callTime: string | null;
  newsletter: boolean;
}

const SignUpForm = ({ onSubmit }: { onSubmit: (data: SignUpData) => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<string | number>("free");
  const [country, setCountry] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [officeOptions, setOfficeOptions] = useState(offices);
  const [office, setOffice] = useState<(string | number)[]>([]);
  const [callTime, setCallTime] = useState<Date | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loadOffices = (path: CascaderOption[]) => {
    const region = path[path.length - 1];
    setTimeout(() => {
      setOfficeOptions((prev) =>
        prev.map((o) =>
          o.value === region.value
            ? {
                ...o,
                children: [
                  { value: "tokyo", label: "Tokyo", isLeaf: true },
                  { value: "shanghai", label: "Shanghai", isLeaf: true },
                ],
              }
            : o,
        ),
      );
    }, 20);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email";
    if (office.length === 0) next.office = "Please choose an office";
    if (!terms) next.terms = "You must accept the terms";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.danger("Please fix the highlighted fields");
      return;
    }
    toast.success(`Welcome aboard, ${name}!`);
    onSubmit({
      name,
      email,
      plan,
      country,
      interests: picked.map((i) => i.toLowerCase()),
      office,
      callTime: callTime
        ? `${String(callTime.getHours()).padStart(2, "0")}:${String(callTime.getMinutes()).padStart(2, "0")}`
        : null,
      newsletter,
    });
  };

  return (
    <form aria-label="Sign up" noValidate onSubmit={submit}>
      <FormField label="Full name" errorMessage={errors.name}>
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
      <FormField label="Email" errorMessage={errors.email}>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <RadioGroup label="Plan" name="plan" value={plan} onChange={setPlan}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
      <AutoComplete
        name="country"
        label="Country"
        options={countries}
        value={country}
        onChange={setCountry}
      />
      <FormField label="Interests">
        <TagInput
          name="interests"
          options={interests}
          value={picked}
          onChange={setPicked}
        />
      </FormField>
      <Cascader
        name="office"
        label="Office"
        options={officeOptions}
        value={office}
        onChange={(value) => setOffice(value)}
        loadData={loadOffices}
      />
      {errors.office && <p role="alert">{errors.office}</p>}
      <TimePicker
        label="Preferred call time"
        format="HH:mm"
        showSecond={false}
        value={callTime}
        onChange={(date) => setCallTime(date ?? null)}
      />
      <Switch
        label="Subscribe to the newsletter"
        checked={newsletter}
        onChange={setNewsletter}
      />
      <Checkbox
        label="I accept the terms"
        checked={terms}
        onChange={setTerms}
        error={Boolean(errors.terms)}
        helperText={errors.terms}
      />
      <Button type="submit">Create account</Button>
    </form>
  );
};

const renderApp = () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  render(
    <ConfigProvider theme="light">
      <ToastProvider>
        <SignUpForm onSubmit={onSubmit} />
      </ToastProvider>
    </ConfigProvider>,
  );
  return { user, onSubmit };
};

afterEach(() => {
  act(() => toast.dismiss());
});

describe("e2e: sign-up form", () => {
  it("shows validation errors and an error toast when submitted empty", async () => {
    const { user, onSubmit } = renderApp();

    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText("Please enter your name"),
    ).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    expect(screen.getByText("Please choose an office")).toHaveAttribute(
      "role",
      "alert",
    );
    expect(screen.getByText("You must accept the terms")).toBeInTheDocument();
    expect(
      await screen.findByText("Please fix the highlighted fields"),
    ).toBeInTheDocument();
    // errors are announced on the fields themselves
    expect(screen.getByRole("textbox", { name: "Full name" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("completes the whole form with mouse and keyboard and submits", async () => {
    const { user, onSubmit } = renderApp();

    await user.type(screen.getByRole("textbox", { name: "Full name" }), "Ada");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "ada@example.com",
    );
    await user.click(screen.getByRole("radio", { name: "Pro" }));

    // AutoComplete: type to filter, pick with the keyboard
    const countryInput = screen.getByRole("combobox", { name: "Country" });
    await user.type(countryInput, "ja");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(countryInput).toHaveValue("Japan");
    expect(countryInput).toHaveAttribute("aria-expanded", "false");

    // TagInput: pick several suggestions, remove one through its tag
    const interestsInput = screen.getByRole("combobox", { name: "Interests" });
    await user.click(interestsInput);
    await user.click(screen.getByRole("option", { name: "React" }));
    await user.click(interestsInput);
    await user.click(screen.getByRole("option", { name: "Testing" }));
    await user.click(screen.getByRole("button", { name: "Remove Testing" }));
    expect(interestsInput).toHaveFocus();
    await user.keyboard("{Escape}");

    // Cascader with a lazily loaded branch, driven by the keyboard
    const officeInput = screen.getByRole("combobox", { name: "Office" });
    officeInput.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: "Europe" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{ArrowRight}");
    // children are loading; focus moves in once they arrive
    await waitFor(() =>
      expect(screen.getByRole("option", { name: "Tokyo" })).toHaveFocus(),
    );
    await user.keyboard("{ArrowDown}{Enter}");
    expect(officeInput).toHaveValue("Asia / Shanghai");
    expect(officeInput).toHaveFocus();

    // TimePicker: open with the keyboard and pick from the columns
    const timeInput = screen.getByRole("textbox", {
      name: "Preferred call time",
    });
    await user.click(timeInput);
    const hours = screen.getByRole("listbox", { name: "Hours" });
    await user.click(within(hours).getByRole("option", { name: "14" }));
    const minutes = screen.getByRole("listbox", { name: "Minutes" });
    await user.click(within(minutes).getByRole("option", { name: "30" }));
    expect(timeInput).toHaveValue("14:30");
    await user.keyboard("{Escape}");

    await user.click(
      screen.getByRole("switch", { name: "Subscribe to the newsletter" }),
    );
    await user.click(
      screen.getByRole("checkbox", { name: "I accept the terms" }),
    );
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({
      name: "Ada",
      email: "ada@example.com",
      plan: "pro",
      country: "Japan",
      interests: ["react"],
      office: ["asia", "shanghai"],
      callTime: "14:30",
      newsletter: true,
    });
    expect(await screen.findByText("Welcome aboard, Ada!")).toBeInTheDocument();
  });

  it("clears the time with the labelled clear button", async () => {
    const { user } = renderApp();
    const timeInput = screen.getByRole("textbox", {
      name: "Preferred call time",
    });
    await user.type(timeInput, "09:15");
    expect(timeInput).toHaveValue("09:15");
    await user.click(screen.getByRole("button", { name: "Clear time" }));
    expect(timeInput).toHaveValue("");
    expect(timeInput).toHaveFocus();
  });
});
