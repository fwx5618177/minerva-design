import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { expect, it } from "vitest";
import { docPages } from "../../apps/docs/src/docs/registry";
const src = fileURLToPath(new URL("../../apps/docs/src/", import.meta.url));
const api = JSON.parse(
  readFileSync(join(src, "docs/api.native.generated.json"), "utf8"),
);
it.each(
  docPages
    .filter((page) => page.native)
    .map((page) => [page.id, page] as const),
)(
  "%s native examples have working routes, API and translated descriptions",
  (id, page) => {
    const dir = join(src, "docs/pages", id);
    expect(existsSync(join(dir, "index.tsx"))).toBe(true);
    const files = readdirSync(join(dir, "native"))
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.slice(0, -4));
    expect(files.sort()).toEqual([...page.native!.demos].sort());
    for (const name of page.native!.api)
      expect(api[`native:${name}`], name).toBeDefined();
    for (const lang of ["en", "zh", "ja", "fr"]) {
      const messages = JSON.parse(
        readFileSync(
          join(src, "i18n/locales", lang, "docs", id + ".json"),
          "utf8",
        ),
      );
      for (const demo of files) {
        expect(
          messages.native?.demos[demo]?.title,
          `${lang}/${id}/${demo}`,
        ).toBeTruthy();
        expect(
          messages.native?.demos[demo]?.description,
          `${lang}/${id}/${demo}`,
        ).toBeTruthy();
      }
    }
  },
);
