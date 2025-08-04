import {
  AsyncDirective,
  directive,
  type AttributePart,
  type PartInfo,
} from "lit-html/async-directive.js";
import type { FormController } from "../controllers/form-controller";
import type { FormGroupController } from "../controllers/form-group-controller";
import { noChange } from "lit-html";

type ValueAccessor = {
  modelToView(element: HTMLElement, value: any): void;
  viewToModel(element: HTMLElement, cb: (value: any) => void): VoidFunction;
};

const valueAccessors: Record<string, ValueAccessor> = {
  "input[type=number]": {
    modelToView(element: HTMLElement, value: string) {
      (element as HTMLInputElement).value = value;
    },
    viewToModel(element: HTMLElement, cb: (value: number) => void) {
      const listener = (e: any) => cb(e.target.valueAsNumber);
      element.addEventListener("input", listener);

      return () => element.removeEventListener("input", listener);
    },
  },
  "input[type=checkbox]": {
    modelToView(element: HTMLElement, value: boolean) {
      (element as HTMLInputElement).checked = value;
    },
    viewToModel(element: HTMLElement, cb: (value: number) => void) {
      const listener = (e: any) => cb(e.target.checked);
      element.addEventListener("change", listener);

      return () => element.removeEventListener("change", listener);
    },
  },
  input: {
    modelToView(element: HTMLElement, value: string) {
      (element as HTMLInputElement).value = value;
    },
    viewToModel(element: HTMLElement, cb: (value: string) => void) {
      const listener = (e: any) => cb(e.target.value);
      element.addEventListener("input", listener);

      return () => element.removeEventListener("input", listener);
    },
  },
  select: {
    modelToView(element: HTMLElement, value: string) {
      (element as HTMLSelectElement).value = value;
    },
    viewToModel(element: HTMLElement, cb: (value: string) => void) {
      const listener = (e: any) => cb(e.target.value);
      element.addEventListener("select", listener);

      return () => element.removeEventListener("select", listener);
    },
  },
};

export class ControlDirective extends AsyncDirective {
  #FormController!: FormController;
  #disposables: Array<VoidFunction> = [];

  constructor(private part: PartInfo) {
    super(part);
  }

  get host(): HTMLElement {
    return (this.part as AttributePart).element;
  }

  render(group: FormGroupController<any>, name: string) {
    if (!this.#FormController) {
      let valueAccessor = null;

      for (const [selector, accessor] of Object.entries(valueAccessors)) {
        if (this.host.matches(selector)) {
          valueAccessor = accessor;
          break;
        }
      }

      const { viewToModel, modelToView } =
        valueAccessor ?? valueAccessors["input"];

      this.#FormController = group.controls[name];

      //Set the initial control value
      modelToView(
        this.host,
        this.#FormController.onModelChange((value) => {
          modelToView(this.host, value);
          this.#applyValidators(group);
        })
      );

      const disposalModelChange = this.#FormController.onModelChange(
        (value) => {
          modelToView(this.host, value);
          this.#applyValidators(group);
        }
      );

      const disposalViewToModel = viewToModel(this.host, (value: unknown) => {
        this.#FormController.setValue(value, { emitModelChange: false });
        this.#applyValidators(group);
      });

      this.#disposables.push(disposalViewToModel, disposalModelChange);
    }

    return noChange;
  }

  #applyValidators(group: FormGroupController<any>) {
    this.#FormController.applyValidators();
    this.host.classList.toggle("invalid", this.#FormController.invalid);

    // Update the controller to run detact changes on the host element
    group.requestUpdate();
  }

  protected disconnected() {
    this.#disposables.forEach((dispose) => dispose());
  }
}

export const controlDirective = directive(ControlDirective);
