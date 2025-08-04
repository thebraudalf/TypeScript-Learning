import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "./pages/home-page.js";

@customElement("main-content")
export class MainContent extends LitElement {
  render() {
    return html` <home-page></home-page> `;
  }
}
