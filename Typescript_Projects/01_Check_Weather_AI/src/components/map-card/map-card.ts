import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config.js";
import type { textLocationDataInterface } from "../search-bar/search-bar.js";
import "leaflet/dist/leaflet.css";
import L, { Map as leafletMap, Marker } from "leaflet";

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
 * `MapCard` - This class component is used to show the map.
 */
@customElement("map-card")
@withTwind
export class MapCard extends LitElement {
  @property()
  accessor locationDetail: textLocationDataInterface | null = null;

  mapInstance: leafletMap | null = null;
  marker: Marker | null = null;

  static get styles() {
    return [
      css`
        :host {
          display: block;
          height: 500px;
        }
      `,
    ];
  }

  /**
   * `setLocationDetail` - It is used to set location detail.
   */
  setLocationDetail() {
    try {
      const mapElement = this.shadowRoot?.getElementById("map");
      if (!mapElement) return;

      if (this.locationDetail !== null) {
        if (!this.mapInstance) {
          // ✅ Create new map only once
          this.mapInstance = L.map(mapElement).setView(
            [
              this.locationDetail?.GeoPosition.Latitude,
              this.locationDetail?.GeoPosition.Longitude,
            ],
            13
          );
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(this.mapInstance);

          this.marker = L.marker([
            this.locationDetail?.GeoPosition.Latitude,
            this.locationDetail?.GeoPosition.Longitude,
          ]).addTo(this.mapInstance);
        } else {
          // ✅ Reuse existing map
          this.mapInstance.setView(
            [
              this.locationDetail?.GeoPosition.Latitude,
              this.locationDetail?.GeoPosition.Longitude,
            ],
            13
          );

          this.mapInstance.eachLayer((layer) => {
            if (layer instanceof Marker) {
              this.mapInstance?.removeLayer(layer);
            }
          });

          this.marker = L.marker([
            this.locationDetail?.GeoPosition.Latitude,
            this.locationDetail?.GeoPosition.Longitude,
          ]).addTo(this.mapInstance);
        }
        // Force layout fix
        setTimeout(() => {
          this.mapInstance?.invalidateSize();
        }, 400);
      }

      this.requestUpdate();
    } catch (error: any) {
      console.log(
        "Error while getting location data from Prop ",
        error.message
      );
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has("locationDetail") && this.locationDetail) {
      this.setLocationDetail();
    }
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.skypack.dev/leaflet/dist/leaflet.css"
      />
      <div
        id="map"
        class="max-[640px]:w-[80vw] min-[1800px]:w-[500px] h-[500px] z-0 rounded-b-md "
      ></div>
    `;
  }
}
