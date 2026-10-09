export type Key = string | number;
export type Row = Record<string, unknown>;
export interface Column {
  key: string;
  header: string;
  sortable?: boolean | ((a: Row, b: Row) => number);
  width?: number | string;
  align?: string;
  fixed?: "left" | "right";
  ellipsis?: boolean;
  filters?: { text: string; value: string }[];
}

export interface TableProps {
  columns?: Column[];
  data?: Row[];
  rowKey?: string | ((row: Row, index: number) => Key);
  selectable?: boolean;
  selectedRowKeys?: Key[];
  rowSelection?: {
    selectedRowKeys?: Key[];
    defaultSelectedRowKeys?: Key[];
    getCheckboxProps?: (row: Row) => { disabled?: boolean };
    onChange?: (keys: Key[], rows: Row[]) => void;
  };
  sortState?: { key: string; order: string | null } | null;
  defaultSortState?: { key: string; order: string | null } | null;
  manualSort?: boolean;
  loading?: boolean;
  emptyText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: string;
  variant?: string;
  hoverable?: boolean;
  scroll?: { x?: number | string; y?: number | string };
  filters?: Record<string, string[]>;
  manualFilter?: boolean;
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
}
