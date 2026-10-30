// Data of the graph-chart demos: characters of Romance of the Three Kingdoms
// (三国演义), their factions and relationships, and a generated community
// network. Names and relation labels come from the page's locale file.

import type { GraphEdge, GraphGroup, GraphNode } from "minerva-design/charts";

export type Faction = "shu" | "wei" | "wu" | "qun";

/** id, faction, importance (node size) */
export const CHARACTERS: [string, Faction, number][] = [
  ["liubei", "shu", 10],
  ["guanyu", "shu", 9],
  ["zhangfei", "shu", 8],
  ["zhugeliang", "shu", 10],
  ["zhaoyun", "shu", 8],
  ["machao", "shu", 6],
  ["huangzhong", "shu", 6],
  ["pangtong", "shu", 5],
  ["jiangwei", "shu", 6],
  ["liushan", "shu", 5],
  ["weiyan", "shu", 5],
  ["fazheng", "shu", 4],
  ["caocao", "wei", 10],
  ["caopi", "wei", 7],
  ["simayi", "wei", 9],
  ["xiahoudun", "wei", 6],
  ["xiahouyuan", "wei", 5],
  ["zhangliao", "wei", 6],
  ["xuchu", "wei", 5],
  ["guojia", "wei", 5],
  ["xunyu", "wei", 5],
  ["dianwei", "wei", 4],
  ["caozhi", "wei", 4],
  ["simazhao", "wei", 5],
  ["dengai", "wei", 5],
  ["sunquan", "wu", 9],
  ["sunce", "wu", 7],
  ["sunjian", "wu", 6],
  ["zhouyu", "wu", 8],
  ["lusu", "wu", 6],
  ["lumeng", "wu", 6],
  ["luxun", "wu", 7],
  ["ganning", "wu", 5],
  ["huanggai", "wu", 4],
  ["xiaoqiao", "wu", 3],
  ["daqiao", "wu", 3],
  ["sunshangxiang", "wu", 4],
  ["lvbu", "qun", 8],
  ["dongzhuo", "qun", 6],
  ["diaochan", "qun", 5],
  ["yuanshao", "qun", 6],
  ["xiandi", "qun", 5],
  ["wangyun", "qun", 3],
];

export type Relation =
  | "brothers"
  | "serves"
  | "father"
  | "spouse"
  | "siblings"
  | "rival"
  | "mentor"
  | "adoptive"
  | "ally"
  | "defeated"
  | "friends";

/** source, target, relation; `serves` points from the vassal to the lord */
export const RELATIONS: [string, string, Relation][] = [
  ["liubei", "guanyu", "brothers"],
  ["liubei", "zhangfei", "brothers"],
  ["guanyu", "zhangfei", "brothers"],
  ["zhugeliang", "liubei", "serves"],
  ["zhaoyun", "liubei", "serves"],
  ["machao", "liubei", "serves"],
  ["huangzhong", "liubei", "serves"],
  ["pangtong", "liubei", "serves"],
  ["weiyan", "liubei", "serves"],
  ["fazheng", "liubei", "serves"],
  ["liubei", "liushan", "father"],
  ["liubei", "sunshangxiang", "spouse"],
  ["sunquan", "sunshangxiang", "siblings"],
  ["zhugeliang", "jiangwei", "mentor"],
  ["zhugeliang", "simayi", "rival"],
  ["zhugeliang", "zhouyu", "rival"],
  ["jiangwei", "dengai", "rival"],
  ["jiangwei", "liushan", "serves"],
  ["zhugeliang", "liushan", "serves"],
  ["caocao", "caopi", "father"],
  ["caocao", "caozhi", "father"],
  ["caopi", "caozhi", "siblings"],
  ["simayi", "caocao", "serves"],
  ["simayi", "caopi", "serves"],
  ["simayi", "simazhao", "father"],
  ["xiahoudun", "caocao", "serves"],
  ["xiahouyuan", "caocao", "serves"],
  ["zhangliao", "caocao", "serves"],
  ["xuchu", "caocao", "serves"],
  ["dianwei", "caocao", "serves"],
  ["guojia", "caocao", "serves"],
  ["xunyu", "caocao", "serves"],
  ["dengai", "simazhao", "serves"],
  ["caocao", "liubei", "rival"],
  ["caocao", "yuanshao", "defeated"],
  ["caocao", "lvbu", "defeated"],
  ["huangzhong", "xiahouyuan", "defeated"],
  ["zhangliao", "sunquan", "defeated"],
  ["lumeng", "guanyu", "defeated"],
  ["luxun", "liubei", "defeated"],
  ["zhouyu", "caocao", "defeated"],
  ["sunjian", "sunce", "father"],
  ["sunjian", "sunquan", "father"],
  ["sunce", "sunquan", "siblings"],
  ["sunce", "daqiao", "spouse"],
  ["zhouyu", "xiaoqiao", "spouse"],
  ["daqiao", "xiaoqiao", "siblings"],
  ["sunce", "zhouyu", "friends"],
  ["zhouyu", "sunquan", "serves"],
  ["lusu", "sunquan", "serves"],
  ["lumeng", "sunquan", "serves"],
  ["luxun", "sunquan", "serves"],
  ["ganning", "sunquan", "serves"],
  ["huanggai", "sunquan", "serves"],
  ["huanggai", "zhouyu", "serves"],
  ["liubei", "sunquan", "ally"],
  ["lusu", "zhugeliang", "ally"],
  ["lvbu", "dongzhuo", "adoptive"],
  ["lvbu", "diaochan", "spouse"],
  ["wangyun", "diaochan", "adoptive"],
  ["dongzhuo", "xiandi", "serves"],
  ["caocao", "xiandi", "serves"],
  ["yuanshao", "dongzhuo", "rival"],
  ["lvbu", "liubei", "rival"],
];

