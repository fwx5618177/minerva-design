import { Component, inject } from "@angular/core";
import {
  MnConfirmProvider,
  MnConfirmService,
  MnTooltipProvider,
  MnTooltip,
  MnPopover,
  MnPopoverAnchor,
  MnPopoverClose,
  MnMenu,
  MnTableRoot,
  MnTableHead,
  MnTableBody,
  MnTableRow,
  MnTableHeader,
  MnTableCell,
} from "../index";

@Component({
  imports: [MnConfirmProvider],
  template: `<mn-confirm-provider #confirmation="mnConfirmProvider" />`,
})
export class ConfirmHost {}
@Component({
  imports: [MnTooltipProvider, MnTooltip],
  template: `<mn-tooltip-provider
    [enterDelay]="30"
    [leaveDelay]="10"
    [skipDelay]="1000"
    ><mn-tooltip text="First hint"><button>First</button></mn-tooltip
    ><mn-tooltip text="Second hint"
      ><button>Second</button></mn-tooltip
    ></mn-tooltip-provider
  >`,
})
export class TooltipHost {}
@Component({
  imports: [MnPopover, MnPopoverAnchor, MnPopoverClose],
  template: `<span [mnPopoverAnchor]="popover">Anchor</span
    ><mn-popover #popover="mnPopover" label="Details" [(open)]="open"
      ><button mnPopoverClose>Done</button></mn-popover
    >`,
})
export class PopoverHost {
  open = false;
}
@Component({
  imports: [MnMenu],
  template: `<mn-menu
    label="View"
    [items]="items"
    [(radioValues)]="values"
    (radioChange)="changed = $event"
  />`,
})
export class MenuHost {
  values = { density: "comfortable" };
  changed: unknown;
  items = [
    {
      id: "density",
      type: "group" as const,
      label: "Density",
      children: [
        {
          id: "comfortable",
          type: "radio" as const,
          value: "comfortable",
          label: "Comfortable",
        },
        {
          id: "compact",
          type: "radio" as const,
          value: "compact",
          label: "Compact",
        },
        {
          id: "blocked",
          type: "radio" as const,
          value: "blocked",
          label: "Unavailable",
          disabled: true,
        },
      ],
    },
  ];
}
@Component({
  imports: [
    MnTableRoot,
    MnTableHead,
    MnTableBody,
    MnTableRow,
    MnTableHeader,
    MnTableCell,
  ],
  template: `<mn-table-root
    label="Inventory"
    size="small"
    variant="bordered"
    [scroll]="{ x: 600, y: 200 }"
    ><caption>
      Inventory
    </caption>
    <thead mnTableHead>
      <tr mnTableRow>
        <th mnTableHeader scope="col" [sort]="sort">
          <button (click)="sort = 'descending'">Name</button>
        </th>
        <th mnTableHeader scope="col">Stock</th>
      </tr>
    </thead>
    <tbody mnTableBody>
      <tr mnTableRow [selected]="true">
        <td mnTableCell [attr.colspan]="2">
          <button (click)="count = count + 1">{{ count }} selected</button>
        </td>
      </tr>
    </tbody></mn-table-root
  >`,
})
export class TableHost {
  sort: "ascending" | "descending" = "ascending";
  count = 0;
}

@Component({
  selector: "confirm-launcher",
  template: `<button (click)="request()">Scoped action</button>`,
})
export class ConfirmLauncher {
  readonly service = inject(MnConfirmService);
  result: boolean | undefined;
  async request() {
    this.result = await this.service.confirm({ title: "Scoped confirmation" });
  }
}
@Component({
  imports: [MnConfirmProvider, ConfirmLauncher],
  template: `<mn-confirm-provider><confirm-launcher /></mn-confirm-provider>`,
})
export class ScopedConfirmHost {}
