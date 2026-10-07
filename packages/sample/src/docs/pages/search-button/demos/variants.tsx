import { SearchButton } from "@minerva/lib-core";

const variants = ["primary", "success", "warning", "error", "info"] as const;

export default function VariantsDemo() {
  return (
    <>
      {variants.map((variant) => (
        <SearchButton
          key={variant}
          variant={variant}
          ariaLabel={`Search (${variant})`}
        />
      ))}
    </>
  );
}
