# Forms

Minerva controls are form-associated custom elements: FormData, required and constraint validation, setCustomValidity, form.reset(), <fieldset disabled>, <label for>, :invalid and localized messages.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Form-associated elements

The form controls are form-associated custom elements built on ElementInternals: inside a  they behave like native inputs, without hidden inputs or wrappers. These elements take part in forms:

 is form-associated too: type="submit" submits the owning form through requestSubmit() (so validation and submit listeners run) and type="reset" resets it. The default type is "button", which does nothing.

### Names, values and FormData

Give each control a name. Its value is part of new FormData(form) and of a native submission, exactly like an :

name is the key of the submitted value. Checkboxes and switches submit their value ("on" by default) only when checked, so several checkboxes with the same name produce a list (FormData.getAll()).

The value attribute (checked for checkboxes and switches) is the initial value; the value / checked property is the current value. Some controls submit several entries (the tag input submits one per tag); each component page documents what its control submits.

disabled on a control, or on an ancestor , makes it non-editable and excludes it from submission and validation (isDisabled reports both).

Values are restored by the browser when the user navigates back to the page (bfcache) and by autofill, through the form-associated callbacks.

### Labels

 and wrapping  elements name the control, as with native inputs: the element's labels property lists them, the label text is forwarded to the control inside the shadow root, and clicking the label focuses it. aria-label, aria-labelledby and aria-describedby on the element work too (ids are resolved to text, since they cannot cross shadow roots).

### Constraint validation

required, minlength / maxlength, pattern, min / max and type (email, url...) work as on native inputs. Each element exposes the constraint validation API (validity, validationMessage, willValidate, checkValidity(), reportValidity(), setCustomValidity()), and form.checkValidity(), form.reportValidity() and submission take the Minerva controls into account: an invalid control blocks the submit event and the browser shows its message next to the control.

form.reset() restores every control to its value or checked attribute and clears the messages set with setCustomValidity(); listen to the form's reset event to clear your own error styles.

### Styling invalid controls

The :invalid and :valid pseudo-classes match form-associated elements like native inputs, so they can be styled from the page. To avoid red fields before the user did anything, apply the styles once a submission was attempted:

The built-in error state is a property: invalid on text fields, selects, switches and the other controls, error on checkboxes and radios. It shows the red border and sets aria-invalid.  wraps one control with a label, a helper text and an error message, and passes its invalid / required / disabled state to the control.

### Localized messages

Controls without a native equivalent (select, checkbox, switch, radio group, rating, upload, time picker, cascader...) report Minerva's own validation messages ("Please select an item in the list.", "Please check this box if you want to proceed."...), translated in every supported language and following the lang attribute or  of their scope. Text fields delegate to their inner native input, whose messages come from the browser in its own language.

```html
<form id="profile">
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
</form>
```

```ts
const form = document.querySelector("#profile");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  data.get("name"); // "Ada"
  data.getAll("skills"); // ["ts"]: unchecked boxes are not submitted
  data.get("public"); // null, or "yes" when the switch is on
});

// disable every control of the fieldset: not editable, not submitted, not validated
document.querySelector("#details").disabled = true;
```

```ts
const name = document.querySelector("#name");

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
form.reset();
```

```css
/* :invalid / :valid match the elements like native inputs */
form.was-validated :invalid {
  outline: 2px solid var(--danger-color);
  outline-offset: 2px;
}

/* or switch on the built-in error style (invalid; "error" on
   checkboxes and radios) once the user tried to submit */
```

```ts
// "invalid" does not bubble: listen in the capture phase
form.addEventListener("invalid", (event) => {
  form.classList.add("was-validated");
  event.target.invalid = true; // red border + aria-invalid
}, true);

form.addEventListener("minerva-change", (event) => {
  if (form.classList.contains("was-validated")) {
    event.target.invalid = !event.target.validity.valid;
  }
});
```

```html
<!-- built-in messages follow lang or <minerva-config locale> -->
<minerva-config locale="fr">
  <form>
    <minerva-select name="pays" required aria-label="Pays">…</minerva-select>
    <!-- validationMessage: "Veuillez sélectionner un élément de la liste." -->
  </form>
</minerva-config>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
