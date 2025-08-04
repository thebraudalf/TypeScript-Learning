import { Client, Databases } from "appwrite";

export class CreateResponseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(String(process.env.VITE_APPWRITE_URL)) // Your API Endpoint
      .setProject(String(process.env.VITE_APPWRITE_PROJECT_ID)); // Your project ID
    this.databases = new Databases(this.client);
  }

  async createWeatherAIResponse(slug: string, data: Object) {
    try {
      return await this.databases.createDocument(
        String(process.env.VITE_APPWRITE_DATABASE_ID),
        String(process.env.VITE_WEATHER_AI_RESPONSE_COLLECTION_ID),
        slug,
        data
      );
    } catch (error) {
      console.log(
        "Appwrite Service :: createWeatherAIResponse :: error",
        error
      );
      throw error;
    }
  }

  async createAdviceAIResponse(slug: string, data: Object) {
    try {
      return await this.databases.createDocument(
        String(process.env.VITE_APPWRITE_DATABASE_ID),
        String(process.env.VITE_ADVICE_AI_RESPONSE_COLLECTION_ID),
        slug,
        data
      );
    } catch (error) {
      console.log("Appwrite Service :: createAdviceAIResponse :: error", error);
      throw error;
    }
  }

  async createQueryAIResponse(slug: string, data: Object) {
    try {
      return await this.databases.createDocument(
        String(process.env.VITE_APPWRITE_DATABASE_ID),
        String(process.env.VITE_QUERY_AI_RESPONSE_COLLECTION_ID),
        slug,
        data
      );
    } catch (error) {
      console.log("Appwrite Service :: createQueryAIResponse :: error", error);
      throw error;
    }
  }
}

const createResponseService = new CreateResponseService();
export default createResponseService;
