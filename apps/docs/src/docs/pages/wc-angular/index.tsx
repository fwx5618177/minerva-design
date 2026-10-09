import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Alert } from "minerva-design";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";

const mainCode = `// main.ts
import "minerva-design/web-components"; // or per element: ".../input", ".../select"
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent);

// angular.json > projects > app > architect > build > options
// "styles": ["node_modules/minerva-design/dist/core/tokens.css", "src/styles.css"]`;

const componentCode = `import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from "@angular/core";
import { toast } from "minerva-design/web-components/toast";

@Component({
  selector: "app-profile",
  // lets the template use unknown tags (<minerva-*>) and bind their properties
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
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
  \`,
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
    toast.success(\`Saved \${this.name()} (\${this.plan()} plan)\`);
  }
}`;

const accessorCode = `// minerva-value-accessor.ts: Angular forms (ngModel, formControl,
// formControlName) for the Minerva controls with a string value
import { Directive, ElementRef, HostListener, forwardRef, inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from "@angular/forms";

type ValueElement = HTMLElement & { value: string; disabled: boolean };

@Directive({
  selector: \`minerva-input[ngModel], minerva-input[formControl], minerva-input[formControlName],
    minerva-textarea[ngModel], minerva-textarea[formControl], minerva-textarea[formControlName],
    minerva-select[ngModel], minerva-select[formControl], minerva-select[formControlName]\`,
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
}`;

const reactiveCode = `import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { toast } from "minerva-design/web-components/toast";
import { MinervaValueAccessor } from "./minerva-value-accessor";

@Component({
  selector: "app-signup",
  imports: [ReactiveFormsModule, MinervaValueAccessor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label for="email">Email</label>
      <minerva-input id="email" formControlName="email" type="email"></minerva-input>
      <minerva-button type="submit" [disabled]="form.invalid">Sign up</minerva-button>
    </form>
  \`,
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  submit() {
    const { email } = this.form.getRawValue();
    toast.success(\`Welcome, \${email}!\`);
  }
}`;

const WcAngularDoc: React.FC = () => {
  const { t } = useTranslation();
  const k = (key: string) => t(`docs.wc-angular.${key}`);

  const intro = (
    <>
      <Alert color="info">
        <Trans
          i18nKey="doc.fw.viaWebComponents"
          values={{ framework: "Angular" }}
          components={{
            native: <Link to="/angular" />,
            support: <Link to="/platform-support" />,
          }}
        />
      </Alert>
      <section className={styles.section} aria-labelledby="setup">
        <h2 id="setup">{k("setup.title")}</h2>
        <p className={styles.prose}>{k("setup.text")}</p>
        <CodeBlock code={mainCode} language="ts" />
      </section>

      <section className={styles.section} aria-labelledby="binding">
        <h2 id="binding">{k("binding.title")}</h2>
        <p className={styles.prose}>{k("binding.text")}</p>
        <CodeBlock code={componentCode} language="ts" />
        <ul className={styles.prose}>
          <li>{k("binding.properties")}</li>
          <li>{k("binding.attributes")}</li>
          <li>{k("binding.events")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="forms">
        <h2 id="forms">{k("forms.title")}</h2>
        <p className={styles.prose}>{k("forms.text")}</p>
        <CodeBlock code={accessorCode} language="ts" />
        <p className={styles.prose}>{k("forms.usage")}</p>
        <CodeBlock code={reactiveCode} language="ts" />
        <p className={styles.prose}>{k("forms.checked")}</p>
        <p className={styles.callout}>{k("forms.native")}</p>
      </section>

      <section className={styles.section} aria-labelledby="zones">
        <h2 id="zones">{k("zones.title")}</h2>
        <p className={styles.prose}>{k("zones.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="ssr">
        <h2 id="ssr">{k("ssr.title")}</h2>
        <p className={styles.prose}>{k("ssr.text")}</p>
      </section>
    </>
  );

  return <DocPage id="wc-angular" intro={intro} />;
};

export default WcAngularDoc;
