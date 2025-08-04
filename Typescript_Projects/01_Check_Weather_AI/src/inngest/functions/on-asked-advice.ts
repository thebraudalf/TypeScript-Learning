import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import createResponseService from "../../appwrite/create-ai-response.js";
import analyzeWeatherAdvice from "../agents/weather-advice-agent.js";
import type { aiWeatherInfoInterface } from "../../components/weather-card/weather-card.js";

/**
 * `OnAskedAdvice` - It is used to send advice ai response to DB..
 * @property `inngest.createFunction` - It is used to create function in inngest.
 * @param event - `event` is used to get `aiWeatherInfo` and `responseSlug` data.
 * @param step - `step` is used to run to send advice ai response to DB.
 */
export const OnAskedAdvice = inngest.createFunction(
  { id: "on-asked-advice", retries: 2 },
  { event: "ask/advice" },
  async ({
    event,
    step,
  }: {
    event: {
      data: {
        aiWeatherInfo?: aiWeatherInfoInterface | null;
        responseSlug: string;
      };
    };
    step: {
      run: <T>(name: string, fn: () => Promise<T>) => Promise<T>;
    };
  }) => {
    const { aiWeatherInfo, responseSlug } = event.data;

    try {
      // checking if not ai weather info then throw error
      if (!aiWeatherInfo) {
        throw new NonRetriableError("aiWeatherInfo is required for advice.");
      }

      /**
       * `aiResponse` -  This is used to get ai response through `analyzeWeatherInfo`.
       */
      const aiResponse = await analyzeWeatherAdvice(aiWeatherInfo);
      //console.log("AI Response from function : ", aiResponse);

      if (!aiResponse) {
        throw new NonRetriableError("aiResponse is required for advice.");
      }

      /**
       * @property `step.run` - This is used to send advice ai response to db.
       */
      await step.run("send-ai-response", async () => {
        try {
          await createResponseService.createAdviceAIResponse(
            responseSlug,
            aiResponse
          );
        } catch (error: any) {
          console.log(
            "Error while sending advice ai response to DB",
            error.message
          );
          throw new NonRetriableError(
            "Error while sending advice ai response to DB"
          );
        }
      });
    } catch (error: any) {
      console.log("Error on asked advice", error.message);
    }
  }
);
