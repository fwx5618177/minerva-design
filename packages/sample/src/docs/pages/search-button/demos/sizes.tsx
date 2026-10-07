import { SearchButton } from "@minerva/lib-core";

export default function SizesDemo() {
  return (
    <>
      <SearchButton size="small" ariaLabel="Search (small)" />
      <SearchButton size="medium" ariaLabel="Search (medium)" />
      <SearchButton size="large" ariaLabel="Search (large)" />
      <SearchButton size="xlarge" ariaLabel="Search (xlarge)" />
    </>
  );
}
