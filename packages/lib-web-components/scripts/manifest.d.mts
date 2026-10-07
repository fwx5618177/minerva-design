export const ROOT: string;
export const MANIFEST: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Manifest = { schemaVersion: string; modules: any[] };
export function generateManifest(): Manifest;
export function serializeManifest(manifest: Manifest): string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function elementsOf(manifest: Manifest): any[];
export const OPTIONAL_ENTRIES: string[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function optionalEntryOf(element: any): string | undefined;
