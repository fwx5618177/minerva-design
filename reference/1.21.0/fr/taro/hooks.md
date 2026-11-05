# Hooks

Les hooks de bas niveau utilisés par ConfigProvider : gérez vous-même le thème, la langue et les traductions de la bibliothèque React.

Package: minerva-design@1.21.0

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Référence

Tous les hooks et utilitaires sont exportés depuis minerva-design.

Hook

Signature

Conserve le thème actif dans l'état et, en dehors d'un ConfigProvider, l'écrit sous forme de variables CSS sur . Avec "auto" ou une paire { light, dark }, il s'abonne à prefers-color-scheme et se désabonne au démontage. Renvoie le thème configuré, son setter et le schéma système actuel. Dans un ConfigProvider, il ne gère que l'état : le provider racine gère .

Conserve la locale dans l'état et, en dehors d'un ConfigProvider, change la langue des textes intégrés de la bibliothèque React (en, zh, ja ou fr). Renvoie la locale et son setter. Dans un ConfigProvider, il ne gère que l'état : le provider racine gère la langue globale.

Renvoie { t, language } : t traduit les textes intégrés de la bibliothèque React avec son petit traducteur maison (clés imbriquées, interpolation des variables, pluriels via count, defaultValue) et language est la langue dans laquelle il traduit. t suit la locale du ConfigProvider imbriqué le plus proche qui en définit une, sinon la langue globale de la bibliothèque React. la bibliothèque React ne dépend d'aucune bibliothèque i18n : la configuration i18n de votre application n'est jamais affectée.

État ouvert / fermé des overlays (Modal, Drawer, Popover...), contrôlé (isOpen + onChange) ou non contrôlé (defaultIsOpen). Renvoie isOpen et des callbacks stables onOpen, onClose et onToggle.

Concatène des noms de classes en ignorant les valeurs falsy (false, null, undefined, 0, chaînes vides). Une petite alternative sans dépendance à classnames pour les classes conditionnelles.

useAutoTheme et useLocale ne modifient l'état global (variables CSS sur , langue de la bibliothèque React) que lorsqu'aucun ConfigProvider ne se trouve au-dessus d'eux. Ce site en a un à la racine : les démos ci-dessous passent l'état du hook à un ConfigProvider imbriqué, qui ne l'applique qu'à l'aperçu.

### Utiliser les hooks sans ConfigProvider

Si vous n'avez pas besoin de useConfig(), vous pouvez appeler useAutoTheme et useLocale directement, à la place d'un provider. Dans un provider, ils ne font que conserver l'état : passez-le à un ConfigProvider imbriqué pour l'appliquer à un sous-arbre.

```tsx
import { Button, useAutoTheme, useLocale } from "minerva-design";

// This is what ConfigProvider does internally. Use the hooks instead of
// (not inside) a ConfigProvider: both write the same global state.
export function ThemeAndLanguage() {
  const [theme, setTheme] = useAutoTheme("auto");
  const [locale, setLocale] = useLocale({ language: "fr" });

  return (
    <>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme
      </Button>
      <Button onClick={() => setLocale({ language: "en" })}>
        {locale.language}
      </Button>
    </>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
