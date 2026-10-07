import "@minerva/lib-web-components";

const VARIANTS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "info",
  "ghost",
  "retry",
  "back",
] as const;

export default function VariantsDemo() {
  return (
    <>
      {VARIANTS.map((variant) => (
        <minerva-button key={variant} variant={variant}>
          {variant}
        </minerva-button>
      ))}
    </>
  );
}
