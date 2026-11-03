import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../recipes/", import.meta.url));
const metadata = {
  "react-form": {
    title: "React controlled project form",
    renderer: "react",
    pages: ["input", "switch", "form-control", "form-layout", "button"],
  },
  "vue-form": {
    title: "Vue controlled project form",
    renderer: "vue",
    pages: ["input", "switch", "form-control", "form-layout", "button"],
  },
  "trading-chart": {
    title: "React trading chart with local data",
    renderer: "react",
    pages: ["trading-chart", "charts"],
  },
};
export function readRecipes(version) {
  return Object.keys(metadata)
    .sort()
    .map((id) => {
      const files = {};
      function visit(directory, prefix = "") {
        for (const file of readdirSync(directory, { withFileTypes: true })) {
          const key = prefix + file.name;
          if (file.isDirectory()) visit(join(directory, file.name), key + "/");
          else files[key] = readFileSync(join(directory, file.name), "utf8");
        }
      }
      visit(join(ROOT, id));
      const pkg = JSON.parse(files["package.json"]);
      pkg.dependencies["minerva-design"] = version;
      files["package.json"] = JSON.stringify(pkg, null, 2) + "\n";
      return {
        id,
        ...metadata[id],
        kind: "standalone-recipe",
        packageVersion: version,
        files,
        dependencies: { ...pkg.dependencies, ...pkg.devDependencies },
        url: `/minerva-design/reference/${version}/recipes/${id}/README.md`,
      };
    });
}
