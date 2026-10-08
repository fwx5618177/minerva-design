// The contract suites against the React DOM renderer (minerva-design).
import { describe } from "vitest";
import { reactDriver } from "./drivers/react";
import { runContractSuites } from "./suites";

describe("react", () => runContractSuites(reactDriver));
