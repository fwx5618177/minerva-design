# Plateformes prises en charge

Couverture du code source pour React, Web Components, Vue, Angular, React Native, Taro, WeChat et uni-app. Cette matrice ne prouve ni une publication npm ni une parité complète des API, du rendu ou des appareils.

Package: minerva-design@1.22.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Plateformes

Les contrats communs décrivent les propriétés, événements et slots. Chaque moteur emploie les primitives de sa plateforme. Une implémentation peut encore présenter des lacunes d’API ou d’interaction ; consulter les notes et les manifestes pour connaître le périmètre testé.

Plateforme

Composants

React

Composants React 19 pour le DOM (minerva-design).

Web Components

Éléments personnalisés Lit pour les frameworks web. Vue et Angular proposent aussi des composants natifs via leurs propres points d’entrée.

Vue

SFC natifs Vue 3 (minerva-design/vue), avec des démonstrations et des tableaux API dédiés.

Angular

Composants Angular natifs autonomes (minerva-design/angular). Consultez la matrice pour connaître leur état d’implémentation.

React Native

Composants React Native pour iOS et Android avec Expo. Expo Go 57.0.9 a été vérifié sur simulateurs iOS 26.1 et Android 16 : saisie, tableaux, menus, WebView et listes virtuelles, plus sélection de fichiers système et copier-coller sous Android. Les appareils physiques et les versions autonomes restent non vérifiés.

Taro

Composants Taro pour mini-programmes et H5. Le point d’entrée principal passe la compilation WeChat officielle de Taro 4.3. Le clavier, le focus, les fichiers et les aperçus isolés H5 sont couverts par des tests happy-dom (sans vrai navigateur). minerva-design/taro/monaco est une entrée H5 optionnelle dont le moteur Monaco est fourni par l’application. Les hôtes natifs des mini-programmes ne peuvent pas exécuter Monaco.

WeChat

Composants WeChat natifs, avec les éléments de composition exprimés par les propriétés ou slots du parent lorsque cela est documenté. Certaines interactions ont été vérifiées dans le simulateur WeChat DevTools. Cela ne valide ni un appareil physique ni toutes les API. Monaco ne peut pas fonctionner dans cet hôte natif.

uni-app

SFC distribués en source et compilés pour WeChat avec le compilateur officiel uni-app 5.31 Vue 3. Le projet de vérification enregistre tous les SFC de la bibliothèque, sauf Monaco réservé à H5. H5 propose clavier, focus modal, portails, sélection de fichiers, aperçu isolé et entrée optionnelle minerva-design/uni/monaco. L’application fournit le moteur Monaco ; les hôtes natifs des mini-programmes ne peuvent pas l’exécuter.

Stable

Bêta

Prévu

Sans objet

Implémenté avec une validation automatisée du périmètre documenté. Ne signifie ni publication npm ni parité complète entre plateformes.

Implémenté avec un périmètre propre à la plateforme et des lacunes d’API ou de validation. Lire les notes et le manifeste avant utilisation.

prévu dans la feuille de route, pas encore disponible.

pas un composant sur cette plateforme, par conception : la plateforme le couvre autrement (survolez le badge pour les détails).

Un objet de données en React : un élément de la prop items / entries du composant parent.

Une partie de composition ou un provider propre à React : les éléments personnalisés le couvrent par des attributs ou l'élément parent.

Matrice de prise en charge

Chaque composant et élément personnalisé, par plateforme. Filtrez par type de produit : applications de gestion (toB) ou applications grand public (toC).

Type de produit

Tous

toB

toC

Composants affichés : {{count}}

Composant

Types

Contrats de composants

La matrice est générée à partir des contrats de composants : des métadonnées extraites des types de props React et du Custom Elements Manifest (props avec leur nature, leurs valeurs énumérées et leurs valeurs par défaut, événements avec les champs de leur detail, slots, types de produit et prise en charge de chaque plateforme). Un test échoue lorsqu'une prop, un attribut ou un événement change sans les régénérer, et lorsque React et les éléments personnalisés ne s'accordent pas sur les valeurs énumérées ou par défaut.

Les tests de contrats partagés et les tests unitaires et d’intégration des rendus (Vitest avec happy-dom, sans vrai navigateur) vérifient les interactions, traductions et tokens documentés. Des projets CI indépendants compilent l’entrée Taro et les SFC uni-app avec les SDK officiels ciblant WeChat. Le simulateur WeChat DevTools 2.01.2510280 / bibliothèque 3.17.2 a permis de vérifier boutons et nouvelle tentative, choix désactivés, sélection, ouverture de modale et thèmes locaux. Une nouvelle vérification a confirmé la saisie native hello et la valeur contrôlée HELLO. Les avertissements liés aux anciennes API système et aux sélecteurs WXSS des composants ont été corrigés et ont disparu après recompilation. En mode visiteur, les RPC automator expirent et l’API de sécurité de la plateforme signale toujours des erreurs. Les appareils physiques, les autres cibles et l’ensemble des API de plateforme restent non vérifiés. Ces résultats ne prouvent pas une équivalence visuelle ou fonctionnelle complète.

Premiers pas avec les frameworks natifs et les mini-programmes

Importez l’entrée de votre plateforme et respectez ses peerDependencies et exigences d’adaptation à l’hôte. uni-app fournit des SFC source pour son compilateur. Les entrées Monaco H5 optionnelles sont minerva-design/taro/monaco et minerva-design/uni/monaco : l’application doit fournir le moteur installé localement et configurer ses workers. Ce ne sont pas des éditeurs natifs de mini-programmes. La compilation SDK officielle pour WeChat, les tests H5 et les interactions documentées du simulateur DevTools sont vérifiés séparément ; les appareils physiques restent à valider.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
