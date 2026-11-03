import { useTranslation } from "react-i18next";
import { version } from "../../../../../packages/minerva-design/package.json";
import { useFramework } from "../frameworks/useFramework";

/** Ordinary HTTP links: usable by readers and tools that cannot execute JS. */
export default function ReferenceLinks({ page }: { page: string }) {
  const { t, i18n } = useTranslation();
  const [framework] = useFramework();
  const renderer = ["html", "svelte", "solid"].includes(framework)
    ? "wc"
    : framework === "react-native"
      ? "native"
      : framework;
  const language = i18n.resolvedLanguage?.split("-")[0] ?? "en";
  const locale = ["en", "zh", "ja", "fr"].includes(language) ? language : "en";
  const base = import.meta.env.BASE_URL;
  const path = `${base}reference/${version}/${locale}/${renderer}/${page}`;
  return (
    <p data-static-reference>
      <a href={`${path}.md`}>{t("doc.reference.markdown")}</a>
      {" · "}
      <a href={`${path}.json`}>{t("doc.reference.json")}</a>
      {" · "}
      <a href={`${base}llms.txt`}>{t("doc.reference.index")}</a>
    </p>
  );
}
