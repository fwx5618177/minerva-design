import { afterEach, describe, expect, it } from "vitest";
import { hideOthers } from "./hide-others";

const setup = () => {
  document.body.innerHTML = `
    <header id="header">h</header>
    <main id="main">
      <section id="before">b</section>
      <div id="wrapper"><div id="dialog">d</div><span id="sibling">s</span></div>
    </main>
    <div id="live" aria-live="polite">live</div>
    <div id="keep" data-minerva-keep-visible>keep</div>
    <div id="pre" aria-hidden="true">pre</div>
    <div id="preFalse" aria-hidden="false">pre false</div>
    <script id="script"></script>
    <div id="portal">p</div>
  `;
  return (id: string) => document.getElementById(id)!;
};

const hidden = (el: Element) => el.getAttribute("aria-hidden");

afterEach(() => {
  document.body.innerHTML = "";
});

describe("hideOthers", () => {
  it("hides siblings along the path to the target, not its ancestors", () => {
    const $ = setup();
    const undo = hideOthers($("dialog"));

    for (const id of ["header", "before", "sibling", "portal", "preFalse"]) {
      expect(hidden($(id))).toBe("true");
    }
    for (const id of ["main", "wrapper", "dialog", "live", "keep", "script"]) {
      expect($(id).hasAttribute("aria-hidden")).toBe(false);
    }

    undo();
    for (const id of ["header", "before", "sibling", "portal"]) {
      expect($(id).hasAttribute("aria-hidden")).toBe(false);
    }
    // pre-existing values are preserved
    expect(hidden($("pre"))).toBe("true");
    // aria-hidden="false" counts as not hidden: we own it and remove it
    expect($("preFalse").hasAttribute("aria-hidden")).toBe(false);
  });

  it("is nested-safe: overlapping calls restore in any order", () => {
    const $ = setup();
    const undoDialog = hideOthers($("dialog"));
    const undoPortal = hideOthers($("portal"));
    expect(hidden($("main"))).toBe("true");
    expect(hidden($("header"))).toBe("true");

    undoDialog();
    // still hidden by the second call
    expect(hidden($("header"))).toBe("true");
    expect(hidden($("main"))).toBe("true");
    // only hidden by the first call
    expect($("before").hasAttribute("aria-hidden")).toBe(false);

    undoPortal();
    undoPortal();
    expect($("header").hasAttribute("aria-hidden")).toBe(false);
    expect($("main").hasAttribute("aria-hidden")).toBe(false);
    expect(hidden($("pre"))).toBe("true");
  });

  it("supports several targets, a custom root and the inert attribute", () => {
    const $ = setup();
    const undo = hideOthers([$("dialog"), $("before")], {
      root: $("main"),
      attribute: "inert",
    });
    expect($("sibling").hasAttribute("inert")).toBe(true);
    expect($("before").hasAttribute("inert")).toBe(false);
    expect($("header").hasAttribute("inert")).toBe(false);
    expect($("sibling").hasAttribute("aria-hidden")).toBe(false);
    undo();
    expect($("sibling").hasAttribute("inert")).toBe(false);
  });

  it("preserves a pre-existing inert attribute", () => {
    const $ = setup();
    $("header").setAttribute("inert", "");
    const undo = hideOthers($("dialog"), { attribute: "inert" });
    undo();
    expect($("header").hasAttribute("inert")).toBe(true);
  });

  it("ignores targets outside the root", () => {
    const $ = setup();
    const detached = document.createElement("div");
    const undo = hideOthers([detached, document.body]);
    expect($("header").hasAttribute("aria-hidden")).toBe(false);
    undo();
  });
});
