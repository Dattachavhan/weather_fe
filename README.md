# Weather App

A modern, responsive weather application built with React, Tailwind CSS, and OpenWeatherMap API.
The app provides current weather, 5-day/3-hour forecast, and city search with suggestions powered by real-time geolocation data.

---

## 🚀 Live Demo

👉 **[View Live App](https://vercel.com/dattachavhans-projects/weatherapp)**  
_(Deployed using Vercel with automatic CI/CD from GitHub)_

# Features

- Search by City Name — Get real-time city suggestions as you type.
- Select from Suggestions — Clicking a city fetches live weather and forecast.
- Geolocation Support — Detects and shows weather for your current location.
- Dark/Light Mode — Automatic theme adaptation.
- Clean UI — Built with Tailwind CSS for simplicity and performance.
- Error & Loading States — Smooth UX with loading indicators and error handling.

# ⚙️ Setup Instructions

1. Clone the Repository
   https://github.com/Dattachavhan/weather_fe.git
2. Install Dependencies
   npm install
3. Create .env File and add your OpenWeatherMap API key
   VITE_WEATHER_API_KEY=your_api_key
4. Run the App
   npm run dev

# Technologies Used

React (Vite) - UI library
Tailwind CSS - Styling
Context API + Hooks - State management
OpenWeatherMap API - Weather & forecast data

# Testing

This application uses Vitest for testing, along with @testing-library/react for component behavior simulation.

Test Status - Currently, only the SearchBox component has unit tests implemented to verify its debouncing logic, input handling, and context interactions.

Running Tests - npm run test

# 👨‍💻 Author

Dattatraya Chavhan
Front-End Developer (React / Angular)
