import { readJson } from "./utils";

interface ManifestAttribute {
  name: string;
  type?: { text: string };
}
interface ManifestDeclaration {
  tagName?: string;
  attributes?: ManifestAttribute[];
  formAssociated?: boolean;
  members?: { name: string }[];
}
interface Manifest {
  modules: { declarations?: ManifestDeclaration[] }[];
}

const manifest = readJson<Manifest>(
  "packages/lib-web-components/custom-elements.json",
);
export const ELEMENTS = new Map(
  manifest.modules
    .flatMap((m) => m.declarations ?? [])
    .filter((d) => d.tagName)
    .map((d) => [d.tagName!, d]),
);

/** Global HTML attributes and the `form` owner attribute of form-associated elements */
const GLOBAL =
  /^(id|class|style|slot|lang|dir|hidden|title|role|tabindex|part|exportparts|inert|autofocus|is|translate|draggable|popover|nonce|form|aria-[\w-]+|data-[\w-]+|on\w+)$/;

/** String literals of a `"a" | "b"` type, `null` for any other type */
const literals = (type?: string) =>
  type && /^\s*"[^"]*"(\s*\|\s*"[^"]*")*(\s*\|\s*undefined)?\s*$/.test(type)
    ? Array.from(type.matchAll(/"([^"]*)"/g), (m) => m[1])
    : null;

/** Unknown `minerva-*` tags, attributes and enumerated attribute values */
export function htmlProblems(html: string): string[] {
  const problems: string[] = [];
  const tags = html.matchAll(
    /<(minerva-[a-z-]+)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*\/?>/g,
  );
  for (const [, tag, attributes] of tags) {
    const element = ELEMENTS.get(tag);
    if (!element) {
      problems.push(`unknown element <${tag}>`);
      continue;
    }
    const attrs = attributes.matchAll(
      /([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g,
    );
    for (const [, name, double, single, bare] of attrs) {
      if (GLOBAL.test(name)) continue;
      const declared = element.attributes?.find((a) => a.name === name);
      if (!declared) {
        problems.push(`<${tag}> has no attribute "${name}"`);
        continue;
      }
      const value = double ?? single ?? bare;
      const allowed = literals(declared.type?.text);
      if (allowed && value !== undefined && !allowed.includes(value)) {
        problems.push(
          `<${tag} ${name}="${value}">: not one of ${allowed.map((v) => `"${v}"`).join(" | ")}`,
        );
      }
    }
  }
  return problems;
}
