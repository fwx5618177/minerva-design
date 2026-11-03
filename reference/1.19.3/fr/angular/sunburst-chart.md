# Diagramme en rayons de soleil

Une hiérarchie dessinée en anneaux concentriques : chaque anneau est un niveau, chaque secteur une part de son parent. Cliquez sur un parent (ou appuyez sur Entrée) pour zoomer, sur le centre (ou Retour arrière) pour remonter ; la transition anime les angles et les anneaux. Survoler un secteur met en avant ses ancêtres et ses descendants, et les étiquettes suivent l'arc ou le rayon, selon la place.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

Applications

Documents

Projets

Archives

PDF

Tableurs

Photos

Développement

Caches de paquets

Simulateurs

Système

Musique

Autres applications

{{value}} Go

Espace disque par dossier, en gigaoctets

Affichage de {{path}}. Cliquez sur le centre pour remonter.

Cliquez sur un dossier pour zoomer dessus.

Ingénierie

Plateforme

Infrastructure

Sécurité

Outils développeurs

Ingénierie produit

Web

Mobile

Paiements

Données

Analyse

Apprentissage automatique

Ventes

EMEA

Amériques

APAC

Succès client

Support

Intégration

Marketing

Marque

Croissance

Contenu

Opérations

Finance

RH

Juridique

Informatique

{{value}} personnes

Effectifs par département, groupe et équipe

Tous les produits

Électronique

Téléphones

Haut de gamme

Milieu de gamme

Accessoires

Ordinateurs portables

Audio

Casques

Enceintes

Maison

Cuisine

Mobilier

Décoration

Mode

Homme

Femme

Enfant

Sport

Plein air

Fitness

Chemin de la catégorie

Chiffre d'affaires trimestriel par catégorie de produits

Asie

Afrique

Europe

Amériques

Océanie

Autres pays

{{value}} M

Mode des étiquettes

Auto

Le long de l'arc

Le long du rayon

Aucune

Population mondiale par continent et par pays, en millions

Éducation

Santé

Transports

Sécurité publique

Environnement

Administration

Écoles

Universités

Bibliothèques

Hôpitaux

Prévention

Transports en commun

Voirie

Pistes cyclables

Police

Pompiers

Parcs

Collecte des déchets

Eau

{{path}} : {{amount}}, soit {{share}} du budget et {{areaShare}} du domaine {{area}}.

{{path}} : {{amount}}, soit {{share}} du budget.

Budget annuel de la ville par domaine et par programme

Budget annuel : {{total}}. Cliquez sur un secteur pour lire sa part.

Chaîne de boulangeries

Cabinet dentaire

École de langues

Interne

Site web

Identité visuelle

Système de réservation

Application mobile

Administration

Formation

Design

Développement

Réunions

Relecture

Support

Apprentissage

Période

Cette semaine

Ce mois-ci

{{hours}} · {{share}} du temps saisi

Heures saisies par client, projet et activité ({{period}})

Facturable : {{billable}} sur {{total}} ({{share}}).

Paiement

Recherche

Comptes

Catalogue

Panier

Règlement

Livraison

Requêtes

Suggestions

Connexion

Profil

Fiches produit

Avis

{{value}} req./min

Requêtes d’API par minute, par service et par endpoint, mises à jour en direct

Pause

Reprendre

Total : {{value}}

Service le plus sollicité : {{service}}

Renouvelables

Nucléaire

Fossiles

Éolien

Solaire

Hydraulique

Biomasse

Gaz naturel

Charbon

Pétrole

{{value}} TWh

Masquer les énergies fossiles

Production annuelle d’électricité par source et par combustible

Renouvelables masquées : {{total}} affichés.

Renouvelables : {{share}} des {{total}} affichés.

## SunburstChart

Support: beta

Native Angular: MnSunburstChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSunburstChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillDown",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

### events

```json
[
  {
    "name": "drillChange",
    "typeText": "ShapeDrillEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Espace disque

Dossiers et applications d'un ordinateur portable, en Go. Cliquez sur un dossier pour zoomer et sur le centre pour remonter ; onDrill renvoie le chemin affiché, indiqué sous le graphique.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.folders[0], children: [{ name: t.files[0], value: 12 }, { name: t.files[1], value: 3 }] },
    { name: t.folders[1], children: [{ name: t.files[2], value: 46 }, { name: t.files[3], value: 21 }] },
    { name: t.folders[2], children: [{ name: t.files[4], value: 18 }, { name: t.files[5], value: 7 }] },
    { name: t.folders[3], children: [{ name: t.files[6], value: 9 }, { name: t.files[7], value: 32 }] }
  ]"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "folders": ["Documents", "Photos", "Music", "Apps"],
    "files": ["Work", "Taxes", "2025", "2026", "Albums", "Podcasts", "Tools", "Games"]
  },
  "zh": {
    "folders": ["文档", "照片", "音乐", "应用"],
    "files": ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"]
  },
  "ja": {
    "folders": ["書類", "写真", "ミュージック", "アプリ"],
    "files": ["仕事", "税金", "2025", "2026", "アルバム", "ポッドキャスト", "ツール", "ゲーム"]
  },
  "fr": {
    "folders": ["Documents", "Photos", "Musique", "Applications"],
    "files": ["Travail", "Impôts", "2025", "2026", "Albums", "Podcasts", "Outils", "Jeux"]
  }
};
}

```

## Example: Exploration contrôlée avec fil d'Ariane

drillPath rend le focus contrôlé : les clics appellent seulement onDrill et le fil d'Ariane possède le chemin, ses boutons peuvent donc sauter à n'importe quel niveau. cornerRadius et padAngle arrondissent et séparent les secteurs.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.teams[0], children: [{ name: t.groups[0], value: 18 }, { name: t.groups[1], value: 11 }, { name: t.groups[2], value: 14 }] },
    { name: t.teams[1], children: [{ name: t.groups[3], value: 16 }, { name: t.groups[4], value: 12 }] },
    { name: t.teams[2], children: [{ name: t.groups[5], value: 20 }, { name: t.groups[6], value: 8 }] }
  ]"
  [innerRadius]="0.32"
  (drillChange)="path = $event.path"
/>
<output aria-live="polite">{{ t.root }}@for (name of path; track $index) { › {{ name }} }</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path: string[] = [];
  labels = {
  "en": {
    "root": "Company",
    "teams": ["Engineering", "Sales", "Support"],
    "groups": ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    "hint": "Click a team"
  },
  "zh": {
    "root": "公司",
    "teams": ["研发", "销售", "客服"],
    "groups": ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    "hint": "点击一个团队"
  },
  "ja": {
    "root": "会社",
    "teams": ["エンジニアリング", "営業", "サポート"],
    "groups": ["Web", "モバイル", "プラットフォーム", "ヨーロッパ", "アジア", "一次対応", "二次対応"],
    "hint": "チームをクリックします"
  },
  "fr": {
    "root": "Entreprise",
    "teams": ["Ingénierie", "Ventes", "Support"],
    "groups": ["Web", "Mobile", "Plateforme", "Europe", "Asie", "Niveau 1", "Niveau 2"],
    "hint": "Cliquez sur une équipe"
  }
};
}

```
