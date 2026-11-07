# Ruban des transactions

Un ruban des transactions : les plus récentes en haut, qui glissent et clignotent, les grosses en gras et teintées, les balayages d'une même milliseconde fusionnés, des filtres de taille et une pause au survol. Des anneaux de tableaux typés gardent 200 000 transactions ; seules les lignes visibles sont dessinées.

Package: minerva-design@1.22.2

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
