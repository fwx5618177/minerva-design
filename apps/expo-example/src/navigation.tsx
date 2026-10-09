// A minimal stack navigator on React state: no router dependency. The home
// screen is the root; category screens are pushed on top of it. The NavBar
// back button and the Android hardware back button pop the stack.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BackHandler } from "react-native";

export type CategoryRoute =
  | "advanced"
  | "document-preview"
  | "virtual-list"
  | "general"
  | "forms"
  | "feedback"
  | "overlays"
  | "navigation"
  | "data"
  | "mobile"
  | "theming";

export type Route = "home" | CategoryRoute;

interface NavigationValue {
  /** Route on top of the stack */
  route: Route;
  /** Number of screens in the stack (1 on the home screen) */
  depth: number;
  push: (route: CategoryRoute) => void;
  /** Pops the top screen; false when already on the home screen */
  pop: () => boolean;
}

const NavigationContext = createContext<NavigationValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<Route[]>(["home"]);

  const push = useCallback((route: CategoryRoute) => {
    setStack((s) => [...s, route]);
  }, []);

  const pop = useCallback(() => {
    if (stack.length <= 1) return false;
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
    return true;
  }, [stack.length]);

  // Android hardware back: pop a screen, or let the OS close the app on home.
  // Open overlays (Modal-based) consume the back press before it gets here.
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", pop);
    return () => sub.remove();
  }, [pop]);

  const value = useMemo<NavigationValue>(
    () => ({ route: stack[stack.length - 1], depth: stack.length, push, pop }),
    [stack, push, pop],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationValue {
  const value = useContext(NavigationContext);
  if (!value) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }
  return value;
}
