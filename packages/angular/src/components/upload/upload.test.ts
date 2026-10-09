import { Component, signal } from "@angular/core";
import { afterEach, expect, it, vi } from "vitest";
import { MnUpload, type UploadItem } from "../../index";
import { fireEvent, render, screen, settle, user } from "../../testing";

afterEach(() => {
  document.body.innerHTML = "";
});

@Component({
  imports: [MnUpload],
  template: `<mn-upload
    label="Attachments"
    multiple
    removable
    [(value)]="value"
    [disabled]="disabled()"
    accept=".txt"
    [maxSize]="8"
    [maxCount]="2"
    (filesSelected)="selected($event)"
  />`,
})
class Host {
  value = signal<UploadItem[]>([]);
  disabled = signal(false);
  selected = vi.fn();
}
const choose = (files: File[]) =>
  fireEvent.change(document.querySelector('input[type="file"]')!, {
    target: { files },
  });
it("exports a working upload control and removes a selected file", async () => {
  const fixture = await render(Host);
  const file = new File(["hello"], "hello.txt", { type: "text/plain" });
  choose([file]);
  await settle(fixture);
  expect(fixture.componentInstance.selected).toHaveBeenCalledWith([file]);
  expect(screen.getByText("hello.txt")).toBeTruthy();
  await user().click(screen.getByRole("button", { name: "Remove hello.txt" }));
  await settle(fixture);
  expect(fixture.componentInstance.value()).toEqual([]);
});
it.each([
  ["type", () => [new File(["a"], "image.png")]],
  ["size", () => [new File(["123456789"], "large.txt")]],
  ["count", () => [1, 2, 3].map((n) => new File(["a"], `${n}.txt`))],
] as const)(
  "rejects invalid %s without mutating the model",
  async (_, files) => {
    const fixture = await render(Host);
    choose(files());
    await settle(fixture);
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(fixture.componentInstance.value()).toEqual([]);
    expect(fixture.componentInstance.selected).not.toHaveBeenCalled();
  },
);
it("disabled uploads reject dispatched file changes", async () => {
  const fixture = await render(Host);
  fixture.componentInstance.disabled.set(true);
  await settle(fixture);
  choose([new File(["a"], "a.txt")]);
  await settle(fixture);
  expect(fixture.componentInstance.selected).not.toHaveBeenCalled();
});
