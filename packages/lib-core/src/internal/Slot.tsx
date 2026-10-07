import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { composeEventHandlers } from "./composeEventHandlers";
import { useMergedRefs } from "./mergeRefs";

type AnyProps = Record<string, unknown>;
type Handler = (...args: unknown[]) => unknown;

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

const HANDLER_RE = /^on[A-Z]/;

/**
 * Merge the Slot's props onto its child's props.
 * - Event handlers (`on[A-Z]*`): composed, child first then slot. Like Radix,
 *   the slot handler still runs when the child called `preventDefault()` (it
 *   can inspect `event.defaultPrevented`); components wanting that opt-out
 *   compose their own handlers with `composeEventHandlers`.
 * - `className`: concatenated, slot first then child.
 * - `style`: shallow-merged, child keys win.
 * - Everything else: the child's value wins (as in Radix, even `undefined`).
 * `ref` is not handled here (see `Slot`).
 */
export function mergeProps(
  slotProps: AnyProps,
  childProps: AnyProps,
): AnyProps {
  const merged: AnyProps = { ...slotProps };
  for (const key of Object.keys(childProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (HANDLER_RE.test(key)) {
      merged[key] =
        typeof slotValue === "function" && typeof childValue === "function"
          ? composeEventHandlers(childValue as Handler, slotValue as Handler, {
              checkForDefaultPrevented: false,
            })
          : (childValue ?? slotValue);
    } else if (key === "className") {
      merged[key] =
        [slotValue, childValue].filter(Boolean).join(" ") || undefined;
    } else if (key === "style") {
      merged[key] = {
        ...(slotValue as CSSProperties | undefined),
        ...(childValue as CSSProperties | undefined),
      };
    } else {
      merged[key] = childValue;
    }
  }
  return merged;
}

/** Marks which child of a `Slot` is the element that receives its props. */
export const Slottable = ({ children }: { children?: ReactNode }) => (
  <>{children}</>
);

const isSlottable = (
  child: ReactNode,
): child is ReactElement<{
  children?: ReactNode;
}> => isValidElement(child) && child.type === Slottable;

/** Throws React's "expected a single child" error, like `Children.only`. */
const throwSingleChild = (): never => Children.only(null) as never;

type ElementWithRef = ReactElement<AnyProps & { ref?: Ref<unknown> }>;

const SlotClone = ({ children, ref, ...slotProps }: SlotProps & AnyProps) => {
  const element = isValidElement(children)
    ? (children as ElementWithRef)
    : null;
  // React 19: refs are plain props on the element.
  const childRef = element?.props.ref as Ref<HTMLElement> | undefined;
  const mergedRef = useMergedRefs<HTMLElement>(ref, childRef);

  if (!element) {
    return Children.count(children) > 1 ? throwSingleChild() : null;
  }
  const props = mergeProps(slotProps, element.props);
  // Fragments can't hold refs.
  if (element.type !== Fragment) props.ref = ref ? mergedRef : childRef;
  return cloneElement(element, props);
};

/**
 * Slot: renders its single child element instead of a DOM node of its own,
 * merging its props (see `mergeProps`) and ref onto that child. With a
 * `Slottable` among the children, the Slottable's child receives the props and
 * the other children are rendered inside it. Non-element children render
 * nothing; several children throw (`Children.only` semantics).
 */
export const Slot = ({ children, ...slotProps }: SlotProps) => {
  const childArray = Children.toArray(children);
  const slottable = childArray.find(isSlottable);
  if (!slottable) return <SlotClone {...slotProps}>{children}</SlotClone>;

  const target = slottable.props.children;
  if (Children.count(target) > 1) throwSingleChild();
  const newChildren = childArray.map((child) =>
    child === slottable && isValidElement<{ children?: ReactNode }>(target)
      ? target.props.children
      : child,
  );
  return (
    <SlotClone {...slotProps}>
      {isValidElement(target)
        ? cloneElement(target, undefined, newChildren)
        : null}
    </SlotClone>
  );
};

export default Slot;
