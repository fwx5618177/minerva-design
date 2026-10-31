// WebGL2 and WebGL backends: instanced triangles with 4× MSAA (the default
// framebuffer's antialiasing) and a depth test so overlapping parts of one
// icon are blended once. WebGL2 uses native instancing, WebGL the
// ANGLE_instanced_arrays extension (without it, the backend refuses).

import { MeshAtlas, pixelSize, prepareFrame } from "./batch";
import { GLSL_FRAGMENT, GLSL_VERTEX } from "./shaders";
import {
  INSTANCE_STRIDE,
  type BackendLostHandler,
  type IconBackend,
  type IconFrame,
} from "./types";

type Gl = WebGLRenderingContext | WebGL2RenderingContext;

interface Instancing {
  divisor(index: number, divisor: number): void;
  draw(mode: number, first: number, count: number, instances: number): void;
}

/** Same test as the chart engine: software rasterizers in VMs, CI, headless browsers */
export const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|softpipe|software|basic render driver|microsoft basic/i;

export const isSoftwareGl = (gl: Gl): boolean => {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name: unknown = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  return SOFTWARE_RENDERER.test(String(name ?? ""));
};

const compile = (gl: Gl): WebGLProgram | null => {
  const shader = (type: number, source: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      return null;
    }
    return s;
  };
  const vs = shader(gl.VERTEX_SHADER, GLSL_VERTEX);
  const fs = shader(gl.FRAGMENT_SHADER, GLSL_FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  ["a_position", "a_box", "a_color", "a_depth"].forEach((name, i) =>
    gl.bindAttribLocation(program, i, name),
  );
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

export function createGlBackend(
  canvas: HTMLCanvasElement,
  version: 1 | 2,
  onLost: BackendLostHandler,
  /** Refuses software rasterizers */
  requireHardware: boolean,
): IconBackend | null {
  const attributes: WebGLContextAttributes = {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: true,
    stencil: false,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: requireHardware,
  };
  const gl = (
    version === 2
      ? canvas.getContext("webgl2", attributes)
      : canvas.getContext("webgl", attributes)
  ) as Gl | null;
  if (!gl) return null;
  const release = () => gl.getExtension("WEBGL_lose_context")?.loseContext();
  if (requireHardware && isSoftwareGl(gl)) {
    release();
    return null;
  }

  let instancing: Instancing;
  if (version === 2) {
    const gl2 = gl as WebGL2RenderingContext;
    instancing = {
      divisor: (index, divisor) => gl2.vertexAttribDivisor(index, divisor),
      draw: (mode, first, count, instances) =>
        gl2.drawArraysInstanced(mode, first, count, instances),
    };
  } else {
    const ext = gl.getExtension("ANGLE_instanced_arrays");
    if (!ext) {
      release();
      return null;
    }
    instancing = {
      divisor: (index, divisor) => ext.vertexAttribDivisorANGLE(index, divisor),
      draw: (mode, first, count, instances) =>
        ext.drawArraysInstancedANGLE(mode, first, count, instances),
    };
  }

  const program = compile(gl);
  const meshBuffer = gl.createBuffer();
  const instanceBuffer = gl.createBuffer();
  if (!program || !meshBuffer || !instanceBuffer) {
    release();
    return null;
  }
  const viewport = gl.getUniformLocation(program, "u_viewport");

  let destroyed = false;
  // a new canvas replaces this one: no need to wait for a restore
  const lost = () => {
    if (!destroyed) {
      destroyed = true;
      onLost();
    }
  };
  canvas.addEventListener("webglcontextlost", lost);

  const atlas = new MeshAtlas();
  let meshCapacity = 0;
  let instanceCapacity = 0;
  let scratch: Float32Array | undefined;

  const render = (frame: IconFrame) => {
    if (destroyed || gl.isContextLost()) return;
    const [width, height] = pixelSize(frame);
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!frame.items.length) return;

    const { instances, runs } = prepareFrame(frame, atlas, scratch);
    scratch = instances;
    if (!runs.length) return;

    gl.useProgram(program);
    gl.uniform2f(viewport, frame.width, frame.height);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.depthMask(true);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffer);
    if (atlas.data.length !== meshCapacity) {
      meshCapacity = atlas.data.length;
      gl.bufferData(gl.ARRAY_BUFFER, atlas.data, gl.DYNAMIC_DRAW);
      atlas.uploaded = atlas.length;
    } else if (atlas.uploaded < atlas.length) {
      gl.bufferSubData(
        gl.ARRAY_BUFFER,
        atlas.uploaded * 4,
        atlas.data.subarray(atlas.uploaded, atlas.length),
      );
      atlas.uploaded = atlas.length;
    }
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    instancing.divisor(0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    if (instances.length > instanceCapacity) {
      instanceCapacity = instances.length;
      gl.bufferData(gl.ARRAY_BUFFER, instances, gl.DYNAMIC_DRAW);
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, instances);
    }
    for (let i = 1; i <= 3; i++) {
      gl.enableVertexAttribArray(i);
      instancing.divisor(i, 1);
    }
    for (const run of runs) {
      // WebGL has no base instance: point the instance attributes at the run
      const base = run.instance * INSTANCE_STRIDE;
      gl.vertexAttribPointer(1, 4, gl.FLOAT, false, INSTANCE_STRIDE, base);
      gl.vertexAttribPointer(2, 4, gl.FLOAT, false, INSTANCE_STRIDE, base + 16);
      gl.vertexAttribPointer(3, 1, gl.FLOAT, false, INSTANCE_STRIDE, base + 32);
      instancing.draw(gl.TRIANGLES, run.first, run.count, run.instances);
    }
  };

  return {
    kind: version === 2 ? "webgl2" : "webgl",
    canvas,
    render,
    destroy() {
      destroyed = true;
      canvas.removeEventListener("webglcontextlost", lost);
      if (gl.isContextLost()) return;
      gl.deleteBuffer(meshBuffer);
      gl.deleteBuffer(instanceBuffer);
      gl.deleteProgram(program);
      // browsers cap the live contexts: free this one now
      release();
    },
  };
}
