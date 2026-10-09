import type { JestNativeMatchers } from "@testing-library/react-native/dist/matchers/types";

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
  interface Matchers<T = any> extends JestNativeMatchers<T> {}
}
