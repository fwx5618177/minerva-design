// File and development icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Blank document */
export const fileIcon: IconDefinition = {
  name: "file",
  category: "files",
  tags: ["document", "page", "paper", "blank"],
  paths: [
    "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z",
    "M14 3v4a1 1 0 0 0 1 1h4",
  ],
};

/** Document with lines of text */
export const fileTextIcon: IconDefinition = {
  name: "file-text",
  category: "files",
  tags: ["document", "text", "page", "notes"],
  paths: [
    "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z",
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M9 9h1.5",
    "M9 13h6",
    "M9 17h6",
  ],
};

/** Document with a plus sign */
export const filePlusIcon: IconDefinition = {
  name: "file-plus",
  category: "files",
  tags: ["new document", "add", "create"],
  paths: [
    "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z",
    "M14 3v4a1 1 0 0 0 1 1h4",
    "M12 11.5v6",
    "M9 14.5h6",
  ],
};

/** Folder */
export const folderIcon: IconDefinition = {
  name: "folder",
  category: "files",
  tags: ["directory", "group", "collection"],
  paths: [
    "M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
  ],
};

/** Open folder */
export const folderOpenIcon: IconDefinition = {
  name: "folder-open",
  category: "files",
  tags: ["directory", "browse", "opened"],
  paths: [
    "M3 16.5V6a2 2 0 0 1 2-2h4l2 2.5h6a2 2 0 0 1 2 2V10",
    "M3 19l2.6-7.6A2 2 0 0 1 7.5 10H20.5a1 1 0 0 1 .95 1.3L19 19a1.5 1.5 0 0 1-1.4 1H4a1 1 0 0 1-1-1Z",
  ],
};

/** Folder with a plus sign */
export const folderPlusIcon: IconDefinition = {
  name: "folder-plus",
  category: "files",
  tags: ["new folder", "add", "create directory"],
  paths: [
    "M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
    "M12 10.5v6",
    "M9 13.5h6",
  ],
};

/** Paper clip */
export const paperclipIcon: IconDefinition = {
  name: "paperclip",
  category: "files",
  tags: ["attachment", "attach", "clip"],
  paths: [
    "M17.66 12.71L12.35 18.01A4.5 4.5 0 0 1 5.99 11.65L13.06 4.58A3 3 0 0 1 17.3 8.82L10.59 15.54A1.5 1.5 0 0 1 8.46 13.41L13.41 8.46",
  ],
};

/** Closed book */
export const bookIcon: IconDefinition = {
  name: "book",
  category: "files",
  tags: ["read", "library", "manual", "docs"],
  paths: ["M5 18.5v-13A2.5 2.5 0 0 1 7.5 3H19v13H7.5a2.5 2.5 0 0 0 0 5H19v-5"],
};

/** Open book */
export const bookOpenIcon: IconDefinition = {
  name: "book-open",
  category: "files",
  tags: ["read", "reading", "docs", "guide"],
  paths: [
    "M12 6.5C10 5 7.5 4.5 3 4.5v14c4.5 0 7 .5 9 2 2-1.5 4.5-2 9-2v-14c-4.5 0-7 .5-9 2Z",
    "M12 6.5v14",
  ],
};

/** Angle brackets with a slash */
export const codeIcon: IconDefinition = {
  name: "code",
  category: "files",
  tags: ["source", "developer", "html", "programming"],
  paths: ["M7.5 7l-5 5 5 5", "M16.5 7l5 5-5 5", "M14 4l-4 16"],
};

/** Command prompt window */
export const terminalIcon: IconDefinition = {
  name: "terminal",
  category: "files",
  tags: ["console", "shell", "command line", "cli"],
  paths: [
    "M4.5 4h15a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-15a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2Z",
    "M6.5 9l3 3-3 3",
    "M12 15h5",
  ],
};

/** Database cylinder */
export const databaseIcon: IconDefinition = {
  name: "database",
  category: "files",
  tags: ["storage", "data", "sql", "server"],
  paths: [
    "M4 6a8 3 0 1 0 16 0a8 3 0 1 0-16 0",
    "M4 6v12a8 3 0 0 0 16 0V6",
    "M4 12a8 3 0 0 0 16 0",
  ],
};

/** Cloud */
export const cloudIcon: IconDefinition = {
  name: "cloud",
  category: "files",
  tags: ["weather", "storage", "online", "sky"],
  paths: [
    "M7 19A4 4 0 0 1 6.03 11.12A6 6 0 1 1 17.99 10.11A4.5 4.5 0 0 1 17 19Z",
  ],
};

/** Cloud with an arrow pointing up */
export const cloudUploadIcon: IconDefinition = {
  name: "cloud-upload",
  category: "files",
  tags: ["upload", "backup", "sync"],
  paths: [
    "M9 19H7A4 4 0 0 1 6.03 11.12A6 6 0 1 1 17.99 10.11A4.5 4.5 0 0 1 17 19H15",
    "M12 21v-9",
    "M9 15l3-3 3 3",
  ],
};

/** Cloud with an arrow pointing down */
export const cloudDownloadIcon: IconDefinition = {
  name: "cloud-download",
  category: "files",
  tags: ["download", "fetch", "sync"],
  paths: [
    "M9 19H7A4 4 0 0 1 6.03 11.12A6 6 0 1 1 17.99 10.11A4.5 4.5 0 0 1 17 19H15",
    "M12 11v10",
    "M9 18l3 3 3-3",
  ],
};

/** Branching version graph */
export const gitBranchIcon: IconDefinition = {
  name: "git-branch",
  category: "files",
  tags: ["git", "branch", "version control", "fork"],
  paths: [
    "M3.5 5.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    "M3.5 18a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    "M15.5 6.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    "M6 8v7.5",
    "M18 9a6.5 6.5 0 0 1-6.5 6.5H6",
  ],
};
