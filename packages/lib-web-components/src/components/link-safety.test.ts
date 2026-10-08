// Lit binds attributes as-is: every element that renders a link from
// properties / data goes through core's `sanitizeUrl` (same rule as
// @minerva/lib-core), and target="_blank" gets rel="noopener noreferrer"
// unless a rel is given.
import { afterEach, describe, expect, it, vi } from "vitest";
import "../elements/text-link";
import "../elements/card";
import "../elements/nav-tree";
import type { MinervaNavTree } from "./nav-tree/nav-tree";
import { resetDevWarnings } from "../internal/dev";
import { $, mount, settle } from "../../tests/utils";

const UNSAFE = [
  "javascript:alert(1)",
  " JavaScript:alert(1)",
  "java\tscript:x",
  "vbscript:x",
];

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
  document.body.innerHTML = "";
});

const silence = () => vi.spyOn(console, "error").mockImplementation(() => {});

describe("link safety", () => {
  it.each(UNSAFE)(
    "<minerva-text-link> drops %j with a dev warning",
    async (href) => {
      const error = silence();
      const el = await mount(`<minerva-text-link>Docs</minerva-text-link>`);
      el.setAttribute("href", href);
      await settle();
      expect($(el, "a")).not.toHaveAttribute("href");
      expect(error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[minerva] <minerva-text-link>: blocked an unsafe link URL",
        ),
      );
    },
  );

  it.each(UNSAFE)("<minerva-card as=a> drops %j", async (href) => {
    silence();
    const el = await mount(`<minerva-card as="a">x</minerva-card>`);
    el.setAttribute("href", href);
    await settle();
    expect($(el, "a")).not.toHaveAttribute("href");
  });

  it.each(UNSAFE)("<minerva-nav-tree> items drop %j", async (href) => {
    silence();
    const el = await mount<MinervaNavTree>(
      `<minerva-nav-tree></minerva-nav-tree>`,
    );
    el.sections = [
      {
        id: "s",
        items: [
          { id: "a", label: "Evil", href },
          { id: "b", label: "Ok", href: "/ok" },
        ],
      },
    ];
    await settle();
    expect($(el, '[data-id="a"]')).not.toHaveAttribute("href");
    expect($(el, '[data-id="a"]').tagName).toBe("A");
    expect($(el, '[data-id="b"]')).toHaveAttribute("href", "/ok");
  });

  it("keeps safe URLs and does not warn", async () => {
    const error = silence();
    const text = await mount(
      `<minerva-text-link href="mailto:a@example.com">Mail</minerva-text-link>`,
    );
    const card = await mount(
      `<minerva-card as="a" href="/docs">x</minerva-card>`,
    );
    expect($(text, "a")).toHaveAttribute("href", "mailto:a@example.com");
    expect($(card, "a")).toHaveAttribute("href", "/docs");
    expect(error).not.toHaveBeenCalled();
  });

  it('adds rel="noopener noreferrer" to target="_blank" links without a rel', async () => {
    const a = await mount(
      `<minerva-text-link href="/a" target="_blank">A</minerva-text-link>`,
    );
    const b = await mount(
      `<minerva-text-link href="/b" target="_blank" rel="author">B</minerva-text-link>`,
    );
    const c = await mount(`<minerva-text-link href="/c">C</minerva-text-link>`);
    const d = await mount(
      `<minerva-card as="a" href="/d" target="_blank">D</minerva-card>`,
    );
    expect($(a, "a")).toHaveAttribute("rel", "noopener noreferrer");
    expect($(b, "a")).toHaveAttribute("rel", "author");
    expect($(c, "a")).not.toHaveAttribute("rel");
    expect($(d, "a")).toHaveAttribute("rel", "noopener noreferrer");
  });
});
