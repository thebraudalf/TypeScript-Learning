import { noChange } from "lit-html";
import {
  AsyncDirective,
  directive,
  type AttributePart,
  type PartInfo,
} from "lit-html/async-directive.js";

/**
 * @class `SubmitDirective` - This directive is used to encapsulates the default form's behaviour functionality.
 * This directive takes a callback, which is called when the user submits the form.
 * We clean up the event when the form is detached from the `DOM`.
 */
class SubmitDirective extends AsyncDirective {
  #cb!: (e: Event) => void;

  constructor(private part: PartInfo) {
    super(part);
  }

  get host() {
    return (this.part as AttributePart).element;
  }

  render(onSubmit: (e: Event) => void) {
    if (!this.#cb) {
      this.#cb = (e) => {
        e.preventDefault();
        onSubmit(e);
      };

      this.host.addEventListener("submit", this.#cb);
    }

    return noChange;
  }

  disconnected() {
    this.host.removeEventListener("submit", this.#cb);
  }
}

export const onSubmit = directive(SubmitDirective);
