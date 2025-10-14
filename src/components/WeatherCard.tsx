import { SlLocationPin } from "react-icons/sl";
import { CiTempHigh } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { IoIosKey } from "react-icons/io";
import type { IWeatherData } from "../api/types";

export const WeatherCard = ({
  currentWeatherData,
}: {
  currentWeatherData: IWeatherData | null;
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between px-4 sm:px-12">
      <div className=" bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6 mt-6 transition-all duration-300">
        <div className="flex flex-row items-center gap-2 mb-4">
          <SlLocationPin size={20} />
          <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {currentWeatherData?.name}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-start">
            <h3 className="text-5xl font-bold text-blue-500 dark:text-blue-400">
              {currentWeatherData?.main?.temp !== undefined
                ? Math.round(currentWeatherData.main.temp)
                : "--"}
              °C
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Feels like{" "}
              {currentWeatherData?.main?.feels_like !== undefined
                ? Math.round(currentWeatherData.main.feels_like)
                : "--"}
              °C
            </p>
            <p className="capitalize mt-2 text-gray-700 dark:text-gray-200 font-medium">
              {currentWeatherData?.weather?.[0]?.description}
            </p>
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather?.[0]?.icon}@2x.png`}
            alt={currentWeatherData?.weather?.[0]?.description}
            className="w-32 h-32"
          />
        </div>

        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Last updated:{" "}
          {currentWeatherData?.dt !== undefined
            ? new Date(currentWeatherData.dt * 1000).toLocaleTimeString()
            : "--"}
        </div>
      </div>
      <div className="w-200 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6 mt-6 transition-all duration-300">
        <div className="grid grid-cols-3 gap-4 mt-6 text-sm  dark:text-gray-300 text-center">
          <div className="flex flex-col items-center">
            <LuWind size={30} />
            <p>{currentWeatherData?.wind?.speed} m/s</p>
            <p className="text-xs text-gray-500">Wind</p>
          </div>
          <div className="flex flex-col items-center">
            <WiHumidity size={30} />
            <p>{currentWeatherData?.main?.humidity}%</p>
            <p className="text-xs text-gray-500">Humidity</p>
          </div>
          <div className="flex flex-col items-center">
            <IoIosKey size={30} />
            <p>{currentWeatherData?.main?.pressure} hPa</p>
            <p className="text-xs text-gray-500">Pressure</p>
          </div>
          <div className="flex flex-col items-center">
            <FaRegEye size={30} />
            <p>{currentWeatherData?.visibility} m</p>
            <p className="text-xs text-gray-500">Visibility</p>
          </div>
          <div className="flex flex-col items-center">
            <CiTempHigh size={30} />
            <p>
              {" "}
              {currentWeatherData?.main?.temp_min !== undefined
                ? Math.round(currentWeatherData.main.temp_min)
                : "--"}
              °C
            </p>
            <p className="text-xs text-gray-500">Min temp</p>
          </div>
          <div className="flex flex-col items-center">
            <CiTempHigh size={30} />
            <p>
              {currentWeatherData?.main?.temp_max !== undefined
                ? Math.round(currentWeatherData.main.temp_max)
                : "--"}
              °C
            </p>
            <p className="text-xs text-gray-500">Max temp</p>
          </div>
        </div>
      </div>
    </div>
  );
};
