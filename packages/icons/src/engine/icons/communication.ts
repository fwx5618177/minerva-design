// Communication icons of minerva-design/icons (24×24 grid, 2px stroke).
import type { IconDefinition } from "../types";

/** Envelope */
export const mailIcon: IconDefinition = {
  name: "mail",
  category: "communication",
  tags: ["email", "envelope", "message", "letter"],
  paths: [
    "M4.5 5h15a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-15a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2Z",
    "M3.5 7l8.5 6 8.5-6",
  ],
};

/** Round speech bubble */
export const messageCircleIcon: IconDefinition = {
  name: "message-circle",
  category: "communication",
  tags: ["chat", "comment", "conversation", "reply"],
  paths: ["M9.09 19.49A8.5 8.5 0 1 0 5.04 16.38L3.5 20.5Z"],
};

/** Square speech bubble */
export const messageSquareIcon: IconDefinition = {
  name: "message-square",
  category: "communication",
  tags: ["chat", "comment", "conversation", "feedback"],
  paths: [
    "M5 3.5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8.5L6 21v-3.5H5a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2Z",
  ],
};

/** Telephone handset */
export const phoneIcon: IconDefinition = {
  name: "phone",
  category: "communication",
  tags: ["call", "telephone", "contact", "dial"],
  paths: [
    "M8.5 3.5L6 3.2C4.4 3 3 4.3 3.1 5.9 3.6 13.8 10.2 20.4 18.1 20.9c1.6.1 2.9-1.3 2.7-2.9l-.3-2.5a1.5 1.5 0 0 0-1.2-1.3l-3-.6a1.5 1.5 0 0 0-1.4.5l-1.2 1.4a14 14 0 0 1-5.2-5.2l1.4-1.2a1.5 1.5 0 0 0 .5-1.4l-.6-3a1.5 1.5 0 0 0-1.3-1.2Z",
  ],
};

/** At sign */
export const atSignIcon: IconDefinition = {
  name: "at-sign",
  category: "communication",
  tags: ["email", "mention", "address", "handle"],
  paths: [
    "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
    "M16 8v5a2.5 2.5 0 0 0 5 0v-1a9 9 0 1 0-3.5 7.1",
  ],
};

/** Feed waves */
export const rssIcon: IconDefinition = {
  name: "rss",
  category: "communication",
  tags: ["feed", "subscribe", "news", "blog"],
  paths: [
    "M4.5 11.5a8 8 0 0 1 8 8",
    "M4.5 4.5a15 15 0 0 1 15 15",
    "M4.5 18.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
};

/** Wireless signal arcs */
export const wifiIcon: IconDefinition = {
  name: "wifi",
  category: "communication",
  tags: ["wireless", "internet", "network", "connection"],
  paths: [
    "M8.82 15.82A4.5 4.5 0 0 1 15.18 15.82",
    "M5.64 12.64A9 9 0 0 1 18.36 12.64",
    "M2.45 9.45A13.5 13.5 0 0 1 21.55 9.45",
    "M12 19h.01",
  ],
};

/** Hash sign */
export const hashIcon: IconDefinition = {
  name: "hash",
  category: "communication",
  tags: ["hashtag", "channel", "number", "pound"],
  paths: ["M4 9h16", "M4 15h16", "M10 3.5L8 20.5", "M16 3.5l-2 17"],
};

/** Three connected nodes */
export const shareNetworkIcon: IconDefinition = {
  name: "share-network",
  category: "communication",
  tags: ["share", "social", "connect", "network"],
  paths: [
    "M14.5 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M3.5 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M14.5 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M9.13 10.56L14.87 7.44",
    "M9.13 13.44L14.87 16.56",
  ],
};

/** Megaphone */
export const megaphoneIcon: IconDefinition = {
  name: "megaphone",
  category: "communication",
  tags: ["announce", "broadcast", "marketing", "loud"],
  paths: [
    "M4 9h3l10-5v16L7 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z",
    "M7.5 15.5v4a1.5 1.5 0 0 0 3 0v-3",
    "M20.5 10v4",
  ],
};
