import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Select,
  SelectItem,
  Stack,
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "minerva-design";
import CodeBlock from "@layout/CodeBlock";
import styles from "@/docs/components/docs.module.scss";

type Platform = "taro" | "uni" | "weapp";
interface Field {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description?: string;
}
interface ComponentApi {
  entry: string;
  props: Field[];
  events: Field[];
  slots: Field[];
  methods: Field[];
}
type Catalog = Record<string, ComponentApi>;
const load: Record<Platform, () => Promise<{ default: Catalog }>> = {
  taro: () => import("../../api.taro.mini.generated.json"),
  uni: () => import("../../api.uni.mini.generated.json"),
  weapp: () => import("../../api.weapp.mini.generated.json"),
};
const platforms: Record<Platform, string> = {
  taro: "Taro",
  uni: "uni-app",
  weapp: "WeChat",
};

export default function MiniApi() {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.platform-support.api.${key}`);
  const [platform, setPlatform] = useState<Platform>("taro");
  const [component, setComponent] = useState("Button");
  const [catalog, setCatalog] = useState<Catalog>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    load[platform]()
      .then(({ default: next }) => {
        if (active) setCatalog(next);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [platform]);
  const name = catalog?.[component] ? component : "Button";
  const entry = catalog?.[name];
  const tag = `mn-${name.replace(/[A-Z]/g, (char, index: number) => `${index ? "-" : ""}${char.toLowerCase()}`)}`;
  const code = !entry
    ? ""
    : platform === "weapp"
      ? JSON.stringify({ usingComponents: { [tag]: entry.entry } }, null, 2)
      : `import { ${name} } from '${entry.entry}';`;
  return (
    <section className={styles.section} aria-labelledby="mini-api">
      <h2 id="mini-api">{k("title")}</h2>
      <p className={styles.prose}>{k("description")}</p>
      <Stack direction="row" wrap gap={3}>
        <Select
          aria-label={k("platform")}
          style={{ width: "min(100%, 240px)" }}
          value={platform}
          onChange={(value) => {
            if (value === platform) return;
            setPlatform(value as Platform);
            setCatalog(undefined);
            setFailed(false);
          }}
        >
          {Object.entries(platforms).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <Select
          aria-label={k("component")}
          style={{ width: "min(100%, 240px)" }}
          value={name}
          disabled={!catalog}
          onChange={setComponent}
        >
          {Object.keys(catalog ?? {})
            .sort()
            .map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
        </Select>
      </Stack>
      {failed ? (
        <Alert color="danger">{k("error")}</Alert>
      ) : !entry ? (
        <p role="status">{k("loading")}</p>
      ) : (
        <>
          <h3>
            {platforms[platform]} · {name}
          </h3>
          <CodeBlock
            code={code}
            language={platform === "weapp" ? "json" : "ts"}
          />
          {platform === "weapp" && <p className={styles.prose}>{k("weapp")}</p>}
          {(["props", "events", "slots", "methods"] as const).map(
            (kind) =>
              entry[kind].length > 0 && (
                <div key={kind} className={styles.apiBlock}>
                  <h4>{k(kind)}</h4>
                  <div className={styles.tableWrapper}>
                    <TableRoot
                      className={styles.propsTable}
                      aria-label={k(kind)}
                    >
                      <TableHead>
                        <TableRow>
                          <TableHeader scope="col">{t("doc.prop")}</TableHeader>
                          <TableHeader scope="col">{t("doc.type")}</TableHeader>
                          <TableHeader scope="col">
                            {t("doc.default")}
                          </TableHeader>
                          <TableHeader scope="col">
                            {t("doc.description")}
                          </TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {entry[kind].map((field) => (
                          <TableRow key={field.name}>
                            <TableHeader scope="row">
                              <code>{field.name}</code>
                              {field.required && (
                                <span className={styles.required}>
                                  {t("doc.required")}
                                </span>
                              )}
                            </TableHeader>
                            <TableCell>
                              <code className={styles.propType}>
                                {field.type}
                              </code>
                            </TableCell>
                            <TableCell>
                              <code>{field.default ?? "—"}</code>
                            </TableCell>
                            <TableCell>{field.description ?? "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TableRoot>
                  </div>
                </div>
              ),
          )}
        </>
      )}
    </section>
  );
}
