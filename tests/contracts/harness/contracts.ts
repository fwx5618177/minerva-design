// Contract metadata helpers shared by the drivers and the suites.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getContract,
  type ComponentContract,
  type EventContract,
  type Platform,
} from "../../../packages/core/src/contracts";
import type { Spec } from "./types";

export const REPO_ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

/** A native element (`div`), not a component */
export const isNative = (spec: Spec) => /^[a-z]/.test(spec.component);

/** Contract of a component (throws when unknown) */
export function contractOf(name: string): ComponentContract {
  const contract = getContract(name);
  if (!contract) throw new Error(`No component contract named ${name}`);
  return contract;
}

/** Whether a component prop exists on a platform */
export function hasProp(
  contract: ComponentContract,
  name: string,
  platform: Platform,
): boolean {
  const prop = contract.props.find((p) => p.name === name);
  return !!prop && (!prop.only || prop.only === platform);
}

/**
 * Props setting the initial (uncontrolled) value: `defaultX` where the
 * platform has it, else `x`. Custom elements always use `x`: the property is
 * the live state (their `defaultValue` / `defaultChecked` are the values
 * restored by `form.reset()`).
 */
export function initialProps(
  contract: ComponentContract,
  platform: Platform,
  name: string,
  value: unknown,
): Record<string, unknown> {
  const uncontrolled = `default${name[0].toUpperCase()}${name.slice(1)}`;
  const useDefault =
    platform !== "wc" && hasProp(contract, uncontrolled, platform);
  return { [useDefault ? uncontrolled : name]: value };
}

/** The contract event carrying a detail field (`checked`, `value`, `open`) */
export function eventWith(
  contract: ComponentContract,
  field: string,
  platform: Platform,
): EventContract {
  const event = contract.events.find(
    (e) => e.detail?.includes(field) && (platform === "react" ? e.react : e.wc),
  );
  if (!event)
    throw new Error(
      `${contract.name}: no ${platform} event with detail.${field}`,
    );
  return event;
}

/**
 * React callback arguments -> the contract's detail fields, by position
 * (`onChange(checked, event)` -> `{ checked }`); events are dropped.
 */
export function detailOf(
  event: EventContract,
  args: unknown[],
): Record<string, unknown> {
  const detail: Record<string, unknown> = {};
  (event.detail ?? []).forEach((field, i) => {
    const value = args[i];
    if (value === null || typeof value !== "object") detail[field] = value;
  });
  return detail;
}
