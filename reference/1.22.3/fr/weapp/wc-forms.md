# Formulaires

Les contrôles Minerva sont des éléments personnalisés associés aux formulaires : FormData, required et validation par contraintes, setCustomValidity, form.reset(), <fieldset disabled>, <label for>, :invalid et messages localisés.

Package: minerva-design@1.22.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Éléments associés aux formulaires

Les contrôles de formulaire sont des éléments personnalisés associés aux formulaires, construits sur ElementInternals : dans un , ils se comportent comme des champs natifs, sans champ caché ni conteneur. Ces éléments participent aux formulaires :

 est lui aussi associé aux formulaires : type="submit" soumet le formulaire parent via requestSubmit() (la validation et les écouteurs submit s'exécutent donc) et type="reset" le réinitialise. Le type par défaut est "button", qui ne fait rien.

### Noms, valeurs et FormData

Donnez un name à chaque contrôle. Sa valeur fait partie de new FormData(form) et d'une soumission native, exactement comme un  :

name est la clé de la valeur soumise. Les cases à cocher et les interrupteurs ne soumettent leur value ("on" par défaut) que lorsqu'ils sont cochés : plusieurs cases à cocher portant le même name produisent donc une liste (FormData.getAll()).

L'attribut value (checked pour les cases à cocher et les interrupteurs) est la valeur initiale ; la propriété value / checked est la valeur courante. Certains contrôles soumettent plusieurs entrées (la saisie de tags en soumet une par tag) ; chaque page de composant précise ce que soumet son contrôle.

disabled sur un contrôle, ou sur un  ancêtre, le rend non modifiable et l'exclut de la soumission et de la validation (isDisabled tient compte des deux).

Les valeurs sont restaurées par le navigateur lorsque l'utilisateur revient sur la page (bfcache) et par le remplissage automatique, grâce aux callbacks d'association aux formulaires.

### Libellés

 et les éléments  englobants nomment le contrôle, comme pour les champs natifs : la propriété labels de l'élément les liste, le texte du libellé est transmis au contrôle dans la shadow root, et un clic sur le libellé lui donne le focus. aria-label, aria-labelledby et aria-describedby sur l'élément fonctionnent aussi (les id sont résolus en texte, puisqu'ils ne peuvent pas traverser les shadow roots).

### Validation par contraintes

required, minlength / maxlength, pattern, min / max et type (email, url...) fonctionnent comme sur les champs natifs. Chaque élément expose l'API de validation par contraintes (validity, validationMessage, willValidate, checkValidity(), reportValidity(), setCustomValidity()), et form.checkValidity(), form.reportValidity() ainsi que la soumission tiennent compte des contrôles Minerva : un contrôle invalide bloque l'événement submit et le navigateur affiche son message à côté du contrôle.

form.reset() restaure chaque contrôle à son attribut value ou checked et efface les messages définis avec setCustomValidity() ; écoutez l'événement reset du formulaire pour effacer vos propres styles d'erreur.

### Styler les contrôles invalides

Les pseudo-classes :invalid et :valid s'appliquent aux éléments associés aux formulaires comme aux champs natifs : vous pouvez donc les styler depuis la page. Pour éviter des champs en rouge avant toute action de l'utilisateur, appliquez les styles une fois qu'une soumission a été tentée :

L'état d'erreur intégré est une propriété : invalid sur les champs texte, les listes de sélection, les interrupteurs et les autres contrôles, error sur les cases à cocher et les boutons radio. Il affiche la bordure rouge et définit aria-invalid.  enveloppe un contrôle avec un libellé, un texte d'aide et un message d'erreur, et transmet son état invalid / required / disabled au contrôle.

### Messages localisés

Les contrôles sans équivalent natif (liste de sélection, case à cocher, interrupteur, groupe de boutons radio, notation, envoi de fichiers, sélecteur d'heure, cascader...) renvoient les messages de validation propres à Minerva ("Please select an item in the list.", "Please check this box if you want to proceed."...), traduits dans toutes les langues prises en charge et suivant l'attribut lang ou le  de leur portée. Les champs texte délèguent à leur champ natif interne, dont les messages sont fournis par le navigateur dans sa propre langue.

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
