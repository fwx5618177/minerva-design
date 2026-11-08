# Nuage de points 3D

Des nuages de points dans une boîte 3D orientable : des centaines de milliers à des millions de points sur le GPU, colorés par série, par point ou par une échelle de couleurs, avec survol, légende et barre de couleurs. Line3DChart trace des trajectoires 3D.

Package: minerva-design@1.23.1

Renderer: uni

Locale: fr

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

Setosa

Versicolor

Virginica

Longueur du sépale (cm)

Largeur du sépale (cm)

Longueur du pétale (cm)

Nuage de points 3D de trois espèces de fleurs selon la longueur et la largeur du sépale et la longueur du pétale

Bulbe et barre

Disque ancien

Étoiles jeunes

Régions HII

Halo

{{value}} kpc

Une galaxie spirale barrée d'un million d'étoiles : bulbe, bras spiraux d'étoiles jeunes, régions HII et bandes de poussière, disque et halo

Exposition

Exposition ×{{value}}

Capteurs

Capteur {{id}} · humidité {{humidity}} %

{{value}} °C

Longueur (m)

Largeur (m)

Hauteur (m)

Température

Température de 300 capteurs dans un entrepôt, selon leur position et leur hauteur

Brin 1

Brin 2

Paires de bases

Rotation automatique

Projection

Perspective

Orthographique

Double hélice d'ADN en rotation

Nœud torique

200 000 points autour d'un nœud torique, colorés selon la hauteur

Moteur

Auto

WebGPU

WebGL2

WebGL

Canvas2D

Démarrage…

Moteur utilisé : {{backend}}

{{requested}} n'est pas disponible ici : rendu avec {{backend}}

Trajectoire

Temps

{{value}} s

Trajectoire de l'attracteur de Lorenz, colorée selon le temps

Roulé suisse

Position sur le rouleau

Face

Côté

Dessus

Réinitialiser

Azimut {{azimuth}}°, élévation {{elevation}}°, zoom ×{{zoom}}

Glisser pour tourner, Maj + glisser pour déplacer, Ctrl / ⌘ + molette pour zoomer, double clic pour réinitialiser.

Nuage de points en roulé suisse, coloré selon la position sur le rouleau

Sport

Politique

Technologie

Santé

Finance

Voyage

Article {{topic}} n° {{n}}

Plus proches voisins

Composante {{n}} ({{variance}})

Plongements d'articles de presse sur leurs trois premières composantes principales, par thème

Les plus proches de « {{doc}} » : {{list}}.

{{doc}} ({{distance}})

Cliquez sur un article pour trouver ses plus proches voisins.

Retours lidar

Couleur selon

Hauteur

Intensité

Thème sombre

Nuage de points lidar d'une rue avec bâtiments, arbres et voitures garées

{{points}} points. Survolez le nuage pour lire un retour.

Hauteur {{height}}, intensité {{intensity}}.

{{shell}} {{n}}

Haut débit (LEO)

Observation (polaire)

Navigation (MEO)

Géostationnaire

Terre

Lecture

Milliers de km

Satellites de quatre couches orbitales en mouvement autour de la Terre

{{shell}} : altitude {{altitude}}, vitesse {{speed}}, une orbite toutes les {{period}}.

Survolez un satellite pour lire son orbite.

Technologie

Santé

Énergie

Finance

Consommation

{{ticker}} · {{cap}}

Vue orthographique

Volatilité

Bêta

Rendement annuel

Actions selon leur volatilité, leur bêta et leur rendement annuel, dimensionnées par la capitalisation

{{ticker}} ({{sector}}) : rendement {{ret}}, volatilité {{volatility}}, bêta {{beta}}, ratio de Sharpe {{sharpe}}, capitalisation {{cap}}.

Cliquez sur une action pour épingler ses chiffres.

## Line3DChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Scatter3DChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
