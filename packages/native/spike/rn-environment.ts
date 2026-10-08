import { createRequire } from "node:module";
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
  async setup() {
    stubCjs("react-native/Libraries/Core/InitializeCore", {});
    // Installs @babel/register (Flow + haste .ios resolution) and RN native mocks.
    await import("react-native-testing-mocks/register");
    return { teardown() {} };
  },
};

export default reactNativeEnvironment;
