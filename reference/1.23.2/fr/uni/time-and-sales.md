# Ruban des transactions

Un ruban des transactions : les plus récentes en haut, qui glissent et clignotent, les grosses en gras et teintées, les balayages d'une même milliseconde fusionnés, des filtres de taille et une pause au survol. Des anneaux de tableaux typés gardent 200 000 transactions ; seules les lignes visibles sont dessinées.

Package: minerva-design@1.23.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Transactions BTC/USDT

Achat de {{size}} BTC à {{price}}

Vente de {{size}} BTC à {{price}}

En pause pendant le survol : éloignez le pointeur (ou cliquez sur le badge) pour reprendre.

Survolez le ruban pour le mettre en pause, cliquez sur une ligne pour choisir une transaction.

Seuil des grosses transactions

≥ {{value}} BTC

Quantité minimale

Toutes

Fusionner les balayages d'une même milliseconde

Colorer les prix par tick

{{value}} lignes conservées

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Ajouter {{value}} transactions

{{rows}} transactions, dernier lot en {{ms}} ms

Fenêtre glissante

{{value}} dernières

VWAP

Part achetée

Acheté

Vendu

{{value}} BTC

Transactions / s

Plus grosse transaction

Achat {{size}} à {{price}}

Vente {{size}} à {{price}}

Les acheteurs prennent l'offre.

Les vendeurs frappent la demande.

Les flux acheteurs et vendeurs s'équilibrent.

En attente de transactions…

Fuseau horaire

Local

UTC

New York

Tokyo

Heure ({{zone}})

Blocs ≥ {{value}} BTC

Effacer

{{value}} blocs depuis le début

En attente d'un bloc…

Achat

Vente

{{time}} · {{size}} BTC à {{price}} ≈ {{notional}}

{{value}} transactions

{{count}} transactions · {{size}} BTC

Achats

Ventes

Achats BTC/USDT

Ventes BTC/USDT

Flux net : {{value}} BTC (acheté − vendu)

## TimeAndSales

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
