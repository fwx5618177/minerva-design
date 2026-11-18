import { useState } from "react";
import { DataTable } from "minerva-design/native";

const rows = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Member ${index + 1}`,
  role: index % 2 ? "Designer" : "Engineer",
}));
const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
];

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  return (
    <DataTable
      accessibilityLabel="Paginated members"
      columns={columns}
      data={rows.slice((page - 1) * pageSize, page * pageSize)}
      rowKey={(row) => row.id}
      pagination={{
        current: page,
        pageSize,
        total: rows.length,
        onChange: setPage,
        showTotal: true,
      }}
    />
  );
}
