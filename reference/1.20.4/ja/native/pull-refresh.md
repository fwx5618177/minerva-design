# PullRefresh プル更新

ネイティブの操作と共通デザイントークンを使うプル更新。

Package: minerva-design@1.20.4

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## PullRefresh

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PullRefresh"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "refreshing",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled refreshing state; unset, it follows the promise returned by `onRefresh`"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the pull"
  },
  {
    "name": "pullingText",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text while pulling (iOS)"
  },
  {
    "name": "loosingText",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text when releasing would refresh (iOS)"
  },
  {
    "name": "loadingText",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text while refreshing"
  },
  {
    "name": "successText",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text after a refresh"
  },
  {
    "name": "successDuration",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 500,
    "required": false,
    "description": "How long the success text stays, in ms (0: none)"
  }
]
```

### events

```json
[
  {
    "name": "onRefresh",
    "source": "packages/native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "function",
    "typeText": "(() => unknown) | undefined",
    "typeRef": "type:33cf6ad5836c837fcc29",
    "parameters": [],
    "returnType": {
      "typeText": "unknown",
      "typeRef": "type:dc96c0cac9f2d6c9a926"
    },
    "required": false,
    "description": "Called on a pull; may return a promise (refreshing until it settles)"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "native:PullRefreshProps": {
    "source": "native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ScrollViewProps, \"refreshControl\" | \"children\">"
    ],
    "props": [
      {
        "name": "refreshing",
        "type": "boolean",
        "required": false,
        "description": "Controlled refreshing state; unset, it follows the promise returned by `onRefresh`"
      },
      {
        "name": "onRefresh",
        "type": "() => unknown",
        "required": false,
        "description": "Called on a pull; may return a promise (refreshing until it settles)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the pull"
      },
      {
        "name": "pullingText",
        "type": "string",
        "required": false,
        "default": "the \"pullRefresh.pulling\" message",
        "description": "Text while pulling (iOS)"
      },
      {
        "name": "loosingText",
        "type": "string",
        "required": false,
        "default": "the \"pullRefresh.loosing\" message",
        "description": "Text when releasing would refresh (iOS)"
      },
      {
        "name": "loadingText",
        "type": "string",
        "required": false,
        "default": "the \"pullRefresh.loading\" message",
        "description": "Text while refreshing"
      },
      {
        "name": "successText",
        "type": "string",
        "required": false,
        "default": "the \"pullRefresh.success\" message",
        "description": "Text after a refresh"
      },
      {
        "name": "successDuration",
        "type": "number",
        "required": false,
        "default": "500",
        "description": "How long the success text stays, in ms (0: none)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Scrollable content"
      }
    ]
  },
  "native:UsePullRefreshOptions": {
    "source": "native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "refreshing",
        "type": "boolean",
        "required": false,
        "description": "Controlled refreshing state (unset: follows the `onRefresh` promise)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the pull"
      },
      {
        "name": "successDuration",
        "type": "number",
        "required": false,
        "default": "500",
        "description": "How long the success status stays, in ms (0: none)"
      }
    ]
  },
  "native:UsePullRefreshResult": {
    "source": "native/src/components/PullRefresh/PullRefresh.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "refreshing",
        "type": "boolean",
        "required": true,
        "description": "Whether a refresh is running"
      },
      {
        "name": "status",
        "type": "Exclude<PullRefreshStatus, \"pulling\" | \"loosing\">",
        "required": true,
        "description": "Current status (\"success\" for `successDuration` after a refresh)"
      },
      {
        "name": "refresh",
        "type": "() => void",
        "required": true,
        "description": "Starts a refresh (what a pull does)"
      },
      {
        "name": "refreshControl",
        "type": "ReactElement<RefreshControlProps>",
        "required": true,
        "description": "A themed `RefreshControl`: pass it as the `refreshControl` of a `FlatList`, `SectionList` or `ScrollView`"
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

### apps/docs/src/docs/pages/pull-refresh/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Cell, PullRefresh, useTheme } from "minerva-design/native";

const DEALS = ["Pizza -30%", "Free delivery", "Sushi 2 for 1", "Tacos -20%"];

export default function Basic() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [round, setRound] = useState(1);
  const reload = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRound((n) => n + 1);
      setRefreshing(false);
    }, 1500);
  };
  return (
    <View style={{ gap: 12 }}>
      <Button size="small" onPress={reload} disabled={refreshing}>
        Refresh deals
      </Button>
      <PullRefresh
        refreshing={refreshing}
        onRefresh={reload}
        loadingText="Finding new deals..."
        successText="Deals updated"
        successDuration={1200}
        style={{ height: 300 }}
      >
        <Text style={{ color: colors["text-muted-color"], padding: 12 }}>
          Pull down to refresh · update #{round}
        </Text>
        {DEALS.map((deal) => (
          <Cell key={deal} title={deal} value={`Round ${round}`} />
        ))}
      </PullRefresh>
    </View>
  );
}

```

## Example: use-pull-refresh

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/pull-refresh/native/use-pull-refresh.tsx

```tsx
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button, Cell, usePullRefresh, useTheme } from "minerva-design/native";

const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));

export default function UsePullRefresh() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState(["Anna: See you at 7?"]);
  const { refreshControl, refresh, status } = usePullRefresh(
    async () => {
      await wait(1200);
      setMessages((list) => [`New message #${list.length + 1}`, ...list]);
    },
    { successDuration: 1000 },
  );
  const label = {
    idle: "Pull the list or press the button",
    loading: "Checking for messages...",
    success: "Inbox up to date",
  }[status];
  return (
    <View style={{ gap: 12 }}>
      <Button size="small" onPress={refresh} loading={status === "loading"}>
        Check messages
      </Button>
      <Text style={{ color: colors["text-secondary-color"] }}>{label}</Text>
      <FlatList
        style={{ height: 260 }}
        data={messages}
        keyExtractor={(item) => item}
        refreshControl={refreshControl}
        renderItem={({ item }) => <Cell title={item} isLink />}
      />
    </View>
  );
}

```
