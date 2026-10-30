import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import type {
  BulletDatum,
  CalendarDate,
  CalendarDatum,
  RadialBarDatum,
  SankeyLink,
  SankeyNode,
  ShapeChartInstance,
  ShapeChartOptions,
  ShapeDrillEvent,
  TreemapNode,
} from "minerva-design/charts/core";
import { CHART_SURFACE, optionalBoolean } from "./engine";
import { MnShapeChartCommon } from "./shape";

/**
 * Sankey diagram: flows between nodes in columns, link thickness
 * proportional to the flow; hovering a node or a link highlights its flows
 */
@Component({
  selector: "mn-sankey-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnSankeyChart extends MnShapeChartCommon {
  /** Nodes, in their initial order; nodes only named by a link are appended */
  readonly nodes = input<readonly SankeyNode[] | undefined>(undefined);
  /** Flows between the nodes (by name or index); links closing a cycle are ignored */
  readonly links = input.required<readonly SankeyLink[]>();
  /** Width of the node bars, in pixels (default 12) */
  readonly nodeWidth = input<number | undefined>(undefined);
  /** Vertical gap between the nodes of a column, in pixels (default 12) */
  readonly nodePadding = input<number | undefined>(undefined);
  /** Column of the nodes without a `column` (default `justify`) */
  readonly align = input<"justify" | "left" | "right" | "center" | undefined>(
    undefined,
  );
  /** Color of the links without `color` (default `gradient`) */
  readonly linkColor = input<
    "gradient" | "source" | "target" | "neutral" | undefined
  >(undefined);
  /** Opacity of the links, 0-1 (default 0.4) */
  readonly linkOpacity = input<number | undefined>(undefined);
  /** Node labels (default `true`) */
  readonly labels = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });

  protected override defaultHeight(): number {
    return 360;
  }

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "sankey",
      nodes: this.nodes(),
      links: this.links(),
      nodeWidth: this.nodeWidth(),
      nodePadding: this.nodePadding(),
      align: this.align(),
      linkColor: this.linkColor(),
      linkOpacity: this.linkOpacity(),
      labels: this.labels(),
    };
  }
}

/**
 * Sunburst chart: a hierarchy as concentric rings; clicking a parent zooms
 * into it, clicking the center goes back up
 */
@Component({
  selector: "mn-sunburst-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnSunburstChart extends MnShapeChartCommon {
  /** Nodes `{ name, value, children }`: leaves carry a value, parents sum their children */
  readonly data = input.required<readonly TreemapNode[]>();
  /** Radius of the center circle as a fraction of the outer radius (default 0.26) */
  readonly innerRadius = input<number | undefined>(undefined);
  /** Rings shown at once below the focused node (default: every level) */
  readonly levels = input<number | undefined>(undefined);
  /** Sector labels along the arc or the radius (default `auto`) */
  readonly labels = input<
    "auto" | "tangential" | "radial" | "none" | undefined
  >(undefined);
  /** Clicking a parent zooms into it, the center goes back up (default `true`) */
  readonly drillDown = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Names from the root to the focused node (`[]`: the root); makes the drill-down controlled */
  readonly drillPath = input<readonly string[] | undefined>(undefined);
  /** A parent or the center was clicked (or `drill()` was called) */
  readonly drillChange = output<ShapeDrillEvent>();

  protected override defaultHeight(): number {
    return 360;
  }

  protected override bindEngine(chart: ShapeChartInstance): Array<() => void> {
    return [
      ...super.bindEngine(chart),
      chart.on("drill", (event) => this.drillChange.emit(event)),
    ];
  }

  /** Zooms into the node at `path` (names from the root, `[]`: the root) */
  drill(path: readonly string[]): void {
    this.instance()?.drill(path);
  }

  protected engineOptions(): ShapeChartOptions {
    const path = this.drillPath();
    return {
      ...this.commonOptions(),
      type: "sunburst",
      data: this.data(),
      innerRadius: this.innerRadius(),
      levels: this.levels(),
      labels: this.labels(),
      drill: this.drillDown(),
      drillPath: path ? [...path] : undefined,
    };
  }
}

/** Radial bar chart: concentric progress rings (activity rings, KPI completion) */
@Component({
  selector: "mn-radial-bar-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnRadialBarChart extends MnShapeChartCommon {
  /** Bars `{ name, value, max, color }`, from the outermost ring inward */
  readonly data = input.required<readonly RadialBarDatum[]>();
  /** Value of a full bar for the data without `max` (default: the largest value) */
  readonly max = input<number | undefined>(undefined);
  /** Radius of the innermost ring's inner edge, as a fraction of the outer radius (default 0.3) */
  readonly innerRadius = input<number | undefined>(undefined);
  /** Angle of a full bar, degrees; 360 = full rings (default 270) */
  readonly sweep = input<number | undefined>(undefined);
  /** Labels before the start of the bars (default: when `sweep` leaves room) */
  readonly labels = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Big text in the center (e.g. the overall completion) */
  readonly centerValue = input<string | undefined>(undefined);
  /** Small text under `centerValue` */
  readonly centerLabel = input<string | undefined>(undefined);

  protected override defaultHeight(): number {
    return 300;
  }

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "radialBar",
      data: this.data(),
      max: this.max(),
      innerRadius: this.innerRadius(),
      sweep: this.sweep(),
      labels: this.labels(),
      centerValue: this.centerValue(),
      centerLabel: this.centerLabel(),
    };
  }
}

