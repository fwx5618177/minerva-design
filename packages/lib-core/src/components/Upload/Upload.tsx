import { useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { LuRotateCw, LuUpload, LuX } from "react-icons/lu";
import type { UploadItem, UploadProps } from "./types";
import styles from "./upload.module.scss";
import useI18n from "../../hooks/useI18n";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Alert from "../Alert/Alert";

/** Whether a file matches an <input accept> list (extensions and MIME types) */
function matchesAccept(file: File, accept: string) {
  return accept.split(",").some((part) => {
    const rule = part.trim().toLowerCase();
    if (!rule || rule === "*" || rule === "*/*") return true;
    if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
    const type = file.type.toLowerCase();
    return rule.endsWith("/*")
      ? type.startsWith(rule.slice(0, -1))
      : type === rule;
  });
}

/**
 * Upload: file selection (button or drag and drop) with validation and a
 * list of files with their transfer state.
 *
 * Controlled presentation only: the caller receives validated files through
 * onFilesSelected and owns the transfer, cancellation and persisted URLs,
 * reflected back through `value`.
 */
const Upload = ({
  label,
  value,
  onFilesSelected,
  onRemove,
  onRetry,
  accept = "*",
  multiple = false,
  replace = false,
  maxCount = multiple ? 50 : 1,
  maxSize,
  loading = false,
  disabled = false,
  labels,
  className,
  ref,
  ...rest
}: UploadProps) => {
  const { t } = useI18n();
  const id = useId();
  const labelId = `${id}-label`;
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const existingCount = replace && !multiple ? 0 : value.length;
  const blocked = disabled || loading || existingCount >= maxCount;

  const select = (files: File[]) => {
    if (blocked || files.length === 0) return;
    if (
      (!multiple && files.length > 1) ||
      files.length + existingCount > maxCount
    ) {
      setError(
        labels?.tooMany?.(maxCount) ?? t("upload.tooMany", { count: maxCount }),
      );
      return;
    }
    const invalid = files.find((file) => !matchesAccept(file, accept));
    if (invalid) {
      setError(
        labels?.invalidType?.(invalid.name) ??
          t("upload.invalidType", { name: invalid.name }),
      );
      return;
    }
    const oversized =
      maxSize === undefined
        ? undefined
        : files.find((file) => file.size > maxSize);
    if (oversized) {
      setError(
        labels?.tooLarge?.(oversized.name) ??
          t("upload.tooLarge", { name: oversized.name }),
      );
      return;
    }
    setError("");
    onFilesSelected(files);
  };

  const statusText = (item: UploadItem) =>
    item.status === "uploading"
      ? (labels?.uploading ?? t("upload.uploading"))
      : item.status === "error"
        ? item.error || (labels?.failed ?? t("upload.failed"))
        : (labels?.done ?? t("upload.done"));

  return (
    <div
      {...rest}
      ref={ref}
      className={cn(styles.upload, className)}
      role="group"
      aria-labelledby={labelId}
      aria-busy={loading}
    >
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      {/* Drop target only: the keyboard path is the select button inside */}
      <div
        className={cn(styles.dropzone, {
          [styles.dragging]: dragging && !blocked,
        })}
        onDragOver={(event) => {
          event.preventDefault();
          if (!blocked) setDragging(true);
        }}
        onDragLeave={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          select(Array.from(event.dataTransfer.files));
        }}
      >
        <Button
          type="button"
          variant="outline"
          disabled={blocked}
          loading={loading}
          startIcon={<LuUpload aria-hidden="true" />}
          onClick={() => input.current?.click()}
        >
          {labels?.select ?? t("upload.select")}
        </Button>
        <input
          ref={input}
          type="file"
          hidden
          aria-label={label}
          disabled={blocked}
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            const files = Array.from(event.currentTarget.files ?? []);
            // allow selecting the same file again
            event.currentTarget.value = "";
            select(files);
          }}
        />
      </div>
      {error && (
        <Alert color="danger" animation={false} className={styles.error}>
          {error}
        </Alert>
      )}
      {value.length > 0 && (
        <ul className={styles.list}>
          {value.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.previewUrl && (
                <img src={item.previewUrl} alt="" className={styles.preview} />
              )}
              <div className={styles.info}>
                <span>{item.name}</span>
                <span
                  role={item.status === "error" ? "alert" : "status"}
                  className={cn(styles.status, {
                    [styles.statusError]: item.status === "error",
                  })}
                >
                  {statusText(item)}
                </span>
              </div>
              <div className={styles.actions}>
                {item.status === "error" && onRetry && (
                  <IconButton
                    label={
                      labels?.retry?.(item.name) ??
                      t("upload.retry", { name: item.name })
                    }
                    size="small"
                    shape="square"
                    disabled={disabled || loading}
                    onClick={() => onRetry(item)}
                    icon={<LuRotateCw aria-hidden="true" />}
                  />
                )}
                {onRemove && (
                  <IconButton
                    label={
                      labels?.remove?.(item.name) ??
                      t("upload.remove", { name: item.name })
                    }
                    size="small"
                    shape="square"
                    disabled={disabled}
                    onClick={() => onRemove(item)}
                    icon={<LuX aria-hidden="true" />}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Upload;
