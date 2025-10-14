import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { weatherAPI } from "../api/weather";
import type {
  ICity,
  ICordinates,
  IForecastData,
  IWeatherData,
} from "../api/types";
import { useCurrentLocation } from "../custom-hooks/useCurrentLocation";

interface IWeatherContext {
  weatherData: IWeatherData | null;
  foreCastData: IForecastData | null;
  location: ICordinates | null;
  setLocation: React.Dispatch<React.SetStateAction<ICordinates | null>>;
  getCitySuggestions: (query: string) => Promise<void>;
  suggestions: ICity[] | [];
  clearSuggestions: () => void;
  error: string | null;
  loading: boolean;
}

const WeatherContext = createContext<IWeatherContext>({
  weatherData: null,
  foreCastData: null,
  location: null,
  setLocation: () => {},
  getCitySuggestions: async () => {},
  suggestions: [],
  clearSuggestions: () => {},
  error: null,
  loading: false,
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const { location: currentLocation } = useCurrentLocation();
  const [location, setLocation] = useState<ICordinates | null>(null);
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [foreCastData, setForecastData] = useState<IForecastData | null>(null);
  const [suggestions, setSuggestions] = useState<ICity[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currentLocation && !location) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (!location) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [wData, fData] = await Promise.allSettled([
          weatherAPI.getCurrentWeatherByCoords({
            lat: location.lat,
            lon: location.lon,
          }),
          weatherAPI.getForecastFiveDaysData({
            lat: location.lat,
            lon: location.lon,
          }),
        ]);

        if (wData.status === "fulfilled") {
          setWeatherData(wData.value);
        } else {
          setError("Failed to fetch current weather data.");
        }

        if (fData.status === "fulfilled") {
          setForecastData(fData.value);
        } else {
          setError((prev) =>
            prev
              ? `${prev} Forecast data unavailable.`
              : "Failed to fetch forecast data."
          );
        }
      } catch (err) {
        setError("Something went wrong while fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  const getCitySuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const data = await weatherAPI.getCitiesByQuery(query);
      setSuggestions(data);
    } catch (err) {
      setError("Unable to fetch city suggestions.");
    } finally {
      setLoading(false);
    }
  };

  const clearSuggestions = () => setSuggestions([]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        foreCastData,
        location,
        setLocation,
        getCitySuggestions,
        suggestions,
        clearSuggestions,
        error,
        loading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
