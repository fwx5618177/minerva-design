// The contract suites against the native Vue 3 renderer
// (minerva-design/vue).
import { describe } from "vitest";
import { vueDriver } from "./drivers/vue";
import { runContractSuites } from "./suites";

describe("vue", () => runContractSuites(vueDriver));
