import { defineHooks } from "../types";

export default defineHooks({
  description:
    "A picture of a person, falling back to their initials or custom content",
  react: ["Avatar"],
  wc: "minerva-avatar",
  parts: {
    root: {
      description:
        "The avatar box (role=img while the fallback is shown); no size state for a size in pixels",
    },
    image: { description: "The <img>" },
    fallback: {
      description: "The initials / fallback content wrapper (no image)",
    },
  },
  states: {
    size: ["xsmall", "small", "medium", "large", "xlarge", "xxlarge"],
    shape: ["circle", "square", "rounded"],
  },
});
