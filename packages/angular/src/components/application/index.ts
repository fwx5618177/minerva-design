import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from "@angular/core";
import { MnDialogBase } from "../../internal/dialog";
import { MnHook } from "../../internal/hooks";
import { MnPortal } from "../../internal/portal";
import { injectId } from "../../internal/ids";
import * as styles from "../../internal/styles";

@Component({
  selector: "mn-alert",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "alert",
    "data-part": "root",
    role: "alert",
    "[hidden]": "dismissed()",
    "[attr.data-state]": "expanded()?'open':'closed'",
    "[attr.data-size]": "size()",
    "[attr.data-color]": "color()",
    "[attr.data-variant]": "variant()",
    "[class]": "classes()",
  },
  template: `<span
      mnHook="alert"
      mnPart="icon"
      aria-hidden="true"
      [class]="s.icon"
      >{{ icon() }}</span
    >
    <div [class]="s.content">
      <strong mnHook="alert" mnPart="title" [class]="s.title">{{
        title()
      }}</strong>
      <div
        mnHook="alert"
        mnPart="description"
        [class]="s.message"
        [hidden]="collapsible() && !expanded()"
      >
        {{ description() }}<ng-content />
      </div>
    </div>
    <span mnHook="alert" mnPart="action" [class]="s.action"
      ><ng-content select="[mnAction]"
    /></span>
    @if (collapsible()) {
      <button
        type="button"
        mnHook="alert"
        mnPart="trigger"
        [class]="s.expandButton"
        [attr.aria-expanded]="expanded()"
        (click)="expanded.set(!expanded())"
      >
        {{ expanded() ? "Collapse" : "Expand" }}
      </button>
    }
    @if (closable()) {
      <button
        type="button"
        mnHook="alert"
        mnPart="close-button"
        aria-label="Dismiss alert"
        [class]="s.closeButton"
        (click)="dismissed.set(true); closed.emit()"
      >
        ×
      </button>
    }`,
})
export class MnAlert {
  readonly title = input("");
  readonly description = input("");
  readonly icon = input("ⓘ");
  readonly color = input<"info" | "success" | "warning" | "danger">("info");
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly variant = input<"solid" | "outline" | "subtle">("subtle");
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly closable = input(false, { transform: booleanAttribute });
  readonly expanded = model(true);
  readonly closed = output<void>();
  protected readonly dismissed = signal(false);
  protected readonly s = styles.alertStyles;
  protected readonly classes = computed(() =>
    [
      this.s.alert,
      this.s[this.color()],
      this.s[this.size()],
      this.variant() === "subtle"
        ? ""
        : this.s[this.variant() as "solid" | "outline"],
    ].join(" "),
  );
}

