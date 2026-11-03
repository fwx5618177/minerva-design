---
"minerva-design": patch
---

Taro: the parts of a component no longer carry the class of its root. `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter` (and the parts of the other Taro components) used to get `mn-card` too, so each drew its own card border, background and shadow inside the card; they now only have their `mn-<name>__<part>` class. `CardDescription` no longer adds side padding inside `CardHeader`.
