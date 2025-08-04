import { createAgent, gemini } from "@inngest/agent-kit";

/**
 * @interface currentWeatherDataInterface - This interface is used for api data structure of current weather data.
 */
export interface currentWeatherDataInterface {
  WeatherText?: string;
  Temperature?: {
    Metric?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
    };
    Imperial?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
    };
  };
  RealFeelTemperature?: {
    Metric?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
    Imperial?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
  };
  RealFeelTemperatureShade?: {
    Metric?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
    Imperial?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
      Phrase: string;
    };
  };
  RelativeHumidity?: number;
  IndoorRelativeHumidity?: number;
  DewPoint?: {
    Metric?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
    };
    Imperial?: {
      Value: GLfloat;
      Unit: string;
      UnitType: number;
    };
  };
  Wind?: {
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
    Speed: {
      Metric: Object;
      Imperial: Object;
    };
  };
  WindGust?: {
    Speed: {
      Metric: Object;
      Imperial: Object;
    };
  };
  UVIndex?: number;
  UVIndexFloat?: GLfloat;
  UVIndexText?: string;
  Visibility?: {
    Metric: Object;
    Imperial: Object;
  };
  ObstructionsToVisibility?: string;
  CloudCover?: number;
  Ceiling?: {
    Metric: Object;
    Imperial: Object;
  };
  Pressure?: {
    Metric: Object;
    Imperial: Object;
  };
  PressureTendency?: Object;
  Past24HourTemperatureDeparture?: {
    Metric: Object;
    Imperial: Object;
  };
  ApparentTemperature?: {
    Metric: Object;
    Imperial: Object;
  };
  WindChillTemperature?: {
    Metric: Object;
    Imperial: Object;
  };
  WetBulbTemperature?: {
    Metric: Object;
    Imperial: Object;
  };
  WetBulbGlobeTemperature?: {
    Metric: Object;
    Imperial: Object;
  };
  Precip1hr?: {
    Metric: Object;
    Imperial: Object;
  };
  PrecipitationSummary?: {
    Precipitation?: {
      Metric: Object;
      Imperial: Object;
    };
    PastHour?: {
      Metric: Object;
      Imperial: Object;
    };
    Past24Hours?: {
      Metric: Object;
      Imperial: Object;
    };
  };
  TemperatureSummary?: {
    Past6HourRange?: {
      Minimum: {
        Metric: Object;
        Imperial: Object;
      };
      Maximum: {
        Metric: Object;
        Imperial: Object;
      };
    };
    Past24HourRange?: {
      Minimum?: {
        Metric: Object;
        Imperial: Object;
      };
      Maximum?: {
        Metric: Object;
        Imperial: Object;
      };
    };
  };
}

/**
 * @interface forecastDataInterface - This interface is used for api data structure of forecast data.
 */
