# Histogramme 3D

Des barres sur une grille de catégories x × y : volumes éclairés, couleurs par série, empilement entre séries, couleurs d'une échelle selon la hauteur ou une autre valeur, légende et barre de couleurs.

Package: minerva-design@1.21.1

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Ventes

Région

Mois

Nord

Sud

Est

Ouest

Centre

Ventes mensuelles de cinq régions

Trimestre

T1

T2

T3

T4

Marché

Amériques

Europe

Asie

Océanie

Matériel

Logiciels

Services

Chiffre d'affaires

Chiffre d'affaires trimestriel de trois gammes dans quatre marchés, empilé

Femmes

Hommes

Âge

{{from}}–{{to}} ans

{{from}} ans et +

Année du recensement

Population

{{value}} M

Population par tranche d'âge et par sexe lors de quatre recensements

Visites

Heure

Jour

Visites d'un site par heure de la semaine

Produit

Portables

Téléphones

Tablettes

Montres

Audio

Marge

Chiffre d'affaires et marge de cinq produits dans quatre marchés

En stock

Stock bas

{{value}} unités

Mises à jour en direct

Allée

Allée {{id}}

Niveau d'étagère

Niveau {{n}}

Unités

Unités restant dans chaque emplacement de l'entrepôt par allée et niveau, mises à jour en direct

{{total}} unités en stock · emplacements bas : {{low}} sur {{bins}} · emplacements réapprovisionnés : {{restocked}}.

Rétention

Mois depuis l'inscription

M{{n}}

Mois d'inscription

Rétention des cohortes mensuelles d'inscrits selon le nombre de mois depuis l'inscription

Cohorte de {{cohort}}, mois {{n}} : {{retention}} encore actifs ({{users}} utilisateurs sur {{total}}).

Cliquez sur une barre pour lire la rétention d'une cohorte.

Ingénierie

Ventes

Marketing

Opérations

Support

Finance

Dépense réelle

Exercice

Écart au budget

Service

Dépenses trimestrielles et écarts au budget de six services en {{year}}

{{department}}, {{quarter}} : {{actual}} dépensés pour un budget de {{budget}} ({{variance}}).

{{year}} : {{actual}} dépensés pour un budget de {{budget}} ({{variance}}). Plus fort dépassement : {{department}}, {{quarter}} ({{worst}}).

{{value}} kW

Température d'entrée d'air

Thème sombre

Vue 3D

Plan

Baie

Rangée

Rangée {{id}}

Puissance consommée

Baies de serveurs par rangée et position, la hauteur étant la puissance consommée et la couleur la température d'entrée d'air

Baie {{rack}} : {{power}}, entrée d'air à {{inlet}}, au-dessus de la limite de {{limit}}.

Baie {{rack}} : {{power}}, entrée d'air à {{inlet}}, sous la limite de {{limit}}.

Baies au-dessus de {{limit}} en entrée d'air : {{hot}} sur {{total}} ({{racks}}). Cliquez sur une baie pour voir ses mesures.

## Bar3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
