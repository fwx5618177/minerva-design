# Surface 3D

Des surfaces z = f(x, y) sur une grille régulière : éclairage, palettes intégrées (viridis, plasma, terrain…), maillage, lignes de niveau projetées sur le sol et transparence. Glisser pour tourner, Ctrl / ⌘ + molette pour zoomer.

Package: minerva-design@1.21.0

Renderer: native

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

sinc

Peaks

Selle

Fonction

Surface 3D de la fonction {{name}}

x

y

z

Île

{{value}} km

{{value}} m

Est

Nord

Altitude

Relief d'une île de 20 km de large

Volatilité implicite

{{value}} %

Prix d'exercice (% du spot)

Jours avant échéance

{{value}} j

Surface de volatilité implicite selon le prix d'exercice et l'échéance

Faces

Maillage

Lignes de niveau au sol

Lignes de niveau sur la surface

Surface peaks avec maillage et lignes de niveau

Bol

Plan incliné

Un bol transparent traversé par un plan incliné transparent

Onde

Animer

Amplitude

Ondulations animées partant du centre

Plaque

Réinitialiser

cm

Température

Température d'une plaque métallique chauffée par des sources ponctuelles

Sources de chaleur : {{sources}} · point le plus chaud {{max}} · moyenne {{mean}}. Cliquez sur la plaque pour ajouter ou retirer une source.

Taux des obligations d'État

Échéance

Mois

Taux

Taux des obligations d'État par échéance sur 24 mois

Taux à {{maturity}} en {{date}} : {{yield}}.

Survolez la surface pour lire un taux.

En {{date}}, la courbe est inversée (10 ans − 2 ans : {{spread}}).

En {{date}}, la courbe est croissante (10 ans − 2 ans : {{spread}}).

Perte

({{x}} ; {{y}})

Échelle de couleurs

Viridis

Plasma

Magma

Cividis

Turbo

Poids 1

Poids 2

log₁₀(1 + perte)

Paysage de perte de la fonction de Himmelblau à quatre minima

Depuis {{start}} (perte {{loss}}), la descente de gradient atteint le minimum {{n}} en {{minimum}} après {{steps}} pas.

Cliquez sur la surface pour y lancer une descente de gradient.

{{value}} dBm

Signal

Points d'accès

Accueil

Open space

Salles de réunion

Cuisine

Vue 3D

Vue de dessus

Mètres

Puissance du signal Wi-Fi sur un plateau de bureaux

{{good}} du plateau reçoit {{goodLevel}} ou mieux (visioconférence), {{usable}} reçoit {{usableLevel}} ou mieux.

Tous les points d'accès sont coupés : aucune couverture.

## Surface3DChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
