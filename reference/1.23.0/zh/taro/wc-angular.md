# Angular

在 Angular 中使用 Minerva 自定义元素：CUSTOM_ELEMENTS_SCHEMA、property 与事件绑定、用于模板驱动表单和响应式表单的 ControlValueAccessor、变更检测以及 SSR。

Package: minerva-design@1.23.0

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 配置

在启动应用之前注册一次元素（全部注册，或按元素引入各自的入口），并把设计令牌添加到构建的全局样式中：

### 绑定

在模板中使用  标签的组件（或 NgModule）中添加 CUSTOM_ELEMENTS_SCHEMA：之后 Angular 会接受这些未知标签，并像原生元素一样绑定它们的 property 和事件。

[value]、[checked]、[disabled]、[open]、[options]……设置的是 DOM property，因此布尔值、数组、对象和函数都能原样传递给元素。Signal 与任何绑定一样可以使用。

静态 attribute（aria-label="Name"、clearable）按原样书写；对于不是 property 的 attribute，例如 aria-*、data-* 或 slot，请使用 [attr.name] 绑定。

(minerva-change)、(minerva-input)、(minerva-open-change)……用于监听自定义事件；$event 是 CustomEvent（启用严格模板时用 $any() 包裹），新状态位于 $event.detail 中。(click) 和其他原生事件照常工作。

### 表单

ngModel、formControl 和 formControlName 需要 ControlValueAccessor，而 Angular 只为原生输入框提供了它。一个小型指令即可桥接 Minerva 的文本字段和选择器：它写入 value property（不会触发事件），并通过 minerva-* 事件上报用户的修改：

把该指令与 ReactiveFormsModule（使用 ngModel 时为 FormsModule）一起导入。之后 Angular 的校验器和表单状态（dirty、touched、invalid）就会像原生输入框一样工作：

对于  和 ，请基于 checked property 和 minerva-change 的 detail.checked 再编写一个 accessor；对于其他控件，请使用其事件文档中列出的值结构。

即使不使用 Angular 表单，这些元素本身也是表单关联的：在普通  中，它们的 name 和 value 会成为 FormData 的一部分，required 和浏览器的约束校验同样生效，form.reset() 会恢复它们的初始值。参见表单。

### 变更检测

无论使用 zone.js 还是 zoneless 应用，模板中的事件绑定都会触发 Angular 的变更检测，因此在 (minerva-change) 中更新 signal 或字段就足够了。使用 zone.js 时，元素内部使用的定时器和观察器（动画、弹出层定位）也会被打补丁，这可能会安排额外的变更检测，但无需特殊处理。在 zoneless 应用中，你自己通过 addEventListener 添加的监听器应当更新 signal，以便刷新视图。

### 服务端渲染

使用 Angular SSR 时，main.ts 只在浏览器中运行，因此元素会在客户端注册。从同样会在服务端运行的代码（共享组件、main.server.ts）中引入该包也是安全的：模块加载时不会访问 DOM，且注册是幂等的。服务端会把标签连同其 attribute 和 light DOM 内容渲染为 HTML，再由浏览器升级它们。

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
