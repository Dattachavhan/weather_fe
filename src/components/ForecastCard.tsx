import type { IForecastListItem } from "../api/types";

export const ForecastCard = ({ item }: { item: IForecastListItem }) => {
  return (
    <div className="w-44 flex mb-4 py-4 px-10  bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300">
      <div>
        <div className="text-gray-700 dark:text-gray-200 font-semibold text-md">
          {new Date(item.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="mt-2">
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            className="w-24 h-24"
          />
          <span className="font-bold text-blue-500 dark:text-blue-400">
            {Math.round(item.main.temp)}°C
          </span>
        </div>
        <div className="mt-4">
          <span className="text-gray-600 dark:text-gray-300">
            {item.wind.speed} m/s
          </span>
        </div>
        <div className="mt-2">
          <span className="text-gray-600 dark:text-gray-300">
            {item.wind.speed} m/s
          </span>
        </div>
      </div>
    </div>
  );
};
