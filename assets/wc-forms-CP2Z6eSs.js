import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-wxAap2cZ.js";import{n as a,t as o}from"./CodeBlock-CJABAtvm.js";import{i as s,r as c}from"./DemoBlock-C9SrrBKM.js";import{n as l,t as u}from"./DocPage-JhXgs5p-.js";var d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{t(),i(),a(),l(),s(),d=n(),f=[`input`,`textarea`,`number-input`,`checkbox`,`radio-group`,`switch`,`select`,`autocomplete`,`tag-input`,`time-picker`,`cascader`,`rating`,`json-field`,`key-value-editor`,`upload`],p=`<form id="profile">
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
</form>`,m=`const form = document.querySelector("#profile");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  data.get("name"); // "Ada"
  data.getAll("skills"); // ["ts"]: unchecked boxes are not submitted
  data.get("public"); // null, or "yes" when the switch is on
});

// disable every control of the fieldset: not editable, not submitted, not validated
document.querySelector("#details").disabled = true;`,h=`const name = document.querySelector("#name");

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
form.reset();`,g=`/* :invalid / :valid match the elements like native inputs */
form.was-validated :invalid {
  outline: 2px solid var(--danger-color);
  outline-offset: 2px;
}

/* or switch on the built-in error style (invalid; "error" on
   checkboxes and radios) once the user tried to submit */`,_=`// "invalid" does not bubble: listen in the capture phase
form.addEventListener("invalid", (event) => {
  form.classList.add("was-validated");
  event.target.invalid = true; // red border + aria-invalid
}, true);

form.addEventListener("minerva-change", (event) => {
  if (form.classList.contains("was-validated")) {
    event.target.invalid = !event.target.validity.valid;
  }
});`,v=`<!-- built-in messages follow lang or <minerva-config locale> -->
<minerva-config locale="fr">
  <form>
    <minerva-select name="pays" required aria-label="Pays">…</minerva-select>
    <!-- validationMessage: "Veuillez sélectionner un élément de la liste." -->
  </form>
</minerva-config>`,y=()=>{let{t:e}=r(),t=t=>e(`docs.wc-forms.${t}`),n=(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`association`,children:[(0,d.jsx)(`h2`,{id:`association`,children:t(`association.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`association.text`)}),(0,d.jsx)(`ul`,{className:c.prose,children:f.map(e=>(0,d.jsx)(`li`,{children:(0,d.jsx)(`code`,{children:`<minerva-${e}>`})},e))}),(0,d.jsx)(`p`,{className:c.prose,children:t(`association.buttons`)})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`form-data`,children:[(0,d.jsx)(`h2`,{id:`form-data`,children:t(`formData.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`formData.text`)}),(0,d.jsx)(o,{code:p,language:`html`}),(0,d.jsx)(o,{code:m,language:`ts`}),(0,d.jsxs)(`ul`,{className:c.prose,children:[(0,d.jsx)(`li`,{children:t(`formData.name`)}),(0,d.jsx)(`li`,{children:t(`formData.values`)}),(0,d.jsx)(`li`,{children:t(`formData.disabled`)}),(0,d.jsx)(`li`,{children:t(`formData.restore`)})]})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`labels`,children:[(0,d.jsx)(`h2`,{id:`labels`,children:t(`labels.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`labels.text`)})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`validation`,children:[(0,d.jsx)(`h2`,{id:`validation`,children:t(`validation.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`validation.text`)}),(0,d.jsx)(o,{code:h,language:`ts`}),(0,d.jsx)(`p`,{className:c.prose,children:t(`validation.reset`)})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`styling`,children:[(0,d.jsx)(`h2`,{id:`styling`,children:t(`styling.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`styling.text`)}),(0,d.jsx)(o,{code:g,language:`css`}),(0,d.jsx)(o,{code:_,language:`ts`}),(0,d.jsx)(`p`,{className:c.prose,children:t(`styling.formControl`)})]}),(0,d.jsxs)(`section`,{className:c.section,"aria-labelledby":`messages`,children:[(0,d.jsx)(`h2`,{id:`messages`,children:t(`messages.title`)}),(0,d.jsx)(`p`,{className:c.prose,children:t(`messages.text`)}),(0,d.jsx)(o,{code:v,language:`html`})]})]});return(0,d.jsx)(u,{id:`wc-forms`,intro:n})}})))()}b();export{y as default};