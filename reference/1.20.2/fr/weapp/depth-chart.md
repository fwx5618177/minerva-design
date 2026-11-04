# Graphique de profondeur

Profondeur cumulée d'un carnet d'ordres : aires en escalier des achats et ventes autour du prix médian, lecture au survol symétrique (quantité, coût, prix moyen), zoom autour du médian et transitions fluides à des centaines de deltas par seconde.

Package: minerva-design@1.20.2

Renderer: weapp

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

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
