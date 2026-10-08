import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { setLanguage } from "../../config/i18n";
import { Upload, type UploadItem, type UploadProps } from ".";

const png = (name = "a.png", size = 3) =>
  new File(["x".repeat(size)], name, { type: "image/png" });

type Listeners = {
  onRemove?: (item: UploadItem) => void;
  onRetry?: (item: UploadItem) => void;
};

function setup(
  props: Partial<UploadProps> & Listeners & Record<string, unknown> = {},
) {
  const onFilesSelected = vi.fn<(files: File[]) => void>();
  const utils = render(Upload, {
    props: {
      label: "Attachments",
      modelValue: [],
      onFilesSelected,
      ...props,
    },
  });
  const group = screen.getByRole("group", { name: "Attachments" });
  const dropzone = group.querySelector<HTMLElement>(".dropzone")!;
  const input = group.querySelector<HTMLInputElement>('input[type="file"]')!;
  return { ...utils, onFilesSelected, group, dropzone, input };
}

/** Changes the files of the (hidden) input like a native file picker */
const pick = async (input: HTMLInputElement, files: File[]) => {
  Object.defineProperty(input, "files", { configurable: true, value: files });
  await fireEvent.change(input);
};

const drop = (zone: HTMLElement, files: File[]) =>
  fireEvent.drop(zone, { dataTransfer: { files } });

