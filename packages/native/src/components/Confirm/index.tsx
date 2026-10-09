import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Text, View } from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { Dialog } from "../Dialog";
import { Button } from "../Button";
export interface ConfirmOptions {
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  closeLabel?: string;
  /** @default "primary" */
  color?: "primary" | "danger" | "warning";
  /** @default false */
  loading?: boolean;
  /** @default false */
  confirmDisabled?: boolean;
}
export interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
}
export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  closeLabel,
  color = "primary",
  loading = false,
  confirmDisabled = false,
}: ConfirmDialogProps) {
  const { t } = useI18n();
  const { tokens } = useTheme();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [previousOpen, setPreviousOpen] = useState(open);
  if (previousOpen !== open) {
    setPreviousOpen(open);
    setError("");
    setPending(false);
  }
  const session = useRef(0);
  useEffect(() => {
    session.current += 1;
    return () => {
      session.current += 1;
    };
  }, [open]);
  const busy = loading || pending;
  return (
    <Dialog
      role="alertdialog"
      open={open}
      onOpenChange={(next) => {
        if (!busy) onOpenChange(next);
      }}
      title={title}
      description={description}
      closeLabel={closeLabel}
      hideCloseButton={busy}
      closeOnMaskPress={!busy}
      footer={
        <View style={{ gap: tokens.space["2"] }}>
          {Boolean(error) && (
            <Text
              accessibilityRole="alert"
              style={[
                textStyle(tokens),
                { color: tokens.colors["danger-color"] },
              ]}
            >
              {error}
            </Text>
          )}
          <View style={{ flexDirection: "row", gap: tokens.space["3"] }}>
            <Button
              variant="outline"
              color="neutral"
              disabled={busy}
              onPress={() => onOpenChange(false)}
            >
              {cancelLabel ?? t("confirm.cancel")}
            </Button>
            <Button
              color={color}
              disabled={confirmDisabled}
              loading={busy}
              onPress={async () => {
                if (busy) return;
                const requestSession = session.current;
                setPending(true);
                setError("");
                try {
                  await onConfirm();
                } catch (cause) {
                  if (requestSession === session.current)
                    setError(
                      cause instanceof Error ? cause.message : String(cause),
                    );
                } finally {
                  if (requestSession === session.current) setPending(false);
                }
              }}
            >
              {confirmLabel ??
                t(color === "danger" ? "confirm.delete" : "confirm.confirm")}
            </Button>
          </View>
        </View>
      }
    />
  );
}
export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;
const ConfirmContext = createContext<ConfirmFunction | null>(null);
const providers: ConfirmFunction[] = [];
export const confirm: ConfirmFunction = (options) => {
  const provider = providers.at(-1);
  return provider
    ? provider(options)
    : Promise.reject(Error("Mount ConfirmProvider before calling confirm()"));
};
export interface ConfirmProviderProps {
  children?: ReactNode;
}
export function ConfirmProvider({ children }: ConfirmProviderProps) {
  type Request = {
    options: ConfirmOptions;
    resolve: (result: boolean) => void;
  };
  const queue = useRef<Request[]>([]);
  const [current, setCurrent] = useState<Request | null>(null);
  const ask = useCallback<ConfirmFunction>(
    (options) =>
      new Promise((resolve) => {
        const request = { options, resolve };
        queue.current.push(request);
        if (queue.current.length === 1) setCurrent(request);
      }),
    [],
  );
  const finish = (answer: boolean) => {
    queue.current.shift()?.resolve(answer);
    setCurrent(queue.current[0] ?? null);
  };
  useEffect(() => {
    providers.push(ask);
    return () => {
      const index = providers.indexOf(ask);
      if (index >= 0) providers.splice(index, 1);
      for (const request of queue.current) request.resolve(false);
      queue.current = [];
    };
  }, [ask]);
  return (
    <ConfirmContext.Provider value={ask}>
      {children}
      {current && (
        <ConfirmDialog
          {...current.options}
          open
          onOpenChange={(next) => {
            if (!next) finish(false);
          }}
          onConfirm={() => finish(true)}
        />
      )}
    </ConfirmContext.Provider>
  );
}
export function useConfirm(): ConfirmFunction {
  const ask = useContext(ConfirmContext);
  if (!ask) throw Error("useConfirm must be inside ConfirmProvider");
  return ask;
}
