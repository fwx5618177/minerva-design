// Every button that a lib-core component renders for its own controls (clear,
// stepper, format, add / remove, close, pagination, password toggle, ...) must
// be type="button": inside a <form> a bare <button> submits the form.
// Only <Button> itself keeps the native default (documented behaviour).
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as lib from "./index";
import { portedCases } from "./test-utils/portedSsrCases";

const noop = () => {};

/** Components whose own controls are buttons, in an interesting state */
const extraCases: Array<[string, React.ReactElement]> = [
  [
    "Alert",
    <lib.Alert title="T" closable collapsible>
      Body
    </lib.Alert>,
  ],
  [
    "Tag",
    <lib.Tag closable clickable onClose={noop}>
      Tag
    </lib.Tag>,
  ],
  ["Chip", <lib.Chip label="Chip" onDelete={noop} />],
  [
    "Pagination",
    <lib.Pagination total={200} showQuickJumper showSizeChanger showTotal />,
  ],
  [
    "TextField",
    <lib.TextField
      name="t"
      label="T"
      type="password"
      defaultValue="v"
      clearable
    />,
  ],
  ["NumberInput", <lib.NumberInput defaultValue={2} />],
  ["JsonField", <lib.JsonField defaultValue='{"a":1}' />],
  [
    "KeyValueEditor",
    <lib.KeyValueEditor
      entries={[{ id: "1", key: "k", value: "v" }]}
      onChange={noop}
    />,
  ],
  ["TagInput", <lib.TagInput value={["a", "b"]} onChange={noop} />],
  [
    "Modal",
    <lib.Modal open title="Title">
      Body
    </lib.Modal>,
  ],
  [
    "Drawer",
    <lib.Drawer open title="Title">
      Body
    </lib.Drawer>,
  ],
  [
    "ConfirmDialog",
    <lib.ConfirmDialog
      open
      onOpenChange={noop}
      onConfirm={noop}
      title="Sure?"
    />,
  ],
];

const isButtonComponent = (name: string) =>
  name === "Button" || name === "IconButton";

describe("internal buttons never submit an enclosing form", () => {
  it.each(
    [...portedCases, ...extraCases].filter(
      ([name]) => !isButtonComponent(name),
    ),
  )("%s", (_, element) => {
    render(
      <lib.ConfigProvider theme="light">
        <form aria-label="host">{element}</form>
      </lib.ConfigProvider>,
    );
    // dialogs portal outside the form: check every button in the document
    const offenders = screen
      .queryAllByRole("button", { hidden: true })
      .filter(
        (button) =>
          button instanceof HTMLButtonElement &&
          button.getAttribute("type") !== "button",
      )
      .map((button) => button.outerHTML.slice(0, 120));
    expect(offenders).toEqual([]);
  });
});