describe("Upload", () => {
  it("renders a labelled group with a select button and a hidden labelled file input", () => {
    const { group, input } = setup({ accept: "image/*", multiple: true });
    expect(group).toHaveClass("upload");
    expect(group).toHaveAttribute("aria-busy", "false");
    expect(group).toHaveAttribute("data-minerva", "upload");
    expect(group).toHaveAttribute("data-part", "root");
    expect(group.querySelector(".label")).toHaveTextContent("Attachments");
    expect(group.querySelector(".label")).toHaveAttribute("data-part", "label");
    expect(group.querySelector(".dropzone")).toHaveAttribute(
      "data-part",
      "dropzone",
    );
    expect(screen.getByRole("button", { name: "Select files" })).toBeEnabled();
    expect(input).toHaveAttribute("aria-label", "Attachments");
    expect(input).toHaveAttribute("accept", "image/*");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(input.multiple).toBe(true);
    expect(input.hidden).toBe(true);
    expect(group.querySelector("ul")).toBeNull();
  });

  it("opens the native file picker when the select button is activated by click or keyboard", async () => {
    const user = userEvent.setup();
    const { input } = setup({ labels: { select: "Browse" } });
    const click = vi.spyOn(input, "click");
    await user.click(screen.getByRole("button", { name: "Browse" }));
    expect(click).toHaveBeenCalledTimes(1);
    await user.tab();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Browse" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(click).toHaveBeenCalledTimes(2);
  });

  it("renders the select slot in the button", () => {
    render(Upload, {
      props: { label: "Attachments" },
      slots: { select: () => h("b", "Pick") },
    });
    expect(screen.getByRole("button", { name: "Pick" })).toBeInTheDocument();
  });

  it("passes selected files through the input via user-event upload", async () => {
    const user = userEvent.setup();
    const { input, emitted } = setup({ accept: "image/*" });
    const file = png();
    await user.upload(input, file);
    expect(emitted().filesSelected).toEqual([[[file]]]);
  });

  it("toggles the dragging state on dragover/dragleave and clears it on drop", async () => {
    const { dropzone, group } = setup();
    await fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("dragging");
    expect(group).toHaveAttribute("data-dragging", "");
    // happy-dom's DragEvent ignores `relatedTarget` in its init dict, so define it explicitly.
    const dragLeave = async (relatedTarget: Node) => {
      const event = new Event("dragleave", { bubbles: true });
      Object.defineProperty(event, "relatedTarget", { value: relatedTarget });
      dropzone.dispatchEvent(event);
      await nextTick();
    };
    await dragLeave(screen.getByRole("button"));
    expect(dropzone).toHaveClass("dragging");
    await dragLeave(document.body);
    expect(dropzone).not.toHaveClass("dragging");
    await fireEvent.dragOver(dropzone);
    await drop(dropzone, []);
    expect(dropzone).not.toHaveClass("dragging");
    expect(group).not.toHaveAttribute("data-dragging");
  });

  it("ignores drops without a dataTransfer", async () => {
    const { dropzone, onFilesSelected } = setup();
    dropzone.dispatchEvent(new Event("drop", { bubbles: true }));
    await nextTick();
    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it("ignores drag highlighting and drops when disabled", async () => {
    const { dropzone, onFilesSelected, input, group } = setup({
      disabled: true,
    });
    expect(group).toHaveAttribute("data-disabled", "");
    expect(screen.getByRole("button", { name: "Select files" })).toBeDisabled();
    expect(input).toBeDisabled();
    await fireEvent.dragOver(dropzone);
    expect(dropzone).not.toHaveClass("dragging");
    await drop(dropzone, [png()]);
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("marks the group busy and disables selection while loading", async () => {
    const { group, dropzone, onFilesSelected } = setup({ loading: true });
    expect(group).toHaveAttribute("aria-busy", "true");
    expect(group).toHaveAttribute("data-loading", "");
    // the label is visually hidden behind the spinner while loading
    const button = dropzone.querySelector("button")!;
    expect(button).toHaveTextContent("Select files");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await drop(dropzone, [png()]);
    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it.each([
    [".pdf", new File(["x"], "Report.PDF", { type: "application/pdf" }), true],
    [
      ".pdf",
      new File(["x"], "report.doc", { type: "application/msword" }),
      false,
    ],
    [
      "application/json",
      new File(["{}"], "a.json", { type: "application/json" }),
      true,
    ],
    [
      "image/png, .jpg",
      new File(["x"], "photo.jpg", { type: "image/jpeg" }),
      true,
    ],
    [
      "image/png, .jpg",
      new File(["x"], "photo.gif", { type: "image/gif" }),
      false,
    ],
    ["*/*", new File(["x"], "any.bin", { type: "" }), true],
    [
      ", image/*",
      new File(["x"], "empty-rule.txt", { type: "text/plain" }),
      true,
    ],
  ])("accept=%j handles %s (accepted=%s)", async (accept, file, accepted) => {
    const { dropzone, onFilesSelected } = setup({ accept });
    await drop(dropzone, [file]);
    if (accepted) {
      expect(onFilesSelected).toHaveBeenCalledWith([file]);
      expect(screen.queryByRole("alert")).toBeNull();
    } else {
      expect(onFilesSelected).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toHaveTextContent(
        `${file.name}: unsupported file type`,
      );
    }
  });

  it("rejects multiple files in single mode and clears the error after a valid selection", async () => {
    const { dropzone, onFilesSelected } = setup();
    await drop(dropzone, [png("a.png"), png("b.png")]);
    expect(onFilesSelected).not.toHaveBeenCalled();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("You can select up to 1 files");
    // rendered like a danger Alert
    expect(alert).toHaveClass("alert", "error");
    expect(alert).toHaveAttribute("data-minerva", "alert");
    expect(alert).toHaveAttribute("data-color", "danger");
    expect(alert.querySelector('[role="img"]')).toHaveAttribute(
      "aria-label",
      "danger icon",
    );
    await drop(dropzone, [png("c.png")]);
    expect(onFilesSelected).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("reports oversized files by name", async () => {
    const { dropzone, onFilesSelected } = setup({ maxSize: 4 });
    await drop(dropzone, [png("big.png", 5)]);
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "big.png: file exceeds the size limit",
    );
  });

  it("accepts image drops and rejects unsupported or oversized files", async () => {
    const { dropzone, onFilesSelected } = setup({
      accept: "image/*",
      maxSize: 8,
    });
    const file = new File(["png"], "cover.png", { type: "image/png" });
    await drop(dropzone, [file]);
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    await drop(dropzone, [
      new File(["text"], "notes.txt", { type: "text/plain" }),
    ]);
    await drop(dropzone, [
      new File(["123456789"], "large.png", { type: "image/png" }),
    ]);
    expect(onFilesSelected).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("counts existing items toward maxCount in multiple mode", async () => {
    const value: UploadItem[] = [{ id: "1", name: "one.png", status: "done" }];
    const { dropzone, onFilesSelected } = setup({
      multiple: true,
      maxCount: 2,
      modelValue: value,
    });
    await drop(dropzone, [png("a.png"), png("b.png")]);
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You can select up to 2 files",
    );
  });

  it("rejects excess files instead of silently dropping them and can reselect the same file", async () => {
    const { input, onFilesSelected } = setup({ multiple: true, maxCount: 2 });
    const file = new File(["a"], "a.txt");
    await pick(input, [file, file, file]);
    expect(onFilesSelected).not.toHaveBeenCalled();
    await pick(input, [file]);
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    expect(input.value).toBe("");
  });

  it("ignores an empty selection", async () => {
    const { input, onFilesSelected } = setup();
    Object.defineProperty(input, "files", { configurable: true, value: null });
    await fireEvent.change(input);
    expect(onFilesSelected).not.toHaveBeenCalled();
  });

  it("allows single-file replacement without removing the saved file first", async () => {
    const { input, onFilesSelected } = setup({
      modelValue: [{ id: "saved", name: "old.png", status: "done" }],
      replace: true,
    });
    expect(input).not.toBeDisabled();
    const file = new File(["png"], "new.png", { type: "image/png" });
    await pick(input, [file]);
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });

  it("blocks selection at capacity", () => {
    const { input } = setup({
      modelValue: [{ id: "saved", name: "old.png", status: "done" }],
    });
    expect(input).toBeDisabled();
    expect(screen.getByRole("button", { name: "Select files" })).toBeDisabled();
  });

  it("renders item statuses, previews and only the actions that apply", () => {
    const value: UploadItem[] = [
      { id: "1", name: "up.png", status: "uploading", previewUrl: "blob:up" },
      { id: "2", name: "ok.png", status: "done" },
      { id: "3", name: "bad.png", status: "error" },
    ];
    const { container } = setup({
      modelValue: value,
      multiple: true,
      onRemove: vi.fn(),
      onRetry: vi.fn(),
    });
    const list = container.querySelector("ul")!;
    expect(list).toHaveClass("list");
    expect(list).toHaveAttribute("data-part", "list");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass("item");
    expect(items[0]).toHaveTextContent("Uploading");
    expect(items[1]).toHaveTextContent("Uploaded");
    expect(items[2]).toHaveTextContent("Upload failed");
    // public item hook: the status of each file
    expect(items.map((item) => item.getAttribute("data-status"))).toEqual([
      "uploading",
      "done",
      "error",
    ]);
    expect(
      screen.getAllByRole("status").map((s) => s.textContent?.trim()),
    ).toEqual(expect.arrayContaining(["Uploading", "Uploaded"]));
    const failed = screen.getByRole("alert");
    expect(failed).toHaveTextContent("Upload failed");
    expect(failed).toHaveClass("status", "statusError");
    const preview = container.querySelector("img.preview");
    expect(preview).toHaveAttribute("src", "blob:up");
    expect(preview).toHaveAttribute("alt", "");
    expect(screen.getAllByRole("button", { name: /^Retry/ })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /^Remove/ })).toHaveLength(3);
  });

  it("emits retry / remove with the item", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onRetry = vi.fn();
    const item: UploadItem = {
      id: "failed",
      name: "cover.png",
      status: "error",
      error: "Offline",
    };
    const { emitted } = setup({ modelValue: [item], onRemove, onRetry });
    await user.click(screen.getByRole("button", { name: "Retry cover.png" }));
    expect(onRetry).toHaveBeenCalledWith(item);
    await user.click(screen.getByRole("button", { name: "Remove cover.png" }));
    expect(onRemove).toHaveBeenCalledWith(item);
    expect(emitted()["update:modelValue"]).toEqual([[[]]]);
  });

  it("removes files from a v-model list", async () => {
    const user = userEvent.setup();
    const files = ref<UploadItem[]>([
      { id: "1", name: "a.png", status: "done" },
      { id: "2", name: "b.png", status: "done" },
    ]);
    render(
      defineComponent({
        setup: () => () =>
          h(Upload, {
            label: "Attachments",
            multiple: true,
            modelValue: files.value,
            "onUpdate:modelValue": (next: UploadItem[]) => {
              files.value = next;
            },
          }),
      }),
    );
    await user.click(screen.getByRole("button", { name: "Remove a.png" }));
    expect(files.value.map((file) => file.id)).toEqual(["2"]);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("works uncontrolled with defaultValue", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(Upload, {
      props: {
        label: "Attachments",
        multiple: true,
        defaultValue: [
          { id: "1", name: "a.png", status: "done" },
          { id: "2", name: "b.png", status: "done" },
        ],
        onRemove,
      },
    });
    await user.click(screen.getByRole("button", { name: "Remove a.png" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Remove b.png" })).toHaveFocus();
  });

  it("hides retry/remove without listeners and disables them appropriately", async () => {
    const value: UploadItem[] = [
      { id: "1", name: "bad.png", status: "error", error: "Timeout" },
    ];
    const without = mount(Upload, {
      attachTo: document.body,
      props: { label: "Attachments", modelValue: value },
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Timeout");
    expect(screen.queryByRole("button", { name: /Retry|Remove/ })).toBeNull();
    without.unmount();

    const handlers = { onRemove: vi.fn(), onRetry: vi.fn() };
    const wrapper = mount(Upload, {
      attachTo: document.body,
      props: { label: "Attachments", modelValue: value, loading: true },
      attrs: handlers,
    });
    expect(
      screen.getByRole("button", { name: "Retry bad.png" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Remove bad.png" }),
    ).toBeEnabled();

    await wrapper.setProps({ loading: false, disabled: true });
    expect(
      screen.getByRole("button", { name: "Retry bad.png" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Remove bad.png" }),
    ).toBeDisabled();
  });

  it("uses custom labels", async () => {
    const value: UploadItem[] = [
      { id: "1", name: "a.png", status: "uploading" },
      { id: "2", name: "b.png", status: "done" },
      { id: "3", name: "c.png", status: "error" },
    ];
    const { dropzone } = setup({
      modelValue: value,
      multiple: true,
      maxCount: 4,
      accept: "image/*",
      maxSize: 4,
      onRemove: () => {},
      onRetry: () => {},
      labels: {
        uploading: "Sending",
        done: "Sent",
        failed: "Broken",
        tooMany: (max) => `max ${max}`,
        invalidType: (name) => `bad type ${name}`,
        tooLarge: (name) => `too big ${name}`,
        retry: (name) => `again ${name}`,
        remove: (name) => `drop ${name}`,
      },
    });
    expect(screen.getByText("Sending")).toBeInTheDocument();
    expect(screen.getByText("Sent")).toBeInTheDocument();
    expect(screen.getByText("Broken")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "again c.png" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "drop a.png" }),
    ).toBeInTheDocument();
    await drop(dropzone, [png("1.png"), png("2.png")]);
    expect(screen.getByText("max 4")).toBeInTheDocument();
    await drop(dropzone, [new File(["x"], "t.txt", { type: "text/plain" })]);
    expect(screen.getByText("bad type t.txt")).toBeInTheDocument();
    await drop(dropzone, [png("big.png", 9)]);
    expect(screen.getByText("too big big.png")).toBeInTheDocument();
  });

  it("forwards class and native attributes, keeping its own role and hooks", () => {
    const { group } = setup({
      class: "c",
      id: "files",
      role: "region",
      "data-part": "x",
    });
    expect(group).toHaveClass("c", "upload");
    expect(group).toHaveAttribute("id", "files");
    expect(group).toHaveAttribute("role", "group");
    expect(group).toHaveAttribute("data-part", "root");
  });
});

describe("Upload localization", () => {
  afterEach(() => setLanguage("en"));

  it("uses the Chinese strings with the zh locale", () => {
    setLanguage("zh");
    const { dropzone } = setup({
      modelValue: [{ id: "1", name: "bad.png", status: "error" }],
      multiple: true,
      maxCount: 1,
      onRemove: () => {},
      onRetry: () => {},
    });
    expect(screen.getByRole("button", { name: "选择文件" })).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("上传失败");
    expect(
      screen.getByRole("button", { name: "重试 bad.png" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "移除 bad.png" }),
    ).toBeInTheDocument();
    expect(dropzone).toBeInTheDocument();
  });
});
