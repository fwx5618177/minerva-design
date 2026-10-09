import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { describe, expect, it, vi } from "vitest";
import { render, screen, settle } from "../../testing";
import { MnFormField } from "../form-control";
import { MnInput } from "../input";
import { MnFormLayout, type FormLayoutColumns } from "./form-layout";

const grid = () =>
  document.querySelector<HTMLElement>(
    'form > [data-minerva="responsive-grid"]',
  )!;
const gridVar = (key: string) =>
  grid().style.getPropertyValue(`--grid-${key}`).trim();

describe("MnFormLayout", () => {
  it("is the native form with the hooks, native attributes and the grid inside", async () => {
    @Component({
      imports: [MnFormLayout],
      template: `<form
        mnFormLayout
        id="metadata"
        name="metadata"
        action="/save"
        method="post"
        aria-label="Metadata"
        class="consumer"
        novalidate
        [columns]="{ base: 1, sm: 2, lg: 3 }"
        [gap]="3"
        [rowGap]="2"
        columnGap="20px"
      >
        <input name="title" />
      </form>`,
    })
    class Host {}
    await render(Host);
    const form = screen.getByRole("form", {
      name: "Metadata",
    }) as HTMLFormElement;
    expect(form).toHaveClass("root", "consumer");
    expect(form).toHaveAttribute("data-minerva", "form-layout");
    expect(form).toHaveAttribute("data-part", "root");
    expect(form.id).toBe("metadata");
    expect(form.getAttribute("action")).toBe("/save");
    expect(form.noValidate).toBe(true);
    expect(grid()).toHaveClass("root");
    expect(grid().firstElementChild).toHaveClass("layout");
    expect(grid().firstElementChild).toHaveAttribute("data-part", "layout");
    expect(
      ["base", "sm", "md", "lg"].map((k) => gridVar(`columns-${k}`)),
    ).toEqual(["1", "2", "2", "3"]);
    expect(gridVar("row-gap")).toBe("var(--space-2)");
    expect(gridVar("column-gap")).toBe("20px");
    expect(form.querySelector("input")?.form).toBe(form);
    expect(form).not.toHaveAttribute("columns");
  });

  it("defaults to one column and spacing token 4, and follows input changes", async () => {
    @Component({
      imports: [MnFormLayout],
      template: `<form
        mnFormLayout
        [columns]="columns()"
        [gap]="gap()"
      ></form>`,
    })
    class Host {
      columns = signal<FormLayoutColumns>(1);
      gap = signal<string | number>(4);
    }
    const fixture = await render(Host);
    expect(gridVar("columns-base")).toBe("1");
    expect(gridVar("row-gap")).toBe("var(--space-4)");
    expect(gridVar("column-gap")).toBe("var(--space-4)");
    fixture.componentInstance.columns.set(2);
    fixture.componentInstance.gap.set("0.5");
    await settle(fixture);
    expect(gridVar("columns-lg")).toBe("2");
    expect(gridVar("row-gap")).toBe("var(--space-0-5)");
  });

  it("works with Reactive Forms and ngSubmit", async () => {
    const submitted = vi.fn();
    @Component({
      imports: [MnFormLayout, MnFormField, MnInput, ReactiveFormsModule],
      template: `<form
        mnFormLayout
        [columns]="2"
        [formGroup]="form"
        (ngSubmit)="save()"
      >
        <mn-form-field label="Title"
          ><mn-input formControlName="title"
        /></mn-form-field>
        <button type="submit">Save</button>
      </form>`,
    })
    class Host {
      form = new FormGroup({ title: new FormControl("Hello") });
      save = submitted;
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue("Hello");
    screen.getByRole("button", { name: "Save" }).click();
    expect(submitted).toHaveBeenCalledTimes(1);
  });
});
