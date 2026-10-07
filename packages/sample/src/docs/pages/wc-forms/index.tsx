import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const FORM_ELEMENTS = [
  "input",
  "textarea",
  "number-input",
  "checkbox",
  "radio-group",
  "switch",
  "select",
  "autocomplete",
  "tag-input",
  "time-picker",
  "cascader",
  "rating",
  "json-field",
  "key-value-editor",
  "upload",
] as const;

const formCode = `<form id="profile">
  <fieldset id="details">
    <legend>Profile</legend>

    <label for="name">Name</label>
    <minerva-input id="name" name="name" required minlength="2"></minerva-input>

    <label for="bio">Bio</label>
    <minerva-textarea id="bio" name="bio" maxlength="200"></minerva-textarea>

    <label for="role">Role</label>
    <minerva-select id="role" name="role" placeholder="Choose a role" required>
      <minerva-option value="dev">Developer</minerva-option>
      <minerva-option value="design">Designer</minerva-option>
    </minerva-select>

    <minerva-checkbox name="skills" value="ts" checked>TypeScript</minerva-checkbox>
    <minerva-checkbox name="skills" value="css">CSS</minerva-checkbox>
    <minerva-switch name="public" value="yes">Public profile</minerva-switch>
  </fieldset>

  <minerva-button type="submit">Save</minerva-button>
  <minerva-button type="reset" variant="ghost">Reset</minerva-button>
</form>`;

const submitCode = `const form = document.querySelector("#profile");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  data.get("name"); // "Ada"
  data.getAll("skills"); // ["ts"]: unchecked boxes are not submitted
  data.get("public"); // null, or "yes" when the switch is on
});

// disable every control of the fieldset: not editable, not submitted, not validated
document.querySelector("#details").disabled = true;`;

const validationCode = `const name = document.querySelector("#name");

name.required; // true
name.validity.valueMissing; // true while empty
name.validationMessage; // "Please fill out this field."
name.checkValidity(); // false, fires "invalid" on the element
name.reportValidity(); // same, and shows the message next to the control
form.checkValidity(); // checks the Minerva controls with the native ones

// custom rules: any non-empty message makes the control invalid
name.addEventListener("minerva-change", async () => {
  const taken = await isNameTaken(name.value);
  name.setCustomValidity(taken ? "This name is already taken." : "");
});

// form.reset(): values back to their value / checked attributes,
// custom validity cleared
form.reset();`;

const stylingCode = `/* :invalid / :valid match the elements like native inputs */
form.was-validated :invalid {
  outline: 2px solid var(--danger-color);
  outline-offset: 2px;
}

/* or switch on the built-in error style (invalid; "error" on
   checkboxes and radios) once the user tried to submit */`;

const errorCode = `// "invalid" does not bubble: listen in the capture phase
form.addEventListener("invalid", (event) => {
  form.classList.add("was-validated");
  event.target.invalid = true; // red border + aria-invalid
}, true);

form.addEventListener("minerva-change", (event) => {
  if (form.classList.contains("was-validated")) {
    event.target.invalid = !event.target.validity.valid;
  }
});`;

const localeCode = `<!-- built-in messages follow lang or <minerva-config locale> -->
<minerva-config locale="fr">
  <form>
    <minerva-select name="pays" required aria-label="Pays">…</minerva-select>
    <!-- validationMessage: "Veuillez sélectionner un élément de la liste." -->
  </form>
</minerva-config>`;

const WcFormsDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.wc-forms.${key}`);

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="association">
        <h2 id="association">{k("association.title")}</h2>
        <p className={styles.prose}>{k("association.text")}</p>
        <ul className={styles.prose}>
          {FORM_ELEMENTS.map((name) => (
            <li key={name}>
              <code>{`<minerva-${name}>`}</code>
            </li>
          ))}
        </ul>
        <p className={styles.prose}>{k("association.buttons")}</p>
      </section>

      <section className={styles.section} aria-labelledby="form-data">
        <h2 id="form-data">{k("formData.title")}</h2>
        <p className={styles.prose}>{k("formData.text")}</p>
        <CodeBlock code={formCode} language="html" />
        <CodeBlock code={submitCode} language="ts" />
        <ul className={styles.prose}>
          <li>{k("formData.name")}</li>
          <li>{k("formData.values")}</li>
          <li>{k("formData.disabled")}</li>
          <li>{k("formData.restore")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="labels">
        <h2 id="labels">{k("labels.title")}</h2>
        <p className={styles.prose}>{k("labels.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="validation">
        <h2 id="validation">{k("validation.title")}</h2>
        <p className={styles.prose}>{k("validation.text")}</p>
        <CodeBlock code={validationCode} language="ts" />
        <p className={styles.prose}>{k("validation.reset")}</p>
      </section>

      <section className={styles.section} aria-labelledby="styling">
        <h2 id="styling">{k("styling.title")}</h2>
        <p className={styles.prose}>{k("styling.text")}</p>
        <CodeBlock code={stylingCode} language="css" />
        <CodeBlock code={errorCode} language="ts" />
        <p className={styles.prose}>{k("styling.formControl")}</p>
      </section>

      <section className={styles.section} aria-labelledby="messages">
        <h2 id="messages">{k("messages.title")}</h2>
        <p className={styles.prose}>{k("messages.text")}</p>
        <CodeBlock code={localeCode} language="html" />
      </section>
    </>
  );

  return <DocPage id="wc-forms" intro={intro} />;
};

export default WcFormsDoc;
