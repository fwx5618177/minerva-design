const { cpSync } = require("node:fs");
const path = require("node:path");
cpSync(
  path.join(__dirname, "../../../minerva-design/dist/weapp"),
  path.join(__dirname, "minerva"),
  { recursive: true },
);
