import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MinervaUpload, type UploadItem } from "./upload";
import "../../elements/upload";
import { resetDevWarnings } from "../../internal/dev";
import { $, mount, settle } from "../../../tests/utils";

afterEach(() => {
  vi.restoreAllMocks();
  resetDevWarnings();
});

const fileInput = (el: MinervaUpload) => $<HTMLInputElement>(el, "input");
const selectButton = (el: MinervaUpload) => $(el, "[part=select-button]");
const file = (name: string, type = "text/plain", size = 3) =>
  new File(["x".repeat(size)], name, { type });

/** Picks `files` through the hidden file input (as the picker would). */
function pick(el: MinervaUpload, files: File[]) {
  const input = fileInput(el);
  Object.defineProperty(input, "files", { configurable: true, value: files });
  input.dispatchEvent(new Event("change"));
}

/** Drops `files` on the dropzone. */
function drop(el: MinervaUpload, files: File[]) {
  const event = new Event("drop", { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", { value: { files } });
  $(el, ".dropzone").dispatchEvent(event);
}

describe("<minerva-upload>", () => {
  it("is registered", () => {
    expect(customElements.get("minerva-upload")).toBe(MinervaUpload);
  });

  it("renders lib-core's structure: labelled group, dropzone, select button", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="Attachments"></minerva-upload>`,
    );
    const group = $(el, ".upload");
    expect(group).toHaveAttribute("role", "group");
    expect(group).toHaveAttribute("aria-labelledby", "label");
    expect(group).toHaveAttribute("aria-busy", "false");
    expect($(el, ".label").textContent).toBe("Attachments");
    expect(selectButton(el).textContent).toContain("Select files");
    expect(fileInput(el).hidden).toBe(true);
    expect(fileInput(el)).toHaveAttribute("tabindex", "-1");
    expect(fileInput(el)).toHaveAttribute("aria-label", "Attachments");
    expect(el.shadowRoot!.querySelector(".list")).toBeNull();
  });

  it("the select button opens the picker; picked files are listed and announced", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="Files" multiple></minerva-upload>`,
    );
    const click = vi.spyOn(fileInput(el), "click").mockImplementation(() => {});
    await userEvent.click(selectButton(el));
    expect(click).toHaveBeenCalled();

    const onSelected = vi.fn();
    const onChange = vi.fn();
    el.addEventListener("minerva-files-selected", onSelected);
    el.addEventListener("minerva-change", onChange);
    const a = file("a.txt");
    const b = file("b.txt");
    pick(el, [a, b]);
    await el.updateComplete;
    expect(onSelected.mock.calls[0][0].detail.files).toEqual([a, b]);
    expect(el.files).toEqual([a, b]);
    expect(onChange.mock.calls[0][0].detail.value).toHaveLength(2);
    const items = el.shadowRoot!.querySelectorAll(".item");
    expect(items).toHaveLength(2);
    expect(items[0].querySelector(".info span")!.textContent).toBe("a.txt");
    expect(items[0].querySelector("[role=status]")!.textContent).toBe(
      "Uploaded",
    );
  });

  it("canceling minerva-files-selected keeps the list", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="F"></minerva-upload>`,
    );
    el.addEventListener("minerva-files-selected", (e) => e.preventDefault());
    pick(el, [file("a.txt")]);
    await el.updateComplete;
    expect(el.items).toEqual([]);
  });

  it("validates count, type and size with localized errors", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="F" accept=".pdf,image/*" max-size="10"></minerva-upload>`,
    );
    pick(el, [
      file("a.pdf", "application/pdf"),
      file("b.pdf", "application/pdf"),
    ]);
    await el.updateComplete;
    expect($(el, "[role=alert]").textContent?.trim()).toBe(
      "You can select up to 1 files",
    );
    pick(el, [file("a.txt")]);
    await el.updateComplete;
    expect($(el, "[role=alert]").textContent?.trim()).toBe(
      "a.txt: unsupported file type",
    );
    pick(el, [file("big.png", "image/png", 20)]);
    await el.updateComplete;
    expect($(el, "[role=alert]").textContent?.trim()).toBe(
      "big.png: file exceeds the size limit",
    );
    pick(el, [file("ok.png", "image/png")]);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("[part=error]")).toBeNull();
    expect(el.items).toHaveLength(1);
    // the single slot is taken: selection is blocked until replace / removal
    expect(selectButton(el)).toHaveAttribute("disabled");
  });

  it("replace mode swaps the single file; drag and drop selects too", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="F" replace></minerva-upload>`,
    );
    drop(el, [file("one.txt")]);
    await el.updateComplete;
    const over = new Event("dragover", { cancelable: true });
    $(el, ".dropzone").dispatchEvent(over);
    await el.updateComplete;
    expect($(el, ".dropzone").classList).toContain("dragging");
    drop(el, [file("two.txt")]);
    await el.updateComplete;
    expect(el.items.map((i) => i.name)).toEqual(["two.txt"]);
    expect($(el, ".dropzone").classList).not.toContain("dragging");
  });

  it("shows item states; remove / retry buttons fire events and move focus", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="F" multiple removable retryable></minerva-upload>`,
    );
    const items: UploadItem[] = [
      { id: "1", name: "a.txt", status: "uploading" },
      { id: "2", name: "b.txt", status: "error", error: "Network" },
      { id: "3", name: "c.txt", status: "done", previewUrl: "data:," },
    ];
    el.items = items;
    await el.updateComplete;
    const statuses = Array.from(el.shadowRoot!.querySelectorAll(".status")).map(
      (s) => s.textContent,
    );
    expect(statuses).toEqual(["Uploading", "Network", "Uploaded"]);
    expect($(el, ".statusError")).toHaveAttribute("role", "alert");
    expect($(el, "img.preview")).toHaveAttribute("alt", "");

    const onRetry = vi.fn();
    el.addEventListener("minerva-retry", onRetry);
    const retry = $<HTMLButtonElement>(el, "[part=retry-button]");
    expect(retry.getAttribute("aria-label")).toBe("Retry b.txt");
    await userEvent.click(retry);
    expect(onRetry.mock.calls[0][0].detail.item).toBe(items[1]);

    const removes = el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
      "[part=remove-button]",
    );
    expect(removes[0].getAttribute("aria-label")).toBe("Remove a.txt");
    removes[0].focus();
    await userEvent.keyboard("{Enter}");
    await el.updateComplete;
    expect(el.items.map((i) => i.id)).toEqual(["2", "3"]);
    const next = el.shadowRoot!.querySelector(
      "[data-item-id='2'] [part=remove-button]",
    );
    expect(el.shadowRoot!.activeElement).toBe(next);

    el.addEventListener("minerva-remove", (e) => e.preventDefault(), {
      once: true,
    });
    await userEvent.click(next as HTMLElement);
    await el.updateComplete;
    expect(el.items).toHaveLength(2);
  });

  it("uses custom texts", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="F"></minerva-upload>`,
    );
    el.texts = { select: "Browse", tooMany: (n) => `Max ${n}` };
    await el.updateComplete;
    expect(selectButton(el).textContent).toContain("Browse");
    pick(el, [file("a"), file("b")]);
    await el.updateComplete;
    expect($(el, "[role=alert]").textContent?.trim()).toBe("Max 1");
  });

  it("loading blocks selection and sets aria-busy", async () => {
    const el = await mount<MinervaUpload>(
      `<minerva-upload label="F" loading></minerva-upload>`,
    );
    expect($(el, ".upload")).toHaveAttribute("aria-busy", "true");
    expect(selectButton(el)).toHaveAttribute("loading");
    pick(el, [file("a.txt")]);
    await el.updateComplete;
    expect(el.items).toHaveLength(0);
  });

  it("participates in forms: files as FormData, fileMissing, reset, disabled", async () => {
    document.body.innerHTML = `<form><minerva-upload name="docs" label="Docs" multiple required></minerva-upload></form>`;
    await settle();
    const form = document.querySelector("form")!;
    const el = form.querySelector<MinervaUpload>("minerva-upload")!;
    // the ElementInternals polyfill only serializes string entries into the
    // form: check the FormData handed to setFormValue() instead (spied on
    // the prototype: the polyfill's internals objects are not extensible)
    const setFormValue = vi.spyOn(ElementInternals.prototype, "setFormValue");
    expect(el.checkValidity()).toBe(false);
    expect(el.validity?.valueMissing).toBe(true);
    expect(el.validationMessage).toBe("Please select a file.");
    expect(form.checkValidity()).toBe(false);

    const a = file("a.txt");
    const b = file("b.txt");
    pick(el, [a, b]);
    await el.updateComplete;
    const data = setFormValue.mock.calls.at(-1)![0] as FormData;
    expect(data).toBeInstanceOf(FormData);
    expect(data.getAll("docs").map((f) => (f as File).name)).toEqual([
      "a.txt",
      "b.txt",
    ]);
    expect(el.checkValidity()).toBe(true);

    form.reset();
    await el.updateComplete;
    expect(el.items).toEqual([]);
    expect(el.checkValidity()).toBe(false);

    el.disabled = true;
    await el.updateComplete;
    expect(setFormValue).toHaveBeenLastCalledWith(null);
    expect(el.checkValidity()).toBe(true);

    const restored = new FormData();
    restored.append("docs", a);
    el.formStateRestoreCallback(restored);
    await el.updateComplete;
    expect(el.files).toEqual([a]);
  });

  it("is named by <label for> and localizes its texts", async () => {
    document.documentElement.lang = "fr";
    const el = await mount<MinervaUpload>(
      `<label for="u">Pièces jointes</label><minerva-upload id="u"></minerva-upload>`,
      "minerva-upload",
    );
    expect($(el, ".upload")).toHaveAttribute("aria-label", "Pièces jointes");
    expect(selectButton(el).textContent).not.toContain("Select files");
  });

  it("warns in development when max-count is set without multiple", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await mount(`<minerva-upload label="F" max-count="3"></minerva-upload>`);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("max-count"));
  });
});
