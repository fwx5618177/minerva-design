# Carnet d'ordres

Une échelle de prix dessinée sur canvas : ventes au-dessus de la ligne d'écart, achats en dessous, avec barres de profondeur, regroupement des prix, clignotement des niveaux modifiés, mise en avant des gros ordres et résumé cumulé au survol. Des centaines de mises à jour par seconde ne coûtent qu'un dessin par image.

Package: minerva-design@1.19.3

Renderer: taro

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

Carnet d'ordres BTC/USDT

### Carnet d'ordres

BTC/USDT

Prix (USDT)

Quantité (BTC)

Cumul (BTC)

Fréquence

{{value}} / s

{{updates}} messages/s · {{levels}} niveaux modifiés/s

Pas de prix

Barres de profondeur

Cumulées

Par niveau

Seuil des gros ordres

≥ {{value}} BTC

Achat {{price}} : {{size}} BTC, {{sum}} BTC cumulés jusqu'ici

Vente {{price}} : {{size}} BTC, {{sum}} BTC cumulés jusqu'ici

Cliquez sur un niveau pour choisir son prix.

Côtés

Les deux

Achats

Ventes

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

{{value}} depuis l'ouverture

Prix limite : {{price}}

Limite

Profondeur

Profondeur BTC/USDT

Transactions

Transactions BTC/USDT

Marché

Crypto · BTC/USDT

Prix (USDT)

Taille (BTC)

Total (BTC)

Carnet d'ordres BTC/USDT

Action · AAPL

Prix (USD)

Actions

Total

Carnet d'ordres AAPL

Change · EUR/USD

Cours

Taille (EUR)

Total (EUR)

Carnet d'ordres EUR/USD

Contrats à terme · ES

Prix (pts)

Contrats

Total

Carnet d'ordres du contrat E-mini S&P 500

{{value}} pips

{{value}} ¢

{{value}} ticks

{{value}} USDT

Pas de cotation {{tick}} · écart {{spread}} · mis en évidence dès {{large}}

Murs

Nouveau

Retiré

Exécuté

Murs ≥ {{size}} BTC : {{resting}} en carnet, {{filled}} exécutés, {{pulled}} retirés ({{ratio}} retirés)

Recherche de murs dans le carnet…

Mur acheteur {{price}} : {{size}} BTC

Mur vendeur {{price}} : {{size}} BTC

après {{value}}

Ordre à cours limité

Sens

Acheter

Vendre

Prix limite (USDT)

Quantité (BTC)

Saisissez un prix et une quantité, ou cliquez sur un niveau.

{{filled}} BTC exécutés aussitôt, prix moyen {{average}}.

{{filled}} BTC exécutés aussitôt (prix moyen {{average}}), {{rest}} BTC en attente à {{price}}.

En attente à {{price}} derrière {{ahead}} BTC.

{{side}}

Ordre placé : {{side}} {{size}} BTC à {{price}}.

Ordre à {{price}} annulé.

{{side}} {{size}} @ {{price}}

Aucun ordre ouvert.

Annuler l'ordre

## OrderBook

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
