import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config.js";
import getResponseService from "../../appwrite/get-ai-response.js";
import type {
  locationDataInterface,
  textLocationDataInterface,
} from "../search-bar/search-bar.js";
import { inngest } from "../../inngest/client.js";
import { v4 as uuid } from "uuid";
import { GetLocationData } from "../../api/accu-weather/location-api.js";
import "../map-card/map-card.js";

const withTwind = install(config);

/**
 * @interface aiWeatherInfoInterface - This interface is used for data structure of ai weather response.
 */
export interface aiWeatherInfoInterface {
  summary: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  forecast: string;
}

/**
 * `WeatherCard` - This class component is used to show the weather information.
 */
@customElement("weather-card")
@withTwind
export class WeatherCard extends LitElement {
  @property()
  accessor responseSlug: string | null = null;

  @state()
  accessor weatherAIResponse: aiWeatherInfoInterface | null = null;
  @state()
  accessor tempLocationDetail: locationDataInterface | null = null;
  @state()
  accessor locationDetail: textLocationDataInterface | null = null;

  /**
   * `setWeatherAIResponse` - It is used to set ai response which comes from DB.
   */
  async setWeatherAIResponse() {
    try {
      // remove old response to render
      this.weatherAIResponse = null;
      setTimeout(async () => {
        if (this.responseSlug) {
          const weatherAIResponseRaw =
            await getResponseService.getWeatherAIResponse(this.responseSlug);
          //console.log(weatherAIResponseRaw);

          // Mapping the response to aiWeatherInfoInterface
          this.weatherAIResponse = {
            summary: weatherAIResponseRaw.summary ?? "",
            temperature: weatherAIResponseRaw.temperature ?? "",
            humidity: weatherAIResponseRaw.humidity ?? "",
            windSpeed: weatherAIResponseRaw.windSpeed ?? "",
            precipitation: weatherAIResponseRaw.precipitation ?? "",
            forecast: weatherAIResponseRaw.forecast ?? "",
          };

          // removing old and parsing new localStorage iteams
          const locationDetail = localStorage.getItem("locationData");
          this.tempLocationDetail = JSON.parse(locationDetail as string);

          const ipLocationDetail = localStorage.getItem("ipLocationDetail");
          if (locationDetail != null) {
            const fullLocationDetail: textLocationDataInterface | null =
              await GetLocationData.searchByLocationKey(
                this.tempLocationDetail?.Key as string
              );
            //console.log("fullLocationDetail", fullLocationDetail);

            this.locationDetail = fullLocationDetail;
            //console.log("locationDetail", this.locationDetail);
          } else if (ipLocationDetail !== null) {
            this.locationDetail = JSON.parse(ipLocationDetail);
          } else {
            const textLocationData: textLocationDataInterface | string | null =
              localStorage.getItem("textLocationData");
            if (textLocationData !== null) {
              this.locationDetail = JSON.parse(textLocationData);
            }
          }
        }
      }, 9000);
    } catch (error: any) {
      console.log(
        "Error while getting weather ai response from Db",
        error.message
      );
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("responseSlug") && this.responseSlug) {
      this.setWeatherAIResponse();
    }
  }

  /**
   * `askAIForAdvice` - It is used to send event data to inngest.
   */
  async askAIForAdvice() {
    const responseSlug = uuid();

    await inngest.send({
      name: "ask/advice",
      data: {
        aiWeatherInfo: this.weatherAIResponse,
        responseSlug: responseSlug,
      },
    });

    // ✅ Dispatch event to parent
    this.dispatchEvent(
      new CustomEvent("advice-response-slug-selected", {
        detail: responseSlug,
        bubbles: true,
        composed: true,
      })
    );

    this.requestUpdate(); // force Lit to re-render
  }

