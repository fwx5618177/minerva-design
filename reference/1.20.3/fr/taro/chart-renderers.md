# Comparatif des moteurs de rendu

Ce qui distingue les quatre moteurs de rendu des graphiques, celui qu'utilise votre navigateur et leur comparaison sur cet appareil : bancs d'essai en direct avec images par seconde, durées d'image, coût sur le thread principal, démarrage et une note sur 100.

Package: minerva-design@1.20.3

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comment un graphique choisit son moteur

Les graphiques cartésiens (courbe, aire, barres, nuage de points, chandeliers, carte de chaleur, sparkline, quadrant) dessinent leurs données avec l'un des quatre moteurs et leur texte (axes, étiquettes, légende, infobulle) avec le DOM. Les quatre dessinent les mêmes marques avec les mêmes couleurs ; ils diffèrent par la vitesse, le coût de démarrage, la disponibilité et les limites.

renderer="auto" (par défaut) essaie WebGPU, puis WebGL2, puis WebGL, puis Canvas2D, et garde le premier qui démarre. onRendererChange, l'événement renderer et la promesse ready indiquent le moteur utilisé.

Auto ignore les GPU logiciels (SwiftShader, llvmpipe, Microsoft Basic Render Driver…) : ils sont plus lents que Canvas2D, si bien que les machines virtuelles et les navigateurs sans interface finissent en général sur Canvas2D.

renderer="webgpu" | "webgl2" | "webgl" | "canvas2d" impose un moteur, GPU logiciels compris. S'il ne démarre pas, le graphique descend la chaîne, jamais ne la remonte.

Quand le GPU est perdu (réinitialisation du pilote, périphérique retiré, contexte évincé), le graphique passe au moteur suivant, se redessine avec les mêmes données, le même zoom et le même état, et signale le nouveau moteur.

setDefaultChartRenderer() fixe le moteur de tous les graphiques dont renderer est absent ou vaut "auto", en React, Vue, Angular et Web Components ; les graphiques affichés basculent en direct.

### En un coup d'œil

Ce que chaque moteur utilise en dessous, comment il dessine une image et où sont ses limites.

Aspect

API du navigateur

WebGPU, au-dessus de Vulkan, Metal ou Direct3D 12

WebGL 2.0 (OpenGL ES 3.0)

WebGL 1.0 (OpenGL ES 2.0) avec l'extension ANGLE_instanced_arrays

Le contexte Canvas 2D, rastérisé par le navigateur

Shaders

WGSL

GLSL ES 3.00

GLSL ES 1.00

Aucun : chemins, rectangles et pixels dessinés en JavaScript

Dessin d'une image

Un dessin instancié par série depuis des tampons GPU

Un dessin instancié par série, un vertex array par série

Un dessin instancié par série, attributs reliés à chaque dessin (pas de vertex arrays)

Chaque marque visible est redessinée en JavaScript

Zoom et déplacement

Seule une transformation change : aucun tampon n'est reconstruit

Seule une transformation change : aucun tampon n'est reconstruit

Seule une transformation change : aucun tampon n'est reconstruit

La plage visible est redessinée à chaque image

Courbes de millions de points

Chaque segment visible est dessiné

Chaque segment visible est dessiné

Chaque segment visible est dessiné

Décimées au min / max de chaque colonne de pixels (au plus 4 points par colonne), même silhouette

Grands nuages de points

Chaque point, un dessin instancié par série

Chaque point, un dessin instancié par série

Chaque point, un dessin instancié par série

Au-delà de 20 000 points, écrits pixel par pixel dans un tampon ImageData : toujours O(n) par image

Anticrénelage

Dans les shaders (sans MSAA)

Dans les shaders (sans MSAA)

Dans les shaders (sans MSAA)

Celui du navigateur

Contextes par page

Un périphérique par graphique ; hors de la limite WebGL

Les navigateurs gardent environ 16 contextes WebGL actifs : au-delà, les graphiques hors écran sont suspendus puis restaurés quand ils reviennent à l'écran

Même limite que WebGL2, partagée avec lui

Aucune limite

GPU perdu

Repli sur WebGL2

Repli sur WebGL

