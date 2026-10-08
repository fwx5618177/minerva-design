import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRovingFocus, type RovingFocus } from "./roving-focus";

describe("createRovingFocus", () => {
  let roving: RovingFocus | null = null;

  const setup = (html: string) => {
    document.body.innerHTML = `<div id="list">${html}</div>`;
    return document.getElementById("list")!;
  };
  const items = () =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-minerva-item]"));
  const tabIndexes = () => items().map((el) => el.getAttribute("tabindex"));

  afterEach(() => {
    roving?.destroy();
    roving = null;
    document.body.innerHTML = "";
  });

  const MENU = `
    <div data-minerva-item>Apple</div>
    <div data-minerva-item data-disabled>Banana</div>
    <div data-minerva-item data-text-value="Cherry">🍒</div>
    <div data-minerva-item aria-disabled="true">Date</div>
    <div data-minerva-item>Elderberry</div>
  `;

  it("manages tabindex and moves with arrows, skipping disabled items", async () => {
    const user = userEvent.setup();
    const onActiveChange = vi.fn();
    const list = setup(MENU);
    roving = createRovingFocus(list, { onActiveChange });
    expect(tabIndexes()).toEqual(["0", "-1", "-1", "-1", "-1"]);

    items()[0].focus();
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(items()[2]);
    expect(tabIndexes()).toEqual(["-1", "-1", "0", "-1", "-1"]);
    expect(onActiveChange).toHaveBeenLastCalledWith(items()[2], 2);

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(items()[4]);
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(items()[0]);
    await user.keyboard("{End}");
    expect(roving.getActive()).toBe(items()[4]);
    await user.keyboard("{Home}");
    expect(roving.getActive()).toBe(items()[0]);
  });

  it("supports horizontal RTL lists without loop", async () => {
    const user = userEvent.setup();
    const list = setup(`
      <button data-minerva-item>1</button>
      <button data-minerva-item>2</button>
      <button data-minerva-item disabled>3</button>
    `);
    roving = createRovingFocus(list, {
      orientation: "horizontal",
      dir: "rtl",
      loop: false,
    });
    items()[0].focus();
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(items()[1]);
    // disabled 3rd item and no loop: stays
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(items()[1]);
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(items()[1]);
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(items()[0]);
  });

  it("typeahead moves to matching items", async () => {
    const user = userEvent.setup();
    const list = setup(MENU);
    roving = createRovingFocus(list, { typeahead: true });
    items()[0].focus();
    await user.keyboard("c");
    expect(document.activeElement).toBe(items()[2]);
    // disabled "Date" is not matched
    await user.keyboard("d");
    expect(document.activeElement).toBe(items()[2]);
  });

  it("typeahead accepts options and ignores modified keys", () => {
    const list = setup(MENU);
    roving = createRovingFocus(list, { typeahead: { timeout: 100 } });
    items()[0].focus();
    const event = new KeyboardEvent("keydown", {
      key: "e",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    items()[0].dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(items()[0]);
  });

  it("focusing an item makes it active without moving focus elsewhere", () => {
    const onActiveChange = vi.fn();
    const list = setup(MENU);
    roving = createRovingFocus(list, { onActiveChange });
    items()[4].focus();
    expect(roving.getActive()).toBe(items()[4]);
    expect(tabIndexes()[4]).toBe("0");
    expect(onActiveChange).toHaveBeenCalledWith(items()[4], 4);
  });

  it("setActive by index / element, with or without focus", () => {
    const list = setup(MENU);
    roving = createRovingFocus(list, { focusOnMove: false });
    roving.setActive(2);
    expect(roving.getActive()).toBe(items()[2]);
    expect(document.activeElement).not.toBe(items()[2]);
    roving.setActive(items()[4], { focus: true });
    expect(document.activeElement).toBe(items()[4]);
    roving.setActive(99);
    roving.setActive(document.body);
    expect(roving.getActive()).toBe(items()[4]);
  });

  it("does not move focus with focusOnMove=false", async () => {
    const user = userEvent.setup();
    const list = setup(MENU);
    roving = createRovingFocus(list, { focusOnMove: false });
    items()[0].focus();
    await user.keyboard("{ArrowDown}");
    expect(roving.getActive()).toBe(items()[2]);
    expect(document.activeElement).toBe(items()[0]);
  });

  it("keeps an existing tabindex=0 item and refreshes after changes", () => {
    const list = setup(`
      <div data-minerva-item tabindex="-1">a</div>
      <div data-minerva-item tabindex="0">b</div>
    `);
    roving = createRovingFocus(list);
    expect(roving.getActive()).toBe(items()[1]);
    items()[1].remove();
    const added = document.createElement("div");
    added.setAttribute("data-minerva-item", "");
    list.appendChild(added);
    roving.refresh();
    expect(roving.getActive()).toBe(items()[0]);
    expect(tabIndexes()).toEqual(["0", "-1"]);
  });

  it("uses custom getItems / isItemDisabled / getItemText and ignores handled events", () => {
    const list = setup(`<i id="a">x</i><i id="b">y</i><i id="c">z</i>`);
    const get = () => Array.from(list.querySelectorAll<HTMLElement>("i"));
    roving = createRovingFocus(list, {
      getItems: get,
      isItemDisabled: (el) => el.id === "b",
      getItemText: (el) => el.id,
      typeahead: true,
      pageSize: 5,
    });
    get()[0].focus();
    const key = (k: string) =>
      get()[0].dispatchEvent(
        new KeyboardEvent("keydown", {
          key: k,
          bubbles: true,
          cancelable: true,
        }),
      );
    key("ArrowDown");
    expect(roving.getActive()!.id).toBe("c");
    roving.setActive(0);
    key("c");
    expect(roving.getActive()!.id).toBe("c");
    roving.setActive(0);
    key("PageDown");
    expect(roving.getActive()!.id).toBe("c");

    roving.setActive(0);
    const handled = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: true,
    });
    handled.preventDefault();
    get()[0].dispatchEvent(handled);
    expect(roving.getActive()!.id).toBe("a");
  });

  it("does nothing without items and stops after destroy", async () => {
    const user = userEvent.setup();
    const list = setup(`<button id="other">x</button>`);
    roving = createRovingFocus(list);
    expect(roving.getActive()).toBeNull();
    document.getElementById("other")!.focus();
    await user.keyboard("{ArrowDown}");

    const list2 = setup(MENU);
    roving.destroy();
    roving = createRovingFocus(list2);
    roving.destroy();
    items()[0].focus();
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(items()[0]);
    roving = null;
  });
});

describe("createRovingFocus with shadow DOM items", () => {
  it("resolves the item from a target inside the item's shadow root", () => {
    document.body.innerHTML = `<div id="list"><x-item data-minerva-item></x-item><x-item data-minerva-item></x-item></div>`;
    const list = document.getElementById("list")!;
    const items = Array.from(list.children) as HTMLElement[];
    const inner = items.map((item) => {
      const shadow = item.attachShadow({ mode: "open" });
      shadow.innerHTML = `<span tabindex="-1">x</span>`;
      return shadow.firstElementChild as HTMLElement;
    });
    const onActiveChange = vi.fn();
    const roving = createRovingFocus(list, { onActiveChange });
    inner[1].dispatchEvent(
      new FocusEvent("focusin", { bubbles: true, composed: true }),
    );
    expect(roving.getActive()).toBe(items[1]);
    expect(onActiveChange).toHaveBeenCalledWith(items[1], 1);
    roving.destroy();
    document.body.innerHTML = "";
  });
});
