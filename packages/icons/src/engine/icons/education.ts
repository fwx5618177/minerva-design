// Education and science icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Graduation cap */
export const graduationCapIcon: IconDefinition = {
  name: "graduation-cap",
  category: "education",
  tags: ["degree", "college", "university", "graduate"],
  paths: [
    "M2 9l10-5 10 5-10 5z",
    "M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5",
    "M22 9v6",
  ],
  colors: [palette.indigo, undefined, undefined],
};

/** Triangle ruler */
export const triangleRulerIcon: IconDefinition = {
  name: "triangle-ruler",
  category: "education",
  tags: ["set-square", "drafting", "geometry", "measure"],
  paths: ["M3 4v16h16z", "M7 16v-4l4 4z"],
};

/** School backpack */
export const backpackIcon: IconDefinition = {
  name: "backpack",
  category: "education",
  tags: ["bag", "school", "student", "pack"],
  paths: [
    "M9 8V6a3 3 0 0 1 6 0v2",
    "M6 8h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-9a2 2 0 0 1 2-2z",
    "M8 13h8v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z",
  ],
};

/** Erlenmeyer flask */
export const flaskConicalIcon: IconDefinition = {
  name: "flask-conical",
  category: "education",
  tags: ["erlenmeyer", "lab", "chemistry", "science"],
  paths: [
    "M9 3h6",
    "M10 3v5",
    "M14 3v5",
    "M10 8l-6 11a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 8",
    "M7.5 16.5h9",
  ],
  colors: [undefined, undefined, undefined, undefined, palette.green],
};

