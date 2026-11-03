# Diagramme de Sankey

Des flux entre étapes : bilans énergétiques, parcours utilisateurs, répartitions budgétaires. Les nœuds sont rangés en colonnes, l'épaisseur d'un lien est proportionnelle à son flux, et l'ordre des nœuds est relaxé pour redresser les flux et limiter les croisements. Survolez un nœud pour mettre en avant tous ses flux, ou un lien pour voir sa part dans sa source ; les flèches du clavier parcourent les nœuds et les liens.

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

Solaire

Éolien

Hydraulique

Nucléaire

Gaz naturel

Charbon

Pétrole

Électricité

Réseaux de chaleur

Carburants

Résidentiel

Industrie

Tertiaire

Transports

Pertes

{{value}} TWh

Bilan énergétique : sources primaires, vecteurs et usages finaux, en térawattheures par an

Annonces

Recherche naturelle

Newsletter

Réseaux sociaux

Accueil

Page tarifs

Blog

Inscription

Départ du site

Essai démarré

Abandon

Offre payante

Essai expiré

Sessions d'une semaine, du canal d'acquisition à l'abonnement

{{source}} → {{target}} : {{value}} sessions ({{share}} % de {{source}})

{{name}} : {{value}} sessions

Cliquez sur une étape ou un chemin (ou donnez le focus au graphique et appuyez sur Entrée) pour le sélectionner

Licences

Abonnements

Services

Subventions

Budget annuel

R&D

Ventes et marketing

Opérations

Administration

Plateforme

Applications mobiles

Recherche en IA

Campagnes

Équipe commerciale

Infrastructure

Support client

Finance et juridique

Bureaux

Budget annuel : sources de revenus, départements et programmes

E-mail

Chat

Téléphone

Chatbot

Niveau 1

Niveau 2

Ingénierie

Résolu

Remboursé

Bug signalé

Tickets de support d'un mois, du canal au résultat

Alignement des nœuds

Justifié

Gauche

Droite

Centré

Couleur des liens

Dégradé

Source

Cible

Neutre

Valeurs dans les étiquettes

Cloud

Licences

Matériel

Services

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Ventes et marketing

Frais généraux

Résultat d'exploitation

Impôt sur les sociétés

Résultat net

Compte de résultat trimestriel : segments de chiffre d'affaires, coûts et marges

Marge brute {{gross}} · marge d'exploitation {{operating}} · marge nette {{net}}

Brésil

Colombie

Éthiopie

Viêt Nam

Torréfaction de Hambourg

Torréfaction de Rotterdam

Entrepôt Nord

Entrepôt Centre

Entrepôt Sud

Cafés

Supermarchés

Boutique en ligne

{{value}} t

Café expédié en un mois, des pays d'origine aux canaux de vente en passant par les torréfactions et les entrepôts

Cliquez sur un site pour suivre tout ce qui le traverse, ou sur une expédition pour la sélectionner

{{name}} : {{inbound}} reçues de {{from}} sites, {{outbound}} envoyées vers {{to}} sites

{{source}} → {{target}} : {{value}} ({{share}} des envois de {{source}})

Effacer la sélection

Cooptation

Sites d'emploi

Réseaux professionnels

Cabinets

Écoles

Candidatures

Refusés sur CV

Entretien téléphonique

Non retenus après l'appel

Entretiens

Non retenus après les entretiens

Offres

Offre déclinée

Embauchés

Afficher les abandons

Entonnoir de recrutement d'une année, de la source du candidat à l'embauche

{{applied}} candidatures, {{hired}} embauches ({{rate}}). {{interview}} des candidats appelés passent les entretiens et {{accepted}} des offres sont acceptées.

Application web

Application iOS

Application Android

API partenaires

Passerelle API

Authentification

Catalogue

Recherche

Paiement

2xx succès

4xx erreur client

5xx erreur serveur

{{value}} req/s

Total : {{total}}.

Erreurs serveur : {{rate}}

Erreurs serveur : {{rate}}, incident sur le paiement

Pause

