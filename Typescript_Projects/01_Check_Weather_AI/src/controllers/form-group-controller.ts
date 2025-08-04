import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { FormController } from "./form-controller";
import { controlDirective } from "../directives/control-directive";

/**
 * @class `FormGroupController` - This controller will be responsible for managing a group of `FormControls`.
 * It takes a `controls` object where the key is the `control` name, and the value is a `FormControl` instance.
 */
export class FormGroupController<T extends Record<string, FormController>>
  implements ReactiveController
{
  constructor(private host: ReactiveControllerHost, public controls: T) {
    this.host.addController(this);
  }

  hostConnected?(): void {
    // Optional: logic to run when the host is connected
  }

  hostDisconnected?(): void {
    // Optional: logic to run when the host is disconnected
  }

  /**
   * `value` - This getter returns the reduced value of the controls.
   */
  get value() {
    const value: Record<string, any> = {};

    for (const [key, control] of Object.entries(this.controls)) {
      value[key] = control.getValue();
    }

    return value;
  }

  get invalid() {
    return Object.values(this.controls).some((c) => c.invalid);
  }

  /**
   * `registerControl` - It is used to register controls which method calls the `controlDirective` function.
   * @param name - it is used to pass the name of register `control`.
   * @returns - it returns the `controlDirective` function passing the `controller` and `control` name.
   */
  registerControl(name: string) {
    return controlDirective(this, name);
  }

  requestUpdate() {
    this.host.requestUpdate();
  }
}
