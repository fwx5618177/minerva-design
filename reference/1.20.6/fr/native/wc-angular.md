# Angular

Les éléments personnalisés Minerva dans Angular : CUSTOM_ELEMENTS_SCHEMA, liaisons de propriétés et d'événements, un ControlValueAccessor pour les formulaires template-driven et réactifs, détection des changements et SSR.

Package: minerva-design@1.20.6

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### Configuration

Enregistrez les éléments une fois avant le bootstrap (tous, ou une entrée par élément), et ajoutez les design tokens aux styles globaux du build :

### Liaisons

Ajoutez CUSTOM_ELEMENTS_SCHEMA aux composants (ou NgModules) dont les templates utilisent des balises  : Angular accepte alors ces balises inconnues et lie leurs propriétés et événements comme ceux des éléments natifs.

[value], [checked], [disabled], [open], [options]... définissent des propriétés DOM : les booléens, tableaux, objets et fonctions parviennent donc tels quels à l'élément. Les signals fonctionnent comme avec n'importe quelle liaison.

Les attributs statiques (aria-label="Name", clearable) s'écrivent tels quels ; utilisez [attr.name] pour lier un attribut qui n'est pas une propriété, comme aria-*, data-* ou slot.

(minerva-change), (minerva-input), (minerva-open-change)... écoutent les événements personnalisés ; $event est un CustomEvent (à envelopper dans $any() avec les templates stricts) et le nouvel état se trouve dans $event.detail. (click) et les autres événements natifs fonctionnent comme d'habitude.

### Formulaires

ngModel, formControl et formControlName nécessitent un ControlValueAccessor, qu'Angular ne fournit que pour les champs natifs. Une petite directive fait le pont avec les champs texte et les listes de sélection Minerva : elle écrit la propriété value (ce qui ne déclenche aucun événement) et remonte les changements de l'utilisateur à partir des événements minerva-* :

Importez la directive à côté de ReactiveFormsModule (ou de FormsModule pour ngModel). Les validateurs d'Angular et l'état du formulaire (dirty, touched, invalid) fonctionnent alors comme avec les champs natifs :

Pour  et , écrivez un second accessor sur la propriété checked et sur detail.checked de minerva-change ; pour les autres contrôles, utilisez la forme de valeur indiquée dans la documentation de leurs événements.

Même sans les formulaires Angular, les éléments sont associés aux formulaires : dans un simple , leur name et leur value font partie de FormData, required et la validation par contraintes du navigateur s'appliquent, et form.reset() restaure leurs valeurs initiales. Consultez Formulaires.

### Détection des changements

Les liaisons d'événements des templates déclenchent la détection des changements d'Angular, avec zone.js comme dans les applications zoneless : mettre à jour un signal ou un champ depuis (minerva-change) suffit donc. Avec zone.js, les timers et observers que les éléments utilisent en interne (animations, positionnement des fenêtres contextuelles) sont aussi patchés, ce qui peut programmer des cycles de détection supplémentaires mais ne demande aucun traitement particulier. Dans les applications zoneless, les écouteurs que vous ajoutez vous-même avec addEventListener doivent mettre à jour des signals pour que la vue se rafraîchisse.

### Rendu côté serveur

Avec Angular SSR, main.ts ne s'exécute que dans le navigateur : les éléments sont donc enregistrés côté client. Importer le paquet depuis du code qui s'exécute aussi sur le serveur (un composant partagé, main.server.ts) est également sans danger : les modules ne touchent pas au DOM lors de leur chargement et l'enregistrement est idempotent. Le serveur rend les balises en HTML avec leurs attributs et leur contenu light DOM, puis le navigateur les met à niveau.

```ts
// main.ts
import "minerva-design/web-components"; // or per element: ".../input", ".../select"
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent);

// angular.json > projects > app > architect > build > options
// "styles": ["node_modules/minerva-design/dist/core/tokens.css", "src/styles.css"]
```

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from "@angular/core";
import { toast } from "minerva-design/web-components/toast";

@Component({
  selector: "app-profile",
  // lets the template use unknown tags (<minerva-*>) and bind their properties
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <minerva-input
      aria-label="Name"
      [value]="name()"
      (minerva-input)="name.set($any($event).detail.value)"
    ></minerva-input>

    <minerva-select
      aria-label="Plan"
      [options]="plans"
      [value]="plan()"
      (minerva-change)="plan.set($any($event).detail.value)"
    ></minerva-select>

    <minerva-switch
      label="Email notifications"
      [checked]="notify()"
      (minerva-change)="notify.set($any($event).detail.checked)"
    ></minerva-switch>

    <!-- [attr.x] writes an attribute: aria-*, data-*, slot... -->
    <minerva-button [disabled]="!name()" [attr.aria-label]="saveLabel" (click)="save()">
      Save
    </minerva-button>
  `,
})
export class ProfileComponent {
  name = signal("Ada");
  plan = signal("pro");
  notify = signal(true);
  saveLabel = "Save profile";
  plans = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];

  save() {
    // toast() creates its <minerva-toast-region> on demand
    toast.success(`Saved ${this.name()} (${this.plan()} plan)`);
  }
}
```

```ts
// minerva-value-accessor.ts: Angular forms (ngModel, formControl,
// formControlName) for the Minerva controls with a string value
import { Directive, ElementRef, HostListener, forwardRef, inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from "@angular/forms";

type ValueElement = HTMLElement & { value: string; disabled: boolean };

@Directive({
  selector: `minerva-input[ngModel], minerva-input[formControl], minerva-input[formControlName],
    minerva-textarea[ngModel], minerva-textarea[formControl], minerva-textarea[formControlName],
    minerva-select[ngModel], minerva-select[formControl], minerva-select[formControlName]`,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MinervaValueAccessor), multi: true },
  ],
})
export class MinervaValueAccessor implements ControlValueAccessor {
  private readonly el = inject<ElementRef<ValueElement>>(ElementRef).nativeElement;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.el.value = value ?? ""; // programmatic: fires no event
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.el.disabled = disabled;
  }

  @HostListener("minerva-input", ["$event"])
  @HostListener("minerva-change", ["$event"])
  handle(event: CustomEvent<{ value: string }>): void {
    this.onChange(event.detail.value);
  }

  @HostListener("focusout")
  touched(): void {
    this.onTouched();
  }
}
```

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { toast } from "minerva-design/web-components/toast";
import { MinervaValueAccessor } from "./minerva-value-accessor";

@Component({
  selector: "app-signup",
  imports: [ReactiveFormsModule, MinervaValueAccessor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label for="email">Email</label>
      <minerva-input id="email" formControlName="email" type="email"></minerva-input>
      <minerva-button type="submit" [disabled]="form.invalid">Sign up</minerva-button>
    </form>
  `,
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  submit() {
    const { email } = this.form.getRawValue();
    toast.success(`Welcome, ${email}!`);
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
