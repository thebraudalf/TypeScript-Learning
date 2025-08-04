import { NonRetriableError } from "inngest";
import { GetCurrentConditionsData } from "../../api/accu-weather/current-condition-api.js";
import { inngest } from "../client.js";
import { GetForecastData } from "../../api/accu-weather/forcast-api.js";
import createResponseService from "../../appwrite/create-ai-response.js";
import {
  analyzeUserQuery,
  extractTextFromQuery,
} from "../agents/user-query-agent.js";
import type { textLocationDataInterface } from "../../components/search-bar/search-bar.js";

/**
 * `OnAskedQuery` - It is used to get current weather and forecast information so that we get `aiResponse` and send weather ai response to db.
 * @property `inngest.createFunction` - It is used to create function in inngest.
 * @param event - `event` is used to get `locationKey` and `responseSlug` data.
 * @param step - `step` is used to run to get current weather and forecast information of that particular location then send weather ai response to db.
 */
export const OnAskedQuery = inngest.createFunction(
  { id: "on-asked-query", retries: 2 },
  { event: "ask/query" },
  async ({
    event,
    step,
  }: {
    event: {
      data: {
        responseSlug: string;
        userQuery: string;
      };
    };
    step: {
      run: <T>(name: string, fn: () => Promise<T>) => Promise<T>;
    };
  }) => {
    const { userQuery, responseSlug } = event.data;

    try {
      /**
       * `extractedResponse` -  This is used to extract location text from `userQuery` as ai response through `analyzeWeatherInfo`.
       */
      const extractedResponse = await extractTextFromQuery(userQuery);
      //console.log("Extracted Response", extractedResponse);

      /**
       * @property `step.run` - This is used to get current weather information of that particular location through `locationKey`.
       */
      const getLocationData = await step.run("get-location-data", async () => {
        if (extractedResponse) {
          try {
            const getLocationInfo: Array<textLocationDataInterface> | Response =
              await fetch(
                `http://dataservice.accuweather.com/locations/v1/search?apikey=${process.env.VITE_ACCUWEATHER_APIKEY}&q=${extractedResponse}&offset=1`,
                {
                  method: "GET",
                }
              );

            const locationData = await getLocationInfo.json();
            //console.log(locationData);

            return locationData[0];
          } catch (error: any) {
            console.log(error.message);
            throw new Error(
              "Error caught while searching by text of location",
              error.message
            );
          }
        }
      });

      /**
       * @property `step.run` - This is used to get current weather information of that particular location through `locationKey`.
       */
      const getCurrentWeatherData = await step.run(
        "get-current-weather",
        async () => {
          const currentWeatherObject =
            await GetCurrentConditionsData.getCurrentConditions(
              getLocationData.Key
            );
          if (!currentWeatherObject) {
            throw new NonRetriableError("Current Weather Data not found.");
          }
          return currentWeatherObject;
        }
      );

      /**
       * @property `step.run` - This is used to get forecast data of that particular location through `locationKey`.
       */
      const getForecastData = await step.run("get-forecast", async () => {
        const forecastObject = await GetForecastData.getForecastOf1Day(
          getLocationData.Key
        );
        if (!forecastObject) {
          throw new NonRetriableError("Forcast Data not found.");
        }
        return forecastObject;
      });

      /**
       * `aiResponse` -  This is used to get ai response through `analyzeUserQuery`.
       */
      const aiResponse = await analyzeUserQuery(
        userQuery,
        getCurrentWeatherData[0],
        getForecastData
      );
      //console.log("AI Response from function: ", aiResponse);

      /**
       * @property `step.run` - This is used to send weather ai response to db.
       */
      await step.run("send-ai-response", async () => {
        if (aiResponse) {
          try {
            await createResponseService.createQueryAIResponse(
              responseSlug,
              aiResponse
            );
          } catch (error: any) {
            console.log(
              "Error while sending query ai response to DB",
              error.message
            );
          }
        }
      });
    } catch (error: any) {
      console.log("Error on asked query", error.message);
    }
  }
);
