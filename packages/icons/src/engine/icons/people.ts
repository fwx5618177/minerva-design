// People icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";
import { palette } from "./palette";

/** Single person */
export const userRoundIcon: IconDefinition = {
  name: "user-round",
  category: "people",
  tags: ["person", "profile", "account", "avatar"],
  paths: ["M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z", "M5 21a7 7 0 0 1 14 0"],
};

/** Person with plus sign */
export const userRoundPlusIcon: IconDefinition = {
  name: "user-round-plus",
  category: "people",
  tags: ["add", "person", "invite", "new"],
  paths: [
    "M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a7 7 0 0 1 14 0",
    "M19 13v6",
    "M16 16h6",
  ],
};

/** Person with minus sign */
export const userMinusIcon: IconDefinition = {
  name: "user-minus",
  category: "people",
  tags: ["remove", "person", "delete", "subtract"],
  paths: [
    "M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a7 7 0 0 1 14 0",
    "M16 16h6",
  ],
};

/** Person with check mark */
export const userCheckIcon: IconDefinition = {
  name: "user-check",
  category: "people",
  tags: ["verified", "person", "approve", "accept"],
  paths: [
    "M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a7 7 0 0 1 14 0",
    "M16 16l2 2 4-4",
  ],
  colors: [undefined, undefined, palette.green],
};

/** Person with settings gear */
export const userCogIcon: IconDefinition = {
  name: "user-cog",
  category: "people",
  tags: ["settings", "person", "account", "admin"],
  paths: [
    "M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a7 7 0 0 1 14 0",
    "M19 14.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
    "M19 12v2.5",
    "M19 19.5V22",
    "M21.5 17H23",
  ],
};

/** Infant with smile */
export const babyIcon: IconDefinition = {
  name: "baby",
  category: "people",
  tags: ["infant", "newborn", "child", "kid"],
  paths: [
    "M12 3a4.5 4.5 0 1 0 0 9a4.5 4.5 0 1 0 0-9z",
    "M5.5 22v-3a6.5 4 0 0 1 13 0v3",
  ],
  colors: [palette.sky, undefined],
};

/** Two hands shaking */
export const handshakeIcon: IconDefinition = {
  name: "handshake",
  category: "people",
  tags: ["deal", "agreement", "partner", "greet"],
  paths: [
    "M2 9h3.5v6H2z",
    "M18.5 9H22v6h-3.5z",
    "M5.5 9.5L9 7.5h3.5L15 9.5h3.5",
    "M5.5 14.5H9l3.5 3 3-3h3.5",
    "M9 11l2.5 3",
    "M12.5 10l2.5 3",
  ],
};

/** ID card with portrait */
export const idCardIcon: IconDefinition = {
  name: "id-card",
  category: "people",
  tags: ["badge", "identity", "profile", "pass"],
  paths: [
    "M3 6h18v12H3z",
    "M9 6V4h6v2",
    "M8 9a2 2 0 1 0 0 4a2 2 0 1 0 0-4z",
    "M5 17a3 3 0 0 1 6 0",
    "M14 10h4",
    "M14 14h4",
  ],
};

/** Contact badge inside a circle */
export const contactRoundIcon: IconDefinition = {
  name: "contact-round",
  category: "people",
  tags: ["contact", "badge", "profile", "avatar"],
  paths: [
    "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
    "M12 6.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
    "M7 17.5a5 5 0 0 1 10 0",
  ],
};

/** Person with star badge */
export const userStarIcon: IconDefinition = {
  name: "user-star",
  category: "people",
  tags: ["vip", "favorite", "person", "rank"],
  paths: [
    "M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a7 7 0 0 1 14 0",
    "M19 2.5L19.8 4.9L22.3 4.9L20.3 6.4L21.1 8.8L19 7.4L16.9 8.8L17.7 6.4L15.7 4.9L18.2 4.9Z",
  ],
};

