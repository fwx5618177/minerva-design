import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "minerva-design/icons";
import { useState } from "react";
import { Pagination } from "minerva-design";

export default function CustomRenderDemo() {
  const [page, setPage] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Pagination
        current={page}
        total={100}
        onChange={setPage}
        icons={{
          prev: <ArrowLeftIcon size="1em" />,
          next: <ArrowRightIcon size="1em" />,
          jumpPrev: <SkipBackIcon size="1em" />,
          jumpNext: <SkipForwardIcon size="1em" />,
        }}
      />
      <Pagination
        current={page}
        total={100}
        onChange={setPage}
        itemRender={(p, type) =>
          type === "prev"
            ? "Prev"
            : type === "next"
              ? "Next"
              : type === "page"
                ? p
                : "…"
        }
      />
    </div>
  );
}
