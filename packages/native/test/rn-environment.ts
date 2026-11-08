import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { Environment } from "vitest/runtime";

/**
 * Vitest 5-compatible replacement for `react-native-testing-mocks/vitest/env`.
 *
 * Why not the shipped env/plugin (v1.7.0)?
 *  1. It is resolved by Vitest 5 as a CJS namespace (`{ default: env }`) and uses the
 *     removed `transformMode` key -> "TypeError: environment.setup is not a function".
 *  2. With RN 0.86, its coreMocks eagerly requires RendererImplementation -> ReactFabric ->
 *     InitializeCore *before* it installs the InitializeCore mock, which crashes with
 *     "Invariant Violation: __fbBatchedBridgeConfig is not set". We pre-seed the CJS
 *     require cache with an empty InitializeCore (same thing RN's own jest preset does).
 */
const require = createRequire(import.meta.url);

function stubCjs(request: string, exports: unknown): void {
  const id = require.resolve(request);
  require.cache[id] = {
    id,
    filename: id,
    loaded: true,
    exports,
    children: [],
    paths: [],
  } as unknown as NodeJS.Module;
}

const reactNativeEnvironment: Environment = {
  name: "react-native",
  viteEnvironment: "ssr",
  setup() {
    stubCjs("react-native/Libraries/Core/InitializeCore", {});
    // The upstream Babel registration uses bare plugin/preset names, which Babel
    // resolves from process.cwd(). Unfiltered root runs start in the repository,
    // while this toolchain belongs to packages/native. Keep its Flow/haste rules
    // but resolve both dependencies explicitly from their owning workspace.
    const mocksRoot = dirname(
      require.resolve("react-native-testing-mocks/package.json"),
    );
    const mocksRequire = createRequire(join(mocksRoot, "package.json"));
    const register = mocksRequire("@babel/register") as (
      options: unknown,
    ) => void;
    register({
      cache: false,
      extensions: [".ios.js", ".ios.jsx", ".js", ".jsx"],
      only: [/[/\\]node_modules[/\\](react-native|@react-native)[/\\]/],
      plugins: [
        [
          require.resolve("babel-plugin-module-resolver"),
          {
            resolvePath(sourcePath: string) {
              const hastePaths = [
                "/Image",
                "/Platform",
                "/PlatformColorValueTypes",
                "/BaseViewConfig",
              ];
              return sourcePath.startsWith(".") &&
                hastePaths.some((path) => sourcePath.endsWith(path))
                ? `${sourcePath}.ios`
                : undefined;
            },
          },
        ],
      ],
      presets: [require.resolve("@react-native/babel-preset")],
    });
    // v1.7.0's loader registers Babel before installing its mocks; that step is
    // already complete above. The remainder of its native mocks stays intact.
    stubCjs(join(mocksRoot, "dist/src/lib/babelRegister.cjs"), {});
    require("react-native-testing-mocks/register");
    return { teardown() {} };
  },
};

export default reactNativeEnvironment;
