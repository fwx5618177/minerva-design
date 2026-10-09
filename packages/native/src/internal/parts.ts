// Styling hooks on React Native: the same `data-minerva` / `data-part`
// vocabulary as the web renderers, passed as `dataSet` (react-native-web
// renders it as `data-*` attributes; native platforms ignore it). Tests and
// the contract driver find parts through it.

/** Props marking a host view as a part of a component */
export const part = (
  component: string,
  name: string,
  state?: Record<string, string | boolean | undefined>,
): object => {
  const dataSet: Record<string, string> = { minerva: component, part: name };
  for (const [key, value] of Object.entries(state ?? {})) {
    if (value === undefined || value === false) continue;
    dataSet[key] = value === true ? "" : value;
  }
  return { dataSet };
};