  render() {
    return html`
      ${this.weatherAIResponse !== null
        ? html`
            <section
              class="bg-transparent border border-white/50 backdrop-blur-sm py-6"
            >
              <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                  <h2
                    class="text-base text-indigo-600 font-bold shadow-2xl tracking-wide uppercase"
                  >
                    ${this.locationDetail?.LocalizedName ?? ""},
                    ${this.locationDetail?.AdministrativeArea?.LocalizedName ??
                    ""},
                    ${this.locationDetail?.Country?.LocalizedName ?? ""}
                  </h2>
                  <p
                    class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                  >
                    ${this.locationDetail?.LocalizedName ?? "Today"}'s Current
                    Weather
                  </p>
                  <p class="mt-4 max-w-2xl text-xl text-white lg:mx-auto">
                    ${this.weatherAIResponse.summary}
                  </p>
                </div>

                <div class="mt-10">
                  <dl
                    class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
                  >
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            fill="currentColor"
                            class="p-3.5"
                          >
                            <path
                              d="M160 64c-26.5 0-48 21.5-48 48l0 164.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5L208 112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112l0 164.4c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6L48 112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3L144 112c0-8.8 7.2-16 16-16s16 7.2 16 16l0 210.7c18.6 6.6 32 24.4 32 45.3z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium text-white">
                          Temperature
                        </dt>
                        <dd class="mt-2 text-base text-white">
                          ${this.weatherAIResponse.temperature}
                        </dd>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 420 512"
                            fill="currentColor"
                            class="p-2 pl-3"
                          >
                            <path
                              d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0l1.8 0c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium text-white">
                          Humidity
                        </dt>
                        <dd class="mt-2 text-base text-white">
                          ${this.weatherAIResponse.humidity}
                        </dd>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            class="p-2"
                          >
                            <path
                              d="M288 32c0 17.7 14.3 32 32 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c53 0 96-43 96-96s-43-96-96-96L320 0c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32l32 0c53 0 96-43 96-96s-43-96-96-96L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32zM128 512l32 0c53 0 96-43 96-96s-43-96-96-96L32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium text-white">
                          Wind Speed
                        </dt>
                        <dd class="mt-2 text-base text-white">
                          ${this.weatherAIResponse.windSpeed}
                        </dd>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            fill="currentColor"
                            class="p-2"
                          >
                            <path
                              d="M0 336c0 79.5 64.5 144 144 144l368 0c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <dt class="text-lg leading-6 font-medium text-white">
                          Forecast
                        </dt>
                        <dd class="mt-2 text-base shadow-2xs text-white">
                          ${this.weatherAIResponse.forecast}
                        </dd>
                      </div>
                    </div>
                    <div
                      class=" overflow-hidden bg-white/10 border border-white/20 shadow-md backdrop-blur-md"
                    >
                      <map-card
                        .locationDetail=${this.locationDetail}
                      ></map-card>
                    </div>
                  </dl>
                </div>
                <button
                  type="button"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                  @click=${() => this.askAIForAdvice()}
                >
                  Ask AI for Advice
                </button>
              </div>
            </section>
          `
        : html`
            <section
              class="bg-transparent border border-white/50 backdrop-blur-sm py-6"
            >
              <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                  <h2 class="h-6 w-48 bg-gray-300 animate-pulse rounded"></h2>
                  <p
                    class="mt-2 h-8 w-64 bg-gray-300 animate-pulse rounded"
                  ></p>
                  <p
                    class="mt-4 max-w-2xl h-6 w-full bg-gray-300 animate-pulse rounded lg:mx-auto"
                  ></p>
                </div>

                <div class="mt-10">
                  <dl
                    class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
                  >
                    <div
                      class="flex"
                      aria-label="Loading temperature information"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-300 animate-pulse"
                        ></div>
                      </div>
                      <div class="ml-4">
                        <dt
                          class="h-6 w-32 bg-gray-300 rounded animate-pulse"
                        ></dt>
                        <dd
                          class="mt-2 h-4 w-64 bg-gray-300 rounded animate-pulse"
                        ></dd>
                      </div>
                    </div>
                    <div
                      class="flex"
                      aria-label="Loading temperature information"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-300 animate-pulse"
                        ></div>
                      </div>
                      <div class="ml-4">
                        <dt
                          class="h-6 w-32 bg-gray-300 rounded animate-pulse"
                        ></dt>
                        <dd
                          class="mt-2 h-4 w-64 bg-gray-300 rounded animate-pulse"
                        ></dd>
                      </div>
                    </div>
                    <div
                      class="flex"
                      aria-label="Loading temperature information"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-300 animate-pulse"
                        ></div>
                      </div>
                      <div class="ml-4">
                        <dt
                          class="h-6 w-32 bg-gray-300 rounded animate-pulse"
                        ></dt>
                        <dd
                          class="mt-2 h-4 w-64 bg-gray-300 rounded animate-pulse"
                        ></dd>
                      </div>
                    </div>
                    <div
                      class="flex"
                      aria-label="Loading temperature information"
                    >
                      <div class="flex-shrink-0">
                        <div
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-300 animate-pulse"
                        ></div>
                      </div>
                      <div class="ml-4">
                        <dt
                          class="h-6 w-32 bg-gray-300 rounded animate-pulse"
                        ></dt>
                        <dd
                          class="mt-2 h-4 w-64 bg-gray-300 rounded animate-pulse"
                        ></dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <button
                  type="button"
                  class="bg-gray-300 text-transparent px-4 py-2 rounded-md mt-4 animate-pulse"
                  aria-label="Loading button"
                >
                  Ask AI for Advice
                </button>
              </div>
            </section>
          `}
    `;
  }
}
