import type { HTMLAttributes, ReactNode, Ref } from "react";

/** Transfer state of an uploaded file */
export type UploadItemStatus = "uploading" | "done" | "error";

/** A file shown in the Upload list (owned by the caller) */
export interface UploadItem {
  /** Stable identifier of the file */
  id: string;
  /** File name shown in the list */
  name: string;
  /** Transfer state of the file */
  status: UploadItemStatus;
  /** Error message shown when status is "error" */
  error?: string;
  /** Image preview URL (e.g. an object URL) */
  previewUrl?: string;
}

/** Texts of Upload; every omitted entry uses the localized default */
export interface UploadLabels {
  /**
   * Text of the select button
   * @default "Select files" (localized)
   */
  select?: ReactNode;
  /**
   * Status text of an uploading file
   * @default "Uploading" (localized)
   */
  uploading?: string;
  /**
   * Status text of an uploaded file
   * @default "Uploaded" (localized)
   */
  done?: string;
  /**
   * Status text of a failed file without its own error message
   * @default "Upload failed" (localized)
   */
  failed?: string;
  /**
   * Error shown when too many files are selected
   * @default (max) => `You can select up to ${max} files` (localized)
   */
  tooMany?: (max: number) => string;
  /**
   * Error shown when a file does not match accept
   * @default (name) => `${name}: unsupported file type` (localized)
   */
  invalidType?: (name: string) => string;
  /**
   * Error shown when a file exceeds maxSize
   * @default (name) => `${name}: file exceeds the size limit` (localized)
   */
  tooLarge?: (name: string) => string;
  /**
   * Accessible label of the retry button of a file
   * @default (name) => `Retry ${name}` (localized)
   */
  retry?: (name: string) => string;
  /**
   * Accessible label of the remove button of a file
   * @default (name) => `Remove ${name}` (localized)
   */
  remove?: (name: string) => string;
}

export interface UploadProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "children"
> {
  /** Visible label of the upload field (also names the file input) */
  label: string;
  /** Files to list, with their transfer state (controlled) */
  value: UploadItem[];
  /**
   * Called with the selected (or dropped) files once they pass accept,
   * maxSize and maxCount. Transfer, cancellation and persisted URLs belong
   * to the caller
   */
  onFilesSelected: (files: File[]) => void;
  /** Called to remove a file; shows a remove button on every item */
  onRemove?: (item: UploadItem) => void;
  /** Called to retry a failed file; shows a retry button on failed items */
  onRetry?: (item: UploadItem) => void;
  /**
   * Accepted file types, as for <input accept> (".pdf", "image/*", "application/json"...)
   * @default "*"
   */
  accept?: string;
  /**
   * Allows selecting several files
   * @default false
   */
  multiple?: boolean;
  /**
   * Single-file mode: lets a new file replace the listed one (the existing
   * file does not count toward maxCount)
   * @default false
   */
  replace?: boolean;
  /**
   * Maximum number of files, including the listed ones
   * @default 50 when multiple, otherwise 1
   */
  maxCount?: number;
  /** Maximum size of a file, in bytes */
  maxSize?: number;
  /**
   * Busy state: blocks new selections and retries (removal stays possible)
   * and sets aria-busy
   * @default false
   */
  loading?: boolean;
  /**
   * Disables selection, retry and removal
   * @default false
   */
  disabled?: boolean;
  /** Custom texts; each one overrides the localized default */
  labels?: UploadLabels;
  /** Additional class name */
  className?: string;
  /** Ref to the root element */
  ref?: Ref<HTMLDivElement>;
}
