import { useState } from "react";
import { Pagination, Table } from "minerva-design";

const orders = Array.from({ length: 42 }, (_, index) => ({
  id: index + 1,
  order: `ORD-${String(index + 1).padStart(3, "0")}`,
  customer: ["Alex Morgan", "Sam Rivera", "Taylor Chen", "Jordan Lee"][
    index % 4
  ],
  amount: `$${(125 + index * 17.5).toFixed(2)}`,
}));
const columns = [
  { key: "order", header: "Order", width: 140 },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount", align: "right" as const },
];

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const rows = orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Table
        aria-label="Paginated orders"
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={orders.length}
        showSizeChanger
        pageSizeOptions={[5, 10, 20]}
        showQuickJumper
        showTotal
        totalRender={(total, [from, to]) => `${from}–${to} of ${total} orders`}
        onChange={(nextPage, nextSize) => {
          setPage(
            Math.min(
              nextPage,
              Math.max(1, Math.ceil(orders.length / nextSize)),
            ),
          );
          setPageSize(nextSize);
        }}
      />
    </div>
  );
}
