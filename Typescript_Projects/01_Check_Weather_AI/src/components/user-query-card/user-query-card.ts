import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config.js";
import getResponseService from "../../appwrite/get-ai-response.js";

const withTwind = install(config);

/**
 * @interface aiQueryInfoInterface - This interface is used for data structure of ai query response.
 */
export interface aiQueryInfoInterface {
  summary: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  forecast: string;
  userQueryResponse: string;
}

/**
 * `UserQueryCard` - This class component is used to show the user query response related weather information.
 */
@customElement("user-query-card")
@withTwind
export class UserQueryCard extends LitElement {
  @property()
  accessor queryResponseSlug: string | null = null;

  @state()
  accessor queryAIResponse: aiQueryInfoInterface | null = null;
  @state()
  accessor userQuery: string | null = null;

  /**
   * `setQueryAIResponse` - It is used to set query ai response which comes from DB.
   */
  async setQueryAIResponse() {
    try {
      // remove old response to render
      this.queryAIResponse = null;
      setTimeout(async () => {
        if (this.queryResponseSlug) {
          const queryAIResponseRaw =
            await getResponseService.getQueryAIResponse(this.queryResponseSlug);
          //console.log(queryAIResponseRaw);

          // Mapping the response to aiQueryInfoInterface
          this.queryAIResponse = {
            summary: queryAIResponseRaw.summary ?? "",
            temperature: queryAIResponseRaw.temperature ?? "",
            humidity: queryAIResponseRaw.humidity ?? "",
            windSpeed: queryAIResponseRaw.windSpeed ?? "",
            precipitation: queryAIResponseRaw.precipitation ?? "",
            forecast: queryAIResponseRaw.forecast ?? "",
            userQueryResponse: queryAIResponseRaw.userQueryResponse ?? "",
          };

          const userQueryToAI = localStorage.getItem("userQueryToAI");
          this.userQuery = userQueryToAI;
        }
      }, 9000);
    } catch (error: any) {
      console.log(
        "Error while getting query ai response from Db",
        error.message
      );
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("queryResponseSlug") && this.queryResponseSlug) {
      this.setQueryAIResponse();
    }
  }

  render() {
    return html`
      ${this.queryAIResponse !== null
        ? html`
            <div
              class="bg-transparent border border-white/50 backdrop-blur-sm py-6 sm:px-6 lg:px-8"
            >
              <div class="p-4">
                <h2 class="text-lg font-extrabold">Your Query</h2>
                <p class="text-sm font-semibold text-white">
                  ${this.userQuery}
                </p>
              </div>
              <div class="p-4 border-t border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <h3 class="text-md font-bold">
                    ${this.queryAIResponse.summary}
                  </h3>
                </div>
                <div class="flex flex-col  justify-between items-center">
                  <h3 class="text-md font-bold">Temperature: &nbsp</h3>
                  <p class="text-sm font-semibold text-white">
                    ${this.queryAIResponse.temperature}
                  </p>
                </div>
                <div class="flex flex-col justify-between items-center mt-2">
                  <h3 class="text-md font-bold">Humidity: &nbsp</h3>
                  <p class="text-sm font-semibold text-white">
                    ${this.queryAIResponse.humidity}
                  </p>
                </div>
                <div class="flex flex-col justify-between items-center mt-2">
                  <h3 class="text-md font-bold">Wind Speed: &nbsp</h3>
                  <p class="text-sm font-semibold text-white">
                    ${this.queryAIResponse.windSpeed}
                  </p>
                </div>
                <div class="flex flex-col justify-between items-center mt-2">
                  <h3 class="text-md font-bold">Precipitation: &nbsp</h3>
                  <p class="text-sm font-semibold text-white">
                    ${this.queryAIResponse.precipitation}
                  </p>
                </div>
                <div class="flex flex-col  justify-between items-center mt-2">
                  <h3 class="text-md font-bold">Forecast: &nbsp</h3>
                  <p class="text-sm font-semibold text-white">
                    ${this.queryAIResponse.forecast}
                  </p>
                </div>
              </div>
              <div class="p-4">
                <h2 class="text-lg font-extrabold">Your Query Response</h2>
                <p class="text-sm font-semibold text-white">
                  ${this.queryAIResponse.userQueryResponse}
                </p>
              </div>
            </div>
          `
        : null}
    `;
  }
}
