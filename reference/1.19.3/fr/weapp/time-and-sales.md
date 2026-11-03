# Ruban des transactions

Un ruban des transactions : les plus récentes en haut, qui glissent et clignotent, les grosses en gras et teintées, les balayages d'une même milliseconde fusionnés, des filtres de taille et une pause au survol. Des anneaux de tableaux typés gardent 200 000 transactions ; seules les lignes visibles sont dessinées.

Package: minerva-design@1.19.3

Renderer: weapp

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
