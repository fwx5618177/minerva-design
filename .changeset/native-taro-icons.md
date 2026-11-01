---
"minerva-design": minor
---

React Native and Taro icons: the new entries `minerva-design/native/icons` and `minerva-design/taro/icons` export `Icon`, `DynamicIcon`, `createIcon` and one component per icon (`SearchIcon`…), colored by the theme text color by default. React Native draws with `react-native-svg` (an optional peer dependency, only needed by this entry; `minerva-design/native` does not import it); on the web (react-native-web, Expo web) the icons get ARIA attributes instead of the React Native accessibility props. Taro renders an `Image` with an SVG data URI and works in mini-programs and H5. The icon core adds `toSvgBase64DataUri`.
