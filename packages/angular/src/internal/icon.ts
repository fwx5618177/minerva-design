import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { ICONS, type IconData, type IconName } from "./icon-data";

/**
 * Internal inline SVG icon (`<svg mnIcon="X">`): the library's icon set,
 * 1em, `currentColor`, decorative (`aria-hidden`, not focusable). Rendered
 * from data (no innerHTML), identical markup on the server and the client.
 */
@Component({
  selector: "svg[mnIcon]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    "[attr.width]": "size()",
    "[attr.height]": "size()",
    "[attr.fill]": 'data().fill ? "currentColor" : "none"',
    "[attr.stroke]": 'data().fill ? "none" : "currentColor"',
    "[attr.stroke-width]": 'data().fill ? null : "2"',
    "[attr.stroke-linecap]": 'data().fill ? null : "round"',
    "[attr.stroke-linejoin]": 'data().fill ? null : "round"',
    "[attr.fill-rule]": 'data().fill ? "evenodd" : null',
    "[attr.clip-rule]": 'data().fill ? "evenodd" : null',
  },
  template: `
    @for (node of data().nodes; track $index) {
      @switch (node[0]) {
        @case ("path") {
          <svg:path [attr.d]="node[1]['d']" />
        }
        @case ("circle") {
          <svg:circle
            [attr.cx]="node[1]['cx']"
            [attr.cy]="node[1]['cy']"
            [attr.r]="node[1]['r']"
          />
        }
        @case ("rect") {
          <svg:rect
            [attr.x]="node[1]['x'] ?? null"
            [attr.y]="node[1]['y'] ?? null"
            [attr.width]="node[1]['width'] ?? null"
            [attr.height]="node[1]['height'] ?? null"
            [attr.rx]="node[1]['rx'] ?? null"
            [attr.ry]="node[1]['ry'] ?? null"
          />
        }
      }
    }
  `,
})
export class MnIcon {
  /** Icon name */
  readonly mnIcon = input.required<IconName>();
  /** Width and height (CSS length) */
  readonly size = input<string>("1em");

  protected readonly data = computed<IconData>(() => ICONS[this.mnIcon()]);
}
