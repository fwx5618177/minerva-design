# Confirm

Demande à l'utilisateur de confirmer une action : un remplaçant thématisé de window.confirm. Utilisez le ConfirmDialog déclaratif ou attendez confirm() depuis n'importe où ; avec un ConfirmProvider la boîte s'affiche dans l'arbre de l'application, sans lui un hôte autonome est monté à la demande, et côté serveur confirm() renvoie false.

Package: minerva-design@1.21.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Lequel choisir : useConfirm() ou confirm()

Dans un composant, appelez useConfirm() : ses boîtes de dialogue suivent la portée du ConfigProvider le plus proche. Sous un provider imbriqué, la modale est rendue dans son conteneur de portail, avec son thème, sa palette et ses tokens, et les libellés par défaut des boutons utilisent sa langue. Un ConfirmProvider les affiche toujours s’il y en a un.

Hors de React (bus d’événements, clients d’API, gardes de routeur et autres modules non composants), importez directement confirm() : aucun hook n’y est disponible, et ses boîtes utilisent le thème et la langue racines.

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "minerva-design";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));
```

## ConfirmDialog

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/confirm-dialog",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string",
    "attribute": "description",
    "required": false
  },
  {
    "name": "confirmLabel",
    "typeText": "string | undefined",
    "attribute": "confirm-label",
    "required": false
  },
  {
    "name": "cancelLabel",
    "typeText": "string | undefined",
    "attribute": "cancel-label",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "color",
    "typeText": "ConfirmColor",
    "attribute": "color",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "confirmDisabled",
    "typeText": "boolean",
    "attribute": "confirm-disabled",
    "required": false
  },
  {
    "name": "onConfirm",
    "typeText": "() => unknown | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-confirm",
    "typeText": "CustomEvent<undefined>",
    "detailType": {
      "typeText": "undefined",
      "typeRef": "type:16535f0fd6ab598eec83"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The confirm button was pressed; cancelable: `preventDefault()` keeps the dialog open (close it yourself)"
  },
  {
    "name": "minerva-cancel",
    "typeText": "CustomEvent<{ reason: \"escape\" | \"outside\" | \"cancel-button\" | \"close-button\"; }>",
    "detailType": {
      "typeText": "{ reason: \"escape\" | \"outside\" | \"cancel-button\" | \"close-button\"; }",
      "typeRef": "type:f4f3c202d3b902cb6e0e"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The confirmation was cancelled and the dialog closed (`detail: { reason }`)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: false; reason: ConfirmCloseReason; }>",
    "detailType": {
      "typeText": "{ open: false; reason: ConfirmCloseReason; }",
      "typeRef": "type:045d8e84e08ca53ddfca"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user asked to close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps it open"
  },
  {
    "name": "minerva-after-open",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The dialog is open and focus moved in"
  },
  {
    "name": "minerva-after-close",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The dialog finished closing (after its exit animation)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Optional extra content below the description"
  },
  {
    "name": "header",
    "description": "Title (alternative to the `label` attribute)"
  }
]
```

## ConfirmProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/confirm-provider",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "Application content"
  }
]
```

## API

```json
{
  "wc:minerva-confirm-dialog": {
    "kind": "element",
    "source": "web-components/src/components/confirm/confirm.ts",
    "className": "MinervaConfirmDialog",
    "summary": "Modal confirmation dialog (alertdialog) with localized Confirm / Cancel buttons.",
    "description": "Confirmation dialog (`<ConfirmDialog>` of React): a small modal `alertdialog` asking the user to confirm an action, a themed replacement for `window.confirm`. Focus moves to the Cancel button (the least destructive action, WAI-ARIA APG) and is trapped; Escape (topmost layer only), an overlay click, the Cancel and the close (×) buttons cancel; focus returns to the opener on close. Pressing Confirm fires a cancelable `minerva-confirm`, runs the optional `onConfirm` callback (a returned promise shows the loading state until it settles; a rejection keeps the dialog open) and closes the dialog. For the imperative `confirm({ title }) -> Promise<boolean>` API, see `confirm()` (exported by the same entry).",
    "properties": [
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the dialog is open"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Title (or use the `header` slot); names the dialog"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Explanation below the title (the dialog's accessible description)"
      },
      {
        "name": "confirmLabel",
        "attribute": "confirm-label",
        "type": "string | undefined",
        "description": "Confirm button label (default: localized \"Confirm\", or \"Delete\" with `color=\"danger\"`)"
      },
      {
        "name": "cancelLabel",
        "attribute": "cancel-label",
        "type": "string | undefined",
        "description": "Cancel button label (default: localized \"Cancel\")"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close (×) button (default: localized \"Close\")"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "ConfirmColor",
        "default": "\"primary\"",
        "description": "Semantic color of the confirm button; `danger` marks a destructive action"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a spinner on the confirm button and disables Cancel"
      },
      {
        "name": "confirmDisabled",
        "attribute": "confirm-disabled",
        "type": "boolean",
        "default": "false",
        "description": "Natively disables the confirm button"
      },
      {
        "name": "onConfirm",
        "type": "() => unknown | undefined",
        "description": "Called when Confirm is pressed (after a non-cancelled `minerva-confirm`). A returned promise shows the loading state until it settles; the dialog closes when it resolves and stays open when it rejects."
      }
    ],
    "methods": [
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the dialog"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the dialog (no event)"
      }
    ],
    "events": [
      {
        "name": "minerva-confirm",
        "description": "The confirm button was pressed; cancelable: `preventDefault()` keeps the dialog open (close it yourself)"
      },
      {
        "name": "minerva-cancel",
        "description": "The confirmation was cancelled and the dialog closed (`detail: { reason }`)"
      },
      {
        "name": "minerva-open-change",
        "description": "The user asked to close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps it open"
      },
      {
        "name": "minerva-after-open",
        "description": "The dialog is open and focus moved in"
      },
      {
        "name": "minerva-after-close",
        "description": "The dialog finished closing (after its exit animation)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Optional extra content below the description"
      },
      {
        "name": "header",
        "description": "Title (alternative to the `label` attribute)"
      }
    ],
    "parts": [
      {
        "name": "overlay",
        "description": "The backdrop"
      },
      {
        "name": "content",
        "description": "The dialog panel (`role=\"alertdialog\"`)"
      },
      {
        "name": "header",
        "description": "The title (accessible name of the dialog)"
      },
      {
        "name": "description",
        "description": "The description below the title"
      },
      {
        "name": "body",
        "description": "The optional extra content"
      },
      {
        "name": "footer",
        "description": "The actions row (Cancel and Confirm buttons)"
      },
      {
        "name": "cancel-button",
        "description": "The Cancel `<minerva-button>` (web components only: in React it is a Button with its own hooks)"
      },
      {
        "name": "confirm-button",
        "description": "The Confirm `<minerva-button>` (web components only: in React it is a Button with its own hooks)"
      },
      {
        "name": "close-button",
        "description": "The close (×) button"
      }
    ],
    "cssProperties": [
      {
        "name": "--modal-width",
        "description": "Width of the panel (every size; defaults to the width of the size, capped by the viewport)"
      },
      {
        "name": "--modal-max-height",
        "description": "Maximum height of the panel (the body scrolls beyond)"
      },
      {
        "name": "--modal-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--modal-radius",
        "description": "Corner radius of the panel (defaults to --radius-xl)"
      },
      {
        "name": "--modal-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--modal-background",
        "description": "Background of the panel"
      },
      {
        "name": "--modal-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  },
  "wc:minerva-confirm-provider": {
    "kind": "element",
    "source": "web-components/src/components/confirm/confirm-provider.ts",
    "className": "MinervaConfirmProvider",
    "summary": "Scope that renders the imperative confirm() dialogs of its subtree (ConfirmProvider).",
    "description": "Renders the imperative confirmations of its subtree (the React library's `ConfirmProvider`): `confirm({ host })` / `confirmFor(host)` called with an element inside it are queued here and their dialogs are appended inside it (or inside the host's nested `<minerva-config>` scope), so they use its theme, palette and language. `confirm()` without a host uses the most recently connected provider. Disconnecting the provider cancels its pending confirmations (they resolve `false`). Optional: without a provider, confirmations render on `document.body`. It renders as `display: contents`.",
    "properties": [
      {
        "name": "confirm",
        "type": "ConfirmFunction",
        "readonly": true,
        "description": "Asks for a confirmation rendered by this provider (its scope, or the scope of `options.host`); resolves `true` when confirmed."
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Application content"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Confirmation asynchrone

onConfirm peut renvoyer une promesse : le bouton Confirmer affiche son état de chargement jusqu'à son règlement, et un rejet garde la boîte ouverte. Le contenu supplémentaire va dans le slot par défaut.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/wc/async.html

```html
<minerva-button id="publish">Publish article</minerva-button>
<minerva-confirm-dialog
  id="confirm-publish"
  label="Publish now?"
  description="Subscribers are notified by email."
  confirm-label="Publish"
>
  <label style="display: flex; gap: 8px; align-items: center">
    <input id="fail" type="checkbox" />
    Make the request fail
  </label>
</minerva-confirm-dialog>
<p id="publish-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/confirm/wc/async.ts

```tsx
// onConfirm returning a promise shows the loading state until it settles;
// a rejection keeps the dialog open so the user can retry or cancel.
type ConfirmDialog = HTMLElement & {
  show(): void;
  onConfirm?: () => unknown;
};

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#publish")!;
  const dialog = root.querySelector<ConfirmDialog>("#confirm-publish")!;
  const fail = root.querySelector<HTMLInputElement>("#fail")!;
  const result = root.querySelector<HTMLElement>("#publish-result")!;
  dialog.onConfirm = () =>
    new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (fail.checked) {
          result.textContent = "Request failed: the dialog stays open";
          reject(new Error("failed"));
        } else {
          result.textContent = "Published";
          resolve();
        }
      }, 1200),
    );
  const onOpen = () => {
    result.textContent = "";
    dialog.show();
  };
  button.addEventListener("click", onOpen);
  return () => button.removeEventListener("click", onOpen);
}

```

## Example: Utilisation de base

Un <minerva-confirm-dialog> déclaratif ouvert avec show(). color="danger" signale une action destructive ; minerva-confirm et minerva-cancel (avec sa raison) indiquent la réponse.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/wc/basic.html

```html
<minerva-button id="delete" color="danger" variant="outline"
  >Delete project</minerva-button
>
<minerva-confirm-dialog
  id="confirm-delete"
  color="danger"
  label="Delete this project?"
  description="Its files and history are removed for everyone. This cannot be undone."
  confirm-label="Delete project"
></minerva-confirm-dialog>
<p id="delete-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/confirm/wc/basic.ts

```tsx
// Open with show(); minerva-confirm / minerva-cancel report the answer.
type ConfirmDialog = HTMLElement & { show(): void };
type Cancel = CustomEvent<{ reason: string }>;

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#delete")!;
  const dialog = root.querySelector<ConfirmDialog>("#confirm-delete")!;
  const result = root.querySelector<HTMLElement>("#delete-result")!;
  const onOpen = () => dialog.show();
  const onConfirm = () => (result.textContent = "Project deleted");
  const onCancel = (event: Event) =>
    (result.textContent = `Cancelled (${(event as Cancel).detail.reason})`);
  button.addEventListener("click", onOpen);
  dialog.addEventListener("minerva-confirm", onConfirm);
  dialog.addEventListener("minerva-cancel", onCancel);
  return () => {
    button.removeEventListener("click", onOpen);
    dialog.removeEventListener("minerva-confirm", onConfirm);
    dialog.removeEventListener("minerva-cancel", onCancel);
  };
}

```

## Example: confirm() impératif

confirm({ title, ... }) ajoute une boîte de dialogue, se résout en true ou false et la retire une fois fermée : un remplaçant thémé de window.confirm. Les appels simultanés sont mis en file. Sans hôte ni <minerva-confirm-provider>, la boîte de dialogue est ajoutée à document.body (thème et langue racine).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/wc/imperative.html

```html
<minerva-button id="leave" color="warning" variant="outline"
  >Leave without saving</minerva-button
>
<p id="leave-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/confirm/wc/imperative.ts

```tsx
// confirm() appends a <minerva-confirm-dialog>, resolves true / false and
// removes it once closed. In an app: import { confirm } from
// "minerva-design/web-components/confirm".
export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#leave")!;
  const result = root.querySelector<HTMLElement>("#leave-result")!;
  const onClick = async () => {
    const { confirm } = await import("minerva-design/web-components");
    const ok = await confirm({
      title: "Discard your changes?",
      description: "The edits made since the last save are lost.",
      confirmLabel: "Discard",
      color: "warning",
    });
    result.textContent = ok ? "Changes discarded" : "Kept editing";
  };
  button.addEventListener("click", onClick);
  return () => button.removeEventListener("click", onClick);
}

```

## Example: Confirmation dans une portée et fournisseur

confirm({ host }) (ou confirmFor(host)) est l'équivalent de useConfirm() : la boîte de dialogue s'affiche dans la portée <minerva-config> de l'hôte (thème sombre, palette tech, libellés en chinois) et est mise en file par le <minerva-confirm-provider> le plus proche. confirm() sans hôte s'affiche dans la portée du fournisseur (ici le thème et la langue racine), comme le confirm() global.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/wc/scoped.html

```html
<minerva-confirm-provider>
  <minerva-config
    theme="dark"
    palette="tech"
    locale="zh"
    style="display: block"
  >
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        padding: 12px;
        border-radius: 8px;
        background: var(--surface-color);
        color: var(--text-color);
      "
    >
      <minerva-button id="scoped-delete" color="danger"
        >confirm({ host })</minerva-button
      >
      <minerva-button id="scoped-root" color="neutral" variant="outline"
        >confirm()</minerva-button
      >
      <output id="scoped-answer">—</output>
    </div>
  </minerva-config>
</minerva-confirm-provider>

```

### apps/docs/src/docs/pages/confirm/wc/scoped.ts

```tsx
// confirm({ host }) (or confirmFor(host)) is the React library's useConfirm(): the
// dialog renders inside the host's <minerva-config> scope (dark, tech,
// Chinese labels), queued by the closest <minerva-confirm-provider>.
// confirm() without a host uses the provider's own scope (here the root
// theme and language), like the React library's confirm().
// In an app: import { confirm, confirmFor } from
// "minerva-design/web-components/confirm".
export function setup(root: HTMLElement) {
  const scoped = root.querySelector<HTMLElement>("#scoped-delete")!;
  const plain = root.querySelector<HTMLElement>("#scoped-root")!;
  const answer = root.querySelector<HTMLOutputElement>("#scoped-answer")!;
  const onScoped = async () => {
    const { confirm } = await import("minerva-design/web-components");
    const ok = await confirm({
      title: "Delete this chapter? (dark, tech, 中文)",
      color: "danger",
      host: scoped,
    });
    answer.value = String(ok);
  };
  const onPlain = async () => {
    const { confirm } = await import("minerva-design/web-components");
    answer.value = String(
      await confirm({ title: "Retry the upload? (root scope)" }),
    );
  };
  scoped.addEventListener("click", onScoped);
  plain.addEventListener("click", onPlain);
  return () => {
    scoped.removeEventListener("click", onScoped);
    plain.removeEventListener("click", onPlain);
  };
}

```
