# Graphe de relations

Réseaux de relations : personnes, organisations, services ou toute entité et les liens qui les unissent. Une disposition par forces (Barnes–Hut, dans un Web Worker pour les grands graphes), un cercle ou un diagramme en arcs place les nœuds ; nœuds et arêtes sont dessinés par le GPU (WebGPU, WebGL2, WebGL, repli Canvas2D), si bien que des dizaines de milliers de nœuds restent fluides. Survolez un nœud pour mettre en avant ses voisins, déplacez-le, masquez des groupes depuis la légende et parcourez le graphe au clavier.

Package: minerva-design@1.22.1

Renderer: uni

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

#### Vue d’ensemble

GraphChart reçoit des nœuds, des arêtes et éventuellement des groupes. Les groupes donnent les couleurs et la légende, la valeur des nœuds leur taille, et les libellés des arêtes nomment les relations.

Dispositions : forces (par défaut) avec liens, répulsion, gravité, collisions et graine déterministe ; cercle (par groupe, arêtes regroupées vers le centre) ; diagramme en arcs ; les dispositions dag et arbre sont aussi disponibles (voir Graphe de dépendances et Arbre). Les algorithmes sont exportés comme fonctions pures, utilisables dans des workers et des mini-programmes.

Le rendu passe par les mêmes moteurs GPU que les autres graphiques, avec un repli automatique WebGPU → WebGL2 → WebGL → Canvas2D ; le moteur utilisé est indiqué par onRendererChange et l’attribut data-renderer.

Les libellés s’évitent : en vue éloignée, seuls les nœuds les plus importants gardent leur libellé, et ceux des arêtes apparaissent en zoomant ou quand une arête est mise en avant.

#### Interaction et accessibilité

Faites glisser le fond pour déplacer la vue, Ctrl / ⌘ + molette ou pincement pour zoomer, faites glisser un nœud pour le déplacer (la simulation suit), cliquez pour sélectionner (Ctrl / ⌘ + clic pour ajouter), double-cliquez sur le fond pour tout afficher. Les boutons du coin zooment et recadrent.

Donnez le focus au graphique puis utilisez les flèches pour passer de nœud en nœud ; Entrée sélectionne, + et - zooment, 0 recadre, Échap efface. Le nœud actif est annoncé avec son groupe et son nombre de liens.

Les textes intégrés (résumé, annonces, infobulle, boutons) existent en anglais, chinois, japonais et français et suivent la langue de la page ; les couleurs suivent les thèmes clair et sombre.

Liu Bei

Guan Yu

Zhang Fei

Zhuge Liang

Zhao Yun

Ma Chao

Huang Zhong

Pang Tong

Jiang Wei

Liu Shan

Wei Yan

Fa Zheng

Cao Cao

Cao Pi

Sima Yi

Xiahou Dun

Xiahou Yuan

Zhang Liao

Xu Chu

Guo Jia

Xun Yu

Dian Wei

Cao Zhi

Sima Zhao

Deng Ai

Sun Quan

Sun Ce

Sun Jian

Zhou Yu

Lu Su

Lü Meng

Lu Xun

Gan Ning

Huang Gai

Xiao Qiao

Da Qiao

Sun Shangxiang

Lü Bu

Dong Zhuo

Diaochan

Yuan Shao

Empereur Xian

Wang Yun

Shu Han

Wei

Wu oriental

Seigneurs de guerre et cour Han

Frères jurés

Sert

Père et fils

Mariés

Fratrie

Rivaux

Maître

Père adoptif

Alliance

A vaincu

Amis jurés

Relations entre les personnages du Roman des Trois Royaumes, par faction

Survolez un personnage ou une relation, cliquez pour sélectionner ; Ctrl / ⌘ + molette pour zoomer.

Sélection : {{name}}

{{source}} → {{target}} : {{relation}}

, 

Membre {{id}}

Communauté {{n}}

Réseau généré de 10 000 membres répartis en 40 communautés

{{nodes}} nœuds · {{edges}} liens · rendu : {{renderer}} ·

simulation dans un Web Worker…

disposition terminée en {{seconds}} s

Périphérie

Commerce

Identité

Données

Regrouper les arêtes vers le centre

Appels entre microservices, regroupés par domaine

Système

Fonctionnel

Orienté objet

Script

A influencé

Influences entre langages de programmation

Forces

Cercle

Diagramme en arcs

Disposition

Cliquez sur un personnage pour le centrer.

{{name}} : {{links}} relations

Disposition : {{layout}}

Panier

En attente de paiement

Payée

Expédiée

Livrée

Remboursée

Annulée

commande

modifier le panier

paiement

nouvel essai de paiement

délai dépassé

annulation

paiement annulé

expédition

remboursement

suivi mis à jour

livraison

retour à l’expéditeur

retour

avis

En cours

Traitement

Terminée

Pointes pleines

États d’une commande et événements qui les relient

Sain

Dégradé

Critique

p95 {{value}} ms

{{value}} req/s

Mises à jour en direct

Carte des services d'une boutique en ligne avec la santé de chaque service en direct

Cliquez sur un service pour lire ses métriques.

{{name}} : {{status}} · p95 {{latency}} ms · erreurs {{errors}} · {{rps}} req/s.

{{healthy}} sains, {{degraded}} dégradés, {{critical}} critiques · mis à jour à {{time}}

Marie Curie

Pierre Curie

Albert Einstein

Max Planck

Niels Bohr

Werner Heisenberg

Lise Meitner

Otto Hahn

Emmy Noether

Paris

Varsovie

Vienne

Berlin

Zurich

Copenhague

Sorbonne

Société Kaiser-Wilhelm

ETH Zurich

Institut Niels-Bohr

Radioactivité

Relativité

Théorie quantique

Principe d'incertitude

Fission nucléaire

Théorème de Noether

né(e) à

a travaillé à

a étudié à

marié(e) à

a contribué à

situé(e) à

a influencé

fait partie de

a collaboré avec

lié(e) à

Personnes

Lieux

Institutions

Idées

Chercher une personne, un lieu ou une idée…

Rechercher dans le graphe de connaissances

Aucune entité ne correspond à cette recherche.

Graphe de connaissances de physiciens, des lieux et institutions qui leur sont liés et de leurs découvertes

Cherchez une entité ou cliquez sur un nœud pour lister ce que le graphe sait d'elle.

{{name}} : {{total}} faits — {{facts}}

→ {{name}} ({{relation}})

← {{name}} ({{relation}})

Amis de fac

Collègues

Club d'escalade

Club de lecture

Amitiés entre 24 personnes réparties en quatre cercles

Personnes que {{name}} connaît peut-être : {{list}}.

{{name}} (amis en commun : {{mutual}})

{{name}} connaît déjà tous les amis de ses amis.

Cliquez sur une autre personne pour mettre à jour les suggestions.

Appareil {{id}}

Carte •••• {{last4}}

Compte {{id}}

connecté depuis

a payé avec

Comptes

Comptes signalés

Appareils

Cartes

faible

moyen

élevé

Thème sombre

Comptes, appareils et cartes de paiement, avec deux réseaux de fraude qui partagent des appareils et des cartes

Groupe : {{accounts}} comptes, {{devices}} appareils, {{cards}} cartes · risque : {{risk}}

Cliquez sur un compte, un appareil ou une carte pour sélectionner tout son groupe.

## GraphChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
