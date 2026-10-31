// Data and chart icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Vertical bar chart */
export const barChartIcon: IconDefinition = {
  name: "bar-chart",
  category: "data",
  tags: ["chart", "graph", "statistics", "columns"],
  paths: [
    "M4.5 11h2a1 1 0 0 1 1 1v7.5a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7.5a1 1 0 0 1 1 -1Z",
    "M11 3.5h2a1 1 0 0 1 1 1v15a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-15a1 1 0 0 1 1 -1Z",
    "M17.5 7.5h2a1 1 0 0 1 1 1v11a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-11a1 1 0 0 1 1 -1Z",
  ],
};

/** Line chart on axes */
export const lineChartIcon: IconDefinition = {
  name: "line-chart",
  category: "data",
  tags: ["chart", "graph", "trend", "analytics"],
  paths: ["M3 3.5v17h17.5", "M7 15l4-5 3.5 3L20 6.5"],
};

/** Pie chart with a detached slice */
export const pieChartIcon: IconDefinition = {
  name: "pie-chart",
  category: "data",
  tags: ["chart", "graph", "share", "proportion"],
  paths: ["M11 5A8 8 0 1 0 19 13H11Z", "M12.5 3.5A8 8 0 0 1 20.5 11.5H12.5Z"],
};

/** Area chart on axes */
export const areaChartIcon: IconDefinition = {
  name: "area-chart",
  category: "data",
  tags: ["chart", "graph", "volume", "analytics"],
  paths: ["M3 3.5v17h17.5", "M7 16.5V12l4-4 3.5 3.5L20 6v10.5Z"],
};

/** Candlestick chart */
export const candlestickIcon: IconDefinition = {
  name: "candlestick",
  category: "data",
  tags: ["chart", "stocks", "trading", "market"],
  paths: [
    "M5 3.5v3",
    "M5 15.5v3",
    "M4.5 6.5h1a1 1 0 0 1 1 1v7a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1Z",
    "M12 6v4",
    "M12 17v3.5",
    "M11.5 10h1a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5a1 1 0 0 1 1 -1Z",
    "M19 3v2",
    "M19 12v3.5",
    "M18.5 5h1a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5a1 1 0 0 1 1 -1Z",
  ],
};

/** Pulse line */
export const activityIcon: IconDefinition = {
  name: "activity",
  category: "data",
  tags: ["pulse", "heartbeat", "health", "monitor"],
  paths: ["M2.5 12h4l3-8 5 16 3-8h4"],
};

/** Line trending upwards */
export const trendingUpIcon: IconDefinition = {
  name: "trending-up",
  category: "data",
  tags: ["growth", "increase", "profit", "rise"],
  paths: ["M3 17.5l6-6 4 4 8-8", "M15 7.5h6v6"],
};

/** Line trending downwards */
export const trendingDownIcon: IconDefinition = {
  name: "trending-down",
  category: "data",
  tags: ["decline", "decrease", "loss", "fall"],
  paths: ["M3 6.5l6 6 4-4 8 8", "M15 16.5h6v-6"],
};

/** Scatter plot on axes */
export const scatterChartIcon: IconDefinition = {
  name: "scatter-chart",
  category: "data",
  tags: ["chart", "plot", "points", "distribution"],
  paths: [
    "M3 3.5v17h17.5",
    "M7 15.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M9.5 10a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M13 14a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M15 8.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M18.5 11.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M17.5 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
};

/** Speedometer gauge */
export const gaugeIcon: IconDefinition = {
  name: "gauge",
  category: "data",
  tags: ["speedometer", "meter", "performance", "dashboard"],
  paths: [
    "M5.11 19.29A9 9 0 1 1 18.89 19.29",
    "M12 13.5l3.5-3.5",
    "M12 13.5h.01",
  ],
};

/** Table grid */
export const tableIcon: IconDefinition = {
  name: "table",
  category: "data",
  tags: ["grid", "spreadsheet", "rows", "cells"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z",
    "M3 9h18",
    "M3 15h18",
    "M10 9v12",
  ],
};

/** Percent sign */
export const percentIcon: IconDefinition = {
  name: "percent",
  category: "data",
  tags: ["percentage", "discount", "ratio", "rate"],
  paths: [
    "M19 5L5 19",
    "M4.5 7a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    "M14.5 17a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
  ],
};

/** Greek letter sigma */
export const sigmaIcon: IconDefinition = {
  name: "sigma",
  category: "data",
  tags: ["sum", "total", "math", "formula"],
  paths: ["M18 6.5V4H6l6.5 8L6 20h12v-2.5"],
};

/** Donut chart */
export const donutChartIcon: IconDefinition = {
  name: "donut-chart",
  category: "data",
  tags: ["chart", "ring", "proportion", "breakdown"],
  paths: [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M12 8L12 3",
    "M15.06 14.57L18.89 17.79",
    "M8.24 13.37L3.54 15.08",
  ],
};
