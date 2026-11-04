# Hooks

Les hooks de bas niveau utilisés par ConfigProvider : gérez vous-même le thème, la langue et les traductions de la bibliothèque React.

Package: minerva-design@1.20.6

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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
