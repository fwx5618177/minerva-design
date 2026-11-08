# Angular

Minerva custom elements in Angular: CUSTOM_ELEMENTS_SCHEMA, property and event bindings, a ControlValueAccessor for template-driven and reactive forms, change detection and SSR.

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

### Setup

Register the elements once before bootstrapping (all of them, or one entry per element), and add the design tokens to the global styles of the build:

### Bindings

Add CUSTOM_ELEMENTS_SCHEMA to the components (or NgModules) whose templates use  tags: Angular then accepts the unknown tags and binds their properties and events like those of native elements.

[value], [checked], [disabled], [open], [options]... set DOM properties, so booleans, arrays, objects and functions reach the element as they are. Signals work as with any binding.

Static attributes (aria-label="Name", clearable) are written as they are; use [attr.name] to bind an attribute that is not a property, such as aria-*, data-* or slot.

(minerva-change), (minerva-input), (minerva-open-change)... listen to the custom events; $event is a CustomEvent (wrap it in $any() with strict templates) and the new state is in $event.detail. (click) and other native events work as usual.

### Forms

ngModel, formControl and formControlName need a ControlValueAccessor, which Angular only provides for native inputs. A small directive bridges the Minerva text fields and selects: it writes the value property (which fires no event) and reports the user's changes from the minerva-* events:

Import the directive next to ReactiveFormsModule (or FormsModule for ngModel). Angular's validators and the form state (dirty, touched, invalid) then work as with native inputs:

For  and , write a second accessor on the checked property and the detail.checked of minerva-change; for the other controls, use the value shape listed in their event documentation.

Without Angular forms, the elements are form-associated anyway: inside a plain , their name and value are part of FormData, required and the browser's constraint validation apply, and form.reset() restores their initial values. See Forms.

### Change detection

Template event bindings run Angular's change detection, with zone.js as well as in zoneless applications, so updating a signal or a field from (minerva-change) is enough. With zone.js, the timers and observers that elements use internally (animations, popup positioning) are patched too, which can schedule extra change detection runs but needs no special handling. In zoneless applications, listeners you add yourself with addEventListener should update signals so that the view refreshes.

### Server-side rendering

With Angular SSR, main.ts runs in the browser only, so the elements are registered on the client. Importing the package from code that also runs on the server (a shared component, main.server.ts) is safe as well: the modules do not touch the DOM when they load and registration is idempotent. The server renders the tags as HTML with their attributes and light DOM content, and the browser upgrades them.

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
