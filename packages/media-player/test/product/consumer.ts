import {
  mkdtemp,
  mkdir,
  cp,
  readFile,
  readdir,
  writeFile,
  rm,
  realpath,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import spawn from "cross-spawn";
import { createRequire } from "node:module";
import { build, preview } from "vite";

const publishedRoot = fileURLToPath(
  new URL("../../../minerva-design/", import.meta.url),
);
export const packageRoot = fileURLToPath(new URL("../../", import.meta.url));
function run(cwd: string, command: string, args: string[]) {
  const result = spawn.sync(command, args, {
    cwd,
    encoding: "utf8",
    timeout: 120_000,
  });
  if (result.error || result.status !== 0)
    throw new Error(
      `${command} ${args.join(" ")} failed: ${result.error?.message ?? ""}\n${result.stdout}\n${result.stderr}`,
    );
  return result.stdout;
}
export async function packConsumer(reactVersion = "18.3.1") {
  const root = await realpath(
    await mkdtemp(path.join(tmpdir(), "media-player-consumer-")),
  );
  let server: Awaited<ReturnType<typeof preview>> | undefined;
  try {
    run(publishedRoot, "pnpm", ["pack", "--pack-destination", root]);
    const tarball = (await readdir(root)).find((name) =>
      name.endsWith(".tgz"),
    )!;
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify({
        name: "external-player-consumer",
        private: true,
        type: "module",
        dependencies: {
          "minerva-design": `file:./${tarball}`,
          react: reactVersion,
          "react-dom": reactVersion,
        },
        devDependencies: {
          "@types/react": reactVersion.startsWith("19") ? "^19.0.0" : "^18.0.0",
          "@types/react-dom": reactVersion.startsWith("19")
            ? "^19.0.0"
            : "^18.0.0",
        },
      }),
    );
    run(root, "pnpm", [
      "install",
      "--ignore-workspace",
      "--ignore-scripts",
      "--prefer-offline",
    ]);
    await writeFile(
      path.join(root, "types.ts"),
      `
      import { createElement, createRef } from 'react';
      import { MediaPlayer, type MediaPlayerHandle } from 'minerva-design/media-player';
      import { createHlsEngine } from 'minerva-design/media-player/engines/hls';
      import { MediaPlayer as MinervaPlayer } from 'minerva-design';
      const ref = createRef<MediaPlayerHandle>();
      createElement(MediaPlayer, { ref, src: 'x.m3u8', title: 'Types', engines: [createHlsEngine()] });
      ref.current?.seek(1);
      createElement(MinervaPlayer, { src: 'test.mp4', controls: false, muted: true, onTimeUpdate: (event) => event.currentTime });
    `,
    );
    run(root, process.execPath, [
      createRequire(import.meta.url).resolve("typescript/bin/tsc"),
      "--noEmit",
      "--strict",
      "--module",
      "NodeNext",
      "--target",
      "ES2022",
      "types.ts",
    ]);
    await cp(new URL("./consumer/", import.meta.url), root, {
      recursive: true,
    });
    await mkdir(path.join(root, "public"));
    await cp(new URL("./media/", import.meta.url), path.join(root, "public"), {
      recursive: true,
    });
    await build({
      configFile: false,
      root,
      logLevel: "error",
      build: { minify: false },
    });
    server = await preview({
      configFile: false,
      root,
      logLevel: "error",
      preview: { host: "127.0.0.1", port: 0 },
    });
    const url = server.resolvedUrls!.local[0];
    const ssr = run(root, process.execPath, [
      "--input-type=module",
      "-e",
      `
      import React from 'react';
      import { renderToString } from 'react-dom/server';
      import { MediaPlayer, defaultEngines } from 'minerva-design/media-player';
      import { createHlsEngine } from 'minerva-design/media-player/engines/hls';
      import { MediaPlayer as MinervaPlayer } from 'minerva-design';
      renderToString(React.createElement(MinervaPlayer, { src: 'test.mp4', controls: false }));
      if (typeof window !== 'undefined') throw Error('SSR must not need a browser');
      console.log(JSON.stringify({ version: React.version, engines: defaultEngines().map(x => x.kind), hls: createHlsEngine().kind, html: renderToString(React.createElement(MediaPlayer, { title: 'SSR', src: 'test.mp4' })) }));
    `,
    ]);
    return {
      root,
      url,
      ssr: JSON.parse(ssr),
      manifest: JSON.parse(
        await readFile(
          path.join(root, "node_modules/minerva-design/package.json"),
          "utf8",
        ),
      ),
      close: async () => {
        if (server)
          await new Promise<void>((resolve, reject) =>
            server!.httpServer.close((error) =>
              error ? reject(error) : resolve(),
            ),
          );
        await rm(root, { recursive: true, force: true, maxRetries: 3 });
      },
    };
  } catch (error) {
    if (server)
      await new Promise<void>((resolve, reject) =>
        server!.httpServer.close((error) =>
          error ? reject(error) : resolve(),
        ),
      );
    await rm(root, { recursive: true, force: true, maxRetries: 3 });
    throw error;
  }
}
