import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, settle, user } from "../../testing";
import { MnRatingScale, type RatingDimension } from "./rating-scale";

afterEach(() => {
  document.body.innerHTML = "";
});

const dims: RatingDimension[] = [
  { key: "plot", label: "Plot", value: 8.2, hint: "Story quality" },
  { key: "writing", label: "Writing", value: 7.5 },
];

describe("MnRatingScale", () => {
  it("renders one labelled read-only row per dimension with values shown", async () => {
    @Component({
      imports: [MnRatingScale],
      template: `<mn-rating-scale [dimensions]="dims" class="c" />`,
    })
    class Host {
      dims = dims;
    }
    const fixture = await render(Host);
    const root = (fixture.nativeElement as HTMLElement).firstElementChild!;
    expect(root).toHaveClass("scale", "c");
    expect(root).toHaveAttribute("data-minerva", "rating-scale");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-readonly", "");
    expect(root).toHaveAttribute("data-size", "medium");
    const rows = root.querySelectorAll(".scaleRow");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute("title", "Story quality");
    expect(rows[0]).toHaveAttribute("data-part", "row");
    expect(rows[1]).not.toHaveAttribute("title");
    expect(screen.getByText("Plot")).toHaveClass("scaleLabel");
    expect(screen.getByText("Plot")).toHaveAttribute("data-part", "label");
    expect(screen.getByLabelText("Plot 8.2 / 10")).toHaveAttribute(
      "role",
      "img",
    );
    expect(screen.getByLabelText("Writing 7.5 / 10")).toBeInTheDocument();
    expect(root.querySelectorAll(".value")).toHaveLength(2);
    expect(screen.queryByRole("slider")).toBeNull();
  });

  it("emits ratingChange with the dimension key and updates [(dimensions)]", async () => {
    const u = user();
    @Component({
      imports: [MnRatingScale],
      template: `<mn-rating-scale
        interactive
        [(dimensions)]="dims"
        [showValue]="false"
        [max]="10"
        size="small"
        (ratingChange)="changed($event)"
      />`,
    })
    class Host {
      dims = signal<readonly RatingDimension[]>(dims);
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector(".value")).toBeNull();
    expect(host.querySelector(".scale")).toHaveAttribute("data-size", "small");
    expect(host.querySelector(".scale")).not.toHaveAttribute("data-readonly");
    const slider = screen.getByRole("slider", { name: "Writing 7.5 / 10" });
    slider.focus();
    await u.keyboard("{ArrowRight}");
    await settle(fixture);
    const updated = [dims[0], { ...dims[1], value: 8.5 }];
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith({
      key: "writing",
      value: 8.5,
      dimensions: updated,
    });
    expect(fixture.componentInstance.dims()).toEqual(updated);
    expect(
      screen.getByRole("slider", { name: "Writing 8.5 / 10" }),
    ).toHaveAttribute("aria-valuenow", "8.5");
  });

  it("readOnly disables interaction for all rows", async () => {
    @Component({
      imports: [MnRatingScale],
      template: `<mn-rating-scale [dimensions]="dims" interactive readOnly />`,
    })
    class Host {
      dims = dims;
    }
    await render(Host);
    expect(screen.queryByRole("slider")).toBeNull();
    expect(document.querySelector(".scale")).toHaveAttribute(
      "data-readonly",
      "",
    );
  });
});
