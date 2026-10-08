// `react-native` of the docs site (vite.config.ts aliases it here): the
// React Native components of minerva-design/native render through
// react-native-web, except `Modal`, which renders inside the phone frame of
// the preview instead of covering the whole docs page (./FramedModal.tsx).
export * from "react-native-web";
export { FramedModal as Modal } from "./FramedModal";

// react-native-web's Animated reads React Native's `global` at run time
// (requestAnimationFrame / cancelAnimationFrame of a running animation)
const scope = globalThis as typeof globalThis & { global?: typeof globalThis };
scope.global ??= globalThis;
