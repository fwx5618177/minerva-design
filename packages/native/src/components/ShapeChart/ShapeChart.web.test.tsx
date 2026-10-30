import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { DonutChart, RadarChart } from "./index";

const q = (part: string) =>
  document.querySelector(`[data-minerva="chart"][data-part="${part}"]`);

const flush = () =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 40)));

describe("shape charts on react-native-web", () => {
  it("renders a donut as clipped, rotated elements", async () => {
    render(
      <MinervaProvider theme="light">
        <DonutChart
          width={360}
          height={240}
          ariaLabel="Traffic"
          data={[
            { name: "Search", value: 5 },
            { name: "Direct", value: 3 },
            { name: "Social", value: 2 },
          ]}
          centerValue="10"
          animation={false}
        />
      </MinervaProvider>,
    );
    await flush();
    const surface = q("surface")!;
    expect(surface.getAttribute("role")).toBe("img");
    expect(surface.getAttribute("aria-label")).toBe("Traffic");
    expect(document.body.textContent).toContain("Search");
    expect(document.body.textContent).toContain("10");
    const divs = [...surface.querySelectorAll("div")];
    const css = (d: HTMLElement) => getComputedStyle(d);
    // half-plane clips of the segments
    expect(
      divs.some(
        (d) =>
          css(d).overflowX === "hidden" && css(d).transform.includes("rotate"),
      ),
    ).toBe(true);
    // the ring of a segment: a round bordered element
    expect(
      divs.some(
        (d) =>
          parseFloat(css(d).borderRadius) > 0 &&
          parseFloat(css(d).borderTopWidth) > 1,
      ),
    ).toBe(true);
  });

  it("renders a radar with translucent groups", async () => {
    render(
      <MinervaProvider theme="dark">
        <RadarChart
          width={360}
          height={280}
          indicators={[
            { name: "Speed" },
            { name: "Power" },
            { name: "Range" },
            { name: "Cost" },
            { name: "Comfort" },
          ]}
          series={[
            { name: "A", values: [3, 4, 2, 5, 1] },
            { name: "B", values: [2, 1, 4, 3, 5] },
          ]}
          animation={false}
        />
      </MinervaProvider>,
    );
    await flush();
    expect(document.body.textContent).toContain("Comfort");
    const divs = [...q("surface")!.querySelectorAll("div")];
    expect(divs.some((d) => d.style.opacity && +d.style.opacity < 1)).toBe(
      true,
    );
  });
});
