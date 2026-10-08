// Registers <minerva-toast-region> and exports the `toast()` API.
import { MinervaToastRegion } from "../components/toast/toast";
import { defineElement } from "../internal/define";

defineElement(MinervaToastRegion);

export * from "../components/toast/toast";
export * from "../components/toast/toast-store";
