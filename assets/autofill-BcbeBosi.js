import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- InputAutofill.vue -->

<script setup lang="ts">
// Keep native form validation and password-manager hints without sending credentials.

const onSubmit = (event: SubmitEvent) => event.preventDefault();
<\/script>

<template>
  <form
    id="input-login"
    style="display: grid; gap: 12px; max-width: 360px"
    @submit="onSubmit"
  >
    <label for="input-login-user">Username</label>
    <minerva-input
      id="input-login-user"
      aria-label="Username"
      name="username"
      autocomplete="username"
      required
    >
      <span slot="prefix" aria-hidden="true">@</span>
    </minerva-input>
    <label for="input-login-password">Password</label>
    <minerva-input
      id="input-login-password"
      aria-label="Password"
      name="password"
      type="password"
      autocomplete="current-password"
      required
    >
      <span slot="prefix" aria-hidden="true">Key</span>
    </minerva-input>
    <minerva-button type="submit">Try form</minerva-button>
    <output aria-live="polite"
      >Demo only. No credentials are sent and no account is signed in.</output
    >
  </form>
</template>
`,angular:`// input-autofill.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Keep native form validation and password-manager hints without sending credentials.

@Component({
  selector: "app-input-autofill",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <form
      id="input-login"
      style="display: grid; gap: 12px; max-width: 360px"
      (submit)="onSubmit($event)"
    >
      <label for="input-login-user">Username</label>
      <minerva-input
        id="input-login-user"
        aria-label="Username"
        name="username"
        autocomplete="username"
        required
      >
        <span slot="prefix" aria-hidden="true">&#64;</span>
      </minerva-input>
      <label for="input-login-password">Password</label>
      <minerva-input
        id="input-login-password"
        aria-label="Password"
        name="password"
        type="password"
        autocomplete="current-password"
        required
      >
        <span slot="prefix" aria-hidden="true">Key</span>
      </minerva-input>
      <minerva-button type="submit">Try form</minerva-button>
      <output aria-live="polite"
        >Demo only. No credentials are sent and no account is signed in.</output
      >
    </form>
  \`,
})
export class InputAutofillComponent {
  onSubmit = (event: SubmitEvent) => event.preventDefault();
}
`,svelte:`<!-- InputAutofill.svelte -->

<script lang="ts">
  // Keep native form validation and password-manager hints without sending credentials.

  const onSubmit = (event: SubmitEvent) => event.preventDefault();
<\/script>

<form
  id="input-login"
  style="display: grid; gap: 12px; max-width: 360px"
  onsubmit={onSubmit}
>
  <label for="input-login-user">Username</label>
  <minerva-input
    id="input-login-user"
    aria-label="Username"
    name="username"
    autocomplete="username"
    required
  >
    <span slot="prefix" aria-hidden="true">@</span>
  </minerva-input>
  <label for="input-login-password">Password</label>
  <minerva-input
    id="input-login-password"
    aria-label="Password"
    name="password"
    type="password"
    autocomplete="current-password"
    required
  >
    <span slot="prefix" aria-hidden="true">Key</span>
  </minerva-input>
  <minerva-button type="submit">Try form</minerva-button>
  <output aria-live="polite"
    >Demo only. No credentials are sent and no account is signed in.</output>
</form>
`,solid:`// InputAutofill.tsx

// Keep native form validation and password-manager hints without sending credentials.

export default function InputAutofill() {
  const onSubmit = (event: SubmitEvent) => event.preventDefault();

  return (
    <form
      id="input-login"
      style="display: grid; gap: 12px; max-width: 360px"
      on:submit={onSubmit}
    >
      <label for="input-login-user">Username</label>
      <minerva-input
        id="input-login-user"
        aria-label="Username"
        name="username"
        autocomplete="username"
        required
      >
        <span slot="prefix" aria-hidden="true">
          @
        </span>
      </minerva-input>
      <label for="input-login-password">Password</label>
      <minerva-input
        id="input-login-password"
        aria-label="Password"
        name="password"
        type="password"
        autocomplete="current-password"
        required
      >
        <span slot="prefix" aria-hidden="true">
          Key
        </span>
      </minerva-input>
      <minerva-button type="submit">Try form</minerva-button>
      <output aria-live="polite">
        Demo only. No credentials are sent and no account is signed in.
      </output>
    </form>
  );
}
`,html:`<form id="input-login" style="display: grid; gap: 12px; max-width: 360px">
  <label for="input-login-user">Username</label>
  <minerva-input
    id="input-login-user"
    aria-label="Username"
    name="username"
    autocomplete="username"
    required
  >
    <span slot="prefix" aria-hidden="true">@</span>
  </minerva-input>
  <label for="input-login-password">Password</label>
  <minerva-input
    id="input-login-password"
    aria-label="Password"
    name="password"
    type="password"
    autocomplete="current-password"
    required
  >
    <span slot="prefix" aria-hidden="true">Key</span>
  </minerva-input>
  <minerva-button type="submit">Try form</minerva-button>
  <output aria-live="polite"
    >Demo only. No credentials are sent and no account is signed in.</output
  >
</form>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // Keep native form validation and password-manager hints without sending credentials.
  const form = document.querySelector("#input-login");
  const onSubmit = (event) => event.preventDefault();
  form.addEventListener("submit", onSubmit);
<\/script>
`}})))()}n();export{t as default};