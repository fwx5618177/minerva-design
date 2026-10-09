import simulate from "miniprogram-simulate";
import { it, expect } from "vitest";
import {
  input,
  select,
  button,
  confirm,
  table,
  themeToggle,
  configProvider,
} from "./index";
it("native WeChat parent composes theme, controlled form, confirm and table selection", async () => {
  const entries = {
    input,
    select,
    button,
    confirm,
    table,
    themeToggle,
    configProvider,
  };
  const usingComponents = Object.fromEntries(
    Object.entries(entries).map(([name, c]) => [
      "mn-" + name,
      simulate.load({
        tagName: "mn-" + name.toLowerCase(),
        template: c.template,
        ...c.definition,
      }),
    ]),
  );
  const id = simulate.load({
    tagName: "mn-workflow",
    usingComponents,
    template: `<mn-configProvider id="theme" mode="{{mode}}" palette="tech"><mn-themeToggle id="themeToggle" value="{{mode}}" bindchange="onTheme"/><mn-input id="name" value="{{name}}" clearable bindchange="onName"/><mn-select id="team" value="{{team}}" options="{{options}}" bindchange="onTeam"/><mn-button id="review" label="Review" disabled="{{!name}}" bindclick="onReview"/><mn-confirm id="confirm" open="{{open}}" title="Add member" bindconfirm="onSave"/><mn-table id="records" columns="{{columns}}" data="{{rows}}" selectable selected-row-keys="{{selected}}" bindselectionchange="onSelection"/></mn-configProvider>`,
    data: {
      mode: "light",
      name: "",
      team: "a",
      open: false,
      selected: [] as string[],
      rows: [] as { id: string; name: string; team: string }[],
      options: [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
      ],
      columns: [
        { key: "name", header: "Name", sortable: true },
        { key: "team", header: "Team" },
      ],
    },
    methods: {
      onTheme(e: WechatMiniprogram.CustomEvent) {
        this.setData({ mode: e.detail.value });
      },
      onName(e: WechatMiniprogram.CustomEvent) {
        this.setData({ name: e.detail.value });
      },
      onTeam(e: WechatMiniprogram.CustomEvent) {
        this.setData({ team: e.detail.value });
      },
      onReview() {
        this.setData({ open: true });
      },
      onSave() {
        this.setData({
          rows: [{ id: "1", name: this.data.name, team: this.data.team }],
          name: "",
          open: false,
        });
      },
      onSelection(e: WechatMiniprogram.CustomEvent) {
        this.setData({ selected: e.detail.selectedRowKeys });
      },
    },
  });
  const w = simulate.render(id);
  w.attach(document.createElement("div"));
  const child = (name: string) => w.querySelector("#" + name)!;
  child("themeToggle")
    .querySelectorAll(".mn-theme-choice")[1]!
    .dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.mode).toBe("dark");
  expect(child("theme").data.themeClass).toContain("mn-palette-tech-dark");
  child("name")
    .querySelector(".mn-input")!
    .dispatchEvent("input", { detail: { value: "Ada" } });
  await simulate.sleep(0);
  child("team").querySelector(".mn-select-trigger")!.dispatchEvent("tap");
  await simulate.sleep(0);
  child("team").querySelectorAll(".mn-option")[1]!.dispatchEvent("tap");
  await simulate.sleep(0);
  child("review").querySelector(".mn-button")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.open).toBe(true);
  child("confirm")
    .querySelectorAll(".mn-dialog-footer .mn-button")[1]!
    .dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.rows).toEqual([{ id: "1", name: "Ada", team: "b" }]);
  expect(w.data.open).toBe(false);
  child("records").querySelector(".mn-select-row")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.selected).toEqual(["1"]);
});
