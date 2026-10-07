import frIndex from "./index.json";
import data from "./groups/data.json";
import display from "./groups/display.json";
import feedback from "./groups/feedback.json";
import forms from "./groups/forms.json";
import general from "./groups/general.json";
import inputs from "./groups/inputs.json";
import layout from "./groups/layout.json";
import overlays from "./groups/overlays.json";
import theme from "./groups/theme.json";
import { mergeMessages, type Messages } from "../../merge";

// Strings of each component group live in groups/<group>.json and are merged
// (deeply) on top of index.json into a single message tree.
const messages: Messages = mergeMessages<Messages>(
  frIndex,
  data,
  display,
  feedback,
  forms,
  general,
  inputs,
  layout,
  overlays,
  theme,
);

export default messages;