Reprendre

Trafic d'API en direct, en requêtes par seconde, des clients vers les services et leurs codes de statut

Bouteilles et barquettes PET

Flacons PEHD

Pots et bouchons PP

Films PEBD

Autres polymères

Emballages mis sur le marché

Collectés pour recyclage

Incinérés

Mis en décharge

Rejetés dans la nature

Recyclés

Refus de tri

Nouveaux emballages

Produits de moindre qualité

{{value}} Mt

{{share}} de « {{source}} »

{{share}} de l'ensemble des emballages

Emballages plastiques d'une année en mégatonnes : polymères, filières de fin de vie et recyclage

## SankeyChart

Support: beta

Native Angular: MnSankeyChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSankeyChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "nodes",
    "typeText": "readonly SankeyNode[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "links",
    "typeText": "readonly SankeyLink[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "nodeWidth",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "nodePadding",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "align",
    "typeText": "\"right\" | \"left\" | \"center\" | \"justify\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "linkColor",
    "typeText": "\"neutral\" | \"gradient\" | \"source\" | \"target\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "linkOpacity",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Flux d'énergie

Sources primaires, vecteurs et usages finaux d'un bilan énergétique national. Chaque nœud a sa couleur et les liens passent en dégradé de la couleur de la source à celle de la cible ; format ajoute l'unité aux étiquettes et à l'infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSankeyChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSankeyChart],
  template: `
@let n = names[language()];
<mn-sankey-chart
  [nodes]="[{ name: n[0] }, { name: n[1] }, { name: n[2] }, { name: n[3] }, { name: n[4] }, { name: n[5] }, { name: n[6] }, { name: n[7] }]"
  [links]="links"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  links = [
  {
    "source": 0,
    "target": 3,
    "value": 32
  },
  {
    "source": 1,
    "target": 3,
    "value": 48
  },
  {
    "source": 2,
    "target": 3,
    "value": 70
  },
  {
    "source": 3,
    "target": 4,
    "value": 52
  },
  {
    "source": 3,
    "target": 5,
    "value": 61
  },
  {
    "source": 3,
    "target": 6,
    "value": 22
  },
  {
    "source": 3,
    "target": 7,
    "value": 15
  }
];
  names = {
  "en": ["Solar", "Wind", "Gas", "Grid", "Homes", "Industry", "Transport", "Losses"],
  "zh": ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  "ja": ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  "fr": ["Solaire", "Éolien", "Gaz", "Réseau", "Foyers", "Industrie", "Transports", "Pertes"]
};
}

```

## Example: Parcours utilisateur

D'où viennent les sessions d'une semaine et où elles s'arrêtent. align="left" garde les visiteurs qui partent à côté de la page qu'ils quittent, linkColor="source" colore chaque chemin selon son canal et onClick renvoie le nœud ou le lien cliqué (avec sa source et sa cible).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSankeyChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSankeyChart],
  template: `
@let s = steps[language()];
<mn-sankey-chart
  [nodes]="[{ name: s[0] }, { name: s[1] }, { name: s[2] }, { name: s[3] }, { name: s[4] }, { name: s[5], color: 'var(--text-secondary-color, #9ca3af)' }]"
  [links]="links"
  align="left"
  linkColor="source"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  links = [
  {
    "source": 0,
    "target": 1,
    "value": 420
  },
  {
    "source": 0,
    "target": 2,
    "value": 310
  },
  {
    "source": 0,
    "target": 5,
    "value": 270
  },
  {
    "source": 1,
    "target": 2,
    "value": 330
  },
  {
    "source": 1,
    "target": 5,
    "value": 90
  },
  {
    "source": 2,
    "target": 3,
    "value": 380
  },
  {
    "source": 2,
    "target": 5,
    "value": 260
  },
  {
    "source": 3,
    "target": 4,
    "value": 240
  },
  {
    "source": 3,
    "target": 5,
    "value": 140
  }
];
  steps = {
  "en": ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  "zh": ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  "ja": ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  "fr": ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"]
};
}

```
