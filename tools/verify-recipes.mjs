// Install one real tarball in an isolated consumer, then type-check and build
// every standalone recipe using that installation. Never resolve workspace aliases.
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readRecipes } from "../apps/docs/scripts/recipes.mjs";
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const run = (args, cwd) =>
  execFileSync("pnpm", ["--config.verifyDepsBeforeRun=false", ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "development" },
    maxBuffer: 16 * 1024 * 1024,
  });
export function verifyRecipes() {
  const temp = mkdtempSync(join(tmpdir(), "minerva-recipe-consumer-"));
  try {
    const version = JSON.parse(
      readFileSync(join(ROOT, "packages/minerva-design/package.json"), "utf8"),
    ).version;
    run(
      ["pack", "--pack-destination", temp],
      join(ROOT, "packages/minerva-design"),
    );
    const tarball = join(
      temp,
      readdirSync(temp).find((f) => f.endsWith(".tgz")),
    );
    const recipes = readRecipes(version),
      dependencies = {},
      devDependencies = {};
    for (const recipe of recipes) {
      const pkg = JSON.parse(recipe.files["package.json"]);
      Object.assign(dependencies, pkg.dependencies);
      Object.assign(devDependencies, pkg.devDependencies);
    }
    dependencies["minerva-design"] = `file:${tarball}`;
    // Host DOM validates real packaged form interactions; GPU rendering remains
    // a browser/device concern and is not certified by this Node check.
    devDependencies["happy-dom"] = JSON.parse(
      readFileSync(join(ROOT, "node_modules/happy-dom/package.json"), "utf8"),
    ).version;
    writeFileSync(
      join(temp, "package.json"),
      JSON.stringify({
        name: "minerva-recipes-consumer",
        private: true,
        type: "module",
        dependencies,
        devDependencies,
      }),
    );
    writeFileSync(
      join(temp, "pnpm-workspace.yaml"),
      "autoInstallPeers: false\nallowBuilds:\n  esbuild: true\n",
    );
    run(["install", "--ignore-workspace", "--prefer-offline"], temp);
    const results = [];
    for (const recipe of recipes) {
      const app = join(temp, recipe.id);
      mkdirSync(app);
      for (const [file, source] of Object.entries(recipe.files)) {
        mkdirSync(dirname(join(app, file)), { recursive: true });
        writeFileSync(join(app, file), source);
      }
      run(["run", "build"], app);
      const entry = recipe.renderer === "vue" ? "src/App.vue" : "src/App.tsx";
      run(
        [
          "exec",
          "vite",
          "build",
          "--ssr",
          entry,
          "--outDir",
          "dist-ssr",
          "--logLevel",
          "error",
        ],
        app,
      );
      if (recipe.renderer === "vue") {
        writeFileSync(
          join(app, "host.config.mjs"),
          `import { defineConfig } from "vite"; import vue from "@vitejs/plugin-vue"; export default defineConfig({plugins:[vue()],build:{outDir:"dist-host",lib:{entry:"src/App.vue",formats:["es"],fileName:"App"},rollupOptions:{external:["vue","minerva-design/vue"]}}});`,
        );
        run(
          [
            "exec",
            "vite",
            "build",
            "--config",
            "host.config.mjs",
            "--logLevel",
            "error",
          ],
          app,
        );
      }
      if (!existsSync(join(app, "dist/index.html")))
        throw new Error(`${recipe.id}: no production HTML`);
      results.push({
        recipe: recipe.id,
        packageVersion: version,
        typecheck: true,
        build: true,
      });
    }
    // Run one process per framework so neither a second React copy nor a Vue
    // import cached before DOM initialization can mask consumer behavior.
    cpSync(
      new URL("./recipe-interactions.mjs", import.meta.url),
      join(temp, "interactions.mjs"),
    );
    execFileSync(
      process.execPath,
      [join(temp, "interactions.mjs"), "react-form"],
      { cwd: temp, stdio: "pipe", encoding: "utf8" },
    );
    execFileSync(
      process.execPath,
      [join(temp, "interactions.mjs"), "vue-form"],
      { cwd: temp, stdio: "pipe", encoding: "utf8" },
    );
    return results;
  } catch (error) {
    throw new Error(
      `Standalone recipe verification failed:\n${error.stdout ?? ""}\n${error.stderr ?? error.message}`,
      { cause: error },
    );
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  console.log(JSON.stringify(verifyRecipes(), null, 2));
