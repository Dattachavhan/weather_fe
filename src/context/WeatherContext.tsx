import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { weatherAPI } from "../api/weather";
import { useCurrentLocation } from "../custom-hooks/UseCurrentLocation";
import type {
  ICity,
  ICordinates,
  IForecastData,
  IWeatherData,
} from "../api/types";

interface IWeatherContext {
  weatherData: IWeatherData | null;
  foreCastData: IForecastData | null;
  location: ICordinates | null;
  setLocation: React.Dispatch<React.SetStateAction<ICordinates | null>>;
  getCitySuggestions: (query: string) => Promise<void>;
  suggestions: ICity[] | [];
  clearSuggestions: () => void;
}

const WeatherContext = createContext<IWeatherContext>({
  weatherData: null,
  foreCastData: null,
  location: null,
  setLocation: () => {},
  getCitySuggestions: async () => {},
  suggestions: [],
  clearSuggestions: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const { location: currentLocation } = useCurrentLocation();

  const [location, setLocation] = useState<ICordinates | null>(null);
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [foreCastData, setForecastData] = useState<IForecastData | null>(null);
  const [suggestions, setSuggestions] = useState<ICity[] | []>([]);

  useEffect(() => {
    if (currentLocation && !location) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (!location) return;
    (async () => {
      const wData = await weatherAPI.getCurrentWeatherByCoords({
        lat: location.lat,
        lon: location.lon,
      });
      setWeatherData(wData);
      const fData = await weatherAPI.getForecastFiveDaysData({
        lat: location.lat,
        lon: location.lon,
      });
      setForecastData(fData);
    })();
  }, [location]);

  const getCitySuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    const data = await weatherAPI.getCitiesByQuery(query);
    setSuggestions(data);
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
