import { useState } from "react";
import { SearchButton } from "@minerva/lib-core";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <SearchButton loading={loading} onClick={search}>
        {loading ? "Searching…" : "Search"}
      </SearchButton>
      <SearchButton loading ariaLabel="Searching" />
      <SearchButton disabled ariaLabel="Search (disabled)" />
    </>
  );
}
