import simulate from "miniprogram-simulate";
import { tableCellContent } from "./table-cell";
// miniprogram-simulate does not implement componentGenerics. Register the real
// default Component under that native tag; custom-renderer tests use an explicit
// usingComponents binding. Production JSON declares the generic default.
simulate.load({
  id: "cell-renderer",
  tagName: "cell-renderer",
  template: tableCellContent.template,
  ...tableCellContent.definition,
});

simulate.load({
  id: "row-renderer",
  tagName: "row-renderer",
  template: tableCellContent.template,
  ...tableCellContent.definition,
});
