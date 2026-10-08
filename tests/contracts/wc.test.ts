// The contract suites against the Web Components renderer
// (minerva-design/web-components).
import { describe } from "vitest";
import { wcDriver } from "./drivers/wc";
import { runContractSuites } from "./suites";

describe("wc", () => runContractSuites(wcDriver));
