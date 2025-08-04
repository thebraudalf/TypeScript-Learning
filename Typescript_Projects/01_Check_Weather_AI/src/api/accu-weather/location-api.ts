class getLocationData {
  /**
   * `apiKey` - it is used to access accu weather api key.
   */
  static apiKey = import.meta.env.VITE_ACCUWEATHER_APIKEY;

  /**
   * `getLocationKey` - It is used to get basic information along with location key through autocomplete search.
   * @param location - it is used to pass the location autocomplete name to search data.
   * @returns - it returns basic informations with location key about locations matching an autocomplete.
   */
  getLocationKey = async (location: string) => {
    try {
      const getLocation = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${getLocationData.apiKey}&q=${location}`,
        {
          method: "GET",
        }
      );

      const jsonData = await getLocation.json();
      //console.log(jsonData);
      return jsonData;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(
        "Error caught while getting location key!!",
        error.message
      );
    }
  };

  /**
   * `searchByLocationKey`- It is used to get information about a specific location by location key.
   * @param locationKey - it is used to pass the location key of a specific location to get data.
   * @returns - it returns all informations about a specific location like AdministrativeArea, TimeZone, and GeoPosition, etc.
   */
  searchByLocationKey = async (locationKey: string) => {
    try {
      const getLocationInfo = await fetch(
        `http://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${getLocationData.apiKey}`,
        {
          method: "GET",
        }
      );

      const jsonData = await getLocationInfo.json();
      //console.log(jsonData);
      return jsonData;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(
        "Error caught while searching by location key",
        error.message
      );
    }
  };

  /**
   * `searchByText` - It it used to get information about a specific location by text of that location.
   * @param location - it is used to pass the text of location name to search data.
   * @returns - it returns all informations about a specific location like AdministrativeArea, TimeZone, and GeoPosition, etc.
   */
  searchByText = async (location: string) => {
    try {
      const getLocationInfo = await fetch(
        `http://dataservice.accuweather.com/locations/v1/search?apikey=${getLocationData.apiKey}&q=${location}&offset=1`,
        {
          method: "GET",
        }
      );

      const jsonData = await getLocationInfo.json();
      //console.log(jsonData);
      return jsonData;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(
        "Error caught while searching by text of location",
        error.message
      );
    }
  };

  /**
   * `searchLocationbyIP` - It is used to get information about a specific locations by IP address.
   * @param ipAddress - it is used to pass the ip address of a specific location to get data
   * @returns - it returns all informations about a specific location like AdministrativeArea, TimeZone, and GeoPosition, etc.
   */
  searchLocationbyIP = async (ipAddress: string) => {
    try {
      const getLocationInfo = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${getLocationData.apiKey}&q=${ipAddress}`,
        {
          method: "GET",
        }
      );

      const jsonData = await getLocationInfo.json();
      //console.log(jsonData);
      return jsonData;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(
        "Error caught while searching location by IP",
        error.message
      );
    }
  };
}

export const GetLocationData = new getLocationData();
