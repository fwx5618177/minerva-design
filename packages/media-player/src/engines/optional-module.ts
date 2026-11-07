/**
 * 可选依赖（hls.js / mpegts.js）的加载：只有真正用到对应格式时才动态 import，
 * 加载失败（没有安装）时给出明确提示，而不是让整个播放器崩溃。
 */
import { PlayerError } from "./types.js";

export type ModuleLoader = () => Promise<unknown>;

/** ESM / CJS / UMD 互操作：优先 default 导出 */
export function interopDefault(mod: unknown): unknown {
  if (mod && typeof mod === "object" && "default" in mod) {
    const value = (mod as { default: unknown }).default;
    if (value !== undefined && value !== null) return value;
  }
  return mod;
}

/** 加载并校验模块；失败时抛出 engine-missing 错误（附带安装提示） */
export async function loadOptionalModule<T>(
  load: ModuleLoader,
  pick: (mod: unknown) => T | null,
  packageName: string,
  signal?: AbortSignal,
): Promise<T> {
  const missing = () =>
    new PlayerError(
      "engine-missing",
      `播放这个格式需要安装 ${packageName}（pnpm add ${packageName}）`,
    );
  signal?.throwIfAborted();
  let mod: unknown;
  try {
    mod = await load();
  } catch {
    signal?.throwIfAborted();
    throw missing();
  }
  signal?.throwIfAborted();
  // 被别名为空模块（使用方不想安装）或版本不兼容时同样视为缺失
  const picked = pick(interopDefault(mod)) ?? pick(mod);
  if (!picked) throw missing();
  return picked;
}
