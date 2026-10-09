import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
} from "@angular/core";
import { cn, resolveSpace, resolveSize } from "@minerva/core";
import { MnHook } from "../../internal/hooks";
import * as styles from "../../internal/styles";

/** Native-element layout and presentation components. Attribute selectors allow
 * consumers to preserve article, section, list and heading semantics. */
@Component({
  selector: "mn-box, [mnBox]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "data-minerva": "box", "data-part": "root", "[style]": "boxStyle()" },
  template: `<ng-content />`,
})
export class MnBox {
  readonly p = input<string | number>();
  readonly px = input<string | number>();
  readonly py = input<string | number>();
  readonly m = input<string | number>();
  readonly w = input<string | number>();
  readonly h = input<string | number>();
  readonly minW = input<string | number>();
  readonly maxW = input<string | number>();
  readonly bg = input<string>();
  readonly rounded = input<string>();
  readonly boxShadow = input<string>();
  readonly border = input<string>();
  protected readonly boxStyle = computed(() => ({
    padding: this.p() != null ? resolveSpace(this.p()!) : null,
    paddingInline: this.px() != null ? resolveSpace(this.px()!) : null,
    paddingBlock: this.py() != null ? resolveSpace(this.py()!) : null,
    margin: this.m() != null ? resolveSpace(this.m()!) : null,
    width: this.w() != null ? resolveSize(this.w()!) : null,
    height: this.h() != null ? resolveSize(this.h()!) : null,
    minWidth: this.minW() != null ? resolveSize(this.minW()!) : null,
    maxWidth: this.maxW() != null ? resolveSize(this.maxW()!) : null,
    background: this.bg(),
    borderRadius: this.rounded(),
    boxShadow: this.boxShadow(),
    border: this.border(),
  }));
}
@Directive()
export class MnStackBase {
  readonly direction = input<
    "row" | "column" | "row-reverse" | "column-reverse"
  >("column");
  readonly gap = input<string | number>(3);
  readonly align = input<string>("stretch");
  readonly justify = input<string>("start");
  readonly wrap = input(false, { transform: booleanAttribute });
  readonly attached = input(false, { transform: booleanAttribute });
  protected readonly s = styles.stackStyles;
  protected readonly classes = computed(() =>
    cn(
      this.s.stack,
      this.s[this.direction()],
      this.wrap() && this.s.wrap,
      this.attached() && this.s.attached,
    ),
  );
  protected readonly stackStyle = computed(() => ({
    display: "flex",
    flexDirection: this.direction(),
    gap: this.attached() ? "0" : resolveSpace(this.gap()),
    alignItems:
      this.align() === "start"
        ? "flex-start"
        : this.align() === "end"
          ? "flex-end"
          : this.align(),
    justifyContent:
      (
        {
          start: "flex-start",
          end: "flex-end",
          between: "space-between",
          around: "space-around",
          evenly: "space-evenly",
        } as Record<string, string>
      )[this.justify()] ?? this.justify(),
    flexWrap: this.wrap() ? "wrap" : "nowrap",
  }));
}
@Component({
  selector: "mn-stack, [mnStack]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "stack",
    "data-part": "root",
    "[class]": "classes()",
    "[style]": "stackStyle()",
    "[attr.data-orientation]":
      "direction().startsWith('row') ? 'horizontal' : 'vertical'",
    "[attr.role]": "attached() ? 'group' : null",
  },
  template: `<ng-content />`,
})
export class MnStack extends MnStackBase {}
@Component({
  selector: "mn-hstack, [mnHStack]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "hstack",
    "data-part": "root",
    "[class]": "classes()",
    "[style]": "stackStyle()",
    "style.flex-direction": "row",
  },
  template: `<ng-content />`,
})
export class MnHStack extends MnStackBase {
  override readonly direction = input<
    "row" | "column" | "row-reverse" | "column-reverse"
  >("row");
}
@Component({
  selector: "mn-vstack, [mnVStack]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "vstack",
    "data-part": "root",
    "[class]": "classes()",
    "[style]": "stackStyle()",
  },
  template: `<ng-content />`,
})
export class MnVStack extends MnStackBase {}
@Component({
  selector: "mn-card, [mnCard]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "card",
    "data-part": "root",
    "[class]": "classes()",
    "[attr.data-variant]": "variant()",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.aria-disabled]": "disabled() ? true : null",
    "(click)": "block($event)",
  },
  template: `<ng-content />`,
})
export class MnCard {
  readonly variant = input<
    "default" | "outline" | "elevated" | "filled" | "ghost"
  >("default");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly padding = input<"none" | "small" | "medium" | "large">("medium");
  protected readonly classes = computed(() =>
    cn(
      styles.cardStyles.card,
      styles.cardStyles[this.variant()],
      styles.cardStyles[`pad-${this.padding()}`],
    ),
  );
  protected block(e: Event) {
    if (this.disabled()) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
@Component({
  selector: "mn-card-header, [mnCardHeader]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "card-header",
    "data-part": "root",
    "[class]": "s.cardHeader",
  },
  template: `<ng-content />`,
})
export class MnCardHeader {
  protected readonly s = styles.cardStyles;
}
@Component({
  selector: "mn-card-title, [mnCardTitle]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "card-title",
    "data-part": "root",
    "[class]": "s.cardTitle",
    role: "heading",
    "aria-level": "3",
  },
  template: `<ng-content />`,
})
export class MnCardTitle {
  protected readonly s = styles.cardStyles;
}
@Component({
  selector: "mn-card-description, [mnCardDescription]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "card-description",
    "data-part": "root",
    "[class]": "s.cardDescription",
  },
  template: `<ng-content />`,
})
export class MnCardDescription {
  protected readonly s = styles.cardStyles;
}
@Component({
  selector: "mn-card-content, [mnCardContent]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "card-content",
    "data-part": "root",
    "[class]": "s.cardContent",
  },
  template: `<ng-content />`,
})
export class MnCardContent {
  protected readonly s = styles.cardStyles;
}
@Component({
  selector: "mn-card-footer, [mnCardFooter]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "card-footer",
    "data-part": "root",
    "[class]": "s.cardFooter",
  },
  template: `<ng-content />`,
})
export class MnCardFooter {
  protected readonly s = styles.cardStyles;
}
@Component({
  selector: "mn-divider, [mnDivider]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "divider",
    "data-part": "root",
    role: "separator",
    "[attr.aria-orientation]": "orientation()",
    "[attr.data-orientation]": "orientation()",
    "[attr.data-variant]": "variant()",
    "[attr.data-align]": "align()",
    "[class]": "classes()",
  },
  template: `<span mnHook="divider" mnPart="label" [class]="s.text"
    ><ng-content
  /></span>`,
})
export class MnDivider {
  readonly orientation = input<"horizontal" | "vertical">("horizontal");
  readonly variant = input<"solid" | "dashed" | "dotted">("solid");
  readonly align = input<"left" | "center" | "right">("center");
  protected readonly s = styles.dividerStyles;
  protected readonly classes = computed(() =>
    cn(
      this.s.divider,
      this.s[this.orientation()],
      this.s[this.variant()],
      this.align() === "left" && this.s.textLeft,
      this.align() === "right" && this.s.textRight,
    ),
  );
}
@Component({
  selector: "mn-prose, [mnProse]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "data-minerva": "prose", "data-part": "root", "[class]": "s.prose" },
  template: `<ng-content />`,
})
export class MnProse {
  protected readonly s = styles.proseStyles;
}
@Component({
  selector: "a[mnTextLink]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "text-link",
    "data-part": "root",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
  template: `<ng-content />`,
})
export class MnTextLink {
  readonly variant = input<"default" | "subtle" | "action">("default");
  protected readonly classes = computed(() =>
    cn(
      styles.textLinkStyles.textLink,
      this.variant() === "subtle" && styles.textLinkStyles.subtle,
      this.variant() === "action" && styles.textLinkStyles.action,
    ),
  );
}
@Component({
  selector: "mn-responsive-grid, [mnResponsiveGrid]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "responsive-grid",
    "data-part": "root",
    "[class]": "s.root",
    "style.container-type": "inline-size",
  },
  template: `<div
    mnHook="responsive-grid"
    mnPart="layout"
    [class]="s.layout"
    [style.display]="'grid'"
    [style.grid-template-columns]="
      'repeat(auto-fit, minmax(min(100%, ' + minColumnWidth() + '), 1fr))'
    "
    [style.gap]="space(gap())"
  >
    <ng-content />
  </div>`,
})
export class MnResponsiveGrid {
  readonly minColumnWidth = input("16rem");
  readonly gap = input<string | number>(4);
  protected readonly space = resolveSpace;
  protected readonly s = styles.responsiveGridStyles;
}
@Component({
  selector: "mn-grid-item, [mnGridItem]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "grid-item",
    "data-part": "root",
    "[class]": "s.item",
    "[style.grid-column]": "fullWidth() ? '1 / -1' : 'span ' + span()",
  },
  template: `<ng-content />`,
})
export class MnGridItem {
  readonly span = input(1);
  readonly fullWidth = input(false, { transform: booleanAttribute });
  protected readonly s = styles.responsiveGridStyles;
}
@Component({
  selector: "mn-split-layout, [mnSplitLayout]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "split-layout",
    "data-part": "root",
    "[class]": "s.root",
  },
  template: `<div [class]="s.grid + ' ' + s.hasAside + ' ' + s.md">
    <div mnHook="split-layout" mnPart="main" [class]="s.main">
      <ng-content />
    </div>
    <aside mnHook="split-layout" mnPart="aside" [class]="s.aside">
      <ng-content select="[mnAside]" />
    </aside>
  </div>`,
})
export class MnSplitLayout {
  protected readonly s = styles.splitLayoutStyles;
}
@Component({
  selector: "mn-toolbar, [mnToolbar]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "toolbar",
    "data-part": "root",
    role: "group",
    "[class]": "s.toolbar",
  },
  template: `<ng-content />`,
})
export class MnToolbar {
  protected readonly s = styles.pageStyles;
}
@Component({
  selector: "mn-page, [mnPage]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "data-minerva": "page", "data-part": "root", "[class]": "s.page" },
  template: `<ng-content />`,
})
export class MnPage {
  protected readonly s = styles.pageStyles;
}
@Component({
  selector: "mn-page-header, header[mnPageHeader]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "page-header",
    "data-part": "root",
    "[class]": "s.header",
  },
  template: `<div [class]="s.heading">
      <h1 mnHook="page-header" mnPart="title">{{ title() }}</h1>
      @if (description()) {
        <p mnHook="page-header" mnPart="description">{{ description() }}</p>
      }
    </div>
    <div mnHook="page-header" mnPart="actions" [class]="s.actions">
      <ng-content />
    </div>`,
})
export class MnPageHeader {
  readonly title = input("");
  readonly description = input("");
  protected readonly s = styles.pageStyles;
}
@Component({
  selector: "mn-page-section, section[mnPageSection]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "page-section",
    "data-part": "root",
    "[class]": "s.section",
  },
  template: `<header
      mnHook="page-section"
      mnPart="header"
      [class]="s.sectionHeader"
    >
      <div>
        <h2 mnHook="page-section" mnPart="title">
          @if (icon()) {
            <span
              mnHook="page-section"
              mnPart="icon"
              aria-hidden="true"
              [class]="s.sectionIcon"
              >{{ icon() }}</span
            >
          }
          {{ title() }}
        </h2>
        @if (description()) {
          <p mnHook="page-section" mnPart="description">{{ description() }}</p>
        }
      </div>
      <div mnHook="page-section" mnPart="actions" [class]="s.actions">
        <ng-content select="[mnActions]" />
      </div>
    </header>
    <ng-content />`,
})
export class MnPageSection {
  readonly title = input("");
  readonly description = input("");
  readonly icon = input("");
  protected readonly s = styles.pageStyles;
}
@Component({
  selector: "mn-stat-card",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "stat-card",
    "data-part": "root",
    "[class]": "s.statCard",
  },
  template: `@if (icon()) {
      <span
        mnHook="stat-card"
        mnPart="icon"
        aria-hidden="true"
        [class]="s.statIcon"
        >{{ icon() }}</span
      >
    }
    <dl [class]="s.statContent">
      <dt mnHook="stat-card" mnPart="label">{{ label() }}</dt>
      <dd mnHook="stat-card" mnPart="value">{{ value() }}</dd>
    </dl>
    @if (description()) {
      <p mnHook="stat-card" mnPart="description" [class]="s.statDescription">
        {{ description() }}
      </p>
    }`,
})
export class MnStatCard {
  readonly label = input("");
  readonly value = input<string | number>("");
  readonly description = input("");
  readonly icon = input("");
  protected readonly s = styles.pageStyles;
}
@Component({
  selector: "mn-list, ul[mnList]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "list",
    "data-part": "root",
    role: "list",
    "[class]": "classes()",
  },
  template: `<ng-content />`,
})
export class MnList {
  readonly bordered = input(false, { transform: booleanAttribute });
  readonly dividers = input(false, { transform: booleanAttribute });
  readonly density = input<"compact" | "comfortable">("comfortable");
  protected readonly classes = computed(() =>
    cn(
      styles.listStyles.list,
      styles.listStyles[this.density()],
      this.bordered() && styles.listStyles.bordered,
      this.dividers() && styles.listStyles.dividers,
    ),
  );
}
@Component({
  selector: "mn-list-item, li[mnListItem]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "list-item",
    "data-part": "root",
    role: "listitem",
    "[class]": "s.item",
  },
  template: `@if (icon()) {
      <span
        mnHook="list-item"
        mnPart="icon"
        aria-hidden="true"
        [class]="s.icon"
        >{{ icon() }}</span
      >
    }
    <div [class]="s.content">
      <div mnHook="list-item" mnPart="label" [class]="s.primary">
        {{ label() }}<ng-content />
      </div>
      @if (description()) {
        <div mnHook="list-item" mnPart="description" [class]="s.secondary">
          {{ description() }}
        </div>
      }
    </div>
    <div mnHook="list-item" mnPart="actions" [class]="s.actions">
      <ng-content select="[mnActions]" />
    </div>`,
})
export class MnListItem {
  readonly label = input("");
  readonly description = input("");
  readonly icon = input("");
  protected readonly s = styles.listStyles;
}
export interface DescriptionItem {
  term: string;
  description: string;
}
@Component({
  selector: "mn-description-list",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dl mnHook="description-list" [class]="s.descriptionList">
    @for (item of items(); track $index) {
      <div mnHook="description-list" mnPart="row" [class]="s.row">
        <dt mnHook="description-list" mnPart="term">{{ item.term }}</dt>
        <dd mnHook="description-list" mnPart="description">
          {{ item.description }}
        </dd>
      </div>
    }
  </dl>`,
})
export class MnDescriptionList {
  readonly items = input<readonly DescriptionItem[]>([]);
  protected readonly s = styles.descriptionListStyles;
}
@Component({
  selector: "mn-table-cell-content",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "table-cell-content",
    "data-part": "root",
    "[class]": "s.cellContent",
    "[style.max-width]": "maxWidth()",
  },
  template: `@if (monospace()) {
      <code
        mnHook="table-cell-content"
        mnPart="primary"
        [class]="s.cellPrimary"
        >{{ primary() }}</code
      >
    } @else {
      <span
        mnHook="table-cell-content"
        mnPart="primary"
        [class]="s.cellPrimary"
        >{{ primary() }}</span
      >
    }
    @if (secondary()) {
      <span
        mnHook="table-cell-content"
        mnPart="secondary"
        [class]="s.cellSecondary"
        >{{ secondary() }}</span
      >
    }
    <ng-content />`,
})
export class MnTableCellContent {
  readonly primary = input("");
  readonly secondary = input("");
  readonly monospace = input(false, { transform: booleanAttribute });
  readonly maxWidth = input("24rem");
  protected readonly s = styles.tableStyles;
}
@Component({
  selector: "mn-avatar",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "avatar",
    "data-part": "root",
    "[class]": "classes()",
    "[attr.data-size]": "size()",
    "[attr.data-shape]": "shape()",
    "[attr.role]": "!src() || failed() ? 'img' : null",
    "[attr.aria-label]": "!src() || failed() ? name() : null",
  },
  template: `@if (src() && !failed()) {
      <img
        mnHook="avatar"
        mnPart="image"
        [class]="s.avatarImg"
        [src]="src()"
        [alt]="name()"
        (error)="failed.set(true)"
      />
    } @else {
      <span mnHook="avatar" mnPart="fallback" [class]="s.avatarText">{{
        initials()
      }}</span>
    }`,
})
export class MnAvatar {
  readonly src = input<string>();
  readonly name = input("");
  readonly size = input<
    "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge"
  >("medium");
  readonly shape = input<"circle" | "square" | "rounded">("circle");
  protected readonly failed = signal(false);
  protected readonly s = styles.avatarStyles;
  protected readonly initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/)
      .map((p) => p[0] ?? "")
      .slice(0, 2)
      .join("")
      .toUpperCase(),
  );
  protected readonly classes = computed(() =>
    cn(this.s.avatar, this.s[this.size()], this.s[this.shape()]),
  );
}
export interface AvatarItem {
  name: string;
  src?: string;
}
@Component({
  selector: "mn-avatar-group",
  imports: [MnHook, MnAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "avatar-group",
    "data-part": "root",
    role: "group",
    "[class]": "s.avatarGroup",
  },
  template: `@for (item of items().slice(0, max()); track $index) {
      <span mnHook="avatar-group" mnPart="item" [class]="s.avatarGroupItem"
        ><mn-avatar [name]="item.name" [src]="item.src"
      /></span>
    }
    @if (items().length > max()) {
      <span
        mnHook="avatar-group"
        mnPart="count"
        [class]="s.count"
        [attr.aria-label]="items().length - max() + ' more people'"
        >+{{ items().length - max() }}</span
      >
    }
    <ng-content />`,
})
export class MnAvatarGroup {
  readonly items = input<readonly AvatarItem[]>([]);
  readonly max = input(5);
  protected readonly s = styles.avatarGroupStyles;
}
@Component({
  selector: "mn-badge",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "badge",
    "data-part": "root",
    "[class]": "attached() ? s.badgeWrapper : classes()",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.data-color]": "color()",
  },
  template: `<ng-content />
    @if (attached()) {
      <span
        mnHook="badge"
        mnPart="badge"
        [class]="classes() + ' ' + s['top-right']"
      >
        @if (icon()) {
          <span
            mnHook="badge"
            mnPart="icon"
            [class]="s.icon"
            aria-hidden="true"
            >{{ icon() }}</span
          >
        }
        {{ display() }}</span
      >
    } @else {
      @if (icon()) {
        <span
          mnHook="badge"
          mnPart="icon"
          [class]="s.icon"
          aria-hidden="true"
          >{{ icon() }}</span
        >
      }
      {{ display() }}
    }`,
})
export class MnBadge {
  readonly value = input<string | number>("");
  readonly max = input(99);
  readonly icon = input("");
  readonly attached = input(false, { transform: booleanAttribute });
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly variant = input<"solid" | "subtle" | "outline">("solid");
  readonly color = input<
    "primary" | "neutral" | "success" | "warning" | "danger" | "info"
  >("primary");
  protected readonly s = styles.badgeStyles;
  protected readonly display = computed(() =>
    typeof this.value() === "number" && Number(this.value()) > this.max()
      ? `${this.max()}+`
      : this.value(),
  );
  protected readonly classes = computed(() =>
    cn(
      this.s.badge,
      this.s[this.size()],
      this.variant() !== "solid" &&
        this.s[this.variant() as "subtle" | "outline"],
      this.s[this.color()],
    ),
  );
}
@Component({
  selector: "mn-progress, mn-progress-indicator",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "progress",
    "data-part": "root",
    "[attr.role]": "decorative() ? null : 'progressbar'",
    "[attr.aria-label]": "label() || 'Loading'",
    "[attr.aria-hidden]": "decorative() ? true : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.data-color]": "color()",
    "[class]": "classes()",
  },
  template: `@if (icon()) {
      <span
        mnHook="progress"
        mnPart="icon"
        aria-hidden="true"
        [class]="s.icon"
        >{{ icon() }}</span
      >
    }
    <span
      mnHook="progress"
      mnPart="indicator"
      aria-hidden="true"
      [class]="indicatorClass()"
    ></span>
    @if (label()) {
      <span mnHook="progress" mnPart="label" [class]="s.label">{{
        label()
      }}</span>
    }`,
})
export class MnProgressIndicator {
  readonly label = input("");
  readonly icon = input("");
  readonly decorative = input(false, { transform: booleanAttribute });
  readonly size = input<"xsmall" | "small" | "medium" | "large" | "xlarge">(
    "medium",
  );
  readonly variant = input<
    "spinner" | "bar" | "wave" | "circle" | "dotted-bar"
  >("spinner");
  readonly color = input<"primary" | "neutral" | "current">("primary");
  protected readonly s = styles.progressIndicatorStyles;
  protected readonly indicatorClass = computed(
    () =>
      this.s[
        this.variant() === "dotted-bar"
          ? "dottedBar"
          : (this.variant() as "spinner" | "bar" | "wave" | "circle")
      ],
  );
  protected readonly classes = computed(() =>
    cn(this.s.progressIndicator, this.s[this.size()], this.s[this.color()]),
  );
}
@Component({
  selector: "mn-loading-state",
  imports: [MnHook, MnProgressIndicator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "loading-state",
    "data-part": "root",
    role: "status",
    "aria-live": "polite",
    "[attr.data-size]": "size()",
    "[class]": "s.loadingState + ' ' + s[size()]",
  },
  template: `<span mnHook="loading-state" mnPart="spinner" [class]="s.indicator"
      ><mn-progress decorative /></span
    ><span mnHook="loading-state" mnPart="label" [class]="s.label">{{
      label()
    }}</span>`,
})
export class MnLoadingState {
  readonly label = input("Loading…");
  readonly size = input<"small" | "medium" | "large">("medium");
  protected readonly s = styles.loadingStateStyles;
}
@Component({
  selector: "mn-empty",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "empty",
    "data-part": "root",
    role: "status",
    "[attr.aria-label]": "title()",
    "[attr.data-size]": "size()",
    "[class]": "emptyClass()",
  },
  template: `<span
      mnHook="empty"
      mnPart="icon"
      aria-hidden="true"
      [class]="s.iconWrapper"
      >{{ icon() }}</span
    >
    <h3 mnHook="empty" mnPart="title" [class]="s.title">{{ title() }}</h3>
    @if (description()) {
      <p mnHook="empty" mnPart="description" [class]="s.description">
        {{ description() }}
      </p>
    }
    <div mnHook="empty" mnPart="actions" [class]="s.actions">
      <ng-content />
    </div>
    <div mnHook="empty" mnPart="footer" [class]="s.footer">
      <ng-content select="[mnFooter]" />
    </div>`,
})
export class MnEmpty {
  readonly title = input("No results");
  readonly description = input("");
  readonly icon = input("∅");
  readonly size = input<"small" | "medium" | "large">("medium");
  protected readonly s = styles.emptyStyles;
  protected readonly emptyClass = computed(() =>
    cn(this.s.empty, this.s[`size-${this.size()}`]),
  );
}
@Component({
  selector: "mn-skeleton",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "skeleton",
    "data-part": "root",
    role: "status",
    "aria-busy": "true",
    "[attr.aria-label]": "label()",
    "[attr.data-variant]": "variant()",
    "[class]": "s.skeletonRoot + ' ' + s[variant()]",
  },
  template: `@if (variant() === "card") {
      <span mnHook="skeleton" mnPart="avatar" [class]="s.avatar"></span
      ><span mnHook="skeleton" mnPart="title" [class]="s.title"></span>
    }
    @for (line of lines(); track $index) {
      <span
        mnHook="skeleton"
        mnPart="line"
        aria-hidden="true"
        [class]="s.skeleton + ' ' + s.text + ' ' + s['animation-pulse']"
      ></span>
    }`,
})
export class MnSkeleton {
  readonly variant = input<
    | "text"
    | "circular"
    | "rectangular"
    | "rounded"
    | "button"
    | "image"
    | "card"
  >("text");
  readonly count = input(3);
  readonly label = input("Loading…");
  protected readonly s = styles.skeletonStyles;
  protected readonly lines = computed(() =>
    Array.from({ length: Math.max(0, this.count()) }),
  );
}
@Component({
  selector: "mn-skeleton-text",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "skeleton-text",
    "data-part": "root",
    "aria-hidden": "true",
    "[class]": "s.skeletonText",
  },
  template: `@for (line of lines(); track $index) {
    <span
      mnHook="skeleton-text"
      mnPart="line"
      [class]="s.skeleton + ' ' + s.text + ' ' + s['animation-pulse']"
    ></span>
  }`,
})
export class MnSkeletonText {
  readonly count = input(3);
  protected readonly s = styles.skeletonStyles;
  protected readonly lines = computed(() =>
    Array.from({ length: Math.max(0, this.count()) }),
  );
}
@Component({
  selector: "button[mnIconButton]",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "icon-button",
    "data-part": "root",
    type: "button",
    "[attr.aria-label]": "label()",
    "[attr.aria-pressed]": "toggle() ? pressed() : null",
    "[disabled]": "disabled() || loading()",
    "[attr.aria-busy]": "loading() ? true : null",
    "[attr.data-state]": "pressed() ? 'active' : 'inactive'",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-loading]": "loading() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.data-color]": "color()",
    "[attr.data-shape]": "shape()",
    "[class]": "classes()",
    "(click)": "activate()",
  },
  template: `@if (loading()) {
      <span
        mnHook="icon-button"
        mnPart="spinner"
        aria-hidden="true"
        [class]="s.loading"
        >◌</span
      >
    } @else {
      <span
        mnHook="icon-button"
        mnPart="icon"
        aria-hidden="true"
        [class]="s.glyph"
        ><ng-content
      /></span>
    }`,
})
export class MnIconButton {
  readonly label = input.required<string>();
  readonly toggle = input(false, { transform: booleanAttribute });
  readonly pressed = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly size = input<"xsmall" | "small" | "medium" | "large">("medium");
  readonly variant = input<"ghost" | "solid" | "outline">("ghost");
  readonly color = input<
    "primary" | "neutral" | "success" | "warning" | "danger" | "info"
  >("neutral");
  readonly shape = input<"circle" | "square">("square");
  protected readonly s = styles.iconButtonStyles;
  protected readonly classes = computed(() =>
    cn(
      this.s.iconButton,
      this.s[this.size()],
      this.s[`variant-${this.variant()}`],
      this.s[this.color()],
      this.s[this.shape()],
    ),
  );
  protected activate() {
    if (this.toggle() && !this.disabled() && !this.loading())
      this.pressed.update((v) => !v);
  }
}
@Component({
  selector: "mn-tag",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "tag",
    "data-part": "root",
    "[attr.data-state]": "active() ? 'active' : 'inactive'",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-loading]": "loading() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.data-color]": "color()",
    "[attr.data-shape]": "shape()",
    "[class]": "classes()",
  },
  template: `@if (loading()) {
      <span mnHook="tag" mnPart="spinner" aria-hidden="true">◌</span>
    }
    @if (avatar()) {
      <span mnHook="tag" mnPart="avatar" aria-hidden="true">{{
        avatar()
      }}</span>
    }
    @if (icon()) {
      <span mnHook="tag" mnPart="icon" aria-hidden="true">{{ icon() }}</span>
    }
    @if (clickable()) {
      <button
        type="button"
        mnHook="tag"
        mnPart="action"
        [disabled]="disabled() || loading()"
        [attr.aria-pressed]="active()"
        (click)="active.update(invert)"
      >
        <span mnHook="tag" mnPart="label">{{ label() }}</span>
      </button>
    } @else {
      <span mnHook="tag" mnPart="label">{{ label() }}<ng-content /></span>
    }
    @if (closable()) {
      <button
        type="button"
        mnHook="tag"
        mnPart="close-button"
        [attr.aria-label]="'Remove ' + label()"
        [disabled]="disabled() || loading()"
        (click)="removed.emit()"
      >
        ×
      </button>
    }`,
})
export class MnTag {
  readonly label = input("");
  readonly icon = input("");
  readonly avatar = input("");
  readonly clickable = input(false, { transform: booleanAttribute });
  readonly closable = input(false, { transform: booleanAttribute });
  readonly active = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly removed = output<void>();
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly variant = input<"subtle" | "outline" | "solid">("subtle");
  readonly color = input<
    "primary" | "neutral" | "success" | "warning" | "danger" | "info"
  >("primary");
  readonly shape = input<"square" | "rounded" | "circle">("rounded");
  protected readonly invert = (v: boolean) => !v;
  protected readonly classes = computed(() =>
    cn(
      styles.tagStyles.tag,
      (styles.tagStyles as Record<string, string>)[this.size()],
      (styles.tagStyles as Record<string, string>)[this.variant()],
      (styles.tagStyles as Record<string, string>)[this.color()],
      (styles.tagStyles as Record<string, string>)[this.shape()],
    ),
  );
}
