// Server entry (vite build --ssr): renders the app to HTML in Node.
import { renderToString } from "react-dom/server";
import { THEME_INIT_SCRIPT } from "minerva-design/theme-utils";
import { App } from "./App";

export const render = () => renderToString(<App />);
export const themeScript = THEME_INIT_SCRIPT;