export interface forecastDataInterface {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
  };
  DailyForecasts: [
    {
      Date?: string;
      EpochDate?: number;
      Sun?: object;
      Moon?: object;
      Temperature?: {
        Minimum: object;
        Maximum: object;
      };
      RealFeelTemperature?: {
        Minimum: object;
        Maximum: object;
      };
      RealFeelTemperatureShade?: {
        Minimum: object;
        Maximum: object;
      };
      HoursOfSun?: GLfloat;
      DegreeDaySummary?: {
        Heating: object;
        Cooling: object;
      };
      AirAndPollen?: [Object];
      Day: {
        IconPhrase?: string;
        PrecipitationProbability?: GLfloat;
        ThunderstormProbability?: GLfloat;
        RainProbability?: GLfloat;
        SnowProbability?: GLfloat;
        IceProbability?: GLfloat;
        Wind?: {
          Speed: object;
          Direction: object;
        };
        WindGust?: {
          Speed: object;
          Direction: object;
        };
        TotalLiquid?: object;
        Rain?: object;
        Snow?: object;
        Ice?: object;
        HoursOfPrecipitation?: GLfloat;
        HoursOfRain?: GLfloat;
        HoursOfSnow?: GLfloat;
        HoursOfIce?: GLfloat;
        CloudCover?: number;
        Evapotranspiration?: object;
        SolarIrradiance?: object;
        RelativeHumidity?: object;
        WetBulbTemperature?: {
          Minimum?: object;
          Maximum?: object;
          Average?: object;
        };
        WetBulbGlobeTemperature?: {
          Minimum?: object;
          Maximum?: object;
          Average?: object;
        };
        UVIndexFloat: object;
      };
      Night: {
        IconPhrase?: string;
        PrecipitationProbability?: GLfloat;
        ThunderstormProbability?: GLfloat;
        RainProbability?: GLfloat;
        SnowProbability?: GLfloat;
        IceProbability?: GLfloat;
        Wind?: {
          Speed: object;
          Direction: object;
        };
        WindGust?: {
          Speed: object;
          Direction: object;
        };
        TotalLiquid?: object;
        Rain?: object;
        Snow?: object;
        Ice?: object;
        HoursOfPrecipitation?: GLfloat;
        HoursOfRain?: GLfloat;
        HoursOfSnow?: GLfloat;
        HoursOfIce?: GLfloat;
        CloudCover?: number;
        Evapotranspiration?: object;
        SolarIrradiance?: object;
        RelativeHumidity?: object;
        WetBulbTemperature?: {
          Minimum: object;
          Maximum: object;
          Average: object;
        };
        WetBulbGlobeTemperature?: {
          Minimum: object;
          Maximum: object;
          Average: object;
        };
        UVIndexFloat?: object;
      };
    }
  ];
}

/**
 * `analyzeWeatherInfo` - This is used to analyze weather information through `weatherInfoAgent`.
 * @param currentWeatherData - it is used to hold the current weather data object which comes from `on-given-location` inngest function.
 * @param forecastData - it is used to hold the forecast data object which comes from `on-given-location` inngest function.
 * @returns - it returns the analyzed ai weather response information.
 */
const analyzeWeatherInfo = async (
  currentWeatherData: currentWeatherDataInterface,
  forecastData: forecastDataInterface
) => {
  const weatherInfoAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.VITE_GEMINI_APIKEY,
    }),
    name: "Current Weather and Forecast AI Assistant",
    system: `Your are an expert AI assistant that processes current weather and forecasts.
        
Your job is to:
1. Summarize the current weather information and forecast.
2. Estimate and respond Temperature through given current weather information.
3. Estimate and respond Humidity through given current weather information.
4. Estimate and respond Wind Speed through given current weather information.
5. Estimate and respond Precipitation through given current weather information.
6. Estimate and respond Forecast through given forecast information.


IMPORTANT:
- Respond with *only* valid raw JSON.
- Analyze the current weather & forecast information stringified JSON objects
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  const response = await weatherInfoAgent.run(` 
   You are a current weather and forecast information agent. Only return a strict JSON object with no extra text, headers, or markdown.

   Analyze the following current weather & forecast information stringified JSON objects and provide a JSON object with:

- summary: A short 1-2 sentence summary of the current weather information and forecast.
- temperature: A short 3-5 sentence explanation to estimate temperature on WeatherText, Temperature, RealFeelTemperature, RealFeelTemperatureShade, Past24HourTemperatureDeparture, and TemperatureSummary, etc., from current weather information.
- humidity: A short 3-5 sentence explanation to estimate humidity on RelativeHumidity, and IndoorRelativeHumidity, etc., from current weather information.
- wind speed: A short 3-5 sentence explanation to estimate humidity on RelativeHumidity, and IndoorRelativeHumidity, etc., from current weather information.
- precipitation: A short 3-5 sentence explanation to estimate precipitation on Precip1hr, and PrecipitationSummary, etc., from current weather information.
- forecast: A short 3-5 sentence explanation to estimate forecast on Headline, Temperature, and DegreeDaySummary etc., from forecast information.

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "The weather today is sunny with a high of 75°F and a low of 60°F. Enjoy the sunshine!",
"temperature": "The current temperature is 70°F with a high of 75°F and a low of 60°F.",
"humidity": "The humidity level is 60%.",
"windSpeed": "The wind speed is 10 mph.",
"precipitation": "No precipitation for at least 120 min.",
"forecast": "Tomorrow's forecast is expected to be partly cloudy."
}

