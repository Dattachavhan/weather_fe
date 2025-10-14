import { API_CONFIG, ENDPOINTS } from "./config";
import type { ICity, ICordinates, IForecastData, IWeatherData } from "./types";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentWeatherByCoords({
    lat,
    lon,
  }: ICordinates): Promise<IWeatherData> {
    const url = this.createUrl(
      `${API_CONFIG.BASE_URL}${ENDPOINTS.CURRENT_WEATHER}`,
      {
        lat,
        lon,
        units: API_CONFIG.DEFAULT_PARAMS.units,
      }
    );
    return this.fetchData<IWeatherData>(url);
  }

  async getForecastFiveDaysData({
    lat,
    lon,
  }: ICordinates): Promise<IForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}${ENDPOINTS.FORECAST}`, {
      lat,
      lon,
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchData<IForecastData>(url);
  }

  async getCitiesByQuery(cityName: string): Promise<ICity[]> {
    const url = this.createUrl(
      `${API_CONFIG.GEO_BASE_URL}${ENDPOINTS.COUNTRY}`,
      {
        q: cityName,
        limit: API_CONFIG.SEARCH_LIMIT,
        units: API_CONFIG.DEFAULT_PARAMS.units,
      }
    );
    return this.fetchData(url);
  }
}

export const weatherAPI = new WeatherAPI();
