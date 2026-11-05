# Graphique à bulles

Des nuages de points avec une troisième valeur dessinée par la taille des points : l'aire d'une bulle est proportionnelle à sa valeur.

Package: minerva-design@1.21.0

Renderer: angular

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

Asie

Europe

Amériques

Afrique

Population

PIB par habitant

Espérance de vie (ans)

PIB par habitant, espérance de vie et population des pays

Produits

Chiffre d'affaires

Stockage cloud

Analytique

SDK mobile

Paiements

Application de bureau

Matériel

Conseil

Part de marché relative

Croissance du marché

Leader

Forte croissance

Part de marché, croissance et chiffre d'affaires des produits

Qualifiée

Proposition

Négociation

Montant

Affaire n° {{id}}

Jours dans le pipeline

Probabilité de gain

{{deal}} ({{stage}}) : {{amount}}

Cliquez sur une bulle

Affaires en cours par ancienneté, probabilité de gain et montant

PIB par habitant (échelle log)

Revenu élevé

Espérance de vie selon le PIB par habitant en échelle log, taille selon la population

Revenus visibles : {{from}} – {{to}}

Zoomez pour voir la plage visible en dollars

Infrastructure

Sécurité

Équipe

Budget

Exposition

Coupure de courant

Retard de livraison du matériel

Bascule réseau

Fuite de données

Retard de revue des accès

Départ d'une personne clé

Manque de compétences du prestataire

Formation insuffisante

Hausse du coût des licences

Taux de change

Acceptable

Critique

Probabilité {{likelihood}} × impact {{impact}} = {{score}}

Exposition : {{value}}

Probabilité

Impact

Risques du projet selon la probabilité, l'impact et l'exposition financière

Recherche

Réseaux sociaux

Vidéo

E-mail

Budget

Lancée le {{date}}

Date de lancement

Retour sur dépenses publicitaires

Seuil de rentabilité

Campagnes marketing selon la date de lancement, le retour sur dépenses publicitaires et le budget

Nord

Sud

Est

Ouest

Centre

Même échelle de taille dans les deux graphiques

Les deux graphiques dessinent {{value}} avec la plus grande bulle.

Chaque graphique dessine son propre chiffre d'affaires maximal avec la plus grande bulle.

Ventes au m²

Marge

Ventes au mètre carré, marge et chiffre d'affaires des régions de magasins en {{year}}

Lecture

Pause

Rejouer

Recommencer

Année : {{year}}

Fécondité (enfants par femme)

Fécondité, espérance de vie et population des pays de 1990 à 2025

## BubbleChart

Support: beta

Native Angular: MnBubbleChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBubbleChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "minSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Pays

Le PIB par habitant face à l'espérance de vie, les bulles dimensionnées par la population et colorées par continent ; valueName et format nomment et formatent la valeur dans l'infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[{ name: t.life, showLabels: true, data: [
    { x: 34, y: 84.5, value: 124, label: t.names[0] },
    { x: 44, y: 82.5, value: 68, label: t.names[1] },
    { x: 12.6, y: 78.6, value: 1410, label: t.names[2] },
    { x: 9, y: 75.9, value: 216, label: t.names[3] },
    { x: 2.5, y: 70.8, value: 1430, label: t.names[4] },
    { x: 2.2, y: 53.6, value: 224, label: t.names[5] },
    { x: 52, y: 81.2, value: 84, label: t.names[6] },
    { x: 11.5, y: 75, value: 128, label: t.names[7] }
  ] }]"
  [xAxis]="{ title: t.gdp }"
  [yAxis]="{ title: t.life, min: 50 }"
  [maxSize]="64"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "gdp": "GDP per capita (k$)",
    "life": "Life expectancy",
    "names": ["Japan", "France", "China", "Brazil", "India", "Nigeria", "Germany", "Mexico"]
  },
  "zh": {
    "gdp": "人均 GDP（千美元）",
    "life": "预期寿命",
    "names": ["日本", "法国", "中国", "巴西", "印度", "尼日利亚", "德国", "墨西哥"]
  },
  "ja": {
    "gdp": "1 人あたり GDP（千ドル）",
    "life": "平均寿命",
    "names": ["日本", "フランス", "中国", "ブラジル", "インド", "ナイジェリア", "ドイツ", "メキシコ"]
  },
  "fr": {
    "gdp": "PIB par habitant (k$)",
    "life": "Espérance de vie",
    "names": ["Japon", "France", "Chine", "Brésil", "Inde", "Nigeria", "Allemagne", "Mexique"]
  }
};
}

```

## Example: Portefeuille de produits

Part de marché, croissance du marché et chiffre d'affaires des produits, en quatre quadrants séparés par deux lignes de référence ; showLabels écrit les noms autour des bulles.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[
    { name: t.assets[0], data: [{ x: 4, y: 3, value: 30 }] },
    { name: t.assets[1], data: [{ x: 15, y: 7, value: 25 }] },
    { name: t.assets[2], data: [{ x: 12, y: 6, value: 20 }] },
    { name: t.assets[3], data: [{ x: 28, y: 12, value: 15 }] },
    { name: t.assets[4], data: [{ x: 16, y: 4, value: 5 }] },
    { name: t.assets[5], data: [{ x: 45, y: 18, value: 5 }] }
  ]"
  [xAxis]="{ title: t.risk }"
  [yAxis]="{ title: t.return }"
  [height]="300"
  (pointClick)="selected = $event.items[0] ? $event.items[0].seriesName + ': ' + $event.items[0].value + ' %' : selected"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "risk": "Risk (volatility %)",
    "return": "Expected return %",
    "hint": "Click a bubble",
    "assets": ["Bonds", "Index fund", "Real estate", "Tech stocks", "Gold", "Start-ups"]
  },
  "zh": {
    "risk": "风险（波动率 %）",
    "return": "预期收益 %",
    "hint": "点击一个气泡",
    "assets": ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"]
  },
  "ja": {
    "risk": "リスク（ボラティリティ %）",
    "return": "期待リターン %",
    "hint": "バブルをクリックします",
    "assets": ["債券", "インデックスファンド", "不動産", "ハイテク株", "金", "スタートアップ"]
  },
  "fr": {
    "risk": "Risque (volatilité %)",
    "return": "Rendement attendu %",
    "hint": "Cliquez sur une bulle",
    "assets": ["Obligations", "Fonds indiciel", "Immobilier", "Actions tech", "Or", "Start-up"]
  }
};
}

```
