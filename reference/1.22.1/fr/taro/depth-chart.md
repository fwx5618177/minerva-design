# Graphique de profondeur

Profondeur cumulée d'un carnet d'ordres : aires en escalier des achats et ventes autour du prix médian, lecture au survol symétrique (quantité, coût, prix moyen), zoom autour du médian et transitions fluides à des centaines de deltas par seconde.

Package: minerva-design@1.22.1

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Profondeur du carnet BTC/USDT

Flux en direct

Plage visible

Ajustée

±{{value}}

Cumul

Quantité (BTC)

Montant (USDT)

Courbe

Escalier

Linéaire

Ctrl/⌘ + molette ou pincement pour zoomer autour du médian, double clic pour réinitialiser.

Zoom : {{value}}

Mon achat

Ma vente

Liquidation

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Acheter {{amount}} BTC ({{total}}) balaie les ventes jusqu'à {{price}}, {{slippage}} au-dessus du médian : prix moyen {{average}}.

Vendre {{amount}} BTC ({{total}}) balaie les achats jusqu'à {{price}}, {{slippage}} sous le médian : prix moyen {{average}}.

Survolez les courbes pour chiffrer un ordre au marché.

Sens

Achat au marché

Vente au marché

Taille de l'ordre

{{value}} BTC

Prix moyen

Dernier prix

{{size}} BTC s'exécutent sur {{levels}} niveaux : moyenne {{average}}, dernier prix {{worst}}, {{cost}} au total, {{slippage}} pb du mid.

Seulement {{filled}} BTC sur {{size}} reposent de ce côté : l'ordre viderait les {{levels}} niveaux, jusqu'à {{worst}}.

Bande mesurée

À {{band}} : {{bids}} BTC à l'achat, {{asks}} BTC à la vente, déséquilibre {{imbalance}} · spread {{spread}} ({{spreadBp}} pb)

En attente de la première mesure…

Cumuler les dollars (prix × titres)

Montant (USD)

Titres

Profondeur du carnet de l'action ACME

Consolidé

Plateforme {{name}}

Plateforme

Meilleur bid

Meilleur ask

BTC à ±0,1 %

{{value}} ({{share}})

Profondeur BTC/USDT, {{name}}

Meilleurs prix et liquidité par plateforme

## DepthChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
