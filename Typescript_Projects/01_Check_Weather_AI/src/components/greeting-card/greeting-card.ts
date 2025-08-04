import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config";

const withTwind = install(config);

@customElement("greeting-card")
@withTwind
export class GreetingCard extends LitElement {
  render() {
    return html`
      <h1 class="text-4xl font-bold text-white mb-4">
        Welcome to Check Weather AI
      </h1>
      <p class="text-lg font-bold text-white mb-8">
        Stay Prepared for Every Forecast!!
      </p>
    `;
  }
}