export interface NavTreeItem {
  id: string;
  label: string;
  href?: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  children?: readonly NavTreeItem[];
}
@Component({
  selector: "mn-nav-tree",
  imports: [MnHook, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "nav-tree",
    "data-part": "root",
    role: "navigation",
    "[attr.aria-label]": "label()",
    "[class]": "s.navTree",
  },
  template: `<h2
      mnHook="nav-tree"
      mnPart="group-label"
      [class]="s.sectionTitle"
    >
      {{ label() }}
    </h2>
    <ng-container
      [ngTemplateOutlet]="branch"
      [ngTemplateOutletContext]="{ $implicit: items() }"
    /><ng-template #branch let-entries
      ><ul mnHook="nav-tree" mnPart="group" [class]="s.list">
        @for (item of entries; track item.id) {
          <li>
            <a
              mnHook="nav-tree"
              mnPart="item"
              [class]="s.item"
              [mnStates]="{
                current: value() === item.id,
                disabled: item.disabled,
                expanded: expanded().includes(item.id),
              }"
              [attr.href]="item.disabled ? null : item.href"
              [attr.role]="item.href ? 'link' : 'button'"
              [attr.tabindex]="item.disabled ? -1 : 0"
              [attr.aria-current]="value() === item.id ? 'page' : null"
              [attr.aria-disabled]="item.disabled"
              [attr.aria-expanded]="
                item.children ? expanded().includes(item.id) : null
              "
              (click)="activate(item, $event)"
              (keydown.enter)="activate(item, $event)"
              (keydown.space)="activate(item, $event)"
            >
              @if (item.icon) {
                <span
                  mnHook="nav-tree"
                  mnPart="icon"
                  aria-hidden="true"
                  [class]="s.icon"
                  >{{ item.icon }}</span
                >
              }
              <span [class]="s.copy"
                ><span mnHook="nav-tree" mnPart="label" [class]="s.label">{{
                  item.label
                }}</span>
                @if (item.description) {
                  <span
                    mnHook="nav-tree"
                    mnPart="description"
                    [class]="s.description"
                    >{{ item.description }}</span
                  >
                }
              </span></a
            >
            @if (item.children && expanded().includes(item.id)) {
              <ng-container
                [ngTemplateOutlet]="branch"
                [ngTemplateOutletContext]="{ $implicit: item.children }"
              />
            }
          </li>
        }</ul
    ></ng-template>`,
})
export class MnNavTree {
  readonly items = input<readonly NavTreeItem[]>([]);
  readonly label = input("Navigation");
  readonly value = model("");
  readonly expanded = model<readonly string[]>([]);
  readonly selected = output<NavTreeItem>();
  protected readonly s = styles.navTreeStyles;
  protected activate(item: NavTreeItem, event: Event) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (item.children) {
      event.preventDefault();
      this.expanded.update((v) =>
        v.includes(item.id)
          ? v.filter((id) => id !== item.id)
          : [...v, item.id],
      );
    } else {
      this.value.set(item.id);
      this.selected.emit(item);
    }
  }
}

