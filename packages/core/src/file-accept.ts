/** The file fields read by `matchesAccept`. */
export interface AcceptFileLike {
  name: string;
  type: string;
}

/**
 * Whether a file matches an `<input accept>` list: comma-separated
 * extensions (`.png`), MIME types (`image/png`) and wildcards (`image/*`,
 * `*`), case-insensitive. An empty list (or entry) accepts everything.
 */
export function matchesAccept(file: AcceptFileLike, accept: string): boolean {
  return accept.split(",").some((part) => {
    const rule = part.trim().toLowerCase();
    if (!rule || rule === "*" || rule === "*/*") return true;
    if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
    const type = file.type.toLowerCase();
    return rule.endsWith("/*")
      ? type.startsWith(rule.slice(0, -1))
      : type === rule;
  });
}
