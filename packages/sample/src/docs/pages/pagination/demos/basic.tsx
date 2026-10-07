import { useState } from "react";
import { Pagination } from "@minerva/lib-core";

export default function BasicDemo() {
  const [page, setPage] = useState(1);

  return <Pagination current={page} total={50} onChange={setPage} />;
}
