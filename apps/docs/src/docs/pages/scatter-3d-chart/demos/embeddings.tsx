import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TOPICS = [
  "sports",
  "politics",
  "technology",
  "health",
  "finance",
  "travel",
] as const;
type Topic = (typeof TOPICS)[number];

// center of each topic in the space of the first three principal components
const CENTERS: Record<Topic, [number, number, number]> = {
  sports: [-3.2, 1.6, 0.4],
  politics: [2.6, 2.4, -0.8],
  technology: [1.4, -2.6, 1.6],
  health: [-1.8, -1.8, -1.4],
  finance: [3.4, -0.4, 0.2],
  travel: [-2.4, 2.8, -2.2],
};
// share of the variance explained by each component
const VARIANCE = [0.41, 0.23, 0.12];
const PER_TOPIC = 100;

interface Doc {
  topic: Topic;
  n: number;
  x: number;
  y: number;
  z: number;
}

// 600 article embeddings projected on 3 components, 100 per topic
const DOCS: Doc[] = (() => {
  const random = mulberry32(17);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  return TOPICS.flatMap((topic) =>
    Array.from({ length: PER_TOPIC }, (_, n) => {
      const [cx, cy, cz] = CENTERS[topic];
      return {
        topic,
        n: n + 1,
        x: cx + gauss() * 0.75,
        y: cy + gauss() * 0.6,
        z: cz + gauss() * 0.5,
      };
    }),
  );
})();

/** The k documents closest to `doc` (Euclidean distance) */
const nearest = (doc: Doc, k: number) =>
  DOCS.filter((other) => other !== doc)
    .map((other) => ({
      doc: other,
      distance: Math.hypot(other.x - doc.x, other.y - doc.y, other.z - doc.z),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);

export default function EmbeddingsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [picked, setPicked] = useState<Doc | null>(null);
  const neighbours = useMemo(
    () => (picked ? nearest(picked, 5) : []),
    [picked],
  );
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const title = (doc: Doc) =>
    t("docLabel", { topic: t(`topics.${doc.topic}`), n: doc.n });

  const topicData = useMemo(
    () =>
      TOPICS.map((topic) =>
        DOCS.filter((doc) => doc.topic === topic).map((doc) => ({
          x: doc.x,
          y: doc.y,
          z: doc.z,
          label: t("docLabel", { topic: t(`topics.${topic}`), n: doc.n }),
        })),
      ),
    [t],
  );

  const series = useMemo((): Scatter3DSeries[] => {
    const topics = TOPICS.map((topic, i): Scatter3DSeries => ({
      id: topic,
      name: t(`topics.${topic}`),
      data: topicData[i]!,
      pointSize: 5,
      opacity: picked ? 0.35 : 0.9,
    }));
    if (!picked) return topics;
    // the picked article and its neighbours, drawn on top in a larger size
    return [
      ...topics,
      {
        id: "neighbours",
        name: t("neighbours"),
        color: "var(--danger-color, #dc2626)",
        pointSize: 10,
        data: [picked, ...neighbours.map((item) => item.doc)].map((doc) => ({
          x: doc.x,
          y: doc.y,
          z: doc.z,
          label: t("docLabel", { topic: t(`topics.${doc.topic}`), n: doc.n }),
        })),
      },
    ];
  }, [t, topicData, picked, neighbours]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Scatter3DChart
        series={series}
        xAxis={{
          title: t("component", {
            n: 1,
            variance: percent.format(VARIANCE[0]),
          }),
        }}
        yAxis={{
          title: t("component", {
            n: 2,
            variance: percent.format(VARIANCE[1]),
          }),
        }}
        zAxis={{
          title: t("component", {
            n: 3,
            variance: percent.format(VARIANCE[2]),
          }),
        }}
        aspect={[1, 1, 0.7]}
        camera={{ azimuth: 30, elevation: 22 }}
        height={460}
        ariaLabel={t("embeddingsAria")}
        onPointClick={(event) => {
          if (event.seriesId === "neighbours") {
            if (event.index === 0) return setPicked(null);
            return setPicked(neighbours[event.index - 1]!.doc);
          }
          const topic = event.seriesId as Topic;
          setPicked(DOCS[TOPICS.indexOf(topic) * PER_TOPIC + event.index]!);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked
          ? t("neighboursOf", {
              doc: title(picked),
              list: new Intl.ListFormat(i18n.language).format(
                neighbours.map((item) =>
                  t("neighbourItem", {
                    doc: title(item.doc),
                    distance: decimal.format(item.distance),
                  }),
                ),
              ),
            })
          : t("embeddingsHint")}
      </output>
    </div>
  );
}
