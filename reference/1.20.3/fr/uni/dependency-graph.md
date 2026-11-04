# Graphe de dépendances

Graphes orientés acycliques dessinés en couches : dépendances de paquets, chaînes de build, lignage de données, plans de tâches. La disposition de Sugiyama casse les cycles, affecte les couches, fait passer les longues arêtes par des nœuds fictifs, réduit les croisements et garde les longues arêtes droites ; les arêtes sont des courbes lisses ou des connecteurs orthogonaux fléchés. Survolez ou sélectionnez un nœud pour mettre en avant tout ce qui est en amont et en aval, et affichez le chemin critique d’un plan.

Package: minerva-design@1.20.3

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Fonctionnement de la disposition

DependencyGraph est un GraphChart avec layout="dag" : boîtes ajustées à leur libellé, flèches sur chaque arête et mise en avant du lignage. La même disposition existe sous forme de fonction pure, dagLayout.

Les cycles sont cassés en inversant les arêtes arrière d’un parcours en profondeur ; les couches viennent du plus long chemin, puis les sources se rapprochent de leurs successeurs et les nœuds équilibrés rejoignent les couches moins remplies.

Les arêtes qui traversent plusieurs couches reçoivent des nœuds fictifs ; des passes barycentre et médiane réordonnent ensuite chaque couche en gardant le meilleur ordre, puis une passe de transposition échange des voisins tant que cela supprime des croisements.

Les positions dans une couche viennent d’une régression isotone pondérée vers les voisins, les longues arêtes ayant un poids élevé pour rester droites. Les sens TB, LR, BT et RL sont pris en charge.

highlight="lineage" (par défaut ici) met en avant tous les ancêtres et descendants des nœuds survolés, actifs ou sélectionnés ; criticalPath met en avant la chaîne de plus grande durée totale (valeur des nœuds).

Applications

Paquets de framework

Bibliothèques

Outillage

dépendance de développement

dépendance circulaire

Dépendances entre les paquets d’un monorepo

Installation

Lint

Vérification des types

Tests unitaires

Analyse de sécurité

Build de l’app

Build de la doc

Tests E2E

Tests visuels

Empaquetage

Déploiement préprod

Déploiement prod

Réussi

En cours

Échoué

En attente

{{status}} · {{minutes}} min

bundle web

déclarations de types

nouvel essai

Mettre en avant le chemin critique

Chaîne CI/CD : jobs, dépendances et statuts

Chemin critique : {{minutes}} min — {{path}}

 → 

Tableau des revenus

Tableau de rétention

Tableau de croissance

Sources brutes

Préparation

Magasins de données

Tableaux de bord

Lignage des données, des tables brutes aux tableaux de bord

{{name}} : {{upstream}} en amont, {{downstream}} en aval

Cliquez sur une table ou un tableau de bord pour mettre en avant son lignage.

Terminée

En cours

En attente

{{percent}} effectué

{{seconds}} s

Workers

{{n}} × worker

Pause

Lancer

Réinitialiser

Tâches de build d'un monorepo, colorées selon leur état pendant l'exécution

Build terminé en {{seconds}} s avec {{workers}} × worker.

{{elapsed}} s sur {{seconds}} s — en cours : {{running}}.

rien

Aucun ordonnancement ne fait mieux que le chemin critique : {{seconds}} s.

Cahier des charges

Recherche utilisateur

Arborescence

Maquettes fil de fer

Design graphique

Rédaction

API et hébergement

Configuration du CMS

Intégration front-end

Saisie des contenus

Recette et correctifs

Audit SEO

Mise en ligne

Cadrage

Conception

Réalisation

Lancement

Planning du lancement d'un site : tâches, dépendances et chemin critique

{{name}} : {{range}}, {{days}} jours ouvrés, peut glisser de {{slack}} jours ouvrés sans retarder le lancement.

{{name}} : {{range}}, {{days}} jours ouvrés, sur le chemin critique — tout retard décale le lancement.

{{days}} jours ouvrés, mise en ligne le {{date}}. Cliquez sur une tâche pour voir ses dates et sa marge.

Réussie

Échouée

Amont en échec

Tâche en échec

Tâches ETL nocturnes, avec la tâche en échec et les tâches qu'elle bloque

{{task}} a échoué et bloque {{blocked}} des {{total}} tâches : {{sinks}} ne seront pas livrés.

{{task}} a échoué, mais aucune autre tâche n'en dépend.

Initiation à la programmation

Mathématiques discrètes

Analyse

Structures de données

Architecture des ordinateurs

Algèbre linéaire

Probabilités

Algorithmique

Systèmes d'exploitation

Bases de données

Réseaux

Apprentissage automatique

Compilation

Systèmes répartis

Sécurité

Apprentissage profond

Projet de fin d'études

Année {{n}}

Direction du flux

De haut en bas

De gauche à droite

De bas en haut

De droite à gauche

Cours d'informatique et leurs prérequis

Prérequis de « {{course}} » ({{total}}) : {{list}}.

« {{course}} » n'a aucun prérequis.

Prix unitaire

Quantité

Remise (%)

Taux de TVA

Sous-total

Remise

Net

TVA

Livraison

Total

Coût unitaire

Saisies

Formules

Cellules d'un bon de commande et cellules référencées par leurs formules

{{cell}} modifié : {{total}} cellules recalculées ({{list}}). Total : {{value}}.

## DependencyGraph

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
