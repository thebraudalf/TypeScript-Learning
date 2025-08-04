import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config.js";
import { FormGroupController } from "../../controllers/form-group-controller.js";
import { FormController } from "../../controllers/form-controller.js";
import { onSubmit } from "../../directives/submit-directive.js";
import { GetLocationData } from "../../api/accu-weather/location-api.js";
import { inngest } from "../../inngest/client.js";
import { v4 as uuidv4 } from "uuid";

const withTwind = install(config);

/**
 * @interface locationDataInterface - This interface is used for api data structure of location data.
 */
export interface locationDataInterface {
  Version: number;
  Key: string;
  Type: string;
  Rank: string;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

/**
 * @interface textLocationDataInterface - This interface is used for api data structure of text location data.
 */
export interface textLocationDataInterface {
  Version: number;
  Key: string;
  Type: string;
  Rank: string;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: object;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: object;
  GeoPosition: {
    Latitude: number;
    Longitude: number;
    Elevation: {
      Metric: object;
      Imperial: object;
    };
  };
  IsAlias: boolean;
  SupplementalAdminAreas: [Object];
  DataSets: [String];
}

/**
 * @interface ipAddressDataInterface - This interface is used for api data structure of ip address data.
 */
export interface ipAddressDataInterface {
  Version: number;
  Key: string;
  Type: string;
  Rank: string;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: object;
  Country: object;
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: number;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: object;
  GeoPosition: {
    Latitude: DoubleRange;
    Longitude: DoubleRange;
    Elevation: {
      Metric: object;
      Imperial: object;
    };
  };
  IsAlias: boolean;
  SupplementalAdminAreas: [Object];
  DataSets: [String];
}

/**
 * `SearchBar` - This class component is used to search about weather using location or to ask query related weather information.
 */
@customElement("search-bar")
@withTwind
export class SearchBar extends LitElement {
  @state()
  accessor queryMode: "location" | "ai" = "location";
  @state()
  accessor locationData: Array<locationDataInterface> | null = null;
  @state()
  accessor textLocationData: Array<textLocationDataInterface> | null = null;
  @state()
  accessor ipLocationData: ipAddressDataInterface | null = null;

  submit(e: Event) {
    const input = this.form.value.search.trim();
    let formattedInput = "";
    let wasSpace = false;
    for (let char of input) {
      if (char === " ") {
        if (!wasSpace) {
          formattedInput += char;
          wasSpace = true;
        }
      } else {
        formattedInput += char;
        // Reset the flag when a non-space character is found
        wasSpace = false;
      }
    }
    //console.log(formattedInput);

    // passing input to search
    this.setTextLocationData(formattedInput);
  }

  form = new FormGroupController(this, {
    search: new FormController(""),
  });

  /**
   * `setLocationData` - It is used to set location data to `locationData` prop.
   * And get `locationDetails` by text search & `ipLocationDetails` by ip address.
   */
  async setLocationData() {
    const input = this.form.value.search.trim();

    // regex for ip addresses
    const isIPv4 = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.|$)){4}$/.test(input);
    const isIPv6 =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(
        input
      );

