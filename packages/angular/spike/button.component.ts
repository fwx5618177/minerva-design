import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";

@Component({
  selector: "mn-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button
    class="mn-button"
    type="button"
    [class.mn-button--disabled]="disabled()"
    [disabled]="disabled() || loading()"
    (click)="onClick()"
  >
    <ng-content />
  </button>`,
})
export class MnButtonComponent {
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly press = output<void>();

  onClick(): void {
    if (this.disabled() || this.loading()) return;
    this.press.emit();
  }
}
