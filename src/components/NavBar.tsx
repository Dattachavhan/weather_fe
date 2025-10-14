import { TiWeatherPartlySunny } from "react-icons/ti";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBox } from "./SearchBox";

export const NavBar = () => {
  return (
    <>
      <nav>
        <div className="flex flex-row items-center justify-between px-12 py-4 bg-gray-300 dark:bg-gray-900 border-b border-gray-400">
          <div>
            <TiWeatherPartlySunny size="2em" />
          </div>
          <div className="flex flex-row gap-2">
            <SearchBox />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};
