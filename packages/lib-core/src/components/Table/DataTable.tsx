import { LuRefreshCw } from "react-icons/lu";
import useI18n from "../../hooks/useI18n";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import { Table } from "./Table";
import type { DataTableProps } from "./types";
import styles from "./table.module.scss";

/**
 * DataTable: a `Table` with optional pagination and an error state with a
 * retry action. While loading it shows skeleton rows (even if `error` is set)
 * and marks itself busy.
 */
export function DataTable<T>({
  pagination,
  error,
  onRetry,
  retryLabel,
  loading,
  ...props
}: DataTableProps<T>) {
  const { t } = useI18n();
  const showError = Boolean(error) && !loading;

  return (
    <div className={styles.dataTable} aria-busy={loading || undefined}>
      {showError ? (
        <div className={styles.error} role="alert">
          <div className={styles.errorTitle}>{error}</div>
          {onRetry && (
            <Button
              color="neutral"
              variant="outline"
              size="small"
              onClick={onRetry}
            >
              <LuRefreshCw aria-hidden="true" className={styles.retryIcon} />
              {retryLabel ?? t("table.retry")}
            </Button>
          )}
        </div>
      ) : (
        <>
          <Table {...props} loading={loading} />
          {pagination && <Pagination {...pagination} />}
        </>
      )}
    </div>
  );
}
