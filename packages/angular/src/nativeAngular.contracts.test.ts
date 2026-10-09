import { describe } from "vitest";
import { nativeAngular } from "./testing/contract-driver";
import { runContractSuites } from "../../../tests/contracts/suites";
describe("nativeAngular", () => runContractSuites(nativeAngular));
