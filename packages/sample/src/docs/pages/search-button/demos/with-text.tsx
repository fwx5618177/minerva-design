import { SearchButton } from "@minerva/lib-core";

export default function WithTextDemo() {
  return (
    <>
      <SearchButton>Search</SearchButton>
      <SearchButton variant="success" size="large">
        Find products
      </SearchButton>
    </>
  );
}
