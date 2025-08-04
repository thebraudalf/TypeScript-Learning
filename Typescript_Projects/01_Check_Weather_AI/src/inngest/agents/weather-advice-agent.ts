import { createAgent, gemini } from "@inngest/agent-kit";
import type { aiWeatherInfoInterface } from "../../components/weather-card/weather-card";

/**
 * `analyzeWeatherInfo` - This is used to analyze weather information through `weatherInfoAgent`.
 * @param currentWeatherData - it is used to hold the current weather data object which comes from `on-given-location` inngest function.
 * @returns - it returns the analyzed weather advices.
 */
const analyzeWeatherAdvice = async (aiWeatherInfo: aiWeatherInfoInterface) => {
  const weatherAdviceAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.VITE_GEMINI_APIKEY,
    }),
    name: "Current Weather and Forecast Advice AI Assistant",
    system: `Your are an expert AI assistant that processes current weather and forecast information and give advices basis on that.
        
Your job is to:
1. Summarize the advices you give according to current weather and forecast information.
2. Estimate and respond the Title Name for advices according to given current weather and forecast information.
3. Estimate and respond What To Do through given current weather and forecast information.
4. Estimate and respond What Not To Do through given current weather and forecast information.


IMPORTANT:
- Respond with *only* valid raw JSON.
- Analyze the current weather & forecast information.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  const response = await weatherAdviceAgent.run(` 
   You are a current weather and forecast information advice agent. Only return a strict JSON object with no extra text, headers, or markdown.

   Analyze the following current weather and forecast information and provide a JSON object with:

- summary: A short 1-2 sentence summary of the advices you give according to current weather and forecast information.
- title name: A 1-3 word title which explains and estimates according to current weather and forecast information.
- what to do: A short 3-5 points explanation to estimate what to do according to current weather and forecast information.
- what not to do: A short 3-5 points explanation to estimate what not to do from current weather and forecast information.

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Enjoy the sunny weather and make the most of your day!",
"titleName": "Today's Sunny Weather",
"whatToDo": [ 
             "Enjoy outdoor activities",
             "Take a walk in the park",
            ],
"whatNotToDo": [ 
                 "Stay hydrated",
                 "Apply sunscreen",
               ],
}

---

Current Weather and Forecast information:

- SummaryOfWeather: ${aiWeatherInfo.summary}
- Temperature: ${aiWeatherInfo.temperature}
- Humidity: ${aiWeatherInfo.humidity}
- Wind: ${aiWeatherInfo.windSpeed}
- Precipitation: ${aiWeatherInfo.precipitation}
- Forecast: ${aiWeatherInfo.forecast}
 
  `);

  /**
   * `rawTextExtraction` - It is used to extract raw text from response output.
   * @returns - it returns the Agent's raw response format.
   */
  const rawTextExtraction = () => {
    const firstTextMessage = response.output.find((msg) => msg.type === "text");
    // checking if we have`firstTextMessage`
    if (firstTextMessage) {
      /**
       * `raw` - It results in Agent's raw response format.
       */
      const raw = firstTextMessage.content;
      //console.log("Raw Response: ", raw);
      return raw;
    } else {
      console.log("No text message found in output");
    }
  };

  /**
   * @returns - This Block returns the JSON parsed string of `raw` output.
   */
  try {
    const rawText = rawTextExtraction();
    if (!rawText || typeof rawText !== "string") {
      throw new Error("No valid text content to parse");
    }
    const match = rawText.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : rawText.trim();
    //console.log("JSON Parsed Response: ", JSON.parse(jsonString));
    return JSON.parse(jsonString);
  } catch (error: any) {
    console.log("Failed to parse JSON from AI response" + error.message);
    return null; // watch out for this
  }
};

export default analyzeWeatherAdvice;
