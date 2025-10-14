import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/themeContext";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
};
