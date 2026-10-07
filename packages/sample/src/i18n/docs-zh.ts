// All "zh" documentation strings, bundled into one lazily-loaded chunk
export default import.meta.glob<Record<string, unknown>>(
  "./locales/zh/docs/*.json",
  { eager: true, import: "default" },
);
