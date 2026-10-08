// Client entry: the global stylesheet once, the React app and one element.
import { hydrateRoot } from "react-dom/client";
import "minerva-design/style.css";
import "minerva-design/web-components/button";
import { App } from "./App";

hydrateRoot(document.getElementById("root")!, <App />);
