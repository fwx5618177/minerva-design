// A finite, referenced type graph. External library / DOM types stay named
// leaves: consumers can construct local data without expanding all React/DOM.
import { createHash } from "node:crypto";
import ts from "typescript";
import { portableTypes, publicModulePath } from "./portable-types.mjs";
export const typeGraph = {};
const caches = new WeakMap();
const hash = (value) =>
  createHash("sha256").update(value).digest("hex").slice(0, 20);
function cacheFor(checker) {
  if (!caches.has(checker))
    caches.set(checker, {
      identities: new WeakMap(),
      active: new WeakMap(),
      descriptions: new WeakMap(),
    });
  return caches.get(checker);
}
const declarationIdentity = (declaration) =>
  `${publicModulePath(declaration.getSourceFile().fileName)}:${declaration.pos}:${declaration.end}:${declaration.kind}`;
function symbolIdentity(symbol) {
  if (!symbol) return undefined;
  const name = /^["'].*["']$/.test(symbol.name)
    ? publicModulePath(symbol.name.slice(1, -1))
    : portableTypes(symbol.name);
  return [name, ...(symbol.declarations ?? []).map(declarationIdentity).sort()];
}
/**
 * Printed type names are not identities: Array<Column> can refer to a distinct
 * Column in every renderer. Include declaration anchors recursively through
 * aliases, unions, generic arguments and anonymous wrappers. Named local
 * declarations anchor recursion; ephemeral TypeScript type IDs never enter the
 * artifact. Caches belong to checker/type objects, never printed names.
 */
function typeIdentity(checker, type) {
  const cache = cacheFor(checker);
  if (cache.identities.has(type)) return cache.identities.get(type);
  const symbol = type.getSymbol();
  const text = portableTypes(
    checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation),
  );
  const anchor = JSON.stringify([
    text,
    symbolIdentity(type.aliasSymbol),
    symbolIdentity(symbol),
  ]);
  if (cache.active.has(type)) return `cycle:${hash(cache.active.get(type))}`;
  cache.active.set(type, anchor);
  const identity = [anchor];
  const child = (value) => typeIdentity(checker, value);
  const tuple = checker.isTupleType(type);
  const array = checker.isArrayType(type);
  // Tuple members contain TypeScript-synthesized iterator/unscopables symbols
  // whose names include process-local counters. The container's semantic
  // identity is its constructor, arguments and tuple flags, never inherited
  // Array methods or their recursive signatures.
  if (tuple) {
    const target = type.target ?? type;
    identity.push(["tuple", !!target.readonly, target.elementFlags]);
  } else if (array) identity.push(["array"]);
  const args = checker.getTypeArguments(type);
  if (args.length) identity.push(["arguments", args.map(child)]);
  if (type.aliasTypeArguments?.length)
    identity.push(["aliasArguments", type.aliasTypeArguments.map(child)]);
  if (!type.aliasSymbol && (type.isUnion() || type.isIntersection()))
    identity.push(["members", type.types.map(child).sort()]);
  const anonymous =
    !tuple &&
    !array &&
    !type.aliasSymbol &&
    (!symbol || symbol.name.startsWith("__"));
  if (anonymous) {
    const signatures = type.getCallSignatures();
    if (signatures.length)
      identity.push([
        "signatures",
        signatures.map((signature) => [
          signature.declaration
            ? declarationIdentity(signature.declaration)
            : undefined,
          signature
            .getParameters()
            .map((parameter) => [
              parameter.name,
              child(checker.getTypeOfSymbol(parameter)),
            ]),
          child(checker.getReturnTypeOfSignature(signature)),
        ]),
      ]);
    else if (type.flags & ts.TypeFlags.Object)
      identity.push([
        "fields",
        checker
          .getPropertiesOfType(type)
          .map((field) => [
            field.name,
            !!(field.flags & ts.SymbolFlags.Optional),
            child(checker.getTypeOfSymbol(field)),
          ]),
      ]);
  }
  const result = hash(JSON.stringify(identity));
  cache.active.delete(type);
  cache.identities.set(type, result);
  return result;
}
export function describeType(checker, type) {
  const cache = cacheFor(checker);
  if (cache.descriptions.has(type)) return cache.descriptions.get(type);
  const typeText = portableTypes(
    checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation),
  );
  const symbol = type.aliasSymbol ?? type.getSymbol();
  const declaration = symbol?.declarations?.[0];
  const source = declaration
    ? publicModulePath(declaration.getSourceFile().fileName)
    : undefined;
  const symbolName = symbol?.name;
  // TypeScript names module namespace symbols with a quoted absolute path.
  // These labels need the same package-entry canonicalization as type text.
  const portableName =
    symbolName && /^["'].*["']$/.test(symbolName)
      ? publicModulePath(symbolName.slice(1, -1))
      : portableTypes(symbolName);
  const typeRef = `type:${typeIdentity(checker, type)}`;
  const description = { typeText, typeRef };
  cache.descriptions.set(type, description);
  if (typeGraph[typeRef]) return description;
  const node = (typeGraph[typeRef] = { typeText, kind: "unknown" });
  const ref = (t) => describeType(checker, t).typeRef;
  const nullable =
    !!(type.flags & ts.TypeFlags.Null) ||
    (type.isUnion() && type.types.some((t) => t.flags & ts.TypeFlags.Null));
  const optional =
    !!(type.flags & ts.TypeFlags.Undefined) ||
    (type.isUnion() &&
      type.types.some((t) => t.flags & ts.TypeFlags.Undefined));
  node.nullable = nullable;
  node.optional = optional;
  if (checker.isArrayType(type) || checker.isTupleType(type)) {
    node.kind = checker.isTupleType(type) ? "tuple" : "array";
    const args = checker.getTypeArguments(type);
    if (node.kind === "array") node.elementType = ref(args[0]);
    else node.elements = args.map(ref);
  } else if (
    declaration &&
    /node_modules/.test(declaration.getSourceFile().fileName)
  ) {
    node.kind = "external";
    node.name = portableName;
    node.source = source;
  } else if (type.isUnion()) {
    node.kind = "union";
    node.members = type.types.map(ref);
    const literals = type.types.filter((t) => t.isStringLiteral());
    if (literals.length === type.types.length)
      node.values = literals.map((t) => t.value).sort();
  } else if (type.isStringLiteral() || type.isNumberLiteral()) {
    node.kind = "literal";
    node.value = type.value;
  } else if (type.getCallSignatures().length) {
    node.kind = "function";
    node.signatures = type
      .getCallSignatures()
      .map((s) => describeSignature(checker, s));
  } else if (type.flags & ts.TypeFlags.TypeParameter) {
    node.kind = "parameter";
    node.name = typeText;
    const constraint = checker.getBaseConstraintOfType(type);
    if (constraint) node.constraint = ref(constraint);
  } else if (type.flags & ts.TypeFlags.Object) {
    node.kind = "object";
    if (symbol && !symbol.name.startsWith("__")) node.name = portableName;
    if (source) node.source = source;
    node.fields = checker.getPropertiesOfType(type).map((p) => ({
      name: p.name,
      required: !(p.flags & ts.SymbolFlags.Optional),
      ...describeType(checker, checker.getTypeOfSymbol(p)),
    }));
    const args = type.aliasTypeArguments ?? checker.getTypeArguments(type);
    if (args?.length) node.typeArguments = args.map(ref);
  } else node.kind = "primitive";
  return description;
}
export function describeSignature(checker, signature) {
  return {
    parameters: signature.getParameters().map((p, position) => ({
      name: p.name,
      position,
      required:
        !(p.flags & ts.SymbolFlags.Optional) &&
        !p.valueDeclaration?.questionToken &&
        !p.valueDeclaration?.initializer,
      rest: !!p.valueDeclaration?.dotDotDotToken,
      ...describeType(checker, checker.getTypeOfSymbol(p)),
    })),
    returnType: describeType(
      checker,
      checker.getReturnTypeOfSignature(signature),
    ),
  };
}
export function describeCallback(checker, type) {
  const types = type.isUnion() ? type.types : [type];
  const signature = types.flatMap((t) => t.getCallSignatures())[0];
  return signature ? describeSignature(checker, signature) : {};
}
