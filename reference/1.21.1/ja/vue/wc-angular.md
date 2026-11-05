# Angular

Angular で Minerva のカスタム要素を使う：CUSTOM_ELEMENTS_SCHEMA、プロパティとイベントのバインディング、テンプレート駆動フォームとリアクティブフォーム向けの ControlValueAccessor、変更検知、SSR。

Package: minerva-design@1.21.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### セットアップ

ブートストラップの前に要素を一度だけ登録し（すべての要素、または要素ごとのエントリー）、ビルドのグローバルスタイルにデザイントークンを追加します：

### バインディング

テンプレートで  タグを使うコンポーネント（または NgModule）に CUSTOM_ELEMENTS_SCHEMA を追加します。これにより Angular は未知のタグを受け入れ、ネイティブ要素と同様にプロパティとイベントをバインドします。

[value]、[checked]、[disabled]、[open]、[options]... は DOM プロパティを設定するため、真偽値、配列、オブジェクト、関数がそのまま要素に渡ります。Signal も通常のバインディングと同様に動作します。

静的な属性（aria-label="Name"、clearable）はそのまま記述します。aria-*、data-*、slot など、プロパティではない属性をバインドするには [attr.name] を使います。

(minerva-change)、(minerva-input)、(minerva-open-change)... でカスタムイベントを受け取ります。$event は CustomEvent で（strict テンプレートでは $any() で囲みます）、新しい状態は $event.detail にあります。(click) などのネイティブイベントは通常どおり動作します。

### フォーム

ngModel、formControl、formControlName には ControlValueAccessor が必要ですが、Angular はネイティブの input 向けにしか提供していません。小さなディレクティブで Minerva のテキストフィールドとセレクトを橋渡しします。このディレクティブは value プロパティを書き込み（イベントは発火しません）、ユーザーによる変更を minerva-* イベントから通知します：

ReactiveFormsModule（ngModel の場合は FormsModule）と並べてディレクティブをインポートします。これで Angular のバリデーターとフォームの状態（dirty、touched、invalid）がネイティブの input と同様に動作します：

 と  には、checked プロパティと minerva-change の detail.checked を扱う 2 つ目のアクセサーを書きます。その他のコントロールでは、各イベントのドキュメントに記載された値の形式を使ってください。

Angular のフォームを使わなくても、要素はフォーム関連付け要素です。通常の  内では name と value が FormData に含まれ、required とブラウザの制約検証が適用され、form.reset() で初期値に戻ります。「フォーム」を参照してください。

### 変更検知

テンプレートのイベントバインディングは、zone.js を使うアプリでもゾーンレスのアプリでも Angular の変更検知を実行するため、(minerva-change) から signal やフィールドを更新するだけで十分です。zone.js を使う場合、要素が内部で使うタイマーやオブザーバー（アニメーション、ポップアップの位置計算）もパッチされるため、追加の変更検知が走ることがありますが、特別な対応は不要です。ゾーンレスのアプリでは、addEventListener で自分で追加したリスナーから signal を更新して、ビューが再描画されるようにしてください。

### サーバーサイドレンダリング

Angular SSR では main.ts はブラウザでのみ実行されるため、要素はクライアントで登録されます。サーバーでも実行されるコード（共有コンポーネント、main.server.ts）からパッケージをインポートしても安全です。モジュールは読み込み時に DOM に触れず、登録は冪等です。サーバーはタグを属性と light DOM のコンテンツ付きの HTML として描画し、ブラウザがそれらをアップグレードします。

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
