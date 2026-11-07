# Nuage de points

Points placés selon deux valeurs, avec taille, couleur et libellé par point. Zoom sur les deux axes.

Package: minerva-design@1.22.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Essentiel

Entreprise

Postes

Facture mensuelle

Facture mensuelle selon le nombre de postes, par offre

Pays

PIB par habitant

Espérance de vie

Espérance de vie selon le PIB par habitant ; la taille du point est la population

Groupe {{name}}

Deux groupes de 100 000 points chacun

{{points}} points · dessinés avec {{renderer}}

Durée de session selon le nombre de pages vues

Minutes

Pages

Gratuit

Pro

{{plan}} : {{minutes}} min, {{pages}} pages

Touchez un point

Campagnes

Tendance

Dépense publicitaire par semaine

Chiffre d'affaires par semaine

R² = {{r2}} · +{{slope}} de chiffre d'affaires par dollar dépensé

Chiffre d'affaires selon la dépense publicitaire de 60 campagnes, avec une droite de tendance

Manchot Adélie

Manchot à jugulaire

Manchot papou

Longueur de nageoire

Masse corporelle

Longueur de nageoire et masse corporelle de trois espèces de manchots

Requêtes

Valeur aberrante

Attendu

Taille de la charge

Temps de réponse

Temps de réponse selon la taille de la charge, valeurs aberrantes en rouge

{{slow}} requêtes sur {{total}} ont pris plus de deux fois le temps attendu.

Mesures

Nuits fraîches

Plage de culture

Après-midi chauds

Tout afficher

Température

Humidité relative

Plage de culture

Mesures de température et d'humidité des capteurs de la serre

Visible : {{t0}} – {{t1}}, humidité {{h0}} – {{h1}} · mesures affichées : {{points}}

Choisissez une région, ou zoomez avec Ctrl / ⌘ + molette

Ingénierie

Ventes

Support

Ancienneté

Note d'évaluation (1–5)

Moyenne de l'entreprise

Ancienneté et note d'évaluation de 90 employés, par service

{{id}} · {{department}} · {{tenure}} · note {{score}} · {{salary}} par an

Cliquez sur un point pour sélectionner un employé, sur la zone vide pour effacer la sélection

Joueurs

Moyenne de la ligue

Marqueurs efficaces

Gros volumes de tirs

{{value}} points par match

Taux d'utilisation : {{value}}

True shooting : {{value}}

Taux d'utilisation

True shooting (adresse réelle)

Taux d'utilisation et adresse au tir de 16 joueurs ; la taille du point est le nombre de points par match

Normal

Alarme

Dernier

{{value}} mm/s

Pause

Reprendre

Dernier échantillon : {{rpm}} tr/min, {{value}} · alarmes à l'écran : {{alarms}}

Vitesse (tr/min)

Vibration

Seuil d'alarme

Vibration en direct d'un moteur selon sa vitesse

Mammifères

Musaraigne

Souris

Rat

Lapin

Chat

Chien

Humain

Porc

Cheval

Vache

Girafe

Éléphant

Loi de puissance ajustée

{{value}} kg

{{value}} W

Masse corporelle

Métabolisme de base

Métabolisme ∝ masse^{{exponent}} (loi de Kleiber)

Métabolisme de base selon la masse corporelle de 12 mammifères, sur axes log-log

## ScatterChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ScatterChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
