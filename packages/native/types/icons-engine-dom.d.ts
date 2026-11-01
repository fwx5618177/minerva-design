// The icon engine (@minerva/icons/core, re-exported by
// minerva-design/native/icons) is DOM-free until something is drawn on a
// canvas, but its canvas / WebGL / WebGPU renderers name DOM types. The
// native packages compile without the DOM lib because React Native declares
// its own globals (@types/react only declares some of these as empty
// interfaces). These loose declarations only let TypeScript check those
// engine files; the React Native icons draw with react-native-svg and use
// none of them (see charts-engine-dom.d.ts for the chart engine).
/* eslint-disable @typescript-eslint/no-explicit-any -- loose on purpose: only the engine's canvas renderers read these */

interface WebGLRenderingContext {
  [key: string]: any;
}
interface WebGL2RenderingContext {
  [key: string]: any;
}
interface WebGLContextAttributes {
  [key: string]: any;
}
interface WebGLProgram {
  [key: string]: any;
}
interface MutationObserverInit {
  [key: string]: any;
}
interface GPU {
  [key: string]: any;
}
interface GPUAdapter {
  [key: string]: any;
}
interface GPUBuffer {
  [key: string]: any;
}
interface GPUCanvasContext {
  [key: string]: any;
}
interface GPUTexture {
  [key: string]: any;
}
interface Path2D {
  [key: string]: any;
}
declare const Path2D: new (path?: string) => Path2D;
declare const ResizeObserver: any;
declare const devicePixelRatio: number;
