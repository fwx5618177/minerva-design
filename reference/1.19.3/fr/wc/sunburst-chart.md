# Diagramme en rayons de soleil

Une hiérarchie dessinée en anneaux concentriques : chaque anneau est un niveau, chaque secteur une part de son parent. Cliquez sur un parent (ou appuyez sur Entrée) pour zoomer, sur le centre (ou Retour arrière) pour remonter ; la transition anime les angles et les anneaux. Survoler un secteur met en avant ses ancêtres et ses descendants, et les étiquettes suivent l'arc ou le rayon, selon la place.

Package: minerva-design@1.19.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sunburst-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "innerRadius",
    "typeText": "number",
    "attribute": "inner-radius",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
    "attribute": "labels",
    "required": false
  },
  {
    "name": "noDrill",
    "typeText": "boolean",
    "attribute": "no-drill",
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
    "typeText": "readonly TreemapNode[] | undefined",
    "required": false
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<SunburstChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-drill",
    "typeText": "CustomEvent",
    "description": "A parent or the center was clicked (or `drill()` called); detail: { path }"
  },
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

## Example: Occupation du disque

Les dossiers au centre, leur contenu autour ; cliquez sur un dossier pour zoomer, au centre pour remonter.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/wc/disk-usage.html

```html
<minerva-sunburst-chart id="disk"></minerva-sunburst-chart>

```

### apps/docs/src/docs/pages/sunburst-chart/wc/disk-usage.ts

```tsx
// Disk usage as rings: folders inside, their content outside; click a
// folder to zoom into it, the center to go back up.
import type { MinervaSunburstChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    folders: ["Documents", "Photos", "Music", "Apps"],
    files: [
      "Work",
      "Taxes",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Tools",
      "Games",
    ],
  },
  zh: {
    folders: ["文档", "照片", "音乐", "应用"],
    files: ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"],
  },
  ja: {
    folders: ["書類", "写真", "ミュージック", "アプリ"],
    files: [
      "仕事",
      "税金",
      "2025",
      "2026",
      "アルバム",
      "ポッドキャスト",
      "ツール",
      "ゲーム",
    ],
  },
  fr: {
    folders: ["Documents", "Photos", "Musique", "Applications"],
    files: [
      "Travail",
      "Impôts",
      "2025",
      "2026",
      "Albums",
      "Podcasts",
      "Outils",
      "Jeux",
    ],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#disk")!;
  chart.data = [
    {
      name: text.folders[0],
      children: [
        { name: text.files[0], value: 12 },
        { name: text.files[1], value: 3 },
      ],
    },
    {
      name: text.folders[1],
      children: [
        { name: text.files[2], value: 46 },
        { name: text.files[3], value: 21 },
      ],
    },
    {
      name: text.folders[2],
      children: [
        { name: text.files[4], value: 18 },
        { name: text.files[5], value: 7 },
      ],
    },
    {
      name: text.folders[3],
      children: [
        { name: text.files[6], value: 9 },
        { name: text.files[7], value: 32 },
      ],
    },
  ];
  chart.options = { format: (value) => `${value} GB` };
}

```

## Example: Fil d’Ariane de l’exploration

L’évènement drill donne le chemin de la racine au nœud ciblé : un fil d’Ariane hors du graphique.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/wc/drill-down.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sunburst-chart id="org" inner-radius="0.32"></minerva-sunburst-chart>
  <output id="path" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sunburst-chart/wc/drill-down.ts

```tsx
// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.
import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaSunburstChart>("#org")!;
  const path = root.querySelector<HTMLOutputElement>("#path")!;
  chart.data = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  path.textContent = `${text.root} · ${text.hint}`;
  const onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    path.textContent = [text.root, ...names].join(" › ");
  };
  chart.addEventListener("minerva-drill", onDrill);
  return () => chart.removeEventListener("minerva-drill", onDrill);
}

```
