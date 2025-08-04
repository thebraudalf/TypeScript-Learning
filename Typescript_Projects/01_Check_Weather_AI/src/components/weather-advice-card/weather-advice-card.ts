import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config.js";
import getResponseService from "../../appwrite/get-ai-response.js";

const withTwind = install(config);

/**
 * @interface aiAdviceInfoInterface - This interface is used for data structure of ai advice response.
 */
interface aiAdviceInfoInterface {
  summary: string;
  titleName: string;
  whatToDo: [String];
  whatNotToDo: [String];
}

/**
 * `WeatherAdviceCard` - This class component is used to show the advices related weather information.
 */
@customElement("weather-advice-card")
@withTwind
export class WeatherAdviceCard extends LitElement {
  @property()
  accessor adviceResponseSlug: string | null = null;

  @state()
  accessor adviceAIResponse: aiAdviceInfoInterface | null = null;

  /**
   * `setAdviceAIResponse` - It is used to set advice ai response which comes from DB.
   */
  async setAdviceAIResponse() {
    try {
      // remove old response to render
      this.adviceAIResponse = null;
      setTimeout(async () => {
        if (this.adviceResponseSlug) {
          const adviceAIResponseRaw =
            await getResponseService.getAdviceAIResponse(
              this.adviceResponseSlug
            );
          //console.log(adviceAIResponseRaw);

          // Mapping the response to aiAdviceInfoInterface
          this.adviceAIResponse = {
            summary: adviceAIResponseRaw.summary ?? "",
            titleName: adviceAIResponseRaw.titleName ?? "",
            whatToDo: adviceAIResponseRaw.whatToDo ?? [""],
            whatNotToDo: adviceAIResponseRaw.whatNotToDo ?? [""],
          };
        }
      }, 9000);
    } catch (error: any) {
      console.log(
        "Error while getting advice ai response from Db",
        error.message
      );
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (
      changedProperties.has("adviceResponseSlug") &&
      this.adviceResponseSlug
    ) {
      this.setAdviceAIResponse();
    }
  }

  render() {
    return html`
      ${this.adviceAIResponse !== null
        ? html`
            <div
              class="bg-transparent border border-white/50 backdrop-blur-sm py-6 sm:px-6 lg:px-8"
            >
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-extrabold">
                  ${this.adviceAIResponse.titleName}
                </h2>
                <img
                  src="https://img.icons8.com/?size=50&id=15352&format=png&color=000000"
                  alt="sun icon"
                  srcset=""
                  class="p-2"
                />
              </div>

              <div class="mb-4">
                <h3 class="text-sm font-bold mb-2">What to Do:</h3>
                <ul class="list-disc list-inside font-semibold text-white">
                  ${this.adviceAIResponse.whatToDo.map((whatToDo) => {
                    return html`<li>${whatToDo}</li>`;
                  })}
                </ul>
              </div>
              <div class="mb-4">
                <h3 class="text-sm font-bold mb-2">What Not to Do:</h3>
                <ul class="list-disc list-inside font-semibold text-white">
                  ${this.adviceAIResponse.whatNotToDo.map((whatNotToDo) => {
                    return html`<li>${whatNotToDo}</li>`;
                  })}
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-bold mb-2">Summary:</h3>
                <p class="font-semibold text-white">
                  ${this.adviceAIResponse.summary}
                </p>
              </div>
            </div>
          `
        : html` <div
            class="bg-transparent border border-white/50 backdrop-blur-sm py-6 sm:px-6 lg:px-8"
          >
            <div class="flex items-center justify-between mb-4 space-x-16">
              <div class="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
              <div
                class="h-10 w-10 bg-gray-300 rounded-full animate-pulse"
              ></div>
            </div>
            <div class="flex items-center justify-between space-x-6 mb-4">
              <div class="h-6 w-17 bg-gray-300 rounded animate-pulse"></div>
              <div class="h-6 w-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div class="mb-4">
              <h3 class="h-4 w-1/4 bg-gray-300 rounded animate-pulse mb-2"></h3>
              <ul class="list-disc list-inside">
                <li
                  class="h-4 w-3/4 bg-gray-300 rounded animate-pulse mb-1"
                ></li>
                <li class="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></li>
              </ul>
            </div>
            <div class="mb-4">
              <h3 class="h-4 w-1/4 bg-gray-300 rounded animate-pulse mb-2"></h3>
              <ul class="list-disc list-inside">
                <li
                  class="h-4 w-3/4 bg-gray-300 rounded animate-pulse mb-1"
                ></li>
                <li class="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></li>
              </ul>
            </div>
            <div>
              <h3 class="h-4 w-1/4 bg-gray-300 rounded animate-pulse mb-2"></h3>
              <div class="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>`}
    `;
  }
}
