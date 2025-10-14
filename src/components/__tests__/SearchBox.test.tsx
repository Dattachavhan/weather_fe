import { render, screen, fireEvent } from "@testing-library/react";
import { useWeather } from "../../context/WeatherContext";
import { SearchBox } from "../SearchBox";
import { vi } from "vitest";
import type { Mock } from "vitest";

vi.useFakeTimers();

vi.mock("../../context/WeatherContext");

const mockedUseWeather = useWeather as Mock;

describe("SearchBox Component", () => {
  const mockGetCitySuggestions = vi.fn();
  const mockClearSuggestions = vi.fn();
  const mockSetLocation = vi.fn();

  const defaultMockContext = {
    getCitySuggestions: mockGetCitySuggestions,
    suggestions: [],
    clearSuggestions: mockClearSuggestions,
    setLocation: mockSetLocation,
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseWeather.mockReturnValue(defaultMockContext);
  });

  test("Renders the search input correctly", () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText("Search city...");
    expect(input).toBeInTheDocument();
  });

  test("Updates input value on user typing", () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "London" } });
    expect(input).toHaveValue("London");
  });

  test("Debounces the getCitySuggestions call by 400ms", async () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "Paris" } });
    expect(mockGetCitySuggestions).not.toHaveBeenCalled();
    vi.advanceTimersByTime(399);
    expect(mockGetCitySuggestions).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    // The call should happen with the query
    expect(mockGetCitySuggestions).toHaveBeenCalledTimes(1);
    expect(mockGetCitySuggestions).toHaveBeenCalledWith("Paris");
  });

  test("Shows 'Loading...' when loading is true and query is present", () => {
    mockedUseWeather.mockReturnValue({
      ...defaultMockContext,
      loading: true,
      suggestions: [],
    });

    render(<SearchBox />);
    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "Test" } });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Shows 'No data found' when query is present but suggestions are empty and not loading", () => {
    mockedUseWeather.mockReturnValue({
      ...defaultMockContext,
      suggestions: [],
      loading: false,
    });

    render(<SearchBox />);
    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "Invalid" } });
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });
});
