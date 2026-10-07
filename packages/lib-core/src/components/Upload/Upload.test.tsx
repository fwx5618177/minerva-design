// Ported from @novel-isr/ui src/components/Upload/__test__/Upload.test.tsx and
// the Upload part of src/components/__test__/UploadSteps.test.tsx
import { createRef } from "react";
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import Upload from "./Upload";
import type { UploadItem, UploadProps } from "./types";

const png = (name = "a.png", size = 3) =>
  new File(["x".repeat(size)], name, { type: "image/png" });

function setup(props: Partial<UploadProps> = {}) {
  const onFilesSelected = vi.fn<(files: File[]) => void>();
  const utils = render(
    <Upload
      label="Attachments"
      value={[]}
      onFilesSelected={onFilesSelected}
      {...props}
    />,
  );
  const group = screen.getByRole("group", { name: "Attachments" });
  const dropzone = group.querySelector<HTMLElement>(".ui-upload-dropzone")!;
  const input =
    utils.container.querySelector<HTMLInputElement>('input[type="file"]')!;
  return { ...utils, onFilesSelected, group, dropzone, input };
}

/** Changes the files of the (hidden) input like a native file picker */
const pick = (input: HTMLInputElement, files: File[]) => {
  Object.defineProperty(input, "files", { configurable: true, value: files });
  fireEvent.change(input);
};

