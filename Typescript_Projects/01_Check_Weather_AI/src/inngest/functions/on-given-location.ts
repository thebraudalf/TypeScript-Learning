import { NonRetriableError } from "inngest";
import { GetCurrentConditionsData } from "../../api/accu-weather/current-condition-api.js";
import { inngest } from "../client.js";
import { GetForecastData } from "../../api/accu-weather/forcast-api.js";
import analyzeWeatherInfo from "../agents/weather-info-agent.js";
import createResponseService from "../../appwrite/create-ai-response.js";

/**
 * `OnGivenLocation` - It is used to get current weather and forecast information so that we get `aiResponse` and send weather ai response to db.
 * @property `inngest.createFunction` - It is used to create function in inngest.
 * @param event - `event` is used to get `locationKey` and `responseSlug` data.
 * @param step - `step` is used to run to get current weather and forecast information of that particular location then send weather ai response to db.
 */
export const OnGivenLocation = inngest.createFunction(
  { id: "on-given-location", retries: 2 },
  { event: "give/location" },
  async ({
    event,
    step,
  }: {
    event: {
      data: {
        responseSlug: string;
        locationKey: string;
      };
    };
    step: {
      run: <T>(name: string, fn: () => Promise<T>) => Promise<T>;
    };
  }) => {
    const { locationKey, responseSlug } = event.data;

    try {
      /**
       * @property `step.run` - This is used to get current weather information of that particular location through `locationKey`.
       */
      const getCurrentWeatherData = await step.run(
        "get-current-weather",
        async () => {
          const currentWeatherObject =
            await GetCurrentConditionsData.getCurrentConditions(locationKey);
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
          locationKey
        );
        if (!forecastObject) {
          throw new NonRetriableError("Forcast Data not found.");
        }
        return forecastObject;
      });

      /**
       * `aiResponse` -  This is used to get ai response through `analyzeWeatherInfo`.
       */
      const aiResponse = await analyzeWeatherInfo(
        getCurrentWeatherData[0],
        getForecastData
      );

      /**
       * @property `step.run` - This is used to send weather ai response to db.
       */
      await step.run("send-ai-response", async () => {
        if (aiResponse) {
          try {
            await createResponseService.createWeatherAIResponse(
              responseSlug,
              aiResponse
            );
          } catch (error: any) {
            console.log(
              "Error while sending weather ai response to DB",
              error.message
            );
          }
        }
      });
    } catch (error: any) {
      console.log("Error on given location", error.message);
    }
  }
);