    if (isIPv4 || isIPv6) {
      // IP-based search
      localStorage.removeItem("ipLocationDetail");
      localStorage.removeItem("textLocationData");
      localStorage.removeItem("locationData");

      const ipLocationDetails = await GetLocationData.searchLocationbyIP(input);

      //console.log(ipLocationDetails);
      this.ipLocationData = ipLocationDetails;

      localStorage.setItem(
        "ipLocationDetail",
        JSON.stringify(this.ipLocationData)
      );

      if (this.ipLocationData !== null) {
        const responseSlug = uuidv4();

        // sending events to inngest
        await inngest.send({
          name: "give/location",
          data: {
            locationKey: this.ipLocationData.Key.toString(),
            responseSlug: responseSlug,
          },
        });

        // ✅ Dispatch event to parent
        this.dispatchEvent(
          new CustomEvent("weather-response-slug-selected", {
            detail: responseSlug,
            bubbles: true,
            composed: true,
          })
        );
      }
    } else {
      // Text/location based search
      const locationDetails = await GetLocationData.getLocationKey(input);

      //console.log(locationDetails);
      this.locationData = locationDetails;
    }
  }

  /**
   * `setTextLocationData` - It is used to set text location data to input the text location.
   * @param input - it is used to input the text location.
   */
  async setTextLocationData(input: string) {
    // Text/location query based search

    localStorage.removeItem("textLocationData");
    localStorage.removeItem("ipLocationDetail");
    localStorage.removeItem("locationData");

    const locationDetails = await GetLocationData.searchByText(input);
    //console.log(locationDetails);

    //console.log(locationDetails);
    this.textLocationData = locationDetails;

    if (this.textLocationData !== null) {
      localStorage.setItem(
        "textLocationData",
        JSON.stringify(this.textLocationData[0])
      );

      const responseSlug = uuidv4();

      // sending events to inngest
      await inngest.send({
        name: "give/location",
        data: {
          locationKey: this.textLocationData[0].Key.toString(),
          responseSlug: responseSlug,
        },
      });

      // ✅ Dispatch event to parent
      this.dispatchEvent(
        new CustomEvent("weather-response-slug-selected", {
          detail: responseSlug,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  /**
   * `getLocationDetail` - It is used to get location details.
   * @param location - it is used to pass the location object which comes from `locationData`.
   */
  async getLocationDetail(location: locationDataInterface) {
    localStorage.removeItem("locationData");
    localStorage.removeItem("textLocationData");
    localStorage.removeItem("ipLocationDetail");

    localStorage.setItem("locationData", JSON.stringify(location));

    const responseSlug = uuidv4();

    // sending events to inngest
    await inngest.send({
      name: "give/location",
      data: {
        locationKey: location.Key.toString(),
        responseSlug: responseSlug,
      },
    });

    // ✅ Dispatch event to parent
    this.dispatchEvent(
      new CustomEvent("weather-response-slug-selected", {
        detail: responseSlug,
        bubbles: true,
        composed: true,
      })
    );

    // Close the dropdown
    this.locationData = null;
    this.requestUpdate(); // force Lit to re-render
  }

  /**
   * `askAI` - It is used to ask user query to AI.
   */
  async askAI() {
    localStorage.removeItem("userQueryToAI");
    const userQuery = this.form.value.search.trim();
    let formattedQuery = "";
    let wasSpace = false;
    for (let char of userQuery) {
      if (char === " ") {
        if (!wasSpace) {
          formattedQuery += char;
          wasSpace = true;
        }
      } else {
        formattedQuery += char;
        // Reset the flag when a non-space character is found
        wasSpace = false;
      }
    }
    //console.log(formattedQuery);

    localStorage.setItem("userQueryToAI", formattedQuery);

    const responseSlug = uuidv4();

    // sending events to inngest
    await inngest.send({
      name: "ask/query",
      data: {
        userQuery: formattedQuery,
        responseSlug: responseSlug,
      },
    });

    // ✅ Dispatch event to parent
    this.dispatchEvent(
      new CustomEvent("query-response-slug-selected", {
        detail: responseSlug,
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * `toggleQueryMode` - This method is used to give functionality of toggle to `queryMode` prop.
   */
  toggleQueryMode(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.queryMode = checked ? "ai" : "location";
  }

  render() {
    return html`
      <form ${onSubmit((e) => this.submit(e))}>
        <div class="flex items-center justify-center w-screen">
          <div class="relative w-80">
            <textarea
              placeholder="Enter your Location or your Query related weather of your location..."
              ${this.form.registerControl("search")}
              .value=${typeof this.form.value.search === "string"
                ? this.form.value.search
                : ""}
              @input=${this.queryMode === "location"
                ? this.setLocationData
                : null}
              class="pl-8 pr-4 py-2 w-full resize-none no-scrollbar overflow-y-auto text-white text-sm bg-black/20 border border-white/50 backdrop-blur-sm rounded-full shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] placeholder:text-white/70 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/5 transition-all duration-300 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/15 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-tl after:from-white/0 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none"
            ></textarea>
            <button
              type="submit"
              class="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5 shadow-black"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.75 12a.75.75 0 0 1 .75-.75h13.19l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H4.5a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <input
              type="checkbox"
              @change=${this.toggleQueryMode}
              class="appearance-none absolute inline-block rounded-full w-12 h-6 cursor-pointer before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-black/30 before:transition-colors before:duration-200 before:ease-in after:absolute after:top-2/4 after:left-0 after:-translate-y-2/4 after:w-6 after:h-6 after:border after:border-stone-200 after:bg-white after:rounded-full checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in disabled:opacity-50 disabled:cursor-not-allowed dark:after:bg-white checked:before:bg-secondary checked:after:border-secondary"
              style="margin-left: -32px; top: 59px;"
              id=":R2:"
            />

            ${this.locationData?.length
              ? html`
                  <div
                    class="absolute top-full left-0 w-full bg-black/60 rounded-b-lg shadow-lg"
                  >
                    <ul class="py-2 font-medium">
                      ${this.locationData?.map((location) => {
                        return html`<li
                          class="px-4 py-2 cursor-pointer hover:bg-white/20"
                        >
                          <button
                            type="button"
                            @click=${() => this.getLocationDetail(location)}
                            class="w-full"
                          >
                            <span>${location.LocalizedName}, </span>
                            <span>${location.AdministrativeArea.ID}, </span>
                            <span>${location.Country.ID}</span>
                          </button>
                        </li>`;
                      })}
                    </ul>
                  </div>
                `
              : null}
          </div>
          <button
            type="button"
            @click=${() => this.askAI()}
            class="inline-flex items-center justify-around border align-middle select-none space-x-3 font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4  hover:shadow-md bg-black/20 hover:bg-white/5 relative bg-gradient-to-b from-transparent to-bg-white/20 border-white/50 text-stone-100 rounded-lg hover:bg-gradient-to-b hover:from-transparent hover:to-bg-white/20 hover:border-white/50 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-2 text-current group-hover:text-blue-500 transition-colors duration-300 space-x-2"
            >
              <path
                fill-rule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clip-rule="evenodd"
              />
            </svg>
            Ask AI
          </button>
        </div>
      </form>
    `;
  }
}
