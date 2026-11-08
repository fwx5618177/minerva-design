# コードダイアグラム

円周上に並べたグループ間のフローを表します。各グループはフローの量に応じた長さの弧、各フローは 2 つの弧を結ぶリボンです。無向の場合、リボンはグループの組を結び、幅は両方向のフローの合計です（対称行列では各関係を 1 回だけ数えます）。そのため流入だけのグループにも弧があります。有向の場合は方向ごとに矢印付きのリボンを描きます。グループにホバーするとそのリボンを強調し、リボンにホバーすると双方向の値を表示します。凡例でグループを表示 / 非表示にでき、矢印キーでグループ、続いてリボンを順に移動します。

Package: minerva-design@1.23.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

デザイン

開発

プロダクト

マーケティング

4 つのチームが 1 週間にやり取りしたメッセージ数

北米

中南米

ヨーロッパ

アフリカ

西アジア

南アジア

東アジア

オセアニア

{{value}} 百万人

5 年間の世界の地域間の人口移動

app

router

store

ui-kit

api-client

auth

i18n

utils

コードベースのモジュール間の import

アメリカ

中国

EU

メキシコ

カナダ

日本

韓国

主要経済圏の 1 年間の財貿易

ホーム

検索

カテゴリ

商品

カート

購入手続き

{{value}} 千回

ページまたはリボンにホバーしてください

{{source}} → {{target}}：{{value}}（逆方向：{{reverse}}）

{{name}}：流入と流出の合計 {{value}}

ショッピングアプリの 1 日のページ間遷移

米国東部

米国西部

欧州中部

アジア太平洋（南東）

アジア太平洋（北東）

南米

{{value}} Gbit/s

データセンター間のレプリケーション通信量

ラベル

自動

接線方向

半径方向

なし

グループの順序

データ順

大きい順

小さい順

リボンの色

グラデーション

ソース

ターゲット

ニュートラル

有向

目盛り

その他の事業者

年

{{year}} 年

{{name}} {{value}}

最も多く契約者を獲得したのは {{name}} です（純増 {{value}}）。純増減：{{list}}。

{{year}} 年の携帯電話事業者間の契約者の移動

物理学

化学

生物学

医学

情報科学

数学

経済学

工学

学部をクリックすると共同研究に注目し、リボンをクリックするとその組み合わせを表示します

{{name}}：共著論文 {{total}} 本、主な共同研究先は {{partners}}

{{name}}（{{value}}）

{{a}}と{{b}}：共著論文 {{value}} 本

クリア

大学の学部間で 5 年間に共著された論文

コーヒー

牛乳

パン

菓子パン

果物

シリアル

ヨーグルト

ジュース

{{a}} + {{b}}

{{value}} 件のバスケットで同時購入（全バスケットの {{share}}）

他カテゴリとの組み合わせ {{value}} 件

1 か月間に同じ買い物かごで一緒に購入された商品カテゴリ

ゲートウェイ

ユーザー

注文

在庫

決済

通知

{{value}} 回/秒

合計：{{total}}。最多：{{from}} → {{to}}（{{value}}）

一時停止

再開

マイクロサービス間の秒間呼び出し数のライブ表示

ロンドン

パリ

フランクフルト

イスタンブール

ドバイ

シンガポール

東京

ニューヨーク

{{value}} 百万人

すべてのハブを表示

東側のハブ

西側のハブ

路線を表示するには 2 つ以上のハブを表示してください

{{total}} ハブ中 {{shown}} を表示：{{routes}} 路線、年間 {{passengers}}

主要空港ハブ間の年間旅客数

## ChordChart

Support: beta

Native Angular: MnChordChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnChordChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"auto\" | \"none\" | \"ascending\" | \"descending\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ticks",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Messages between teams

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart [groups]="teams[language()]" [matrix]="matrix" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teams = {
  "en": ["Design", "Engineering", "Product", "Marketing"],
  "zh": ["设计", "研发", "产品", "市场"],
  "ja": ["デザイン", "エンジニアリング", "プロダクト", "マーケティング"],
  "fr": ["Design", "Ingénierie", "Produit", "Marketing"]
};
  matrix = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0]
];
}

```

## Example: 地域間の人口移動

各地域の弧は転出者と転入者の合計、リボンの幅は 2 地域間の双方向の移住者数で、ツールチップに方向ごとの値（値・逆方向）を表示します。対角成分（地域内の移動）はループとして描かれます。groups で色、format で単位を設定し、padAngle で隙間を広げています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, signal, computed } from '@angular/core';
import { MnChordChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnChordChart],
  template: `
<mn-chord-chart
  [groups]="text[language()].regions"
  [links]="links"
  directed
  ribbonColor="source"
  (hover)="hovered.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = signal<import('minerva-design/charts/core').ShapeHoverEvent | null>(null);
  text = {
  "en": {
    "regions": ["North", "South", "East", "West", "Center"],
    "hint": "Hover a ribbon to compare both directions",
    "flow": "{source} → {target}: {value}k · back: {reverse}k",
    "group": "{name}: {value}k"
  },
  "zh": {
    "regions": ["北部", "南部", "东部", "西部", "中部"],
    "hint": "悬停在流带上以比较两个方向",
    "flow": "{source} → {target}：{value} 千人 · 反向：{reverse} 千人",
    "group": "{name}：{value} 千人"
  },
  "ja": {
    "regions": ["北部", "南部", "東部", "西部", "中部"],
    "hint": "リボンにカーソルを合わせると両方向を比較できます",
    "flow": "{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人",
    "group": "{name}: {value} 千人"
  },
  "fr": {
    "regions": ["Nord", "Sud", "Est", "Ouest", "Centre"],
    "hint": "Survolez un ruban pour comparer les deux sens",
    "flow": "{source} → {target} : {value} k · retour : {reverse} k",
    "group": "{name} : {value} k"
  }
};
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 32
  },
  {
    "source": 1,
    "target": 0,
    "value": 18
  },
  {
    "source": 0,
    "target": 4,
    "value": 45
  },
  {
    "source": 4,
    "target": 0,
    "value": 22
  },
  {
    "source": 1,
    "target": 4,
    "value": 38
  },
  {
    "source": 4,
    "target": 1,
    "value": 30
  },
  {
    "source": 2,
    "target": 4,
    "value": 51
  },
  {
    "source": 4,
    "target": 2,
    "value": 26
  },
  {
    "source": 3,
    "target": 4,
    "value": 29
  },
  {
    "source": 4,
    "target": 3,
    "value": 35
  },
  {
    "source": 2,
    "target": 3,
    "value": 14
  },
  {
    "source": 3,
    "target": 2,
    "value": 21
  },
  {
    "source": 1,
    "target": 2,
    "value": 12
  },
  {
    "source": 2,
    "target": 1,
    "value": 9
  }
];
  status = computed(() => {
    const t = this.text[this.language()];
    const hovered = this.hovered();
    if (!hovered) return t.hint;
    if (hovered.source === undefined)
      return t.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    return t.flow
      .replace("{source}", hovered.source)
      .replace("{target}", hovered.target ?? "")
      .replace("{value}", String(hovered.value))
      .replace("{reverse}", String(hovered.reverseValue ?? 0));
  });
}

```
