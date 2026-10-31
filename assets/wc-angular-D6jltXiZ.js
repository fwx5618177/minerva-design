import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{o as a,s as o}from"./renderer.module-CIa5K8Cm.js";import{n as s,t as c}from"./useTranslation-Dn-CFiHX.js";import{n as l,t as u}from"./Alert-DYH-oD8D.js";import{n as d,t as f}from"./CodeBlock-6TfAiMiG.js";import{i as p,r as m}from"./DemoBlock-Ev3eU-vB.js";import{n as h,t as g}from"./DocPage-BNEhhzRL.js";var _,v,y,b,x,S;function C(){return(C=e((()=>{t(),o(),c(),r(),l(),d(),h(),p(),_=n(),v=`// main.ts
import "minerva-design/web-components"; // or per element: ".../input", ".../select"
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent);

// angular.json > projects > app > architect > build > options
// "styles": ["node_modules/minerva-design/dist/core/tokens.css", "src/styles.css"]`,y=`import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from "@angular/core";
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
}`,b=`// minerva-value-accessor.ts: Angular forms (ngModel, formControl,
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
}`,x=`import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
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
}`,S=()=>{let{t:e}=s(),t=t=>e(`docs.wc-angular.${t}`),n=(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(u,{color:`info`,children:(0,_.jsx)(a,{i18nKey:`doc.fw.viaWebComponents`,values:{framework:`Angular`},components:{native:(0,_.jsx)(i,{to:`/angular`}),support:(0,_.jsx)(i,{to:`/platform-support`})}})}),(0,_.jsxs)(`section`,{className:m.section,"aria-labelledby":`setup`,children:[(0,_.jsx)(`h2`,{id:`setup`,children:t(`setup.title`)}),(0,_.jsx)(`p`,{className:m.prose,children:t(`setup.text`)}),(0,_.jsx)(f,{code:v,language:`ts`})]}),(0,_.jsxs)(`section`,{className:m.section,"aria-labelledby":`binding`,children:[(0,_.jsx)(`h2`,{id:`binding`,children:t(`binding.title`)}),(0,_.jsx)(`p`,{className:m.prose,children:t(`binding.text`)}),(0,_.jsx)(f,{code:y,language:`ts`}),(0,_.jsxs)(`ul`,{className:m.prose,children:[(0,_.jsx)(`li`,{children:t(`binding.properties`)}),(0,_.jsx)(`li`,{children:t(`binding.attributes`)}),(0,_.jsx)(`li`,{children:t(`binding.events`)})]})]}),(0,_.jsxs)(`section`,{className:m.section,"aria-labelledby":`forms`,children:[(0,_.jsx)(`h2`,{id:`forms`,children:t(`forms.title`)}),(0,_.jsx)(`p`,{className:m.prose,children:t(`forms.text`)}),(0,_.jsx)(f,{code:b,language:`ts`}),(0,_.jsx)(`p`,{className:m.prose,children:t(`forms.usage`)}),(0,_.jsx)(f,{code:x,language:`ts`}),(0,_.jsx)(`p`,{className:m.prose,children:t(`forms.checked`)}),(0,_.jsx)(`p`,{className:m.callout,children:t(`forms.native`)})]}),(0,_.jsxs)(`section`,{className:m.section,"aria-labelledby":`zones`,children:[(0,_.jsx)(`h2`,{id:`zones`,children:t(`zones.title`)}),(0,_.jsx)(`p`,{className:m.prose,children:t(`zones.text`)})]}),(0,_.jsxs)(`section`,{className:m.section,"aria-labelledby":`ssr`,children:[(0,_.jsx)(`h2`,{id:`ssr`,children:t(`ssr.title`)}),(0,_.jsx)(`p`,{className:m.prose,children:t(`ssr.text`)})]})]});return(0,_.jsx)(g,{id:`wc-angular`,intro:n})}})))()}C();export{S as default};