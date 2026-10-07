import React from "react";
import { createRoot } from "react-dom/client";
import "@minerva/lib-core/style.css";
import "@styles/global.scss";
import "@minerva/lib-web-components";
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
