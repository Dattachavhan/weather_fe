import type { IForecastListItem } from "../api/types";
import { Forecast } from "../components/Forecast";
import { WeatherCard } from "../components/WeatherCard";
import { useWeather } from "../context/WeatherContext";

export const Dashboard = () => {
  const { weatherData, foreCastData, error, loading } = useWeather();
  const isLoading = loading && !weatherData && !foreCastData;

  const groupedByDateForeCastData: IForecastListItem[][] = foreCastData
    ? Object.values(
        foreCastData?.list?.reduce((acc: any, item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {})
      )
    : [];

  return (
    <div>
      {isLoading && (
        <p className="text-blue-500 text-center">Loading weather data...</p>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {weatherData && <WeatherCard currentWeatherData={weatherData} />}

      {foreCastData && (
        <Forecast
          title="5 Day / 3 Hour Forecast"
          data={groupedByDateForeCastData}
        />
      )}
    </div>
  );
};
