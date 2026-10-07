export declare function rewriteSpecifiers(
  content: string,
  file: string,
  declarations: Set<string>,
  extension: ".js" | ".cjs",
): string;
export declare function writeDualDeclarations(
  emittedFiles: Map<string, string>,
): void;
