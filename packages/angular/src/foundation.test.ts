import { describe, expect, it } from "vitest";
import * as angular from "./index";

describe("public Angular foundations", () => {
  it.each([
    "MnAvatar",
    "MnAvatarGroup",
    "MnBadge",
    "MnBox",
    "MnCard",
    "MnCardHeader",
    "MnCardTitle",
    "MnCardDescription",
    "MnCardContent",
    "MnCardFooter",
    "MnDivider",
    "MnEmpty",
    "MnGridItem",
    "MnHStack",
    "MnVStack",
    "MnStack",
    "MnResponsiveGrid",
    "MnSplitLayout",
    "MnToolbar",
    "MnPage",
    "MnPageHeader",
    "MnPageSection",
    "MnStatCard",
    "MnList",
    "MnListItem",
    "MnDescriptionList",
    "MnTableCellContent",
    "MnProse",
    "MnTextLink",
    "MnProgressIndicator",
    "MnLoadingState",
    "MnSkeleton",
    "MnSkeletonText",
    "MnTag",
    "MnIconButton",
  ])("exports usable component %s", (name) => {
    expect((angular as Record<string, unknown>)[name]).toBeTypeOf("function");
  });
});
