/**
 * `@minerva/core/contracts`: runtime metadata of every Minerva component
 * (props, events, slots, product tracks and the platform support matrix).
 *
 * Public entry: minerva-design/contracts (kept out of the main core index so it stays
 * small): read by the docs ("Platform support" page), the cross-platform
 * contract tests (tests/contracts) and future renderers.
 *
 * The data is generated from the React props types and the Custom Elements
 * Manifest by `pnpm gen:contracts` (tools/generate-contracts.mjs);
 * tests/docs/contracts.test.ts fails when it is stale.
 */
import data from "./components.generated.json";
import typeData from "./types.generated.json";
import provenance from "./metadata.generated.json";
import type {
  ComponentContract,
  Platform,
  PlatformSupport,
  SupportStatus,
  Track,
  TypeNode,
  ContractsMetadata,
  RendererContract,
} from "./types";

export type * from "./types";
export { PLATFORMS, SUPPORT_STATUSES, TRACKS } from "./constants";

/** Every component contract, sorted by name */
function freeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}

export const componentContracts = freeze(
  data,
) as unknown as readonly ComponentContract[];

/** Format version, package version and reproducible source snapshot identity. */
export const contractsMetadata = freeze(provenance) as ContractsMetadata;
const types = freeze(typeData) as unknown as Readonly<Record<string, TypeNode>>;

/** Read just the referenced type node; references keep recursive types finite. */
export function getType(typeRef: string): TypeNode | undefined {
  return Object.hasOwn(types, typeRef) ? types[typeRef] : undefined;
}

/** The exact vocabulary of one renderer; unsupported renderers expose status/notes. */
export function getRendererContract(
  nameOrTag: string,
  renderer: Platform,
): RendererContract | undefined {
  return getContract(nameOrTag)?.renderers[renderer];
}

export type ContractCapability = "props" | "events" | "slots" | "bindings";
export interface ContractQuery {
  component?: string;
  renderer?: Platform;
  capability?: ContractCapability;
  track?: Track;
  status?: SupportStatus;
}

/** Filter before serializing results into a tool/model context. For the
 * smallest payload use getRendererContract or getType on the result. */
export function queryContracts(
  query: ContractQuery = {},
): readonly ComponentContract[] {
  return componentContracts.filter((contract) => {
    if (
      query.component &&
      contract.name !== query.component &&
      contract.tag !== query.component
    )
      return false;
    if (query.track && !contract.tracks.includes(query.track)) return false;
    const renderer = query.renderer
      ? contract.renderers[query.renderer]
      : undefined;
    if (
      query.renderer &&
      (!renderer?.import ||
        (renderer.status !== "stable" && renderer.status !== "beta"))
    )
      return false;
    if (query.status && (!renderer || renderer.status !== query.status))
      return false;
    if (
      query.capability &&
      !(renderer
        ? renderer[query.capability]?.length
        : query.capability === "bindings"
          ? Object.values(contract.renderers).some(
              (api) => api.bindings?.length,
            )
          : contract[query.capability].length)
    )
      return false;
    return true;
  });
}

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