Repli sur Canvas2D

Rien à perdre

Démarrage

Asynchrone : adaptateur, périphérique et pipelines

Contexte synchrone, shaders compilés au démarrage

Contexte synchrone, shaders compilés au démarrage

Immédiat

Idéal pour

Des millions de points, des données en direct, de longues sessions de zoom

Les mêmes usages quand WebGPU manque ; la voie rapide la plus répandue

Les GPU, pilotes et navigateurs anciens sans WebGL2

Petits graphiques, nombreux graphiques par page, GPU logiciels, pas de GPU du tout

### À quoi s'attendre

Des tendances tirées des mesures ci-dessous, pas des promesses : lancez les bancs d'essai de cette page pour mesurer votre appareil.

Jusqu'à quelques dizaines de milliers de points, tous les moteurs suivent l'écran ; Canvas2D n'a besoin d'aucun contexte GPU.

Courbes et aires : Canvas2D les décime aux colonnes de pixels, si bien que même 2 millions de points triés restent fluides sur un processeur rapide, et les moteurs GPU coûtent à peu près autant quelle que soit la taille.

C'est sur les nuages de points que les moteurs se séparent : Canvas2D dessine chaque point à chaque image, son temps de thread principal croît donc avec les points (environ 8 ms à 100K, 12 ms à 1M et 21 ms à 2M sur la machine d'exemple, où il passe sous la fréquence de l'écran), tandis que les moteurs GPU restent autour de 1 à 3 ms.

Barres : jusqu'à 200K barres, tous les moteurs ont suivi sur la machine d'exemple, les moteurs GPU avec le moins de thread principal.

WebGPU, WebGL2 et WebGL sont souvent à une ou deux millisecondes les uns des autres, l'ordre de grandeur du bruit entre deux passages. Les GPU intégrés ou anciens et les téléphones creusent les écarts ; un processeur plus lent fait décrocher Canvas2D plus tôt.

La première image prend quelques dizaines de millisecondes et croît avec les données à envoyer (environ 100 ms pour 2 millions de points sur la machine d'exemple).

### Résultats d'exemple

Un passage de la démo de banc d'essai sur un portable Apple M3 Max, Chrome 156 sous macOS, écran 60 Hz, densité de pixels 1, 3 s par moteur. Chaque cellule donne la note et le temps de thread principal par image, ainsi que les images par seconde quand elles sont passées sous la fréquence de l'écran.

Charge

{{workload}} · {{count}} points

Chiffres d'une machine et d'un passage : des écarts de quelques points ou d'une milliseconde sont dans le bruit. Lancez le banc d'essai ci-dessus pour obtenir les vôtres.

### Calcul de la note

Chaque passage se termine par une note sur 100, calculée uniquement à partir des mesures, par rapport à la fréquence de rafraîchissement de cet écran (mesurée avant le passage). Quatre composantes, chacune entre 0 et 1 :

Fluidité (40 %) : images par seconde divisées par la fréquence de rafraîchissement.

Stabilité (20 %) : le budget d'image (1000 ms / fréquence) divisé par le 95e centile des intervalles entre images, si bien que les images longues coûtent des points même quand la moyenne est bonne.

Marge (25 %) : un moins le temps de thread principal d'une image divisé par le budget d'image, c'est-à-dire la part de chaque image laissée à votre application.

Démarrage (15 %) : un moins le temps entre le montage du graphique et sa première image affichée, divisé par une seconde.

Appréciations : 85 et plus excellent, 65 et plus bon, 40 et plus passable, moins de 40 faible. Une note compare des moteurs sur un appareil et une charge ; elle n'est pas comparable d'une machine à l'autre.

### Méthode et limites

Le banc d'essai monte un graphique à la fois, imposé sur un moteur, avec les mêmes données et le même trajet de caméra :

Données : colonnes de tableaux typés générées une fois avec une graine avant le chronomètre et partagées par tous les moteurs. La caméra zoome de l'ensemble des données (l'image la plus lourde) jusqu'au zoom maximal et revient en glissant latéralement, avec setView à chaque image d'animation.

