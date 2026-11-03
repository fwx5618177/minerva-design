# ImagePreview 图片预览

使用原生移动控件和共享设计变量构建的图片预览。

Package: minerva-design@1.20.0

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## ImagePreview

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ImagePreview"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "images",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "array",
    "typeText": "readonly ImagePreviewImage[]",
    "typeRef": "type:d66743b3b847828aad56",
    "required": true,
    "description": "Images to page through"
  },
  {
    "name": "open",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "index",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Index of the shown image (controlled; pair with `onChange`)"
  },
  {
    "name": "defaultIndex",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Index of the image shown first (uncontrolled)"
  },
  {
    "name": "closeOnPress",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Closes on a press on the image"
  },
  {
    "name": "showIndex",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the \"index / total\" counter"
  },
  {
    "name": "closeable",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the close button"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the viewer"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: ImagePreviewCloseReason | undefined) => void) | undefined",
    "typeRef": "type:3e3a95d931d3fc98fe77",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "reason",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "ImagePreviewCloseReason | undefined",
        "typeRef": "type:4f02429a28e700751955"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested open state and, when closing, the reason (\"close-button\", \"image\" for a press on the image, \"back\")"
  },
  {
    "name": "onChange",
    "source": "packages/native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "function",
    "typeText": "((index: number) => void) | undefined",
    "typeRef": "type:3df1395da7e7d7172583",
    "parameters": [
      {
        "name": "index",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the index of the image paged to"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## API

```json
{
  "native:ImagePreviewProps": {
    "source": "native/src/components/ImagePreview/ImagePreview.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "images",
        "type": "readonly ImagePreviewImage[]",
        "required": true,
        "description": "Images to page through"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean, reason?: ImagePreviewCloseReason) => void",
        "required": false,
        "description": "Called with the requested open state and, when closing, the reason (\"close-button\", \"image\" for a press on the image, \"back\")"
      },
      {
        "name": "index",
        "type": "number",
        "required": false,
        "description": "Index of the shown image (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultIndex",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Index of the image shown first (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(index: number) => void",
        "required": false,
        "description": "Called with the index of the image paged to"
      },
      {
        "name": "closeOnPress",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Closes on a press on the image"
      },
      {
        "name": "showIndex",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the \"index / total\" counter"
      },
      {
        "name": "closeable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the close button"
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false,
        "default": "the \"imagePreview.label\" message",
        "description": "Accessible label of the viewer"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "default": "the \"imagePreview.close\" message",
        "description": "Accessible label of the close button"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the full-screen container"
      },
      {
        "name": "testID",
        "type": "string",
        "required": false
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/image-preview/native/basic.tsx

```tsx
import { useState } from "react";
import { Image, View } from "react-native";
import { Button, ImagePreview } from "minerva-design/native";

const IMAGES = [1015, 1016, 1018, 1019].map(
  (id) => `https://picsum.photos/id/${id}/600/400`,
);

export default function Basic() {
  const [start, setStart] = useState<number | null>(null);
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {IMAGES.map((uri, i) => (
        <Button
          variant="ghost"
          style={{ paddingHorizontal: 0, paddingVertical: 0 }}
          key={uri}
          accessibilityRole="imagebutton"
          accessibilityLabel={`Hotel photo ${i + 1}`}
          onPress={() => setStart(i)}
        >
          <Image
            source={{ uri }}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
        </Button>
      ))}
      <ImagePreview
        images={IMAGES}
        open={start !== null}
        index={start ?? 0}
        onChange={setStart}
        onOpenChange={(open) => !open && setStart(null)}
      />
    </View>
  );
}

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/image-preview/native/controlled.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, ImagePreview, useTheme } from "minerva-design/native";

const IMAGES = [1040, 1043, 1044, 1047, 1050].map(
  (id) => `https://picsum.photos/id/${id}/600/400`,
);

export default function Controlled() {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(2);
  const [reason, setReason] = useState("-");
  return (
    <View style={{ gap: 12 }}>
      <Button onPress={() => setOpen(true)}>View review photos</Button>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Photo {index + 1} of {IMAGES.length} · last closed by: {reason}
      </Text>
      <ImagePreview
        images={IMAGES}
        open={open}
        onOpenChange={(next, why) => {
          setOpen(next);
          if (why) setReason(why);
        }}
        index={index}
        onChange={setIndex}
        closeOnPress={false}
      />
    </View>
  );
}

```