/** Person with padlock */
export const userLockIcon: IconDefinition = {
  name: "user-lock",
  category: "people",
  tags: ["private", "account", "secure", "restricted"],
  paths: [
    "M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M3 21a6 6 0 0 1 12 0",
    "M16.5 17h5v5h-5z",
    "M18 17v-1.5a1.5 1.5 0 0 1 3 0V17",
  ],
};

/** Person with heart */
export const userHeartIcon: IconDefinition = {
  name: "user-heart",
  category: "people",
  tags: ["love", "favorite", "care", "friend"],
  paths: [
    "M8 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a6 6 0 0 1 12 0",
    "M18 21l-3.2-3.2A2.4 2.4 0 0 1 18 14.8a2.4 2.4 0 0 1 3.2 3z",
  ],
  colors: [undefined, undefined, palette.pink],
};

/** Parent and child */
export const familyIcon: IconDefinition = {
  name: "family",
  category: "people",
  tags: ["parents", "children", "group", "household"],
  paths: [
    "M8 3a3 3 0 1 0 0 6a3 3 0 1 0 0-6z",
    "M3 21v-5a5 5 0 0 1 10 0v5",
    "M18 8.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
    "M14 21v-2a4 4 0 0 1 8 0v2",
  ],
};

/** Person with cross mark */
export const userXIcon: IconDefinition = {
  name: "user-x",
  category: "people",
  tags: ["remove", "delete", "block", "person"],
  paths: [
    "M8 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a6 6 0 0 1 12 0",
    "M16 16l5 5",
    "M21 16l-5 5",
  ],
  colors: [undefined, undefined, palette.red, palette.red],
};

/** Two people inside a circle */
export const groupCircleIcon: IconDefinition = {
  name: "group-circle",
  category: "people",
  tags: ["group", "team", "circle", "community"],
  paths: [
    "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
    "M6.3 9.5a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0z",
    "M5 17a3.5 3.5 0 0 1 7 0",
    "M14.3 9.5a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0z",
    "M13 17a3.5 3.5 0 0 1 7 0",
  ],
};

/** Person with pen */
export const userPenIcon: IconDefinition = {
  name: "user-pen",
  category: "people",
  tags: ["edit", "profile", "write", "person"],
  paths: [
    "M8 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a6 6 0 0 1 12 0",
    "M16 21l.8-3.2 4.2-4.2 2 2-4.2 4.2z",
  ],
};

/** Person with magnifier */
export const userSearchIcon: IconDefinition = {
  name: "user-search",
  category: "people",
  tags: ["find", "lookup", "person", "query"],
  paths: [
    "M8 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a6 6 0 0 1 12 0",
    "M19 14a3 3 0 1 0 0 6a3 3 0 1 0 0-6z",
    "M21.1 19.1L23 21",
  ],
};

/** Avatar in a rounded square */
export const userSquareIcon: IconDefinition = {
  name: "user-square",
  category: "people",
  tags: ["avatar", "profile", "account", "box"],
  paths: [
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    "M12 6.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
    "M7 18a5 5 0 0 1 10 0",
  ],
};

/** Open hand holding a heart */
export const handHeartIcon: IconDefinition = {
  name: "hand-heart",
  category: "people",
  tags: ["care", "donate", "love", "give"],
  paths: [
    "M12 9.5l-2.2-2.2a1.6 1.6 0 0 1 2.2-2.3a1.6 1.6 0 0 1 2.2 2.3z",
    "M2 13h4v8H2z",
    "M6 15l4-2h4.5l2.5 1h3a1.5 1.5 0 0 1 0 3H16l-3 2h-2",
  ],
  colors: [palette.red, undefined, undefined],
};

/** Person with shield badge */
export const userShieldIcon: IconDefinition = {
  name: "user-shield",
  category: "people",
  tags: ["secure", "admin", "protect", "verified"],
  paths: [
    "M8 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M2 21a6 6 0 0 1 12 0",
    "M19 13l4 1.5v3c0 2.5-2 4-4 4.5c-2-.5-4-2-4-4.5v-3z",
  ],
};

