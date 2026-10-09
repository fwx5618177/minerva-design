const { cpSync, mkdirSync } = require("node:fs");
const path = require("node:path");
// The official mini compiler requires SFCs beneath its source root.
const target = path.join(__dirname, "src/minerva");
mkdirSync(target, { recursive: true });
cpSync(path.join(__dirname, "../../src"), path.join(target, "src"), {
  recursive: true,
  filter: (source) => !/[.](test|spec)[.]|__tests__/.test(source),
});

for (const name of ["core", "dom"])
  cpSync(
    path.join(__dirname, "../../../", name, "src"),
    path.join(__dirname, "src", name),
    {
      recursive: true,
      filter: (source) => !/[.](test|spec)[.]|__tests__/.test(source),
    },
  );
