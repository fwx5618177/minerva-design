# Histogramme 3D

Des barres sur une grille de catégories x × y : volumes éclairés, couleurs par série, empilement entre séries, couleurs d'une échelle selon la hauteur ou une autre valeur, légende et barre de couleurs.

Package: minerva-design@1.24.2

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.2",
  "sourceCommit": "2d9157080afa96d568e1ab5dd5ebf85bbe169957",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:35a4364a093ce8ba3112a6866b1ac14e75de4497c8a2778617ef119cb4e030b2"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.2/types.json) or getType() from minerva-design/contracts.

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

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
