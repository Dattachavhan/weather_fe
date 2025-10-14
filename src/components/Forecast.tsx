import type { IForecastListItem } from "../api/types";
import { ForecastCard } from "./ForecastCard";

export const Forecast = ({
  title,
  data,
}: {
  title: string;
  data: IForecastListItem[][] | null;
}) => {
  return (
    <div className="px-12 mt-10">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <div className="flex flex-col flex-wrap justify-between text-start">
        {data?.map((list: IForecastListItem[], index: number) => {
          return (
            <div key={index}>
              <div className="text-black dark:text-gray-200 font-semibold text-lg mb-2">
                {new Date(list[0].dt_txt).toLocaleDateString([], {
                  day: "2-digit",
                  month: "short",
                  weekday: "short",
                })}
              </div>
              <div className="flex flex-row flex-wrap gap-14 text-center">
                {list.map((item: IForecastListItem) => {
                  return <ForecastCard key={item.dt} item={item} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
