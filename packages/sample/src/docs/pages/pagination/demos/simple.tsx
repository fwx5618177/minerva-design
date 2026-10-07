import { useState } from "react";
import { Pagination } from "@minerva/lib-core";

export default function SimpleDemo() {
  const [page, setPage] = useState(1);

  return <Pagination simple current={page} total={120} onChange={setPage} />;
}
