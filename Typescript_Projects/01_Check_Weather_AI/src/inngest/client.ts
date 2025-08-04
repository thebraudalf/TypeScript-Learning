import { EventSchemas, Inngest } from "inngest";

type OnGivenLocation = {
  data: {
    locationKey: string;
    responseSlug: string;
  };
};

type OnAskedQuery = {
  data: {
    userQuery?: string;
    responseSlug: string;
  };
};

type OnAskedAdvice = {
  data: {
    aiWeatherInfo?: Object | null;
    responseSlug: string;
  };
};

type Events = {
  "give/location": OnGivenLocation;
  "ask/query": OnAskedQuery;
  "ask/advice": OnAskedAdvice;
};

export const inngest = new Inngest({
  id: "check-weather-ai",
  schemas: new EventSchemas().fromRecord<Events>(),
});
