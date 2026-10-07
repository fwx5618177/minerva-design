// All "en" documentation strings, bundled into one lazily-loaded chunk
export default import.meta.glob<Record<string, unknown>>(
  "./locales/en/docs/*.json",
  { eager: true, import: "default" },
);
