import { Client, Databases } from "appwrite";

export class GetResponseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL)) // Your API Endpoint
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID)); // Your project ID
    this.databases = new Databases(this.client);
  }

  async getWeatherAIResponse(slug: string) {
    try {
      return await this.databases.getDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_WEATHER_AI_RESPONSE_COLLECTION_ID),
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getWeatherAIResponse :: error", error);
      throw error;
    }
  }

  async getAdviceAIResponse(slug: string) {
    try {
      return await this.databases.getDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_ADVICE_AI_RESPONSE_COLLECTION_ID),
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getAdviceAIResponse :: error", error);
      throw error;
    }
  }

  async getQueryAIResponse(slug: string) {
    try {
      return await this.databases.getDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_QUERY_AI_RESPONSE_COLLECTION_ID),
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getQueryAIResponse :: error", error);
      throw error;
    }
  }
}

const getResponseService = new GetResponseService();
export default getResponseService;
