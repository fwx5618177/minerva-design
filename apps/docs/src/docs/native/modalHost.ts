import { createContext } from "react";

/** Element hosting the React Native modals of a phone frame */
export const ModalHostContext = createContext<HTMLElement | null>(null);