describe("Upload", () => {
  it("renders a labelled group with a select button and a hidden labelled file input", () => {
    const { group, input } = setup({ accept: "image/*", multiple: true });
    expect(group).toHaveClass("ui-upload", "upload");
    expect(group).toHaveAttribute("aria-busy", "false");
    expect(group.querySelector(".ui-upload-label")).toHaveTextContent(
      "Attachments",
    );
    expect(screen.getByRole("button", { name: "Select files" })).toBeEnabled();
    expect(input).toHaveAttribute("aria-label", "Attachments");
    expect(input).toHaveAttribute("accept", "image/*");
    expect(input.multiple).toBe(true);
    expect(input.hidden).toBe(true);
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

  it("passes selected files through the input via user-event upload", async () => {
    const user = userEvent.setup();
    const { input, onFilesSelected } = setup({ accept: "image/*" });
    const file = png();
    await user.upload(input, file);
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });

  it("toggles the dragging state on dragover/dragleave and clears it on drop", () => {
    const { dropzone } = setup();
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("is-dragging", "dragging");
    // happy-dom's DragEvent ignores `relatedTarget` in its init dict, so define it explicitly.
    const dragLeave = (relatedTarget: Node) => {
      const event = createEvent.dragLeave(dropzone);
      Object.defineProperty(event, "relatedTarget", { value: relatedTarget });
      fireEvent(dropzone, event);
    };
    dragLeave(screen.getByRole("button"));
    expect(dropzone).toHaveClass("is-dragging");
    dragLeave(document.body);
    expect(dropzone).not.toHaveClass("is-dragging");
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone, { dataTransfer: { files: [] } });
    expect(dropzone).not.toHaveClass("is-dragging");
  });

  it("ignores drag highlighting and drops when disabled", () => {
    const { dropzone, onFilesSelected, input } = setup({ disabled: true });
    expect(screen.getByRole("button", { name: "Select files" })).toBeDisabled();
    expect(input).toBeDisabled();
    fireEvent.dragOver(dropzone);
    expect(dropzone).not.toHaveClass("is-dragging");
    fireEvent.drop(dropzone, { dataTransfer: { files: [png()] } });
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("marks the group busy and disables selection while loading", () => {
    const { group, dropzone, onFilesSelected } = setup({ loading: true });
    expect(group).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /Select files/ })).toBeDisabled();
    fireEvent.drop(dropzone, { dataTransfer: { files: [png()] } });
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
  ])("accept=%j handles %s (accepted=%s)", (accept, file, accepted) => {
    const { dropzone, onFilesSelected } = setup({ accept });
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
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

  it("rejects multiple files in single mode and clears the error after a valid selection", () => {
    const { dropzone, onFilesSelected } = setup();
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [png("a.png"), png("b.png")] },
    });
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You can select up to 1 files",
    );
    fireEvent.drop(dropzone, { dataTransfer: { files: [png("c.png")] } });
    expect(onFilesSelected).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("reports oversized files by name", () => {
    const { dropzone, onFilesSelected } = setup({ maxSize: 4 });
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [png("big.png", 5)] },
    });
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "big.png: file exceeds the size limit",
    );
  });

  it("accepts image drops and rejects unsupported or oversized files", () => {
    const { dropzone, onFilesSelected } = setup({
      accept: "image/*",
      maxSize: 8,
    });
    const file = new File(["png"], "cover.png", { type: "image/png" });
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [new File(["text"], "notes.txt", { type: "text/plain" })],
      },
    });
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [new File(["123456789"], "large.png", { type: "image/png" })],
      },
    });
    expect(onFilesSelected).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("counts existing items toward maxCount in multiple mode", () => {
    const value: UploadItem[] = [{ id: "1", name: "one.png", status: "done" }];
    const { dropzone, onFilesSelected } = setup({
      multiple: true,
      maxCount: 2,
      value,
    });
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [png("a.png"), png("b.png")] },
    });
    expect(onFilesSelected).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You can select up to 2 files",
    );
  });

  it("rejects excess files instead of silently dropping them and can reselect the same file", () => {
    const { input, onFilesSelected } = setup({ multiple: true, maxCount: 2 });
    const file = new File(["a"], "a.txt");
    pick(input, [file, file, file]);
    expect(onFilesSelected).not.toHaveBeenCalled();
    pick(input, [file]);
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
    expect(input.value).toBe("");
  });

  it("allows single-file replacement without removing the saved file first", () => {
    const { input, onFilesSelected } = setup({
      value: [{ id: "saved", name: "old.png", status: "done" }],
      replace: true,
    });
    expect(input).not.toBeDisabled();
    const file = new File(["png"], "new.png", { type: "image/png" });
    pick(input, [file]);
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });

  it("blocks selection at capacity", () => {
    const { input } = setup({
      value: [{ id: "saved", name: "old.png", status: "done" }],
    });
    expect(input).toBeDisabled();
    expect(screen.getByRole("button", { name: "Select files" })).toBeDisabled();
  });

  it("renders item statuses, previews and only the actions that apply", () => {
    const onRemove = vi.fn();
    const onRetry = vi.fn();
    const value: UploadItem[] = [
      { id: "1", name: "up.png", status: "uploading", previewUrl: "blob:up" },
      { id: "2", name: "ok.png", status: "done" },
      { id: "3", name: "bad.png", status: "error" },
    ];
    const { container } = setup({ value, multiple: true, onRemove, onRetry });
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass("ui-upload-item");
    expect(items[0]).toHaveTextContent("Uploading");
    expect(items[1]).toHaveTextContent("Uploaded");
    expect(items[2]).toHaveTextContent("Upload failed");
    expect(screen.getAllByRole("status").map((s) => s.textContent)).toEqual(
      expect.arrayContaining(["Uploading", "Uploaded"]),
    );
    const failed = screen.getByRole("alert");
    expect(failed).toHaveTextContent("Upload failed");
    expect(failed).toHaveClass("ui-upload-status", "is-error");
    const preview = container.querySelector("img.ui-upload-preview");
    expect(preview).toHaveAttribute("src", "blob:up");
    expect(preview).toHaveAttribute("alt", "");
    expect(screen.getAllByRole("button", { name: /^Retry/ })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /^Remove/ })).toHaveLength(3);
  });

  it("calls retry / remove with the item", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onRetry = vi.fn();
    const item: UploadItem = {
      id: "failed",
      name: "cover.png",
      status: "error",
      error: "Offline",
    };
    setup({ value: [item], onRemove, onRetry });
    await user.click(screen.getByRole("button", { name: "Retry cover.png" }));
    expect(onRetry).toHaveBeenCalledWith(item);
    await user.click(screen.getByRole("button", { name: "Remove cover.png" }));
    expect(onRemove).toHaveBeenCalledWith(item);
  });

  it("hides retry/remove without handlers and disables them appropriately", () => {
    const value: UploadItem[] = [
      { id: "1", name: "bad.png", status: "error", error: "Timeout" },
    ];
    const { rerender, onFilesSelected } = setup({ value });
    expect(screen.getByRole("alert")).toHaveTextContent("Timeout");
    expect(screen.queryByRole("button", { name: /Retry|Remove/ })).toBeNull();

    const handlers = { onRemove: vi.fn(), onRetry: vi.fn() };
    rerender(
      <Upload
        label="Attachments"
        value={value}
        onFilesSelected={onFilesSelected}
        loading
        {...handlers}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Retry bad.png" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Remove bad.png" }),
    ).toBeEnabled();

    rerender(
      <Upload
        label="Attachments"
        value={value}
        onFilesSelected={onFilesSelected}
        disabled
        {...handlers}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Retry bad.png" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Remove bad.png" }),
    ).toBeDisabled();
  });

  it("uses custom labels", () => {
    const value: UploadItem[] = [
      { id: "1", name: "a.png", status: "uploading" },
      { id: "2", name: "b.png", status: "done" },
      { id: "3", name: "c.png", status: "error" },
    ];
    const { dropzone } = setup({
      value,
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
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [png("1.png"), png("2.png")] },
    });
    expect(screen.getByText("max 4")).toBeInTheDocument();
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [new File(["x"], "t.txt", { type: "text/plain" })],
      },
    });
    expect(screen.getByText("bad type t.txt")).toBeInTheDocument();
    fireEvent.drop(dropzone, { dataTransfer: { files: [png("big.png", 9)] } });
    expect(screen.getByText("too big big.png")).toBeInTheDocument();
  });

  it("forwards ref, className and native attributes", () => {
    const ref = createRef<HTMLDivElement>();
    const { group } = setup({ ref, className: "c", id: "files" });
    expect(ref.current).toBe(group);
    expect(group).toHaveClass("c");
    expect(group).toHaveAttribute("id", "files");
  });
});

describe("Upload localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("uses the novel-isr-ui Chinese strings", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    const { dropzone } = setup({
      value: [{ id: "1", name: "bad.png", status: "error" }],
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
