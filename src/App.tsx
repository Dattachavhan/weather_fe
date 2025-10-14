import "./App.css";
import { NavBar } from "./components/NavBar";
import { useTheme } from "./context/themeContext";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-800 text-white" : "bg-gray-200 text-black"
      }  `}
    >
      <NavBar />
      <Dashboard />
    </div>
  );
}

export default App;
