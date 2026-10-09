// Native component tests: fake-timer friendly cleanup between tests (RNTL
// registers its own `cleanup` on the globals).
import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// RN 0.86 FlatList reads ScrollView.Context. The upstream native-host mock
// predates this static; supply its real context without mocking virtualization.
import { createContext } from "react";
import { ScrollView } from "react-native";
if (!("Context" in ScrollView)) {
  Object.defineProperty(ScrollView, "Context", {
    value: createContext(null),
    configurable: true,
  });
}
