const { cpSync, mkdirSync } = require("node:fs");
const path = require("node:path");
const copy = (source, dest) => {
  mkdirSync(dest, { recursive: true });
  cpSync(source, dest, {
    recursive: true,
    filter: (file) => !/[.](test|spec)[.]|__tests__/.test(file),
  });
};
copy(path.join(__dirname, "../../src"), path.join(__dirname, "src/minerva"));
for (const name of ["core", "dom"])
  copy(
    path.join(__dirname, "../../../", name, "src"),
    path.join(__dirname, "src", name),
  );
