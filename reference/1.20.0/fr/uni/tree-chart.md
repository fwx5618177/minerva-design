# Arbre

Hiérarchies dessinées en arbres ordonnés, arbres radiaux, cartes mentales et organigrammes : organisations, systèmes de fichiers, taxonomies, plans. L’arbre ordonné (Buchheim / Reingold–Tilford) ne superpose jamais les nœuds et centre chaque parent au-dessus de ses enfants ; les sous-arbres se replient et se déplient avec une animation, au clic, au clavier ou par l’API.

Package: minerva-design@1.20.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Vue d’ensemble

TreeChart reçoit des nœuds et des arêtes parent → enfant ; les nœuds sans parent sont des racines (tree.root en choisit une). Les arêtes qui créeraient un cycle ou un second parent sont ignorées.

L’arbre ordonné se calcule en temps linéaire et tient compte de la taille de chaque nœud : les libellés ne se chevauchent pas, les parents sont centrés sur leurs enfants et des sous-arbres identiques se dessinent de la même façon.

layout="tree" (de gauche à droite par défaut, tout sens possible), "radial" (anneaux autour de la racine, libellés le long du rayon), "mindmap" (branches équilibrées des deux côtés, une couleur par branche) et "org" (cartes avec titre et sous-titre, connecteurs orthogonaux, équipes terminales empilées en colonnes).

Cliquez sur un nœud qui a des enfants, appuyez sur Entrée ou appelez expand / collapse / toggle : son sous-arbre se replie dans le nœud avec une animation et un badge compte les nœuds masqués. collapsed sur un nœud le replie au départ.

Claire Dubois

Thomas Martin

Sophie Laurent

Marc Lefèvre

Camille Moreau

Hugo Bernard

Lucas Petit

Léa Fournier

Nathan Girard

Julien Faure

Manon Blanc

Antoine Mercier

Isabelle Garnier

Paul Chevalier

Julie Lambert

Nicolas Robin

Chloé Henry

Maxime Perrin

Présidente-directrice générale

Directeur technique

Directrice financière

Directeur des opérations

Directrice marketing

Responsable front-end

Responsable back-end

Ingénieure front-end

Ingénieur front-end

Ingénieur back-end

Ingénieure back-end

Ingénieur fiabilité

Contrôleuse de gestion

Analyste financier

Responsable support

Responsable logistique

Responsable de marque

Responsable croissance

Direction

Ingénierie

Finance

Opérations

Marketing

Organigramme de l’entreprise

Cliquez sur un responsable pour replier ou déplier son équipe.

Équipe de {{name}} repliée

Équipe de {{name}} dépliée

Lancement produit

Objectifs

10 000 clients payants

Notoriété

90 % de rétention

Public

Équipes produit

Indépendants

Étudiants

Canaux

Événement de lancement

Lettre d’information

Partenaires

Réseaux sociaux

Calendrier

Bêta privée

Dossier de presse

Jour J

Risques

Retards

Retours sur le prix

Budget

Publicité

Événements

Carte mentale d’un plan de lancement produit

Saisie

Navigation

Retour

Affichage de données

Mise en page

Graphiques

Composants du design system par catégorie

Dossiers

```tsx
Code
```

Styles

Données

Docs

Tout déplier

Tout replier

Tout afficher

Fichiers d’un projet

Score de crédit

Revenu ≥ 3 × mensualité ?

En poste depuis 2 ans ou plus ?

Taux d'endettement < 35 % ?

Accordé

Accordé, montant réduit

Accordé, taux majoré

Étude manuelle

Refusé

700 ou plus

600–699

Moins de 600

Oui

Non

Question

Accordé

Étude

Refusé

Arbre de décision d'octroi de prêt, avec le chemin du demandeur actuel en évidence

Décision : {{outcome}} (questions posées : {{questions}}).

Tous les produits

High-tech

Maison

Mode

Sport

Informatique

Téléphonie

Audio

Ordinateurs portables

Ordinateurs de bureau

Tablettes

Smartphones

Coques

Chargeurs

Casques

Enceintes

Cuisine

Mobilier

Jardin

Ustensiles de cuisson

Machines à café

Couteaux

Canapés

Bureaux

Chaises de bureau

Outils de jardin

Plantes

Vêtements

Chaussures

Accessoires

Vestes

Robes

Baskets

Bottes

Sacs

Montres

Plein air

Fitness

Vélo

Tentes

Chaussures de randonnée

Tapis de yoga

Haltères

Vélos

Casques de vélo

 › 

Rechercher une catégorie

Taxonomie des catégories de produits d'une boutique

Catégories correspondantes : {{total}}. Appuyez sur Entrée ou choisissez une étiquette pour en afficher une.

Recherchez une catégorie, par exemple « bottes » ou « bureau ».

Macintosh HD

Système

Applications

Médias

Documents

Caches et sauvegardes

Disposition

Arbre

Radiale

Occupation du disque par dossier, proportionnelle aux octets

{{name}} : {{size}} — {{parentShare}} de {{parent}}, {{share}} du disque.

{{name}} : {{size}} utilisés.

Version 2.0 de l'app

Accueil des nouveaux

Inscription

Vérification de l'e-mail

Connexion sociale

Visite guidée

Écrans de la visite

Passer et reprendre

Paiements

Commande

Formulaire de carte

Paiement par portefeuille

Facturation

Factures

Remboursements

Plateforme

Mode hors ligne

File de synchronisation

Résolution des conflits

Qualité

Rapports de plantage

Budget de performance

{{points}} pts

{{points}} pts · {{done}} faits

Synthèse

Terminé

En cours

À faire

Niveau de détail

Livrables

Fonctionnalités

Lots de travail

Plan affiché jusqu'au niveau : {{level}}.

Organigramme des tâches d'une version d'application mobile, avec les points

{{name}} replié : {{points}} points, {{remaining}} restants.

{{name}} déplié : {{points}} points, {{remaining}} restants.

{{points}} points au total, {{done}} faits. Cliquez sur un élément pour le replier ou le déplier.

Quart de finale

Demi-finale

Finale

À jouer

{{winner}}–{{loser}}

Tête de série {{n}}

Non joué

Vainqueur

En lice

Éliminée

Champion

Tour suivant

Recommencer

Nouvelle simulation

Tableau à élimination directe, des quarts de finale à la finale

{{team}} remporte le tournoi !

Vainqueurs ({{round}}) : {{teams}}.

Huit équipes classées selon leur niveau. Jouez le tour suivant pour révéler les résultats.

## TreeChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
