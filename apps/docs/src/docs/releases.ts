// Release data of minerva-design, read at build time.
//
// The docs are deployed from the commit that still has the pending
// `.changeset/*.md` files (the CI release commit that consumes them does not
// redeploy the site), so the next version is computed here from those files
// and the current `version` of the package.
import { version } from "../../../../packages/minerva-design/package.json";
import {
  pendingChangesets,
  upcomingRelease,
  type ChangelogRelease,
} from "./changelog";

const changesetFiles = import.meta.glob<string>(
  ["../../../../.changeset/*.md", "!../../../../.changeset/README.md"],
  { query: "?raw", import: "default", eager: true },
);

/** Version of packages/minerva-design/package.json (last release) */
export const CURRENT_VERSION: string = version;

/** Release made of the pending changesets; null when there are none */
export const UPCOMING_RELEASE: ChangelogRelease | null = upcomingRelease(
  CURRENT_VERSION,
  pendingChangesets(changesetFiles),
);

/** Newest version: the upcoming one when changesets are pending */
export const LATEST_VERSION = UPCOMING_RELEASE?.version ?? CURRENT_VERSION;
