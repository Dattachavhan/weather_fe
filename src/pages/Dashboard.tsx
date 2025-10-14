import type { IForecastListItem } from "../api/types";
import { Forecast } from "../components/Forecast";
import { WeatherCard } from "../components/WeatherCard";
import { useWeather } from "../context/WeatherContext";

export const Dashboard = () => {
  const { weatherData, foreCastData } = useWeather();

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
    <>
      <WeatherCard currentWeatherData={weatherData} />
      <Forecast
        title="5 Day / 3 Hour Forecast"
        data={groupedByDateForeCastData}
      />
    </>
  );
};
