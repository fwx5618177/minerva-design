# Carte de chaleur du carnet

Carte de chaleur de liquidité à la Bookmap : quantité au repos par temps et prix dessinée par le GPU, lignes du meilleur achat et de la meilleure vente, transactions en bulles proportionnelles au volume, profil du carnet actuel, zoom, déplacement et lecture au réticule. Les flux ajoutent une colonne par intervalle dans une fenêtre glissante.

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

### Comment la lire

La heatmap est un enregistrement du carnet d'ordres : chaque colonne est un instantané du carnet à un moment, de gauche à droite, le présent au bord droit.

L'axe horizontal est le temps (le plus récent à droite), l'axe vertical le prix. Survolez un point : le réticule lit la quantité en attente à ce prix et à cet instant.

La couleur d'une cellule est la quantité en attente à ce prix à cet instant : sombre signifie presque rien, plus clair (bleu → cyan → jaune → blanc) signifie davantage. La légende en haut à gauche donne la plage de quantités et l'unité des couleurs.

Les lignes horizontales claires sont de gros ordres qui restent dans le carnet (murs). Là où une ligne s'arrête, l'ordre a été retiré ou exécuté : si la ligne de prix atteint la fin du mur, il a été exécuté.

Les lignes rouge et verte qui suivent le prix sont la meilleure offre et la meilleure demande, l'écart entre elles est le spread. Sur l'axe des prix, les étiquettes pleines rouge et verte sont la meilleure offre et la meilleure demande actuelles, l'étiquette au contour est la dernière transaction.

Les points sont les transactions : vert pour les achats agressifs (qui prennent les offres), rouge pour les ventes agressives (qui frappent les demandes), leur aire croît avec le volume de la colonne, les grosses bulles sont donc de grosses transactions. colorConvention="red-up" inverse les deux couleurs.

Les barres à droite sont le carnet actuel : les offres en rouge au-dessus, les demandes en vert au-dessous, plus la barre est longue plus la quantité est grande ; l'échelle en dessous est la quantité.

#### Ce qu'il faut repérer

Support et résistance : le prix touche plusieurs fois une ligne claire et repart, le gros ordre l'absorbe.

Ordres retirés (spoofing) : une ligne claire disparaît quand le prix approche sans aucune bulle de transaction, l'ordre a été annulé, pas exécuté.

Balayages : une rafale de grosses bulles traverse plusieurs prix, la ligne de prix saute et la liquidité sur son passage s'assombrit.

Liquidité faible : une grande zone sombre près du prix signifie peu d'ordres en attente, le prix peut la traverser rapidement.

Bougies : fournissez de vraies données OHLC sur les mêmes axes de temps en millisecondes et de prix. Les périodes absentes restent vides ; aucun cours exécuté n’est inventé à partir du carnet. La ligne du dernier prix utilise la dernière transaction fournie ou une clôture de bougie plus récente.

Navigation historique : zoom et déplacement arrêtent le suivi. Sélectionnez une plage conservée dans le navigateur ; réinitialiser revient au marché courant. getView / setView et viewChange partagent le même modèle de vue.

Filtre d’intensité : intensityRange sélectionne un intervalle 0–1 après la correspondance des couleurs. Les quantités brutes, les valeurs des infobulles et l’échelle automatique restent identiques.

Sens des données

Ce composant affiche la liquidité en attente et les bougies exécutées fournies. Les exemples utilisent un moteur de simulation reproductible. Une carte de liquidations exige des données de liquidation distinctes ; la taille des ordres ne constitue pas une taille liquidée.

Carte de liquidité BTC/USDT

Moteur : {{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

Suit le marché

Vue libre (zoomée ou déplacée)

Suivre le marché

Échelle de couleurs

Logarithmique

Racine carrée

Linéaire

Contraste

×{{value}}

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Colonne survolée : {{buys}} BTC achetés, {{sells}} BTC vendus

Survolez une colonne pour lire son volume échangé.

Hauteur de ligne

Étendue de prix

{{value}} USDT

Auto

Ajuster au carnet

{{time}} · {{price}} · {{size}} BTC {{side}} · {{buys}} BTC achetés, {{sells}} BTC vendus

{{low}} – {{high}}

côté achat

côté vente

dans l'écart

Survolez une cellule pour l'inspecter.

Fenêtre de temps

Flux en direct

Effacer l'historique

En pause à {{time}}.

Reprise à {{time}}.

Historique effacé à {{time}}.

{{window}} affichées sur {{history}} conservées.

BTC/USDT

Dernier {{value}}

Écart {{value}}

{{value}} transactions sur le ruban

Carnet d'ordres BTC/USDT

Transactions BTC/USDT

Perpétuel BTC-USD

1 contrat = {{value}} BTC

Financement {{rate}}

Financement {{rate}} à {{time}}, dans {{countdown}}

contrats

En carnet

Achats preneurs

Ventes preneuses

Carte de chaleur de liquidité du perpétuel BTC-USD

{{price}} : {{contracts}} contrats en carnet (≈ {{notional}})

Survolez la carte pour lire les contrats en carnet et leur valeur.

MARCHÉ SIMULÉ

Bougies d’exécution

Chaque bougie de 2 secondes agrège les exécutions du moteur de simulation déterministe. Les périodes sans exécution restent vides ; les ordres au repos ne créent pas de bougies.

Plage d’intensité visible

Filtre l’intensité normalisée des couleurs de la liquidité au repos. Seule la visibilité change, pas les quantités ni le volume exécuté.

Historique des exécutions conservé

Déplacez les poignées pour consulter l’historique conservé. Suivre le marché rétablit la dernière heure et le centrage automatique du prix.

TERMINAL DE LIQUIDITÉ

Dernière exécution

Profondeur acheteuse

Profondeur vendeuse

Déséquilibre du carnet

Plus grand mur acheteur

Plus grand mur vendeur

Palette

Océan

Braise

Réinitialiser la vue

CARNET ACTUEL

Simulation déterministe, sans flux de bourse externe. Les six indicateurs, les bougies et le carnet partagent le même moteur. Les indicateurs sont actualisés chaque seconde, indépendamment du flux du carnet.

Liquidité simulée avec bougies d’exécution

Liquidité simulée avec filtre d’intensité

Historique navigable de liquidité simulée

Terminal de liquidité BTC USDT simulé

Carnet BTC USDT simulé actuel

## OrderBookHeatmap

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
