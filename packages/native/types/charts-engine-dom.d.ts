// The chart engine (@minerva/charts/canvas, bundled into
// minerva-design/native) is DOM-free at runtime, but its sources still name
// a few DOM types and guarded globals (`typeof document`, the Canvas2D
// painter of createCanvasChart). The native packages compile without the
// DOM lib because React Native declares its own globals. These loose
// declarations only let TypeScript check those engine files; the React
// Native components use none of them.
/* eslint-disable @typescript-eslint/no-explicit-any -- loose on purpose: only the engine's guarded DOM code paths read these */

interface CanvasRenderingContext2D {
  [key: string]: any;
}
interface HTMLCanvasElement {
  [key: string]: any;
}
interface Element {
  [key: string]: any;
}
interface Node {
  [key: string]: any;
}
interface CSSStyleDeclaration {
  [key: string]: any;
}
declare const document: any;
declare const MutationObserver: any;
declare const matchMedia: any;
declare function getComputedStyle(element: unknown): any;
