import { useRef, useState, type ReactNode } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { Button } from "../Button";
export interface NativeUploadFile {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
}
export type UploadItemStatus = "uploading" | "done" | "error";
export interface UploadItem {
  id: string;
  name: string;
  status: UploadItemStatus;
  error?: string;
  previewUrl?: string;
}
export interface UploadLabels {
  select?: ReactNode;
  uploading?: string;
  done?: string;
  failed?: string;
  tooMany?: (max: number) => string;
  invalidType?: (name: string) => string;
  tooLarge?: (name: string) => string;
  retry?: (name: string) => string;
  remove?: (name: string) => string;
}
export interface UploadProps {
  label: string;
  value: UploadItem[];
  onFilesSelected: (files: NativeUploadFile[]) => void;
  /** Connect a system document/image picker. null or [] means user cancellation. */ pickFiles: (options: {
    accept: string;
    multiple: boolean;
  }) => Promise<NativeUploadFile[] | null>;
  onRemove?: (item: UploadItem) => void;
  onRetry?: (item: UploadItem) => void;
  /** @default "*" */
  accept?: string;
  /** @default false */
  multiple?: boolean;
  /** @default false */
  replace?: boolean;
  maxCount?: number;
  maxSize?: number;
  /** @default false */
  loading?: boolean;
  /** @default false */
  disabled?: boolean;
  labels?: UploadLabels;
  onError?: (error: Error) => void;
}
/** Platform picker + file validation; upload requests and persistent URLs remain caller-owned. */
export function Upload({
  label,
  value,
  pickFiles,
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
  labels = {},
  onError,
}: UploadProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const pick = async () => {
    if (disabled || loading || pending.current) return;
    pending.current = true;
    setPicking(true);
    setError("");
    try {
      const files = await pickFiles({ accept, multiple });
      if (!files?.length) return;
      if (
        (!multiple && files.length > 1) ||
        files.length + (replace && !multiple ? 0 : value.length) > maxCount
      )
        throw Error(
          labels.tooMany?.(maxCount) ??
            translate("upload.tooMany", { count: maxCount }),
        );
      for (const file of files) {
        const types = accept
          .split(",")
          .map((type) => type.trim().toLowerCase());
        const valid = types.some(
          (type) =>
            !type ||
            type === "*" ||
            type === "*/*" ||
            (type.startsWith(".")
              ? file.name.toLowerCase().endsWith(type)
              : type.endsWith("/*")
                ? file.mimeType?.toLowerCase().startsWith(type.slice(0, -1))
                : file.mimeType?.toLowerCase() === type),
        );
        if (!valid)
          throw Error(
            labels.invalidType?.(file.name) ??
              translate("upload.invalidType", { name: file.name }),
          );
        if (
          maxSize !== undefined &&
          (file.size === undefined || file.size > maxSize)
        )
          throw Error(
            labels.tooLarge?.(file.name) ??
              translate("upload.tooLarge", { name: file.name }),
          );
      }
      onFilesSelected(files);
    } catch (cause) {
      const err = cause instanceof Error ? cause : Error(String(cause));
      setError(err.message);
      onError?.(err);
    } finally {
      pending.current = false;
      setPicking(false);
    }
  };
  return (
    <View
      accessibilityLabel={label}
      accessibilityState={{ busy: loading || picking, disabled }}
      style={{ gap: t.space["2"] }}
    >
      <Text style={textStyle(t)}>{label}</Text>
      <Button
        disabled={disabled}
        loading={loading || picking}
        onPress={() => void pick()}
      >
        {labels.select ?? translate("upload.select")}
      </Button>
      {Boolean(error) && (
        <Text
          accessibilityRole="alert"
          style={[textStyle(t), { color: t.colors["danger-color"] }]}
        >
          {error}
        </Text>
      )}
      {value.map((item) => (
        <View
          key={item.id}
          style={{
            padding: t.space["3"],
            borderWidth: 1,
            borderColor: t.colors["border-color"],
            borderRadius: t.radius.md,
            gap: t.space["2"],
          }}
        >
          {Boolean(item.previewUrl) && (
            <Image
              source={{ uri: item.previewUrl }}
              accessibilityLabel={item.name}
              style={{ width: 64, height: 64 }}
            />
          )}
          <Text style={textStyle(t)}>{item.name}</Text>
          <Text accessibilityLiveRegion="polite" style={textStyle(t, "sm")}>
            {item.status === "error"
              ? (item.error ?? labels.failed ?? translate("upload.failed"))
              : item.status === "uploading"
                ? (labels.uploading ?? translate("upload.uploading"))
                : (labels.done ?? translate("upload.done"))}
          </Text>
          {item.status === "uploading" && (
            <ActivityIndicator color={t.colors["primary-color"]} />
          )}
          <View style={{ flexDirection: "row", gap: t.space["2"] }}>
            {item.status === "error" && onRetry && (
              <Button
                variant="outline"
                disabled={disabled || loading}
                accessibilityLabel={
                  labels.retry?.(item.name) ??
                  translate("upload.retry", { name: item.name })
                }
                onPress={() => onRetry(item)}
              >
                {translate("table.retry")}
              </Button>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                disabled={disabled}
                accessibilityLabel={
                  labels.remove?.(item.name) ??
                  translate("upload.remove", { name: item.name })
                }
                onPress={() => onRemove(item)}
              >
                {translate("upload.remove", { name: item.name })}
              </Button>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
