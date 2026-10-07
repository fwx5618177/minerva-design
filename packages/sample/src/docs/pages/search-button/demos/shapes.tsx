import { SearchButton } from "@minerva/lib-core";

export default function ShapesDemo() {
  return (
    <>
      <SearchButton shape="circle" ariaLabel="Search (circle)" />
      <SearchButton shape="rounded" ariaLabel="Search (rounded)" />
      <SearchButton shape="square" ariaLabel="Search (square)" />
    </>
  );
}
