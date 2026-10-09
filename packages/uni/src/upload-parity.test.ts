import { mount } from "@vue/test-utils";
import { it, expect, vi, afterEach } from "vitest";
import Upload from "./Upload.vue";
const previous = uni;
afterEach(() => vi.stubGlobal("uni", previous));
it("Upload validates whole selected batches by core MIME/extensions/size/count and emits original native files only when valid", async () => {
  let choose: (options: Record<string, unknown>) => void = () => {};
  const picker = vi.fn((options) => choose(options));
  vi.stubGlobal("uni", { ...previous, chooseFile: picker });
  const w = mount(Upload, {
    props: {
      label: "Documents",
      accept: ".pdf,application/json",
      multiple: true,
      maxCount: 3,
      maxSize: 100,
      value: [],
    },
  });
  choose = (options) =>
    (options.success as (result: unknown) => void)({
      tempFiles: [
        {
          name: "report.pdf",
          path: "/tmp/report.pdf",
          size: 101,
          type: "application/pdf",
        },
      ],
    });
  await w.find(".mn-upload-select").trigger("click");
  expect(w.emitted("filesSelected")).toBeUndefined();
  expect(w.find('[role="alert"]').text()).toContain("size limit");
  choose = (options) =>
    (options.success as (result: unknown) => void)({
      tempFiles: [{ name: "script.exe", path: "/tmp/script.exe", size: 10 }],
    });
  await w.find(".mn-upload-select").trigger("click");
  expect(w.find('[role="alert"]').text()).toContain("unsupported");
  const file = {
    name: "report.pdf",
    path: "/tmp/report.pdf",
    size: 10,
    type: "application/pdf",
  };
  choose = (options) =>
    (options.success as (result: unknown) => void)({ tempFiles: [file] });
  await w.find(".mn-upload-select").trigger("click");
  expect(w.emitted("filesSelected")?.[0][0]).toEqual([file]);
  expect(w.find('[role="alert"]').exists()).toBe(false);
  choose = (options) =>
    (options.success as (result: unknown) => void)({
      tempFiles: [file, file, file, file],
    });
  await w.find(".mn-upload-select").trigger("click");
  expect(w.find('[role="alert"]').text()).toContain("3 files");
  expect(w.emitted("filesSelected")).toHaveLength(1);
});
it("Upload controlled transfer states, retry/remove original items, loading and replacement match React", async () => {
  const retry = vi.fn(),
    remove = vi.fn();
  const item = {
    id: "a",
    name: "a.pdf",
    status: "error" as const,
    error: "Network lost",
    previewUrl: "/a.png",
  };
  const chooseFile = vi.fn();
  vi.stubGlobal("uni", { ...previous, chooseFile });
  const w = mount(Upload, {
    props: {
      label: "Files",
      value: [item],
      replace: true,
      onRetry: retry,
      onRemove: remove,
      loading: true,
    },
  });
  expect(w.attributes("aria-busy")).toBe("true");
  expect(w.find(".mn-upload-select").attributes("disabled")).toBeDefined();
  expect(
    w.find('[aria-label="Retry a.pdf"]').attributes("disabled"),
  ).toBeDefined();
  await w.find('[aria-label="Remove a.pdf"]').trigger("click");
  expect(remove).toHaveBeenCalledWith(item);
  await w.setProps({ loading: false });
  await w.find('[aria-label="Retry a.pdf"]').trigger("click");
  expect(retry).toHaveBeenCalledWith(item);
  await w.find(".mn-upload-select").trigger("click");
  expect(chooseFile).toHaveBeenCalled();
  expect(w.text()).toContain("Network lost");
  await w.setProps({ disabled: true });
  await w.find('[aria-label="Remove a.pdf"]').trigger("click");
  expect(remove).toHaveBeenCalledTimes(1);
});
it("Upload uses native media selection when MIME accept selects images and exposes localized uploading/done labels", async () => {
  const media = vi.fn();
  vi.stubGlobal("uni", { ...previous, chooseMedia: media });
  const w = mount(Upload, {
    props: {
      label: "Photos",
      accept: "image/*",
      multiple: true,
      value: [
        { id: "a", name: "a.png", status: "uploading" },
        { id: "b", name: "b.png", status: "done" },
      ],
      labels: { uploading: "Sending", done: "Ready" },
    },
  });
  await w.find(".mn-upload-select").trigger("click");
  expect(media).toHaveBeenCalledWith(
    expect.objectContaining({ mediaType: ["image"] }),
  );
  expect(w.text()).toContain("Sending");
  expect(w.text()).toContain("Ready");
});
