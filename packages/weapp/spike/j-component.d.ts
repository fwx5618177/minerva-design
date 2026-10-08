// j-component@1.4.10 implements addEventListener/removeEventListener on
// Component (src/render/component.js) but omits them from index.d.ts.
import "j-component";

declare module "j-component" {
  interface Component<TData, TProperty, TMethod> {
    addEventListener(
      eventName: string,
      handler: (event: { detail: any; type: string }) => void,
      capture?: boolean | { capture?: boolean },
    ): void;
    removeEventListener(
      eventName: string,
      handler: (event: { detail: any; type: string }) => void,
      capture?: boolean | { capture?: boolean },
    ): void;
  }
}
