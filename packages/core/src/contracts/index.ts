/**
 * `@minerva/core/contracts`: runtime metadata of every Minerva component
 * (props, events, slots, product tracks and the platform support matrix).
 *
 * Internal entry (not part of the main core index, so `@minerva/core` stays
 * small): read by the docs ("Platform support" page), the cross-platform
 * contract tests (tests/contracts) and future renderers.
 *
 * The data is generated from the React props types and the Custom Elements
 * Manifest by `pnpm gen:contracts` (tools/generate-contracts.mjs);
 * tests/docs/contracts.test.ts fails when it is stale.
 */
import data from "./components.generated.json";
import type {
  ComponentContract,
  Platform,
  PlatformSupport,
  SupportStatus,
  Track,
} from "./types";

export type * from "./types";
export { PLATFORMS, SUPPORT_STATUSES, TRACKS } from "./constants";

/** Every component contract, sorted by name */
export const componentContracts =
  data as unknown as readonly ComponentContract[];

/** Contract of a component by name (`Button`) or tag (`minerva-button`) */
export function getContract(nameOrTag: string): ComponentContract | undefined {
  return componentContracts.find(
    (c) => c.name === nameOrTag || c.tag === nameOrTag,
  );
}

/** Support of a component on a platform (`planned` when unknown) */
export function getSupport(
  contract: ComponentContract,
  platform: Platform,
): PlatformSupport {
  return contract.platforms[platform] ?? { status: "planned" };
}

/** Components of a product track (all of them without a track) */
export function contractsForTrack(track?: Track): ComponentContract[] {
  return componentContracts.filter((c) => !track || c.tracks.includes(track));
}

/** Number of components per support status on a platform */
export function supportSummary(
  platform: Platform,
  contracts: readonly ComponentContract[] = componentContracts,
): Record<SupportStatus, number> {
  const summary: Record<SupportStatus, number> = {
    stable: 0,
    beta: 0,
    planned: 0,
    "n/a": 0,
  };
  for (const contract of contracts)
    summary[getSupport(contract, platform).status]++;
  return summary;
}
