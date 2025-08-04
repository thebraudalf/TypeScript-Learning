import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../twind.config.js";

import "../components/greeting-card/greeting-card.js";
import "../components/search-bar/search-bar.js";
import "../components/weather-card/weather-card.js";
import "../components/weather-advice-card/weather-advice-card.js";
import "../components/user-query-card/user-query-card.js";

const withTwind = install(config);

/**
 * `HomePage` - This page is used to show the all class components on home page.
 */
@customElement("home-page")
@withTwind
export class HomePage extends LitElement {
  @state()
  accessor weatherResponseSlug: string | null = null;
  @state()
  accessor adviceResponseSlug: string | null = null;
  @state()
  accessor queryResponseSlug: string | null = null;

  /**
   * `setWeatherResponseSlug` - It is used to set weather response slug.
   */
  setWeatherResponseSlug = async (e: CustomEvent) => {
    const responseSlug = e.detail;
    this.weatherResponseSlug = responseSlug;
  };

  /**
   * `setAdviceResponseSlug` - It is used to set advice response slug.
   */
  setAdviceResponseSlug = async (e: CustomEvent) => {
    const responseSlug = e.detail;
    this.adviceResponseSlug = responseSlug;
  };

  /**
   * `setQueryResponseSlug` - It is used to set query response slug.
   */
  setQueryResponseSlug = async (e: CustomEvent) => {
    const responseSlug = e.detail;
    this.queryResponseSlug = responseSlug;
  };

  render() {
    return html`
      <div class="flex flex-col min-h-screen space-y-5 min-w-screen">
        <div class="min-[1800px]:mt-80 max-[1700px]:mt-40 text-center">
          <greeting-card></greeting-card>
        </div>
        <div class="sticky top-3.5 z-50">
          <search-bar
            @weather-response-slug-selected=${this.setWeatherResponseSlug}
            @query-response-slug-selected=${this.setQueryResponseSlug}
          ></search-bar>
        </div>

        <div
          class="flex flex-col transition-all duration-300"
        >
          ${this.weatherResponseSlug !== null
            ? html`
                <div class="py-2 px-2">
                  <weather-card
                    .responseSlug=${this.weatherResponseSlug}
                    @advice-response-slug-selected=${this.setAdviceResponseSlug}
                  ></weather-card>
                </div>
                ${this.adviceResponseSlug !== null
                  ? html`
                      <div class="py-2 px-2">
                        <weather-advice-card
                          .adviceResponseSlug=${this.adviceResponseSlug}
                        ></weather-advice-card>
                      </div>
                    `
                  : null}
              `
            : null}
          ${this.queryResponseSlug !== null
            ? html`
                <div class="py-2 px-2">
                  <user-query-card
                    .queryResponseSlug=${this.queryResponseSlug}
                  ></user-query-card>
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }
}
