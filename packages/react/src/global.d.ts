/// <reference types="vite/client" />

// `process.env.NODE_ENV` guards the development-only warnings
// (internal/devWarnings.ts). The library build keeps the expression as-is and
// the consumer's bundler replaces it. Declared here because the declaration
// build (tsconfig.build.json) has no Node types; compatible with @types/node
// (same declarations, merged) for the tests / editor.
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
  }
  interface Process {
    env: ProcessEnv;
  }
}
// eslint-disable-next-line no-var
declare var process: NodeJS.Process;
