import { useEffect, useRef, useState, useId } from "react";
import type * as Monaco from "monaco-editor";
import { useI18n, useOptionalTheme } from "./theme";
import { Button } from "./components";
export interface MonacoCodeEditorProps {
  monaco?: typeof Monaco;
  value: string;
  onChange?: (value: string) => void;
  label: string;
  language?: string;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  disabled?: boolean;
  theme?: "light" | "dark";
  loadTimeout?: number;
  unavailableText?: string;
  retryText?: string;
  retryLabel?: string;
  loadingLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
const positive = (n: number, fallback: number) =>
  Number.isFinite(n) && n > 0 ? n : fallback;
/** Optional H5 entry. The application supplies its local Monaco engine and worker configuration. */
export function MonacoCodeEditor({
  monaco,
  value,
  onChange,
  label,
  language = "plaintext",
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
  style,
}: MonacoCodeEditorProps) {
  const { t } = useI18n(),
    config = useOptionalTheme(),
    id = useId();
  const root = useRef<HTMLDivElement>(null),
    host = useRef<HTMLDivElement>(null),
    editor = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null),
    subscription = useRef<Monaco.IDisposable | undefined>(),
    syncing = useRef(false);
  const [attempt, retry] = useState(0),
    [state, setState] = useState<"loading" | "ready" | "error">("loading"),
    [pageTheme, setPageTheme] = useState<"light" | "dark">("light");
  const resolvedTheme = theme ?? config?.resolvedTheme ?? pageTheme;
  const latest = useRef({
    value,
    onChange,
    disabled,
    language,
    label,
    resolvedTheme,
  });
  latest.current = {
    value,
    onChange,
    disabled,
    language,
    label,
    resolvedTheme,
  };
  const dispose = () => {
    subscription.current?.dispose();
    subscription.current = undefined;
    const model = editor.current?.getModel();
    editor.current?.dispose();
    editor.current = null;
    model?.dispose();
  };
  const fail = () => {
    dispose();
    setState("error");
  };
  useEffect(() => {
    const read = () =>
      setPageTheme(
        root.current?.closest("[data-theme]")?.getAttribute("data-theme") ===
          "dark"
          ? "dark"
          : "light",
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let active = true;
    dispose();
    setState("loading");
    const timer = setTimeout(
      () => {
        if (active && !editor.current) fail();
      },
      positive(loadTimeout, 10000),
    );
    if (monaco && host.current) {
      try {
        const p = latest.current;
        editor.current = monaco.editor.create(host.current, {
          value: p.value,
          language: p.language,
          readOnly: p.disabled,
          domReadOnly: p.disabled,
          theme: p.resolvedTheme === "dark" ? "vs-dark" : "vs",
          automaticLayout: true,
          ariaLabel: p.label,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
        });
        subscription.current = editor.current.onDidChangeModelContent(() => {
          if (!syncing.current && !latest.current.disabled)
            latest.current.onChange?.(editor.current!.getValue());
        });
        host.current.querySelector("textarea")?.setAttribute("id", id);
        setState("ready");
        clearTimeout(timer);
      } catch {
        clearTimeout(timer);
        fail();
      }
    }
    return () => {
      active = false;
      clearTimeout(timer);
      dispose();
    };
  }, [monaco, attempt, loadTimeout, id]);
  useEffect(() => {
    if (!editor.current || editor.current.getValue() === value) return;
    syncing.current = true;
    try {
      editor.current.setValue(value);
    } catch {
      fail();
    } finally {
      syncing.current = false;
    }
  }, [value]);
  useEffect(() => {
    const e = editor.current;
    if (!e) return;
    try {
      e.updateOptions({
        readOnly: disabled,
        domReadOnly: disabled,
        ariaLabel: label,
      });
      const model = e.getModel();
      if (model) monaco?.editor.setModelLanguage(model, language);
      monaco?.editor.setTheme(resolvedTheme === "dark" ? "vs-dark" : "vs");
    } catch {
      fail();
    }
  }, [disabled, label, language, resolvedTheme, monaco]);
  if (typeof document === "undefined")
    throw new Error(
      "MonacoCodeEditor requires an H5 browser host. Use Textarea for native source editing.",
    );
  const min = positive(minHeight, 160),
    frameHeight = Math.min(
      Math.max(min, positive(maxHeight, 800)),
      Math.max(min, positive(height, 420)),
    );
  return (
    <div
      ref={root}
      className={["mn-monaco-root", className].filter(Boolean).join(" ")}
      style={style}
      role="group"
      aria-label={label}
      data-minerva="code-editor"
      data-part="root"
    >
      <label
        htmlFor={id}
        className="mn-monaco-label"
        onClick={() => editor.current?.focus()}
      >
        {label}
      </label>
      <div
        className="mn-monaco-surface"
        style={{ height: frameHeight }}
        aria-busy={state === "loading"}
      >
        <div
          ref={host}
          style={{
            height: "100%",
            width: "100%",
            display: state === "error" ? "none" : undefined,
          }}
        />
        {state === "loading" && (
          <span className="mn-monaco-loading" role="status">
            {loadingLabel ?? t("monacoCodeEditor.loading")}
          </span>
        )}
        {state === "error" && (
          <>
            <div className="mn-monaco-error">
              <p className="mn-monaco-message" role="alert">
                {unavailableText ?? t("monacoCodeEditor.unavailable")}
              </p>
              <Button
                color="neutral"
                variant="outline"
                size="small"
                aria-label={retryLabel ?? t("monacoCodeEditor.retryLabel")}
                onClick={() => retry((v) => v + 1)}
              >
                {retryText ?? t("monacoCodeEditor.retry")}
              </Button>
            </div>
            <textarea
              id={id}
              className="mn-monaco-fallback"
              aria-label={label}
              value={value}
              disabled={disabled}
              spellCheck={false}
              onChange={(event) => {
                if (!disabled) onChange?.(event.currentTarget.value);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
