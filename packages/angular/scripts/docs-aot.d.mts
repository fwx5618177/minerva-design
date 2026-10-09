export function compileAngularExamples(): Promise<void>;
export function angularLinker(): Promise<
  (
    code: string,
    id: string,
  ) => Promise<{ code: string; map: string | null } | null>
>;
