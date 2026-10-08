import type { JestNativeMatchers } from "@testing-library/react-native/dist/matchers/types";

declare module "vitest" {
  interface Matchers<T = any> extends JestNativeMatchers<T> {}
}
