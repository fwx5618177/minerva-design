// Built-in texts of the graph charts (English, Chinese, Japanese, French)
// and the number formatting of their tooltips.

import {
  localeLabels,
  numberFormat,
  resolveLocale,
  type LabelDictionary,
} from "../locale";
import type { GraphChartLabels } from "./types";

export const GRAPH_LABELS: LabelDictionary<GraphChartLabels> = {
  en: {
    chart: "Network graph",
    tree: "Tree diagram",
    dag: "Dependency graph",
    summary: "{nodes} nodes, {edges} links.",
    groupsSummary: "Groups: {groups}.",
    keyboardHelp:
      "Use the arrow keys to move between nodes, Enter to select, + and - to zoom, 0 to fit.",
    nodeFocus: "{name}, {degree} links",
    nodeFocusGroup: "{name} ({group}), {degree} links",
    selected: "{count} selected",
    selectionCleared: "Selection cleared",
    expanded: "{name} expanded",
    collapsed: "{name} collapsed, {count} hidden",
    shown: "{name}: shown",
    hidden: "{name}: hidden",
    degree: "Links",
    incoming: "Incoming",
    outgoing: "Outgoing",
    value: "Value",
    group: "Group",
    hiddenChildren: "Hidden",
    critical: "Critical path",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fit: "Fit to view",
    zoomHint: "Use {key} + scroll to zoom",
    listSeparator: ", ",
  },
  zh: {
    chart: "关系图",
    tree: "树图",
    dag: "依赖图",
    summary: "{nodes} 个节点，{edges} 条关系。",
    groupsSummary: "分组：{groups}。",
    keyboardHelp:
      "使用方向键在节点间移动，Enter 选中，+ 和 - 缩放，0 适应视图。",
    nodeFocus: "{name}，{degree} 条关系",
    nodeFocusGroup: "{name}（{group}），{degree} 条关系",
    selected: "已选中 {count} 个",
    selectionCleared: "已清除选择",
    expanded: "{name} 已展开",
    collapsed: "{name} 已折叠，隐藏 {count} 个",
    shown: "{name}：已显示",
    hidden: "{name}：已隐藏",
    degree: "关系数",
    incoming: "入边",
    outgoing: "出边",
    value: "数值",
    group: "分组",
    hiddenChildren: "已折叠",
    critical: "关键路径",
    zoomIn: "放大",
    zoomOut: "缩小",
    fit: "适应视图",
    zoomHint: "按住 {key} 并滚动以缩放",
    listSeparator: "、",
  },
  ja: {
    chart: "ネットワーク図",
    tree: "ツリー図",
    dag: "依存関係グラフ",
    summary: "ノード {nodes} 個、リンク {edges} 本。",
    groupsSummary: "グループ：{groups}。",
    keyboardHelp:
      "矢印キーでノード間を移動、Enter で選択、+ と - でズーム、0 で全体表示。",
    nodeFocus: "{name}、リンク {degree} 本",
    nodeFocusGroup: "{name}（{group}）、リンク {degree} 本",
    selected: "{count} 個を選択",
    selectionCleared: "選択を解除しました",
    expanded: "{name} を展開しました",
    collapsed: "{name} を折りたたみました（{count} 個非表示）",
    shown: "{name}：表示",
    hidden: "{name}：非表示",
    degree: "リンク数",
    incoming: "入力",
    outgoing: "出力",
    value: "値",
    group: "グループ",
    hiddenChildren: "非表示",
    critical: "クリティカルパス",
    zoomIn: "拡大",
    zoomOut: "縮小",
    fit: "全体表示",
    zoomHint: "{key} を押しながらスクロールでズーム",
    listSeparator: "、",
  },
  fr: {
    chart: "Graphe de relations",
    tree: "Arbre",
    dag: "Graphe de dépendances",
    summary: "{nodes} nœuds, {edges} liens.",
    groupsSummary: "Groupes : {groups}.",
    keyboardHelp:
      "Flèches pour passer d’un nœud à l’autre, Entrée pour sélectionner, + et - pour zoomer, 0 pour tout afficher.",
    nodeFocus: "{name}, {degree} liens",
    nodeFocusGroup: "{name} ({group}), {degree} liens",
    selected: "{count} sélectionné(s)",
    selectionCleared: "Sélection effacée",
    expanded: "{name} déplié",
    collapsed: "{name} replié, {count} masqué(s)",
    shown: "{name} : affiché",
    hidden: "{name} : masqué",
    degree: "Liens",
    incoming: "Entrants",
    outgoing: "Sortants",
    value: "Valeur",
    group: "Groupe",
    hiddenChildren: "Masqués",
    critical: "Chemin critique",
    zoomIn: "Zoom avant",
    zoomOut: "Zoom arrière",
    fit: "Tout afficher",
    zoomHint: "Utilisez {key} + molette pour zoomer",
    listSeparator: ", ",
  },
};

/** Replaces `{name}` placeholders */
export const fill = (
  template: string,
  values: Record<string, string | number>,
): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );

export interface GraphLocale {
  locale: string;
  labels: GraphChartLabels;
  count: (value: number) => string;
  value: (value: number) => string;
}

export const graphLocale = (
  locale: string | undefined,
  overrides: Partial<GraphChartLabels> | undefined,
): GraphLocale => {
  const resolved = resolveLocale(locale);
  return {
    locale: resolved,
    labels: localeLabels(GRAPH_LABELS, resolved, overrides),
    count: (value) => numberFormat(resolved).format(value),
    value: (value) =>
      Number.isFinite(value)
        ? numberFormat(resolved, { maximumFractionDigits: 2 }).format(value)
        : "–",
  };
};
