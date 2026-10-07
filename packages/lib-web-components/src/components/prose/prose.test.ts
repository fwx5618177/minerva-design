import { describe, expect, it } from "vitest";
import { MinervaProse } from "./prose";
import "../../elements/prose";
import { mount } from "../../../tests/utils";

/** CSS text of every stylesheet applied to `scope` (adopted + <style>). */
const cssOf = (scope: Document | ShadowRoot) =>
  [
    ...Array.from(scope.adoptedStyleSheets ?? []).flatMap((sheet) =>
      Array.from(sheet.cssRules).map((rule) => rule.cssText),
    ),
    ...Array.from(scope.querySelectorAll("style")).map((s) => s.textContent),
  ].join("\n");

describe("<minerva-prose>", () => {
  it("registers", () => {
    expect(customElements.get("minerva-prose")).toBe(MinervaProse);
  });

  it("slots its content (light DOM stays styleable)", async () => {
    const el = await mount<MinervaProse>(
      `<minerva-prose><h2>Title</h2><ul><li><code>x</code></li></ul></minerva-prose>`,
    );
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();
    expect(el.querySelector("li code")).not.toBeNull();
  });

  it("injects the scoped prose rules into the document once", async () => {
    await mount(
      `<minerva-prose><p>a</p></minerva-prose><minerva-prose></minerva-prose>`,
    );
    const text = cssOf(document);
    expect(text).toContain("minerva-prose");
    expect(text).toMatch(/minerva-prose :where\(h1/);
    expect(text).toContain("--prose-font-size");
    expect(text).not.toContain(".prose");
    const count =
      Array.from(document.adoptedStyleSheets ?? []).filter((sheet) =>
        Array.from(sheet.cssRules).some((r) =>
          r.cssText.includes("minerva-prose"),
        ),
      ).length + document.querySelectorAll("#minerva-prose-styles").length;
    expect(count).toBe(1);
  });

  it("injects into the enclosing shadow root when rendered inside one", async () => {
    const host = document.createElement("div");
    document.body.replaceChildren(host);
    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = `<minerva-prose><p>inside</p></minerva-prose>`;
    await (root.querySelector("minerva-prose") as MinervaProse).updateComplete;
    expect(cssOf(root)).toContain("minerva-prose");
  });
});
