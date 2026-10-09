// @vitest-environment happy-dom
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import CodeBlock from "./CodeBlock";
import { SiteProviders, setupI18n } from "../test/utils";

beforeAll(setupI18n);

const mockClipboard = () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  return writeText;
};

describe("CodeBlock", () => {
  it("shows the file name and copies the trimmed source", async () => {
    const user = userEvent.setup();
    render(
      <SiteProviders>
        <CodeBlock code={"\nconst a = 1;\n\n"} language="ts" title="a.ts" />
      </SiteProviders>,
    );
    // userEvent.setup() installs its own clipboard: replace it afterwards
    const writeText = mockClipboard();
    expect(screen.getByText("a.ts")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "a.ts code" })).toHaveTextContent(
      "const a = 1;",
    );

    expect(screen.getByRole("region", { name: "a.ts code" })).toHaveAttribute(
      "data-minerva",
      "code-block",
    );

    await user.click(screen.getByRole("button", { name: "Copy code" }));

    expect(writeText).toHaveBeenCalledWith("const a = 1;");
    expect(
      await screen.findByRole("button", { name: "Copied!" }),
    ).toBeInTheDocument();
    // announced to screen readers
    expect(screen.getAllByText("Copied!").length).toBeGreaterThan(0);
  });

  it("labels the language when there is no file name", () => {
    render(
      <SiteProviders>
        <CodeBlock code="pnpm i" language="bash" />
      </SiteProviders>,
    );
    expect(screen.getByText("Terminal")).toBeInTheDocument();
  });

  it("switches tabs by click and arrow keys, and copies the selected one", async () => {
    const user = userEvent.setup();
    render(
      <SiteProviders>
        <CodeBlock
          tabs={[
            { label: "pnpm", code: "pnpm add x", language: "bash" },
            { label: "npm", code: "npm install x", language: "bash" },
            { label: "yarn", code: "yarn add x", language: "bash" },
          ]}
        />
      </SiteProviders>,
    );
    const writeText = mockClipboard();
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("pnpm add x");

    await user.click(screen.getByRole("tab", { name: "npm" }));
    expect(screen.getByRole("tab", { name: "npm" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(panel).toHaveTextContent("npm install x");

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "yarn" })).toHaveFocus();
    expect(panel).toHaveTextContent("yarn add x");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "pnpm" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("pnpm add x");
  });
});
