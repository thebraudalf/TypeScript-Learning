import dotenv from "dotenv";

dotenv.config();


/**
 * @class `getForecastData` - It is used to get forecast data
 */
class getForecastData {
  /**
   * `apiKey` - it is used to access accu weather api key.
   */
  static apiKey = process.env.VITE_ACCUWEATHER_APIKEY;

  /**
   * `getForecastOf1Day` - It is used to get daily forecast of 1 day for a specific location.
   * @param locationKey - it is used to pass the location key of a specific location to get data.
   * @returns - it returns the daily forecast data of a specific location.
   */
  getForecastOf1Day = async (locationKey: string) => {
    try {
      const getForecast = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${getForecastData.apiKey}&details=true`,
        {
          method: "GET",
        }
      );

      const jsonData = await getForecast.json();
      //console.log(jsonData);
      return jsonData;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(
        "Error caught while getting forecast of 1 day",
        error.message
      );
    }
  };
}

export const GetForecastData = new getForecastData();
