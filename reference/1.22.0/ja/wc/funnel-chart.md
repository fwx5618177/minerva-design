# ファネルチャート

途中で数が減っていくプロセスの各段階（登録、営業パイプライン、購入手続き）を、段階ごとのコンバージョン率とともに示します。ホバーまたは矢印キーでステージをハイライトし、凡例の項目をクリックすると非表示にできます。

Package: minerva-design@1.22.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

料金ページ

登録開始

メール確認

プロジェクト作成

メンバー招待

有料プランへ移行

{{users}} 人

訪問者の {{share}}

「{{stage}}」から {{users}} 人が離脱

登録ファネル

アラート

ダッシュボード

連携

レポート

公開 API

並び順

降順

昇順

データの順

週 {{users}} 人

機能別の週間アクティブユーザー

訪問

商品ページ

カート追加

購入手続き

支払い

注文完了

段階

訪問者

離脱率

最初の段階の {{share}}

ネットショップの購入ファネル

段階間の離脱率

応募

書類選考

技術面接

最終面接

内定

入社

{{candidates}} 人

この段階の標準的な所要時間：{{days}}

エンジニア職の採用パイプライン

{{stage}}：{{candidates}} 人（応募者の {{share}}）

応募者の {{rate}} が採用され、平均 {{days}} かかります

デスクトップ

モバイル

コンバージョン率 {{rate}}

{{device}}の購入ファネル

インプレッション

クリック

リード

有望リード

顧客

すべてのチャネル

検索広告

ソーシャルメディア

メール

パートナー

チャネル

前ステージの {{share}}

成果あたりのコスト：{{cost}}

今月のマーケティングファネル：{{channel}}

費用：{{spend}} · 顧客：{{customers}} · 獲得コスト：1 顧客あたり {{cac}}

訪問

カート追加

購入手続き

支払い済み注文

転換率から計算した月間の購入ファネル

{{from}} → {{to}}

{{step}} の転換率を下げる

{{step}} の転換率を上げる

現在の転換率に戻す

月 {{orders}} 件の注文（{{ordersDelta}}）· 売上 {{revenue}}（{{revenueDelta}}）

訪問者

商品を閲覧

カート追加

購入手続き

注文

ライブ更新されるタイムセールのファネル

一時停止

再開

最初から

{{time}} · 注文 {{orders}} 件 · 訪問者の {{rate}}

セールは終了しました：注文 {{orders}} 件。

リード

見込み確定

デモ

提案

交渉

{{deals}} 件 · {{amount}}

受注確率：{{share}}

パイプラインのステージ別オープン案件の金額

{{stage}}：オープン案件 {{deals}} 件

加重予測：{{amount}}

ステージをクリックすると案件を一覧表示します。

## FunnelChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/funnel-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "sort",
    "typeText": "\"descending\" | \"ascending\" | \"none\"",
    "attribute": "sort",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"trapezoid\" | \"bar\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "hideConversion",
    "typeText": "boolean",
    "attribute": "hide-conversion",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<FunnelChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 並べ替えた棒

台形の代わりに中央揃えの棒を使い、段階を値で並べ替えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/bars.html

```html
<minerva-funnel-chart
  id="hiring"
  shape="bar"
  sort="descending"
  height="300"
></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/bars.ts

```tsx
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#hiring")!;
  chart.data = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```

## Example: コンバージョンファネル

各段階は次の段階へ向かって狭まり、前の段階からのコンバージョン率を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.html

```html
<minerva-funnel-chart id="signup" height="300"></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.ts

```tsx
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#signup")!;
  chart.data = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```
