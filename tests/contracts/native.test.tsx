// The contract suites against the React Native renderer
// (minerva-design/native), see vitest.native.config.ts.
import { describe } from "vitest";
import { nativeDriver } from "./drivers/native";
import { runContractSuites } from "./suites";

describe("native", () => runContractSuites(nativeDriver));