/** Universal access symbol */
export const accessibilityIcon: IconDefinition = {
  name: "accessibility",
  category: "people",
  tags: ["access", "inclusive", "disability", "universal"],
  paths: [
    "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z",
    "M10.75 6.5a1.25 1.25 0 1 0 2.5 0a1.25 1.25 0 1 0-2.5 0",
    "M6.5 9.5L12 11l5.5-1.5",
    "M12 11v3l-2.5 4M12 14l2.5 4",
  ],
  colors: [palette.blue, undefined, undefined, undefined],
};

/** Person with arms raised in celebration */
export const personArmsUpIcon: IconDefinition = {
  name: "person-arms-up",
  category: "people",
  tags: ["celebrate", "cheer", "success", "joy"],
  paths: [
    "M9.5 7a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M5 6L12 12L19 6",
    "M12 12v5M12 17l-3 4M12 17l3 4",
  ],
  colors: [undefined, palette.amber, undefined],
};

/** Hand waving hello */
export const handWaveIcon: IconDefinition = {
  name: "hand-wave",
  category: "people",
  tags: ["greet", "hello", "wave", "hi"],
  paths: [
    "M8 14V6.5a1.5 1.5 0 0 1 3 0V14M11 14V5a1.5 1.5 0 0 1 3 0V14M14 14V6.5a1.5 1.5 0 0 1 3 0V14M17 14V9.5a1.5 1.5 0 0 1 3 0V14",
    "M8 14L5 10.8a1.5 1.5 0 0 0-2.2 2.1L8 19.5c.8 1.5 2 2 4 2h3c3 0 5-2 5-4.5V14",
    "M18 2.5a4 4 0 0 1 3.5 4",
  ],
  colors: [undefined, undefined, palette.amber],
};

/** Person with clock */
export const userClockIcon: IconDefinition = {
  name: "user-clock",
  category: "people",
  tags: ["time", "shift", "schedule", "pending"],
  paths: [
    "M8 3.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7z",
    "M1.5 21a6.5 6.5 0 0 1 13 0",
    "M19 12a4 4 0 1 0 0 8a4 4 0 1 0 0-8z",
    "M19 14v2.5l1.5 1",
  ],
  colors: [undefined, undefined, palette.amber, undefined],
};

/** Person with microphone */
export const userMicIcon: IconDefinition = {
  name: "user-mic",
  category: "people",
  tags: ["speaker", "presenter", "podcast", "voice"],
  paths: [
    "M8 3.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7z",
    "M1.5 21a6.5 6.5 0 0 1 13 0",
    "M17 5a2.5 2.5 0 0 1 5 0v4a2.5 2.5 0 0 1-5 0z",
    "M16 9a3.5 3.5 0 0 0 7 0M19.5 12.5v3",
  ],
};

/** Person with key */
export const userKeyIcon: IconDefinition = {
  name: "user-key",
  category: "people",
  tags: ["credentials", "access", "login", "password"],
  paths: [
    "M8 3.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7z",
    "M1.5 21a6.5 6.5 0 0 1 13 0",
    "M13.5 14a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M19.5 14H23M21 14v2.5",
  ],
  colors: [undefined, undefined, palette.amber, palette.amber],
};

/** Two people in a group */
export const usersRoundIcon: IconDefinition = {
  name: "users-round",
  category: "people",
  tags: ["people", "team", "group", "crowd"],
  paths: [
    "M9 4.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7z",
    "M3 21a6 6 0 0 1 12 0",
    "M16 2.5a3 3 0 1 0 0 6a3 3 0 1 0 0-6z",
    "M17 14a5.5 5.5 0 0 1 4.5 7",
  ],
};

/** Standing figure */
export const personStandingIcon: IconDefinition = {
  name: "person-standing",
  category: "people",
  tags: ["human", "figure", "body", "pose"],
  paths: [
    "M12 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
    "M12 7.5v7",
    "M7 10h10",
    "M12 14.5l-3 7",
    "M12 14.5l3 7",
  ],
};
