import Editor, { loader, type Monaco } from "@monaco-editor/react";
import {
  Component,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LuRotateCw } from "react-icons/lu";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import Button from "../Button/Button";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import { useEditorTheme } from "./useEditorTheme";
import type { MonacoCodeEditorProps } from "./types";
import styles from "./monacoCodeEditor.module.scss";

interface LoadState {
  status: "loading" | "ready" | "mounted" | "error";
  engine: Monaco | null;
}
const LOADING: LoadState = { status: "loading", engine: null };
const FAILED: LoadState = { status: "error", engine: null };

/** The engine the shared @monaco-editor/react loader was configured with */
let configuredMonaco: Monaco | undefined;

/**
 * Points the @monaco-editor/react loader at the local engine, so it never
 * injects the CDN loader script. A second, different engine is rejected: the
 * loader is a process-wide singleton.
 */
function configureLocalEngine(monaco: Monaco) {
  if (typeof monaco?.editor?.create !== "function") {
    throw new Error("A local Monaco engine is required");
  }
  if (configuredMonaco && configuredMonaco !== monaco) {
    throw new Error("Monaco loader already uses another engine");
  }
  if (!configuredMonaco) {
    loader.config({ monaco });
    configuredMonaco = monaco;
  }
}

class EditorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

const positive = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? value : fallback;

/**
 * MonacoCodeEditor: a labelled Monaco editor running on a local engine (no
 * CDN), following the page theme. When the engine cannot load or mount in
 * time (or throws), it degrades to an editable textarea with a retry action.
 *
 * Import it from `@minerva/lib-core/monaco` (requires the optional peers
 * `@monaco-editor/react` and `monaco-editor`).
 */
export const MonacoCodeEditor = ({
  monaco,
  value,
  onChange,
  language = "plaintext",
  label,
  height = 420,
  minHeight = 160,
  maxHeight = 800,
  disabled = false,
  theme,
  loadTimeout = 10000,
  unavailableText,
  retryText,
  retryLabel,
  loadingLabel,
  className,
}: MonacoCodeEditorProps) => {
  const { t } = useI18n();
  const resolvedTheme = useEditorTheme(theme);
  const inputId = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [attempt, setAttempt] = useState(0);
  // Engine and status live in one state: render only reads state, never refs.
  const [load, setLoad] = useState<LoadState>(LOADING);
  // A new engine or a retry goes back to loading during render (instead of a
  // synchronous setState in the effect, which would render twice).
  const [loadKey, setLoadKey] = useState({ monaco, attempt });
  if (loadKey.monaco !== monaco || loadKey.attempt !== attempt) {
    setLoadKey({ monaco, attempt });
    setLoad(LOADING);
  }
  const { status } = load;
  const minimum = positive(minHeight, 160);
  const maximum = Math.max(minimum, positive(maxHeight, 800));
  const editorHeight = Math.min(
    maximum,
    Math.max(minimum, positive(height, 420)),
  );

  useEffect(() => {
    let active = true;
    function fail() {
      if (!active) return;
      active = false;
      clearTimeout(timer.current);
      setLoad(FAILED);
    }
    // The adapter has no error callback: bound both loading and mounting.
    timer.current = setTimeout(fail, loadTimeout);
    try {
      configureLocalEngine(monaco);
      loader
        .init()
        .then((engine) => {
          if (!active) return;
          if (engine !== monaco) {
            fail();
            return;
          }
          setLoad({ status: "ready", engine });
        })
        .catch(fail);
    } catch {
      fail();
    }
    return () => {
      active = false;
      clearTimeout(timer.current);
    };
  }, [monaco, attempt, loadTimeout]);

  const handleFailure = () => {
    clearTimeout(timer.current);
    setLoad(FAILED);
  };

  const busy = status === "loading" || status === "ready";

  return (
    <div className={cn(styles.root, className)} role="group" aria-label={label}>
      {/* Labels the fallback textarea, or Monaco's own input once mounted
          (its id is set in onMount), so clicking it focuses the editor. */}
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div
        className={styles.surface}
        style={{ height: editorHeight }}
        aria-busy={busy}
      >
        {status === "error" ? (
          <>
            <div className={styles.error}>
              <div className={styles.message} role="alert">
                {unavailableText ?? t("monacoCodeEditor.unavailable")}
              </div>
              <Button
                color="neutral"
                variant="outline"
                size="small"
                ariaLabel={retryLabel ?? t("monacoCodeEditor.retryLabel")}
                onClick={() => setAttempt((previous) => previous + 1)}
              >
                <LuRotateCw aria-hidden="true" className={styles.retryIcon} />
                {retryText ?? t("monacoCodeEditor.retry")}
              </Button>
            </div>
            <textarea
              id={inputId}
              aria-label={label}
              value={value}
              disabled={disabled}
              spellCheck={false}
              className={styles.fallback}
              onChange={(event) => {
                if (!disabled) onChange(event.target.value);
              }}
            />
          </>
        ) : (
          <>
            {busy && (
              <div className={styles.loading} role="status">
                <ProgressIndicator
                  size="small"
                  ariaLabel={loadingLabel ?? t("monacoCodeEditor.loading")}
                />
              </div>
            )}
            {load.engine === monaco &&
              (status === "ready" || status === "mounted") && (
                <EditorBoundary key={attempt} onError={handleFailure}>
                  <Editor
                    value={value}
                    language={language}
                    height="100%"
                    width="100%"
                    loading={null}
                    theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
                    options={{
                      readOnly: disabled,
                      domReadOnly: disabled,
                      ariaLabel: label,
                      automaticLayout: true,
                      minimap: { enabled: false },
                      wordWrap: "on",
                      scrollBeyondLastLine: false,
                    }}
                    onMount={(instance) => {
                      instance
                        .getDomNode?.()
                        ?.querySelector("textarea")
                        ?.setAttribute("id", inputId);
                      clearTimeout(timer.current);
                      setLoad((previous) => ({
                        ...previous,
                        status: "mounted",
                      }));
                    }}
                    onChange={(next) => {
                      if (!disabled) onChange(next ?? "");
                    }}
                  />
                </EditorBoundary>
              )}
          </>
        )}
      </div>
    </div>
  );
};
