import dotenv from "dotenv";

dotenv.config();

class getCurrentConditionsData {
  /**
   * `apiKey` - it is used to access accu weather api key.
   */
  static apiKey = process.env.VITE_ACCUWEATHER_APIKEY;

  /**
   * `getCurrentConditions` - It is used to get current conditions of a specific location.
   * @param locationKey - it is used to pass the location key of a specific location to get data.
   * @returns - it returns the current conditions data of a specific location.
   */
  getCurrentConditions = async (locationKey: string) => {
    try {
      const getCurrentCondition = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${getCurrentConditionsData.apiKey}&details=true`,
        {
          method: "GET",
        }
      );

      const jsonData = await getCurrentCondition.json();
      //console.log(jsonData);
      return jsonData;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(
        "Error caught while getting current conditions",
        error.message
      );
    }
  };
}

export const GetCurrentConditionsData = new getCurrentConditionsData();
