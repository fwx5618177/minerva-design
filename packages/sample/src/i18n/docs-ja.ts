// All "ja" documentation strings, bundled into one lazily-loaded chunk
export default import.meta.glob<Record<string, unknown>>(
  "./locales/ja/docs/*.json",
  { eager: true, import: "default" },
);
