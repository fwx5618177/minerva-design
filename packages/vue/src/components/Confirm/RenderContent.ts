import type { FunctionalComponent } from "vue";
import type { ConfirmContent } from "./types";

/** Renders a `ConfirmContent` (string or render function); internal. */
const RenderContent: FunctionalComponent<{ content?: ConfirmContent }> = ({
  content,
}) => (typeof content === "function" ? content() : content) as never;
RenderContent.props = ["content"];

export default RenderContent;
