# Check-Weather-AI

A weather app that uses AI to automatically check weather according to the user location, also give solution to user queries related weather of a particular location and also gives advices according to that paricular location.

## 🚀 Features

- **AI-Powered Weather Check Processing**

  - Automatic weather checking of provided location.
  - Also gives geoposition assistance through the open street map.

- **AI-Powered Response on User Query**

  - Automatic response on user queries related to weather of particular location.
  - Gives response on user queries according to current weather and forecast information.

- **AI-Powered Advices according to Weather**

  - Gives advices according to current weather and forecast information.

- **Background Processing**
  - Event-driven architecture using Inngest
  - Automated email notifications
  - Asynchronous weather data processing

## 🛠️ Tech Stack

- **Frontend**: Lit library and Twind for Tailwind CSS support
- **Backend**: Appwrite for BaaS
- **Background Jobs**: Inngest
- **AI Integration**: Google Gemini API
- **Map Integration**: Open Street Map and Leaflet API
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

- Node.js (v14 or higher)
- Appwrite's DatabaseId, and CollectionId
- Google Gemini API key

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # AccuWeather API Key
   VITE_AccuWeatherAPIKey=Your-AccuWeather-API-Key

   # AI (Gemini)
   VITE_GEMINI_APIKEY=Your-Gemini-API-Key

   # Appwrite URL
   APP_URL=https://<REGION>.cloud.appwrite.io/v1

   # Appwrite Project Id
   VITE_APPWRITE_PROJECT_ID=Your-APPWRITE-URL

   # Appwrite Database Id
   VITE_APPWRITE_DATABASE_ID=Your-APPWRITE-DATABASE-ID

   # Appwrite Weather AI Response Collection Id
   VITE_WEATHER_AI_RESPONSE_COLLECTION_ID=Your-WEATHER-AI-RESPONSE-COLLECTION-ID

   # Appwrite Advice AI Response Collection Id
   VITE_ADVICE_AI_RESPONSE_COLLECTION_ID=Your-ADVICE-AI-RESPONSE-COLLECTION-ID

   # Appwrite Query AI Response Collection Id
   VITE_QUERY_AI_RESPONSE_COLLECTION_ID=Your-QUERY-AI-RESPONSE-COLLECTION-ID


   ```

## 🚀 Running the Application

1. **Start the Application**

   ```bash
   npm run dev
   ```

1. **Start the inngest agent kit server**

   ```bash
   npm run server
   ```

1. **Start the Inngest dev server**
   ```bash
   npm run inngest-dev
   ```

## 🔄 App Processing Flow

<img src="./check-weather-ai structure.png" alt="App Structure" width="width" height="height">

1. **Query Submission**

   - User submits a query related to weather of location or only location.
   - System creates a slug for every query to create/get document.

2. **AI Processing**

   - Inngest triggers `on-given-location`/`on-asked-query` event and `on-asked-advice` event if user asked for advice.
   - AI analyzes user query with current weather and forecast content
   - Generates:
     - Summary of weather
     - Temperature
     - Humidity
     - Wind Speed
     - Precipitation
     - Forecast
     - User Query Response

## 🔍 Troubleshooting

### Common Issues

1. **Port Conflicts**
   If you see "address already in use" error:

   ```bash
   # Find process using port: 3000
   lsof -i :3000
   # Kill the process
   kill -9 <PID>
   ```

2. **AI Processing Errors**

   - Verify GEMINI_API_KEY in .env
   - Check API quota and limits
   - Validate request format

## 🙏 Acknowledgments

- Inngest for background job processing
- Google Gemini for AI capabilities
- Appwrite for BaaS.
