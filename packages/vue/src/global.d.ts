/// <reference types="vite/client" />

// `process.env.NODE_ENV` guards the development-only warnings. The library
// build keeps the expression as-is and the consumer's bundler replaces it
// (same as the React renderer).
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
