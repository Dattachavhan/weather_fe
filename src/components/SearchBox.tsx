import { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";
import type { ICity } from "../api/types";

export const SearchBox = () => {
  const [query, setQuery] = useState("");
  const { getCitySuggestions, suggestions, clearSuggestions, setLocation } =
    useWeather();

  useEffect(() => {
    const timer = setTimeout(() => {
      getCitySuggestions(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectCity = (city: ICity) => {
    setLocation({ lat: city.lat, lon: city.lon });
    clearSuggestions();
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {suggestions?.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectCity(city)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {city.name}
              {city.state ? `, ${city.state}` : ""} ({city.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