---

Current Weather information:

- WeatherText: ${currentWeatherData.WeatherText}
- Temperature: ${JSON.stringify(currentWeatherData.Temperature)}
- RealFeelTemperature: ${JSON.stringify(currentWeatherData.RealFeelTemperature)}
- RealFeelTemperatureShade: ${JSON.stringify(
    currentWeatherData.RealFeelTemperatureShade
  )}
- Past24HourTemperatureDeparture: ${JSON.stringify(
    currentWeatherData.Past24HourTemperatureDeparture
  )}
- TemperatureSummary: ${
    JSON.stringify(currentWeatherData.TemperatureSummary?.Past6HourRange) &&
    JSON.stringify(currentWeatherData.TemperatureSummary?.Past24HourRange)
  }
- RelativeHumidity: ${currentWeatherData.RelativeHumidity}
- IndoorRelativeHumidity: ${currentWeatherData.IndoorRelativeHumidity}
- DewPoint: ${JSON.stringify(currentWeatherData.DewPoint)}
- Wind: ${
    JSON.stringify(currentWeatherData.Wind?.Direction) &&
    JSON.stringify(currentWeatherData.Wind?.Speed)
  }
- UVIndex: ${currentWeatherData.UVIndex}
- UVIndexFloat: ${currentWeatherData.UVIndexFloat}
- UVIndexText: ${currentWeatherData.UVIndexText}
- Visibility: ${JSON.stringify(currentWeatherData.Visibility)}
- ObstructionsToVisibility: ${currentWeatherData.ObstructionsToVisibility}
- CloudCover: ${currentWeatherData.CloudCover}
- Ceiling: ${JSON.stringify(currentWeatherData.Ceiling)}
- Pressure: ${JSON.stringify(currentWeatherData.Pressure)}
- PressureTendency: ${JSON.stringify(currentWeatherData.PressureTendency)}
- ApparentTemperature: ${JSON.stringify(currentWeatherData.ApparentTemperature)}
- WindChillTemperature: ${JSON.stringify(
    currentWeatherData.WindChillTemperature
  )}
- WetBulbTemperature: ${JSON.stringify(currentWeatherData.WetBulbTemperature)}
- Precip1hr: ${JSON.stringify(currentWeatherData.Precip1hr)}
- PrecipitationSummary: ${
    JSON.stringify(currentWeatherData.PrecipitationSummary?.Precipitation) &&
    JSON.stringify(currentWeatherData.PrecipitationSummary?.PastHour) &&
    JSON.stringify(currentWeatherData.PrecipitationSummary?.Past24Hours)
  }
 
Forecast information:

- Headline: ${
    JSON.stringify(forecastData.Headline) &&
    JSON.stringify(forecastData.Headline.Text)
  }
- Sun: ${JSON.stringify(forecastData.DailyForecasts[0].Sun)}
- Moon: ${JSON.stringify(forecastData.DailyForecasts[0].Moon)}
- HoursOfSun: ${forecastData.DailyForecasts[0].HoursOfSun}
- Temperature: ${
    JSON.stringify(forecastData.DailyForecasts[0].Temperature?.Maximum) &&
    JSON.stringify(forecastData.DailyForecasts[0].Temperature?.Minimum)
  }
- DegreeDaySummary: ${
    JSON.stringify(forecastData.DailyForecasts[0].DegreeDaySummary?.Heating) &&
    JSON.stringify(forecastData.DailyForecasts[0].DegreeDaySummary?.Cooling)
  }
