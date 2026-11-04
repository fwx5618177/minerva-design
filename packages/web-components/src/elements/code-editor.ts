// Registers <minerva-code-editor> (Monaco). Optional entry: not part of the
// all-in-one entry nor of cdn/minerva.js, and without a CDN file of its own;
// requires the optional peer dependency `monaco-editor` (pass the engine as
// the `monaco` property).
import { MinervaCodeEditor } from "../components/code-editor/code-editor";
import { defineElement } from "../internal/define";

defineElement(MinervaCodeEditor);

export * from "../components/code-editor/code-editor";