const dateOf = (date: CalendarDate) =>
  date instanceof Date ? date : new Date(date);

/** Calendar heatmap: daily values on a calendar, contributions-style */
@Component({
  selector: "mn-calendar-heatmap",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnCalendarHeatmap extends MnShapeChartCommon {
  /** Daily values `{ date, value }` (several entries of the same day add up) */
  readonly data = input.required<readonly CalendarDatum[]>();
  /** Days shown: a year (`2026`) or an inclusive `[start, end]` range (default: the 53 weeks ending on the last day of the data) */
  readonly range = input<
    number | readonly [CalendarDate, CalendarDate] | undefined
  >(undefined);
  /** `weeks`: a column per week; `months`: a small calendar per month (default `weeks`) */
  readonly layout = input<"weeks" | "months" | undefined>(undefined);
  /** First day of the week, 0 = Sunday … 6 = Saturday (default: from `locale`) */
  readonly weekStart = input<number | undefined>(undefined);
  /** Color of the highest level (default: the first palette color) */
  readonly color = input<string | undefined>(undefined);
  /** Colors of the levels, lowest first (replaces `color`) */
  readonly colors = input<readonly string[] | undefined>(undefined);
  /** Number of color levels above the empty days (default 4) */
  readonly levels = input<number | undefined>(undefined);
  /** Upper bounds of the levels but the last, ascending */
  readonly thresholds = input<readonly number[] | undefined>(undefined);

  protected override defaultHeight(): number {
    if (this.layout() === "months") return 560;
    const range = this.range();
    let strips = 1;
    if (Array.isArray(range)) {
      const [start, end] = range as readonly [CalendarDate, CalendarDate];
      const y0 = dateOf(start).getFullYear();
      const y1 = dateOf(end).getFullYear();
      const days =
        (dateOf(end).getTime() - dateOf(start).getTime()) / 86_400_000 + 1;
      if (y1 > y0 && days > 371) strips = y1 - y0 + 1;
    }
    return strips * 120 + (this.legend() === false ? 0 : 34) + 16;
  }

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "calendarHeatmap",
      data: this.data(),
      range: this.range(),
      layout: this.layout(),
      weekStart: this.weekStart(),
      color: this.color(),
      colors: this.colors(),
      levels: this.levels(),
      thresholds: this.thresholds(),
    };
  }
}

/** Bullet chart: KPI bars against qualitative ranges and a target marker */
@Component({
  selector: "mn-bullet-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnBulletChart extends MnShapeChartCommon {
  /** Rows `{ name, value, target, ranges, max }` (columns when vertical) */
  readonly data = input.required<readonly BulletDatum[]>();
  /** Horizontal rows or vertical columns (default `horizontal`) */
  readonly orientation = input<"horizontal" | "vertical" | undefined>(
    undefined,
  );
  /** Qualitative ranges of the rows without `ranges`: upper bounds, ascending */
  readonly ranges = input<readonly number[] | undefined>(undefined);
  /** Names of the qualitative ranges, lowest first (tooltip) */
  readonly rangeLabels = input<readonly string[] | undefined>(undefined);
  /** Colors of the qualitative ranges, lowest first */
  readonly rangeColors = input<readonly string[] | undefined>(undefined);
  /** Color of the target markers (default: the text color) */
  readonly targetColor = input<string | undefined>(undefined);

  protected override defaultHeight(): number {
    if (this.orientation() === "vertical") return 320;
    return (
      Math.max(96, this.data().length * 64 + 16) + (this.legend() ? 34 : 0)
    );
  }

  protected engineOptions(): ShapeChartOptions {
    return {
      ...this.commonOptions(),
      type: "bullet",
      data: this.data(),
      orientation: this.orientation(),
      ranges: this.ranges(),
      rangeLabels: this.rangeLabels(),
      rangeColors: this.rangeColors(),
      targetColor: this.targetColor(),
    };
  }
}