- AirAndPollen: ${JSON.stringify(
    forecastData.DailyForecasts[0].AirAndPollen?.map((airAndPollen) =>
      JSON.stringify(airAndPollen)
    )
  )}
- DayIconPhrase: ${forecastData.DailyForecasts[0].Day.IconPhrase}
- DayProbability: ${
    forecastData.DailyForecasts[0].Day.PrecipitationProbability &&
    forecastData.DailyForecasts[0].Day.ThunderstormProbability &&
    forecastData.DailyForecasts[0].Day.RainProbability &&
    forecastData.DailyForecasts[0].Day.SnowProbability &&
    forecastData.DailyForecasts[0].Day.IceProbability
  }
- DayWind: ${
    JSON.stringify(forecastData.DailyForecasts[0].Day.Wind?.Direction) &&
    JSON.stringify(forecastData.DailyForecasts[0].Day.Wind?.Speed)
  }
}
- DayWindGust: ${
    JSON.stringify(forecastData.DailyForecasts[0].Day.WindGust?.Direction) &&
    JSON.stringify(forecastData.DailyForecasts[0].Day.WindGust?.Speed)
  }

- DayLiquid: ${
    JSON.stringify(forecastData.DailyForecasts[0].Day.Ice) &&
    JSON.stringify(forecastData.DailyForecasts[0].Day.Snow) &&
    JSON.stringify(forecastData.DailyForecasts[0].Day.Rain) &&
    JSON.stringify(forecastData.DailyForecasts[0].Day.TotalLiquid)
  }

- DayHoursOf: ${
    forecastData.DailyForecasts[0].Day.HoursOfPrecipitation &&
    forecastData.DailyForecasts[0].Day.HoursOfIce &&
    forecastData.DailyForecasts[0].Day.HoursOfRain &&
    forecastData.DailyForecasts[0].Day.HoursOfSnow
  }

- DayRelativeHumidity: ${JSON.stringify(
    forecastData.DailyForecasts[0].Day.RelativeHumidity
  )}  

- NightIconPhrase: ${forecastData.DailyForecasts[0].Night.IconPhrase}
- NightProbability: ${
    forecastData.DailyForecasts[0].Night.PrecipitationProbability &&
    forecastData.DailyForecasts[0].Night.ThunderstormProbability &&
    forecastData.DailyForecasts[0].Night.RainProbability &&
    forecastData.DailyForecasts[0].Night.SnowProbability &&
    forecastData.DailyForecasts[0].Night.IceProbability
  }
- NightWind: ${
    JSON.stringify(forecastData.DailyForecasts[0].Night.Wind?.Direction) &&
    JSON.stringify(forecastData.DailyForecasts[0].Night.Wind?.Speed)
  }
}
- NightWindGust: ${
    JSON.stringify(forecastData.DailyForecasts[0].Night.WindGust?.Direction) &&
    JSON.stringify(forecastData.DailyForecasts[0].Night.WindGust?.Speed)
  }

- NightLiquid: ${
    JSON.stringify(forecastData.DailyForecasts[0].Night.Ice) &&
    JSON.stringify(forecastData.DailyForecasts[0].Night.Snow) &&
    JSON.stringify(forecastData.DailyForecasts[0].Night.Rain) &&
    JSON.stringify(forecastData.DailyForecasts[0].Night.TotalLiquid)
  }

- NightHoursOf: ${
    forecastData.DailyForecasts[0].Night.HoursOfPrecipitation &&
    forecastData.DailyForecasts[0].Night.HoursOfIce &&
    forecastData.DailyForecasts[0].Night.HoursOfRain &&
    forecastData.DailyForecasts[0].Night.HoursOfSnow
  }

- NightRelativeHumidity: ${JSON.stringify(
    forecastData.DailyForecasts[0].Night.RelativeHumidity
  )}  
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

export default analyzeWeatherInfo;
