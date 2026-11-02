import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Taro from "@tarojs/taro";
import * as M from "./index";

afterEach(() => vi.restoreAllMocks());

const json = '{\n  "id": 42,\n  "ok": true\n}';
const texts = (container: HTMLElement, selector: string) =>
  [...container.querySelectorAll(selector)].map((node) => node.textContent);

describe("CodeBlock (Taro)", () => {
  it("renders plain text without a language", () => {
    const { container } = render(<M.CodeBlock code={json} copyable={false} />);
    expect(container.querySelector("[class*=mn-code-token-]")).toBeNull();
    expect(container.querySelector(".mn-code")?.textContent).toBe(json);
    expect(container.querySelector(".mn-code-toolbar")).toBeNull();
  });

  it("highlights the language into token Text, keeping the text verbatim", () => {
    const { container } = render(
      <M.CodeBlock code={json} language="json" copyable={false} />,
    );
    expect(texts(container, ".mn-code-token-property")).toEqual([
      '"id"',
      '"ok"',
    ]);
    expect(texts(container, ".mn-code-token-number")).toEqual(["42"]);
    expect(container.querySelector(".mn-code")?.textContent).toBe(json);
    // no label without showLanguage
    expect(container.querySelector(".mn-code-language")).toBeNull();
  });

  it("highlight={false} keeps the text plain", () => {
    const { container } = render(
      <M.CodeBlock
        code={json}
        language="json"
        highlight={false}
        copyable={false}
      />,
    );
    expect(container.querySelector("[class*=mn-code-token-]")).toBeNull();
  });

  it("numbers the lines, shows the language and copies the raw text", async () => {
    const copy = vi
      .spyOn(Taro, "setClipboardData")
      .mockResolvedValue({ errMsg: "ok", data: json });
    const { container } = render(
      <M.CodeBlock code={json} language="json" showLineNumbers showLanguage />,
    );
    const numbers = [...container.querySelectorAll(".mn-code-line-number")];
    expect(numbers.map((n) => n.textContent)).toEqual(["1", "2", "3", "4"]);
    expect(numbers[0]).toHaveAttribute("aria-hidden");
    expect(container.querySelector(".mn-code-language")?.textContent).toBe(
      "JSON",
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Copied" }),
      ).toBeInTheDocument(),
    );
    expect(copy).toHaveBeenCalledWith({ data: json });
  });
});
