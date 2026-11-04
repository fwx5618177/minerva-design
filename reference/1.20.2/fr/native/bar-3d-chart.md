# Histogramme 3D

Des barres sur une grille de catégories x × y : volumes éclairés, couleurs par série, empilement entre séries, couleurs d'une échelle selon la hauteur ou une autre valeur, légende et barre de couleurs.

Package: minerva-design@1.20.2

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
