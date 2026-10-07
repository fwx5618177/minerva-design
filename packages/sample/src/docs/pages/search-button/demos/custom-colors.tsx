import { SearchButton } from "@minerva/lib-core";

export default function CustomColorsDemo() {
  return (
    <>
      <SearchButton bgColor="#7c3aed" iconColor="#ffffff" ariaLabel="Search" />
      <SearchButton bgColor="#fde68a" iconColor="#92400e" color="#92400e">
        Search
      </SearchButton>
    </>
  );
}