Temps de thread principal : du début d'une image d'animation à un message posté pendant celle-ci, qui s'exécute une fois l'image rendue ; il comprend le JavaScript et les appels de dessin du graphique, le calcul des styles, la mise en page et la peinture.

Les images par seconde sont plafonnées par l'écran : deux moteurs à la fréquence de rafraîchissement sont à égalité en fluidité et se distinguent par la marge.

Le temps GPU après les appels de dessin n'est pas visible en JavaScript : un moteur qui soumet vite mais sature le GPU le montre par moins d'images par seconde et des intervalles plus longs.

Les résultats varient avec le mode d'alimentation, la limitation thermique, les autres onglets et les extensions. Gardez l'onglet au premier plan pendant un passage, et lancez-le deux fois pour comparer.

### Prise en charge des navigateurs

Où chaque moteur est disponible. Les versions sont les premières versions stables où la fonctionnalité est activée par défaut ; la prise en charge dépend aussi du GPU et de son pilote.

Navigateur

WebGPU ne fonctionne que dans un contexte sécurisé (HTTPS ou localhost). Les navigateurs bloquent certains GPU et pilotes ; le graphique se replie alors automatiquement. La démo Votre appareil ci-dessus montre ce que ce navigateur offre réellement.

Chrome, Edge (ordinateur)

113+ sous Windows, macOS et ChromeOS

Chrome 56+, Edge 79+

Oui

Oui

Firefox (ordinateur)

141+ sous Windows ; autres plateformes en cours de déploiement

51+

Oui

Oui

Safari (macOS)

26+

15+

Oui

Oui

iOS et iPadOS (tous les navigateurs)

26+

15+

Oui

Oui

Chrome pour Android

121+ sous Android 12+ avec un GPU pris en charge

Oui

Oui

Oui

Chrome sous Linux

Selon la version et le pilote GPU

Oui

Oui

Oui

### Lequel utiliser

Laissez renderer sur "auto" en production : chaque visiteur obtient le moteur le plus rapide que son appareil exécute en matériel, et les pertes sont gérées pour vous.

N'imposez WebGPU que pour le tester ou le comparer ; auto le choisit déjà en premier quand il tourne en matériel.

Imposez WebGL2 quand un pilote WebGPU se comporte mal sur les appareils visés, ou pour garder un rendu identique entre navigateurs qui livrent WebGPU à des dates différentes.

Imposez WebGL pour reproduire ce que voient les appareils anciens.

Imposez Canvas2D pour les petits graphiques, vignettes et sparklines, pour les pages de dizaines de graphiques (pas de limite de contextes) et pour les environnements sans GPU.

Un tableau de bord avec beaucoup de graphiques : laissez les grands ou interactifs sur auto et passez les petits en Canvas2D, ou détruisez les graphiques qui quittent l'écran.

Formats de données, flux en direct et démonstrations à un million de points sont sur Performances des graphiques ; l'API sans framework est sur Moteur de graphiques.

Auto

WebGPU

WebGL2

WebGL

Canvas2D

{{value}} ms

{{value}} i/s

Signal {{index}}

Groupe {{index}}

Valeurs

Sondage des moteurs…

Moteur

Auto

État

CPU

GPU matériel

GPU logiciel

Indisponible

GPU / périphérique

Dessiné par le navigateur, sans contexte GPU

Version de l'API

Limites

Textures jusqu'à {{value}} px

tampons jusqu'à {{value}}

pas d'instanciation : repli sur Canvas2D

Auto choisit

WebGPU tourne ici sur un GPU matériel.

Pas de WebGPU matériel ici ; WebGL2 est le meilleur disponible.

Ni WebGPU ni WebGL2 matériels ici ; WebGL est le meilleur disponible.

Aucun moteur GPU matériel ici : Canvas2D est plus rapide qu'un GPU logiciel.

Contexte sécurisé

Oui

Non

WebGPU exige HTTPS ou localhost.

Densité de pixels

Pixels physiques par pixel CSS : plus de pixels à remplir.

Threads CPU

Cœurs logiques annoncés par le navigateur.

Moteurs de rendu des graphiques sur cet appareil

Le nom du GPU peut être générique ou absent : les navigateurs le masquent ou l'arrondissent parfois par respect de la vie privée.

