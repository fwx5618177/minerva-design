import React from "react";
import { createRoot } from "react-dom/client";
// Self-hosted Geist (font-display: swap), before the library stylesheet
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import "minerva-design/style.css";
import "@styles/global.scss";
import "minerva-design/web-components";
import App from "./App";
import i18n, { loadLanguage } from "@i18n/config";

const container = document.getElementById("root");
const root = createRoot(container!);

const render = () =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

// Render once the current language's documentation strings are loaded
loadLanguage(i18n.language).then(render, render);
