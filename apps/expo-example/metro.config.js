// Expo's default Metro config: it detects the pnpm workspace (watch folders,
// node_modules lookup) and resolves package exports (SDK 57 / RN 0.86), so
// `minerva-design/native` resolves through the `react-native` condition of
// minerva-design's exports map, like in any app. No custom resolver.
const { getDefaultConfig } = require("expo/metro-config");

module.exports = getDefaultConfig(__dirname);
