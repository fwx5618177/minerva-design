import { useState } from "react";
import { Pagination } from "minerva-design/native";
export default function Simple() {
  const [page, setPage] = useState(1);
  return <Pagination simple current={page} total={120} onChange={setPage} />;
}
