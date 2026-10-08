import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Machine } from "@minerva/core";

/**
 * Lit wrapper of a headless @minerva/core machine: the host re-renders when
 * the machine state changes while connected. Feed the host's properties with
 * `sync()` (typically from `willUpdate`); elements keep their properties as
 * the source of truth by passing them as controlled values and applying the
 * changes reported by the machine's callbacks.
 */
export class MachineController<
  S extends object,
  E,
  P extends object,
> implements ReactiveController {
  readonly machine: Machine<S, E, P>;
  private unsubscribe?: () => void;
  private readonly shouldUpdate: (state: S, prev: S) => boolean;

  /**
   * @param shouldUpdate - Which state changes re-render the host (default:
   * every change; e.g. skip the ones the template does not read).
   */
  constructor(
    private readonly host: ReactiveControllerHost,
    machine: Machine<S, E, P>,
    shouldUpdate: (state: S, prev: S) => boolean = () => true,
  ) {
    this.machine = machine;
    this.shouldUpdate = shouldUpdate;
    host.addController(this);
  }

  /** Current state. */
  get state(): S {
    return this.machine.getState();
  }

  /** Sends an event to the machine. */
  send = (event: Parameters<Machine<S, E, P>["send"]>[0]): void => {
    this.machine.send(event);
  };

  /** Updates the machine's props (no change callbacks). */
  sync(props: Partial<P>): void {
    this.machine.setProps(props);
  }

  hostConnected(): void {
    this.unsubscribe ??= this.machine.subscribe((state, prev) => {
      if (this.shouldUpdate(state, prev)) this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
