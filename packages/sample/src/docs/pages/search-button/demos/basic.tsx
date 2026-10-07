import { SearchButton } from "@minerva/lib-core";

export default function BasicDemo() {
  return <SearchButton ariaLabel="Search" onClick={() => alert("Search")} />;
}