export const FACTIONS: Faction[] = ["shu", "wei", "wu", "qun"];

/** Faction colors (Shu green, Wei blue, Wu red, warlords amber) */
export const FACTION_COLORS: Record<Faction, string> = {
  shu: "var(--success-color, #16a34a)",
  wei: "var(--info-color, #0ea5e9)",
  wu: "var(--danger-color, #ef4444)",
  qun: "var(--warning-color, #f59e0b)",
};

type Translate = (key: string, options?: Record<string, unknown>) => string;

/** Nodes, edges and groups of the character network in the reader's language */
export const characterGraph = (
  t: Translate,
): { nodes: GraphNode[]; edges: GraphEdge[]; groups: GraphGroup[] } => ({
  nodes: CHARACTERS.map(([id, faction, importance]) => ({
    id,
    label: t(`characters.${id}`),
    group: faction,
    value: importance,
  })),
  edges: RELATIONS.map(([source, target, relation]) => ({
    source,
    target,
    label: t(`relations.${relation}`),
    directed: relation === "serves" || relation === "defeated",
    dashed: relation === "rival",
    data: relation,
  })),
  groups: FACTIONS.map((id) => ({
    id,
    name: t(`factions.${id}`),
    color: FACTION_COLORS[id],
  })),
});

/**
 * A large network: `communities` groups of `size` nodes, each a random
 * tree plus extra links inside the group and a few between groups
 * (seeded: the same graph on every render)
 */
export const communityGraph = (
  communities: number,
  size: number,
): { nodes: GraphNode[]; edges: GraphEdge[] } => {
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  for (let c = 0; c < communities; c++) {
    const base = c * size;
    for (let i = 0; i < size; i++) {
      const id = base + i;
      nodes.push({ id: String(id), group: `c${c % 8}` });
      if (i > 0) {
        // preferential attachment: hubs inside each community
        const parent = base + Math.floor(Math.pow(random(), 2.2) * i);
        edges.push({ source: String(parent), target: String(id) });
        const other = base + Math.floor(random() * size);
        if (other !== id)
          edges.push({ source: String(id), target: String(other) });
        if (random() < 0.12) {
          const third = base + Math.floor(random() * size);
          if (third !== id)
            edges.push({ source: String(id), target: String(third) });
        }
      }
    }
    // bridges to other communities
    for (let k = 0; k < 4; k++) {
      const a = base + Math.floor(random() * size);
      const b =
        Math.floor(random() * communities) * size + Math.floor(random() * size);
      if (Math.floor(b / size) !== c)
        edges.push({ source: String(a), target: String(b) });
    }
  }
  return { nodes, edges };
};
