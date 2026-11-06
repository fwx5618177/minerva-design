import "minerva-design/web-components/button";
import "minerva-design/web-components/slider";
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";
import type { OrderBookHeatmapViewData } from "minerva-design/charts/core";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

export function setup(root: HTMLElement) {
  const heatmap = root.querySelector<MinervaOrderBookHeatmap>("#heatmap")!;
  const output = root.querySelector<HTMLOutputElement>("#view")!;
  const source = root.querySelector<HTMLElement>("#source")!;
  const latest = root.querySelector<HTMLElement>("#latest")!;
  const full = root.querySelector<HTMLElement>("#full")!;
  const follow = root.querySelector<HTMLElement>("#follow")!;
  const intensity = root.querySelector<HTMLElement>("#intensity")!;
  let current: OrderBookHeatmapViewData | null = null;
  let minimum = 0;
  const renderLabels = () => {
    // minerva-config writes lang on its scope; the closest ancestor wins.
    const languageScope = heatmap.closest("[lang]") || document.documentElement;
    const text = getFrameworkLabels(
      languageScope.getAttribute("lang") || document.documentElement.lang,
    );
    source.textContent = text.source;
    latest.textContent = text.latest;
    full.textContent = text.full;
    follow.textContent = text.follow;
    intensity.setAttribute("aria-label", text.minimum);
    const view = current?.view;
    const seconds = view
      ? Math.round((view.time[1] - view.time[0]) / 1000)
      : 30;
    output.value = `${view?.follow ? text.following : text.manual} · ${text.minimum} ${minimum}% · ${seconds} ${text.visible}`;
  };
  renderLabels();
  const languageChanges = new MutationObserver(renderLabels);
  languageChanges.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
    subtree: true,
  });
  const history = createFrameworkHistory();
  const options = {
    interval: 250,
    window: 30000,
    history: 60000,
    maxBars: 30,
    maxColumns: 240,
  };
  heatmap.options = options;
  const show = (seconds: number) =>
    heatmap.setView({
      time: [history.end - seconds * 1000, history.end],
      price: [98, 102],
    });
  const listeners: Array<() => void> = [];
  const listen = (
    element: HTMLElement,
    type: string,
    handler: EventListener,
  ) => {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener(type, handler));
  };
  listen(latest, "click", () => show(10));
  listen(full, "click", () => show(30));
  listen(follow, "click", () => heatmap.resetView());
  listen(intensity, "minerva-change", (event) => {
    minimum = (event as CustomEvent<{ value: number }>).detail.value;
    heatmap.options = { ...options, intensityRange: [minimum / 100, 1] };
    renderLabels();
  });
  listen(heatmap, "minerva-view-change", (event) => {
    current = (event as CustomEvent<OrderBookHeatmapViewData>).detail;
    renderLabels();
  });
  let disposed = false;
  // Apply interval/retention before closing historical book columns.
  void heatmap.updateComplete.then(() => {
    if (disposed) return;
    for (const book of history.books) heatmap.setBook(book);
    heatmap.addTrades(history.trades);
    // Property only: object rows and typed columns are never serialized as attributes.
    heatmap.bars = history.bars;
    show(30);
  });
  return () => {
    disposed = true;
    languageChanges.disconnect();
    listeners.forEach((dispose) => dispose());
  };
}
