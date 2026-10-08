import { describe, expect, it } from "vitest";
import { adjacentTabbable, tabLeavesPanel } from "./tabbing";

const setup = (html: string) => {
  document.body.innerHTML = html;
  return (id: string) => document.getElementById(id)!;
};

describe("tabbing", () => {
  it("finds the tabbable before / after an anchor, skipping its own content", () => {
    const $ = setup(
      '<button id="a">a</button><div id="anchor" tabindex="0"><button id="inner">i</button></div><button id="b">b</button>',
    );
    expect(adjacentTabbable($("anchor"), document.body, false)).toBe($("b"));
    expect(adjacentTabbable($("anchor"), document.body, true)).toBe($("a"));
    expect(adjacentTabbable($("a"), document.body, true)).toBeNull();
    expect(adjacentTabbable($("b"), document.body, false)).toBeNull();
  });

  it("tells whether Tab leaves a panel", () => {
    const $ = setup(
      '<div id="panel" tabindex="-1"><button id="first">1</button><button id="last">2</button></div><div id="empty" tabindex="-1"><span id="text">t</span></div><button id="out">o</button>',
    );
    expect(tabLeavesPanel($("panel"), null, false)).toBe(false);
    expect(tabLeavesPanel($("panel"), $("out"), false)).toBe(false);
    expect(tabLeavesPanel($("empty"), $("text"), false)).toBe(true);
    expect(tabLeavesPanel($("panel"), $("last"), false)).toBe(true);
    expect(tabLeavesPanel($("panel"), $("first"), false)).toBe(false);
    expect(tabLeavesPanel($("panel"), $("first"), true)).toBe(true);
    expect(tabLeavesPanel($("panel"), $("panel"), true)).toBe(true);
    expect(tabLeavesPanel($("panel"), $("last"), true)).toBe(false);
  });
});