@Component({
  selector: "mn-app-shell",
  imports: [MnHook, MnPortal, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "app-shell",
    "data-part": "root",
    "[attr.data-state]": "state()",
    "[class]": "s.shell",
    "data-sidebar-expanded": "",
  },
  template: `<a
      mnHook="app-shell"
      mnPart="skip-link"
      [class]="s.skipLink"
      [href]="'#' + mainId"
      >Skip to content</a
    >
    <aside mnHook="app-shell" mnPart="sidebar" [class]="s.sidebar">
      @if (navigation(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" />
      }
    </aside>
    <div [class]="s.workspace">
      <header mnHook="app-shell" mnPart="header" [class]="s.header">
        <button
          type="button"
          aria-label="Open navigation"
          [attr.aria-expanded]="isOpen()"
          (click)="setOpen(true)"
        >
          ☰</button
        >{{ title() }}<ng-content select="[mnHeader]" />
      </header>
      <main
        mnHook="app-shell"
        mnPart="main"
        [id]="mainId"
        tabindex="-1"
        [class]="s.content"
      >
        <ng-content />
      </main>
    </div>
    @if (mounted()) {
      <ng-container *mnPortal
        ><div
          mnHook="app-shell"
          mnPart="overlay"
          [mnStates]="{ state: state() }"
          [class]="s.overlay"
          aria-hidden="true"
        ></div>
        <aside
          #panel
          mnHook="app-shell"
          mnPart="content"
          [mnStates]="{ state: state() }"
          [class]="s.drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          tabindex="-1"
        >
          <button
            type="button"
            mnHook="app-shell"
            mnPart="close-button"
            [class]="s.drawerClose"
            aria-label="Close navigation"
            (click)="setOpen(false)"
          >
            ×
          </button>
          @if (navigation(); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          }</aside
      ></ng-container>
    }`,
})
export class MnAppShell extends MnDialogBase {
  readonly title = input("");
  protected readonly navigation =
    contentChild<TemplateRef<unknown>>(TemplateRef);
  protected readonly mainId = injectId("main");
  protected readonly s = styles.appShellStyles;
}

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
}
export interface TableSort {
  key: string;
  direction: "ascending" | "descending";
}
@Component({
  selector: "mn-data-table",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "data-table",
    "data-part": "root",
    "[attr.data-loading]": "loading() ? '' : null",
    "[attr.aria-busy]": "loading()",
    "[class]": "s.dataTable",
  },
  template: `<div mnHook="data-table" mnPart="viewport" [class]="s.wrapper">
    <table
      mnHook="data-table"
      mnPart="table"
      [mnStates]="{ size: size(), variant: variant() }"
      [class]="s.table"
    >
      <caption>
        {{
          caption()
        }}
      </caption>
      <thead>
        <tr>
          @if (selectable()) {
            <th scope="col">Select</th>
          }
          @for (column of columns(); track column.key) {
            <th
              mnHook="data-table"
              mnPart="header-cell"
              scope="col"
              [mnStates]="{
                sort: sort()?.key === column.key ? sort()!.direction : 'none',
              }"
              [attr.aria-sort]="
                sort()?.key === column.key ? sort()!.direction : 'none'
              "
            >
              @if (column.sortable) {
                <button
                  mnHook="data-table"
                  mnPart="sort-button"
                  type="button"
                  [class]="s.sortButton"
                  (click)="sortBy(column.key)"
                >
                  {{ column.header }}
                </button>
              } @else {
                {{ column.header }}
              }
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @if (loading()) {
          <tr>
            <td [attr.colspan]="columns().length + (selectable() ? 1 : 0)">
              <span mnHook="data-table" mnPart="skeleton" [class]="s.skeleton"
                >Loading…</span
              >
            </td>
          </tr>
        } @else if (error()) {
          <tr>
            <td
              mnHook="data-table"
              mnPart="error"
              role="alert"
              [class]="s.error"
              [attr.colspan]="columns().length + (selectable() ? 1 : 0)"
            >
              {{ error()
              }}<button type="button" (click)="retry.emit()">Retry</button>
            </td>
          </tr>
        } @else {
          @for (row of sortedRows(); track rowKey(row)) {
            <tr
              mnHook="data-table"
              mnPart="row"
              [mnStates]="{ selected: selection().includes(rowKey(row)) }"
            >
              @if (selectable()) {
                <td>
                  <input
                    mnHook="data-table"
                    mnPart="checkbox"
                    type="checkbox"
                    [attr.aria-label]="'Select row ' + rowKey(row)"
                    [checked]="selection().includes(rowKey(row))"
                    (change)="select(rowKey(row))"
                  />
                </td>
              }
              @for (column of columns(); track column.key) {
                <td mnHook="data-table" mnPart="cell">{{ row[column.key] }}</td>
              }
            </tr>
          } @empty {
            <tr>
              <td
                mnHook="data-table"
                mnPart="empty"
                [class]="s.empty"
                [attr.colspan]="columns().length + (selectable() ? 1 : 0)"
              >
                {{ emptyText() }}
              </td>
            </tr>
          }
        }
      </tbody>
    </table>
  </div>`,
})
export class MnDataTable {
  readonly rows = input<readonly Record<string, unknown>[]>([]);
  readonly columns = input<readonly TableColumn[]>([]);
  readonly keyField = input("id");
  readonly caption = input("");
  readonly emptyText = input("No results");
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly variant = input<"simple" | "striped" | "bordered">("simple");
  readonly loading = input(false, { transform: booleanAttribute });
  readonly error = input<string | null>(null);
  readonly selectable = input(false, { transform: booleanAttribute });
  readonly selection = model<readonly string[]>([]);
  readonly sort = model<TableSort | null>(null);
  readonly retry = output<void>();
  protected readonly s = styles.tableStyles;
  protected rowKey(row: Record<string, unknown>) {
    return String(row[this.keyField()]);
  }
  protected readonly sortedRows = computed(() => {
    const sort = this.sort();
    if (!sort) return this.rows();
    return [...this.rows()].sort(
      (a, b) =>
        String(a[sort.key] ?? "").localeCompare(
          String(b[sort.key] ?? ""),
          undefined,
          { numeric: true },
        ) * (sort.direction === "ascending" ? 1 : -1),
    );
  });
  protected sortBy(key: string) {
    this.sort.set({
      key,
      direction:
        this.sort()?.key === key && this.sort()?.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  }
  protected select(key: string) {
    this.selection.update((rows) =>
      rows.includes(key) ? rows.filter((k) => k !== key) : [...rows, key],
    );
  }
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  color?: "info" | "success" | "warning" | "danger";
  loading?: boolean;
  state?: "open" | "closed";
  action?: string;
  duration?: number;
}
@Injectable({ providedIn: "root" })
export class MnToastService {
  readonly messages = signal<readonly ToastMessage[]>([]);
  private next = 0;
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();
  show(message: Omit<ToastMessage, "id"> & { id?: string }): string {
    const id = message.id ?? `toast-${++this.next}`;
    this.messages.update((items) => [
      ...items.filter((item) => item.id !== id),
      { ...message, id, state: "open" },
    ]);
    const old = this.timers.get(id);
    if (old) clearTimeout(old);
    if (message.duration !== 0 && !message.loading)
      this.timers.set(
        id,
        setTimeout(() => this.dismiss(id), message.duration ?? 5000),
      );
    return id;
  }
  dismiss(id: string) {
    const timer = this.timers.get(id);
    if (timer) clearTimeout(timer);
    this.timers.delete(id);
    this.messages.update((items) => items.filter((item) => item.id !== id));
  }
  clear() {
    for (const timer of this.timers.values()) clearTimeout(timer);
    this.timers.clear();
    this.messages.set([]);
  }
}
@Component({
  selector: "mn-toast-region",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "toast-region",
    "data-part": "root",
    role: "region",
    "aria-label": "Notifications",
    "aria-live": "polite",
    "[class]": "s.viewport",
  },
  template: `@for (toast of entries(); track toast.id) {
    <div
      mnHook="toast-region"
      mnPart="toast"
      [mnStates]="{
        state: toast.state ?? 'open',
        color: toast.color ?? 'info',
        loading: toast.loading,
      }"
      [class]="s.toast"
      [attr.role]="toast.color === 'danger' ? 'alert' : 'status'"
    >
      <span mnHook="toast-region" mnPart="icon" aria-hidden="true">{{
        toast.loading ? "◌" : "ⓘ"
      }}</span
      ><strong mnHook="toast-region" mnPart="title">{{ toast.title }}</strong>
      @if (toast.description) {
        <p mnHook="toast-region" mnPart="description">
          {{ toast.description }}
        </p>
      }
      @if (toast.action) {
        <button
          type="button"
          mnHook="toast-region"
          mnPart="action"
          (click)="action.emit(toast)"
        >
          {{ toast.action }}
        </button>
      }
      <button
        type="button"
        mnHook="toast-region"
        mnPart="close-button"
        aria-label="Dismiss notification"
        (click)="dismiss(toast.id)"
      >
        ×</button
      ><span
        mnHook="toast-region"
        mnPart="progress"
        aria-hidden="true"
        [style.animation-duration.ms]="toast.duration ?? 5000"
      ></span>
    </div>
  }`,
})
export class MnToastRegion {
  readonly messages = input<readonly ToastMessage[] | undefined>();
  readonly max = input(5);
  readonly closed = output<string>();
  readonly action = output<ToastMessage>();
  protected readonly service = inject(MnToastService);
  protected readonly entries = computed(() =>
    (this.messages() ?? this.service.messages()).slice(
      -Math.max(1, this.max()),
    ),
  );
  protected readonly s = styles.toastStyles;
  protected dismiss(id: string) {
    this.service.dismiss(id);
    this.closed.emit(id);
  }
}
