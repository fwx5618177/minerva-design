import data from "./support.generated.json";
import type {
  ComponentContract,
  Platform,
  SupportStatus,
  Track,
} from "@contracts";
export {
  PLATFORMS,
  SUPPORT_STATUSES,
} from "../../../../packages/core/src/contracts/constants";
export type { Platform, SupportStatus, Track } from "@contracts";

type ComponentSupport = Pick<
  ComponentContract,
  "name" | "tag" | "docs" | "tracks" | "platforms"
>;
const contracts = data as readonly ComponentSupport[];

export function contractsForTrack(track?: Track) {
  return contracts.filter(
    (contract) => !track || contract.tracks.includes(track),
  );
}

export function supportSummary(
  platform: Platform,
): Record<SupportStatus, number> {
  const summary: Record<SupportStatus, number> = {
    stable: 0,
    beta: 0,
    planned: 0,
    "n/a": 0,
  };
  for (const contract of contracts)
    summary[contract.platforms[platform].status]++;
  return summary;
}
