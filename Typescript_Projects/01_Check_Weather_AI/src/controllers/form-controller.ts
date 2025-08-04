export type Validator = (value: unknown) => boolean;

/**
 * @class `FormController` - This controller is used to tracks the `Value` and `Validation` status of an individual form control. 
 * It takes an initial value and an array of validators.
 */
export class FormController<T = any> {
  invalid = false;
  #modelChanged: Array<(v: T) => void> = [];

  constructor(private value: T, private validators?: Validator[]) {}

  setValue(value: T, { emitModelChange = true } = {}) {
    this.value = value;
    emitModelChange && this.#modelChanged.forEach((cb) => cb(this.value));
  }

  getValue() {
    return this.value;
  }

  applyValidators() {
    if (!this.validators?.length) return;

    this.invalid = this.validators.some((validator) => !validator(this.value));
  }

  onModelChange(cb: (v: T) => void) {
    this.#modelChanged.push(cb);

    return () => {
      this.#modelChanged = this.#modelChanged.filter((c) => c !== cb);
    };
  }
}
