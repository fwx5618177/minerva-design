import { SearchButton } from "@minerva/lib-core";

export default function AnimationsDemo() {
  return (
    <>
      <SearchButton animation="expand" ariaLabel="Search (expand)" />
      <SearchButton animation="shrink" ariaLabel="Search (shrink)" />
      <SearchButton animation="shake" ariaLabel="Search (shake)" />
    </>
  );
}