/** Atom with orbiting electrons */
export const atomIcon: IconDefinition = {
  name: "atom",
  category: "education",
  tags: ["science", "physics", "nucleus", "electron"],
  paths: [
    "M7.5 4.2a9 3.5 60 0 1 9 15.6a9 3.5 60 0 1-9-15.6",
    "M7.5 19.8a9 3.5 120 0 1 9-15.6a9 3.5 120 0 1-9 15.6",
    "M10 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  ],
  colors: [undefined, undefined, palette.blue],
};

/** Ruler with measuring marks */
export const rulerIcon: IconDefinition = {
  name: "ruler",
  category: "education",
  tags: ["measure", "length", "scale", "centimeter"],
  paths: ["M3 8h18v8H3z", "M6 8v2", "M9 8v3", "M12 8v4", "M15 8v3", "M18 8v2"],
};

/** Eyeglasses */
export const glassesIcon: IconDefinition = {
  name: "glasses",
  category: "education",
  tags: ["eyeglasses", "vision", "reading", "spectacles"],
  paths: [
    "M3 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M13 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M11 14a2 2 0 0 1 2 0",
    "M3 13L2 9",
    "M21 13l1-4",
  ],
};

/** Brain */
export const brainIcon: IconDefinition = {
  name: "brain",
  category: "education",
  tags: ["mind", "learning", "thinking", "neuro"],
  paths: [
    "M12 5.5C10.5 4 8 4 7 5.5C5 5.5 3.5 7 3.5 9C2.5 10 2.5 12 3.5 13C3 15 4 17.5 6.5 17.5C7 19.5 9.5 20.5 12 19",
    "M12 5.5C13.5 4 16 4 17 5.5C19 5.5 20.5 7 20.5 9C21.5 10 21.5 12 20.5 13C21 15 20 17.5 17.5 17.5C17 19.5 14.5 20.5 12 19",
    "M12 5.5V19",
  ],
};

/** Notebook with ruled lines */
export const notebookIcon: IconDefinition = {
  name: "notebook",
  category: "education",
  tags: ["notes", "journal", "writing", "pad"],
  paths: [
    "M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z",
    "M3 6h3",
    "M3 11h3",
    "M3 16h3",
    "M10 8.5h5",
    "M10 12.5h5",
    "M10 16.5h3",
  ],
};

/** Classroom chalkboard */
export const chalkboardIcon: IconDefinition = {
  name: "chalkboard",
  category: "education",
  tags: ["blackboard", "classroom", "teaching", "board"],
  paths: [
    "M3 4h18v12H3z",
    "M7 16v4",
    "M17 16v4",
    "M7 12c1.5-3 3-3 4 0s2.5 3 4 0",
  ],
};

/** Certificate with seal and ribbon */
export const certificateIcon: IconDefinition = {
  name: "certificate",
  category: "education",
  tags: ["diploma", "award", "credential", "seal"],
  paths: [
    "M3 4h18v12H3z",
    "M12 6a3 3 0 1 0 0 6a3 3 0 1 0 0-6",
    "M8 16v5l4-2 4 2v-5",
  ],
  colors: [undefined, palette.amber, undefined],
};

/** Abacus with beads */
export const abacusIcon: IconDefinition = {
  name: "abacus",
  category: "education",
  tags: ["counting", "math", "beads", "calculate"],
  paths: [
    "M3 3h18v18H3z",
    "M3 7h18",
    "M3 12h18",
    "M3 17h18",
    "M5.8 7a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
    "M13.8 7a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
    "M7.8 12a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
    "M15.8 12a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
    "M5.8 17a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
    "M13.8 17a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
  ],
};

/** Puzzle piece */
export const puzzleIcon: IconDefinition = {
  name: "puzzle",
  category: "education",
  tags: ["piece", "game", "problem", "solve"],
  paths: ["M3 9h5a2.5 2.5 0 0 1 5 0h4v4.5a2.5 2.5 0 0 1 0 5V21H3z"],
};

/** Library bookshelf */
export const libraryIcon: IconDefinition = {
  name: "library",
  category: "education",
  tags: ["books", "shelves", "reading", "study"],
  paths: ["M3 20h18", "M5 20V7h3v13", "M10 20V4h3v16", "M15 20V9h3v11"],
};

/** Test tube */
export const testTubeIcon: IconDefinition = {
  name: "test-tube",
  category: "education",
  tags: ["lab", "chemistry", "experiment", "science"],
  paths: ["M8 3h8", "M9 3v13a3 3 0 0 0 6 0V3", "M9 13h6"],
};

/** DNA double helix */
export const dnaIcon: IconDefinition = {
  name: "dna",
  category: "education",
  tags: ["genetics", "biology", "helix", "gene"],
  paths: [
    "M7 3c0 3 10 4 10 9s-10 6-10 9",
    "M17 3c0 3-10 4-10 9s10 6 10 9",
    "M10 8h4",
    "M10 16h4",
  ],
  colors: [palette.violet, palette.teal, undefined, undefined],
};

/** Language speech bubbles */
export const languageIcon: IconDefinition = {
  name: "language",
  category: "education",
  tags: ["translate", "chat", "speech", "multilingual"],
  paths: [
    "M3 4h10v8H7l-3 3v-3H3z",
    "M12 11h9v7h-3l-3 3v-3h-3z",
    "M6.5 8h4",
    "M15 14.5h4",
  ],
};

/** Telescope */
export const telescopeIcon: IconDefinition = {
  name: "telescope",
  category: "education",
  tags: ["astronomy", "space", "observe", "stars"],
  paths: ["M4 9l10-4 2 5-10 4z", "M9 13L6 21", "M9 13L12 21"],
};

/** Eraser */
export const eraserIcon: IconDefinition = {
  name: "eraser",
  category: "education",
  tags: ["rubber", "delete", "correct", "erase"],
  paths: ["M4 14l6-6 8 8-6 6z", "M8 18l6-6"],
  colors: [palette.pink, undefined],
};

/** Lightbulb for ideas */
export const lightbulbIcon: IconDefinition = {
  name: "lightbulb",
  category: "education",
  tags: ["idea", "insight", "creative", "bright"],
  paths: [
    "M9 16a6 6 0 1 1 6 0c-.9.7-1.5 1.7-1.5 3h-3c0-1.3-.6-2.3-1.5-3z",
    "M10.5 21h3",
  ],
  colors: [palette.amber, undefined],
};

/** Pi symbol */
export const piIcon: IconDefinition = {
  name: "pi",
  category: "education",
  tags: ["math", "constant", "greek", "symbol"],
  paths: ["M4 7h16", "M8 7v12", "M16 7v12"],
};

/** Protractor for measuring angles */
export const protractorIcon: IconDefinition = {
  name: "protractor",
  category: "education",
  tags: ["angle", "degrees", "geometry", "measure"],
  paths: [
    "M3 17a9 9 0 0 1 18 0z",
    "M12 8v3",
    "M16.5 9.2L15 11.8",
    "M7.5 9.2L9 11.8",
    "M19.8 12.5L17.2 14",
    "M4.2 12.5L6.8 14",
  ],
};

/** Horseshoe magnet */
export const magnetIcon: IconDefinition = {
  name: "magnet",
  category: "education",
  tags: ["attract", "physics", "magnetism", "pull"],
  paths: ["M6 3v8a6 6 0 0 0 12 0V3", "M3 7h6", "M15 7h6"],
  colors: [undefined, palette.red, palette.blue],
};

/** Hourglass timer */
export const hourglassIcon: IconDefinition = {
  name: "hourglass",
  category: "education",
  tags: ["time", "timer", "sand", "wait"],
  paths: [
    "M6 3h12",
    "M6 21h12",
    "M7 3c0 4 5 5 5 9s-5 5-5 9",
    "M17 3c0 4-5 5-5 9s5 5 5 9",
  ],
};

/** Dividers for measuring distances */
export const dividersIcon: IconDefinition = {
  name: "dividers",
  category: "education",
  tags: ["compass", "measure", "geometry", "draft"],
  paths: [
    "M10.5 3.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    "M12 5v1.3",
    "M9.5 8Q12 4.5 14.5 8",
    "M9.5 8L5 21.5",
    "M14.5 8L19 21.5",
  ],
};

/** Microscope */
export const microscopeIcon: IconDefinition = {
  name: "microscope",
  category: "education",
  tags: ["lab", "biology", "science", "magnify"],
  paths: [
    "M8.5 3.5h5v7h-5z",
    "M10 10.5v2h2v-2",
    "M6 16h12",
    "M13.5 7.5Q18.5 8.5 18.5 14Q18.5 21 13 21",
    "M4 21h16",
  ],
};

/** School building */
export const schoolhouseIcon: IconDefinition = {
  name: "schoolhouse",
  category: "education",
  tags: ["building", "campus", "college", "academy"],
  paths: [
    "M2.5 9.5L12 3l9.5 6.5z",
    "M5 9.5V21h14V9.5",
    "M10 21v-4a2 2 0 0 1 4 0v4",
  ],
};

/** Quiz question */
export const quizIcon: IconDefinition = {
  name: "quiz",
  category: "education",
  tags: ["question", "test", "exam", "help"],
  paths: [
    "M5 3h14v18H5z",
    "M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7v1.3",
    "M12 17.5h.01",
  ],
};

/** Medal for achievement */
export const medalIcon: IconDefinition = {
  name: "medal",
  category: "education",
  tags: ["award", "achievement", "prize", "winner"],
  paths: [
    "M7 3h10",
    "M7 3l2.5 8",
    "M17 3l-2.5 8",
    "M7 15a5 5 0 1 0 10 0a5 5 0 1 0-10 0",
  ],
  colors: [undefined, undefined, undefined, palette.amber],
};

/** Presentation screen */
export const presentationIcon: IconDefinition = {
  name: "presentation",
  category: "education",
  tags: ["slides", "lecture", "projector", "screen"],
  paths: [
    "M3 4h18v12H3z",
    "M12 16v5",
    "M8 21l4-5 4 5",
    "M8 12v-2",
    "M12 12V7.5",
    "M16 12v-3.5",
  ],
};
