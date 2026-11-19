import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, FormField, Input } from "minerva-design";
import { LuLock, LuUser } from "react-icons/lu";

export default function AutofillDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.input.login" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      style={{ display: "grid", gap: 12, maxWidth: 360 }}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FormField label={t("username")} required>
        <Input
          name="username"
          autoComplete="username"
          prefix={<LuUser />}
          required
        />
      </FormField>
      <FormField label={t("password")} required>
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          prefix={<LuLock />}
          required
        />
      </FormField>
      <Button type="submit">{t("submit")}</Button>
      <output aria-live="polite">
        {submitted ? t("feedback") : t("notice")}
      </output>
    </form>
  );
}