Charge

Courbe

Nuage de points

Barres

Nombre de points

{{value}} points

Durée de chaque passage

{{value}} s par moteur

Inclure les GPU logiciels

Lancer tous les moteurs

Arrêter

{{backend}} dessine {{count}} points

Lancez le banc d'essai : chaque moteur reçoit les mêmes données et le même trajet de zoom, l'un après l'autre.

Libération du moteur précédent…

Terminé. Changez la charge ou la taille et relancez pour comparer.

{{requested}} → {{backend}}

Moteur

Note

I/s

Image p50

Image p95

Thread principal / image

Première image

Passage

Terminé

Arrêté : une image a pris plus de 2 s

N'a pas démarré

Fluidité ({{weight}} %)

Stabilité ({{weight}} %)

Marge ({{weight}} %)

Démarrage ({{weight}} %)

{{value}} / 100

Excellent

Bon

Passable

Faible

thread principal : {{value}} de celui de Canvas2D

Résultats du banc d'essai par moteur

Note de chaque moteur répartie en ses quatre composantes

Mesure de {{backend}} ({{index}} sur {{total}})…

Préparation du passage suivant…

Terminé : mêmes données, même trajet de caméra, un moteur à la fois.

Résultats copiés en tableau Markdown.

Prêt.

Ignorés (GPU logiciel) : {{backends}}.

Écran : {{value}} Hz, budget d'image {{budget}} ms

Copier les résultats

{{workload}}, {{count}} points, écran {{refresh}} Hz

Lancer le test de montée en charge

Lancez le test : chaque moteur matériel dessine 10K, 100K, 1M et 2M points pendant 1,5 s chacun (environ une minute).

Points

Images par seconde

Thread principal par image

Images par seconde selon le nombre de points et le moteur, {{workload}}

Temps de thread principal par image selon le nombre de points et le moteur, {{workload}}

Mesure de {{backend}} avec {{count}} points ({{index}} sur {{total}})…

Terminé. Les courbes plates suivent l'écran, celles qui montent suivent les données.

Les GPU logiciels sont ignorés ; les axes sont logarithmiques, sauf celui des images par seconde.

Moteur de rendu

Une courbe de {{count}} points dessinée avec le moteur choisi

Changements de moteur

{{backend}} prêt en {{ms}}

{{requested}} demandé : {{backend}} prêt en {{ms}}

Dessiné avec {{backend}}.

Démarrage du moteur…

Les données, le zoom et le survol survivent au changement.

Perdre le GPU

Repartir de WebGPU

{{backend}} (perdu)

{{backend}} perdu

Repris sur {{backend}} en {{ms}}

Démarré sur {{backend}}

Une courbe de {{count}} points qui se replie quand son GPU est perdu

Pertes et reprises

Ce navigateur ne permet pas de simuler une perte de {{backend}} depuis une page.

Fin de la chaîne : Canvas2D n'a pas besoin de GPU.

Dessiné avec {{backend}}.

Une vraie perte survient lors d'une mise à jour du pilote, d'une réinitialisation du GPU ou quand le navigateur évince un contexte.

```tsx
// default: the first backend that starts, best first
<LineChart series={series} />                     // renderer="auto"

// a forced backend; if it cannot start, the next one in the chain
<LineChart series={series} renderer="webgl2" />

// which backend is drawing (again after a fallback)
<LineChart
  series={series}
  onRendererChange={(kind: ChartRendererKind) => setBackend(kind)}
/>

// every chart whose renderer is unset or "auto", in every framework
setDefaultChartRenderer("canvas2d");
```

```ts
const budget = 1000 / refreshRate; // ms per frame: 16.7 at 60 Hz

const smooth = clamp(fps / refreshRate); // keeps up with the display
const stability = clamp(budget / p95FrameTime); // no long frames
const headroom = clamp(1 - mainThreadPerFrame / budget); // CPU left for the app
const startup = clamp(1 - timeToFirstFrame / 1000); // chart on screen quickly

const score = Math.round(
  100 * (0.4 * smooth + 0.2 * stability + 0.25 * headroom + 0.15 * startup),
); // clamp: between 0 and 1
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
