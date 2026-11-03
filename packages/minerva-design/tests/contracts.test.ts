// Real packed, dependency-free consumer of the public metadata entry.
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
const root = fileURLToPath(new URL("../", import.meta.url));
const workspace = fileURLToPath(new URL("../../../", import.meta.url));
it("packs public immutable metadata with ESM/CJS/types and no renderer or DOM dependency", () => {
  const dir = mkdtempSync(join(tmpdir(), "minerva-contracts-consumer-"));
  try {
    execFileSync(
      "pnpm",
      ["--config.verifyDepsBeforeRun=false", "pack", "--pack-destination", dir],
      { cwd: root, stdio: "pipe" },
    );
    const tarball = join(
      dir,
      readdirSync(dir).find((name) => name.endsWith(".tgz"))!,
    );
    const modules = join(dir, "node_modules");
    mkdirSync(modules);
    execFileSync("tar", ["-xzf", tarball, "-C", modules]);
    renameSync(join(modules, "package"), join(modules, "minerva-design"));
    const source = `
      import { createRequire } from 'node:module';
      import { readFileSync } from 'node:fs';
      for (const name of ['window','document','customElements']) Object.defineProperty(globalThis, name, { get() { throw new Error('DOM read: '+name); } });
      const esm = await import('minerva-design/contracts');
      const require = createRequire(import.meta.url);
      const cjs = require('minerva-design/contracts');
      const pkg = JSON.parse(readFileSync(new URL('./node_modules/minerva-design/package.json', import.meta.url)));
      console.log(JSON.stringify({ version: pkg.version, metadata: esm.contractsMetadata, same: JSON.stringify(esm.contractsMetadata) === JSON.stringify(cjs.contractsMetadata), input: esm.getRendererContract('Input','vue').bindings[0].syntax, frozen: Object.isFrozen(cjs.getContract('Upload').events[0]), type: esm.getType(esm.getContract('Upload').props.find(p=>p.name==='value').typeRef).kind }));
    `;
    writeFileSync(join(dir, "check.mjs"), source);
    const result = JSON.parse(
      execFileSync(process.execPath, ["check.mjs"], {
        cwd: dir,
        encoding: "utf8",
      }),
    );
    expect(result).toMatchObject({
      same: true,
      input: "v-model",
      frozen: true,
      type: "array",
    });
    expect(result.metadata.packageVersion).toBe(result.version);
    expect(result.metadata.schemaVersion).toBe("2.0.0");
    const typed = `import { getContract, getRendererContract, getType, contractsMetadata, type Platform } from 'minerva-design/contracts';
      const platform: Platform = 'vue';
      getRendererContract('Input', platform)?.bindings?.map(binding => binding.syntax);
      const contract = getContract('Upload')!;
      getType(contract.props[0].typeRef!);
      const version: string = contractsMetadata.packageVersion;
      void version;
      // @ts-expect-error metadata is immutable
      contract.props.push(contract.props[0]);
      // @ts-expect-error nested renderer imports are immutable
      contract.renderers.vue.import!.exports.push('Wrong');
    `;
    for (const ext of ["mts", "cts"])
      writeFileSync(join(dir, `check.${ext}`), typed);
    execFileSync(
      process.execPath,
      [
        join(workspace, "node_modules/typescript/bin/tsc"),
        "--module",
        "NodeNext",
        "--moduleResolution",
        "NodeNext",
        "--strict",
        "--noEmit",
        "--target",
        "ES2022",
        "check.mts",
        "check.cts",
      ],
      { cwd: dir, stdio: "pipe" },
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
