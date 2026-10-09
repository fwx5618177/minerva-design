import { test } from "node:test";
import assert from "node:assert/strict";
import { migrateSource } from "./migrate-novel-ui.mjs";
import { migrateStyles } from "./migrate-novel-styles.mjs";

test("migrates dynamic imports and Vitest mocks without rewriting shadowed helpers or arbitrary strings", () => {
  const { source } = migrateSource(`import { vi as testApi } from 'vitest';
testApi.mock('@novel-isr/ui', () => testApi.importActual('@novel-isr/ui'));
const lazy = import('@novel-isr/ui');
const label = '@novel-isr/ui';
function other(testApi) { return testApi.mock('@novel-isr/ui'); }`);
  assert.match(source, /testApi.mock\('minerva-design'/);
  assert.match(source, /testApi.importActual\('minerva-design'/);
  assert.match(source, /import\('minerva-design'\)/);
  assert.match(source, /const label = '@novel-isr\/ui'/);
  assert.match(source, /return testApi.mock\('@novel-isr\/ui'/);
});

test("maps semantic theme tokens and public hooks while preserving app classes and unknown tokens", () => {
  const { source, warnings } = migrateStyles(
    ".ui-button:hover { color: var(--ui-color-fg); padding: var(--ui-space-3); background: var(--ui-color-brand-50); } .ui-eyebrow { --custom: var(--ui-unknown); }",
  );
  assert.match(source, /\[data-minerva="button"\]\[data-part="root"\]:hover/);
  assert.match(source, /var\(--text-color\)/);
  assert.match(source, /var\(--primary-color-subtle\)/);
  assert.match(source, /var\(--space-3\)/);
  assert.match(source, /\.ui-eyebrow/);
  assert.equal(warnings.length, 1);
});

test("renames imports and component contracts while preserving aliases and unrelated controls", () => {
  const code = `import { Button as Action, Spinner, toast } from '@novel-isr/ui';
const view = <Action size="sm" colorScheme="brand" isLoading leftIcon={<i/>}>Save</Action>;
const spinner = <Spinner size="md"/>;
const native = <input size={2}/>;
toast.error('Failed');`;
  const { source, warnings } = migrateSource(code, "example.tsx");
  assert.match(source, /from 'minerva-design'/);
  assert.match(source, /ProgressIndicator as Spinner/);
  assert.match(source, /size="small" color="primary" loading startIcon/);
  assert.match(source, /<Spinner size="medium"/);
  assert.match(source, /<input size=\{2\}/);
  assert.match(source, /toast.danger/);
  assert.deepEqual(warnings, []);
});

test("adapts Modal closing without invoking the old handler on opening", () => {
  const { source } = migrateSource(
    `import { Modal } from '@novel-isr/ui'; const v=<Modal isOpen={shown} onClose={close}/>`,
    "example.tsx",
  );
  assert.match(source, /open=\{shown\}/);
  assert.match(
    source,
    /onOpenChange=\{\(open\) => \{ if \(!open\) \(close\)\(\); \}\}/,
  );
});

test("does not guess a new color for secondary or accent", () => {
  const { source, warnings } = migrateSource(
    `import { Button } from '@novel-isr/ui'; const v=<Button colorScheme="accent"/>`,
    "example.tsx",
  );
  assert.match(source, /color="accent"/);
  assert.match(warnings.join("\n"), /accent/);
});

test("preserves colorScheme precedence over intent and flags complex option migration", () => {
  const { source, warnings } = migrateSource(
    `import { Button, Autocomplete } from '@novel-isr/ui'; const a=<Button intent="danger" colorScheme="brand"/>; const b=<Autocomplete options={items}/>`,
    "example.tsx",
  );
  assert.match(source, /color="primary"/);
  assert.doesNotMatch(source, /intent=/);
  assert.match(source, /AutoComplete as Autocomplete/);
  assert.match(warnings.join("\n"), /options/);
});

test("leaves shadowed names alone and updates stylesheet entries", () => {
  const { source } = migrateSource(
    `import { Button } from '@novel-isr/ui'; import '@novel-isr/ui/styles.css'; function local(Button: any) { return <Button size="sm"/>; } const x=<Button size="sm"/>;`,
    "example.tsx",
  );
  assert.match(
    source,
    /function local\(Button: any\) \{ return <Button size="sm"/,
  );
  assert.match(source, /const x=<Button size="small"/);
  assert.match(source, /minerva-design\/style.css/);
});

test("maps conditional values without changing their conditions or unrelated strings", () => {
  const { source } = migrateSource(
    `import { Badge, Spinner, Checkbox, CommandDialog, PopoverContent, confirm } from '@novel-isr/ui';
const x=<Badge colorScheme={kind === 'brand' ? 'brand' : 'gray'}/>;
const s=<Spinner size={busy ? 'md' : 'lg'}/>;
const c=<Checkbox isInvalid={invalid}/>; const d=<CommandDialog isOpen={open}/>;
const p=<PopoverContent showArrow/>; confirm({intent: 'danger'});`,
    "example.tsx",
  );
  assert.match(source, /kind === 'brand' \? "primary" : "neutral"/);
  assert.match(source, /busy \? "medium" : "large"/);
  assert.match(source, /<Checkbox error=\{invalid\}/);
  assert.match(source, /<CommandDialog open=\{open\}/);
  assert.match(source, /<PopoverContent arrow/);
  assert.match(source, /confirm\(\{color: 'danger'\}\)/);
});

test("combines pagination callbacks and explicitly enables its size control", () => {
  const { source } = migrateSource(
    `import { Pagination } from '@novel-isr/ui'; const v=<Pagination onPageChange={setPage} onPageSizeChange={setSize}/>`,
    "consumer.tsx",
  );
  assert.match(
    source,
    /onChange=\{\(page, pageSize\) => \{ \(setSize\)\(pageSize\); \(setPage\)\(page\); \}\}/,
  );
  assert.match(source, /showSizeChanger/);
  assert.doesNotMatch(source, /onPageSizeChange/);
});

test("migrates tooltip placement and delay but flags explicit color policy", () => {
  const { source, warnings } = migrateSource(
    `import { Tooltip } from '@novel-isr/ui'; const v=<Tooltip side="right" align="start" delayDuration={400} showArrow tone="dark"/>`,
    "consumer.tsx",
  );
  assert.match(source, /placement="right-start"/);
  assert.match(source, /enterDelay=\{400\}/);
  assert.match(source, /arrow/);
  assert.doesNotMatch(source, /\balign=/);
  assert.match(warnings.join("\n"), /tone/);
});
