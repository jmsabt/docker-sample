require("dotenv").config();

// Configuration
const API_KEY = process.env.API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Initialize - Load Manila weather on startup
window.addEventListener("load", () => {
  loadManilaWeather();
  loadManilaForecast();
});

// Load Manila weather
async function loadManilaWeather() {
  const city = "Manila";
  const weatherDisplay = document.getElementById("weatherDisplay");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = "";

  try {
    const url = `${API_URL}?q=${city},PH&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorMessage.textContent = error.message || "Failed to fetch weather data";
    weatherDisplay.classList.add("hidden");
  }
}

// Display weather data
function displayWeather(data) {
  const weatherDisplay = document.getElementById("weatherDisplay");

  const weather = {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feels_like: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    main: data.weather[0].main.toLowerCase(),
    humidity: data.main.humidity,
    wind_speed: Math.round(data.wind.speed * 3.6 * 10) / 10,
    icon: data.weather[0].icon,
  };

  document.getElementById(
    "cityName"
  ).textContent = `${weather.city}, ${weather.country}`;
  document.getElementById("temp").textContent = weather.temperature;
  document.getElementById("description").textContent = weather.description;
  document.getElementById("feelsLike").textContent = `${weather.feels_like}°C`;
  document.getElementById("humidity").textContent = `${weather.humidity}%`;
  document.getElementById(
    "windSpeed"
  ).textContent = `${weather.wind_speed} km/h`;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  document.getElementById("weatherIcon").src = iconUrl;

  weatherDisplay.classList.remove("hidden");

  // Change background based on weather
  changeBackground(weather.main);
}

// Change background based on weather condition
function changeBackground(condition) {
  const body = document.body;
  body.className = "";

  const weatherClasses = {
    clear: "clear",
    clouds: "clouds",
    rain: "rain",
    drizzle: "drizzle",
    thunderstorm: "thunderstorm",
    snow: "snow",
    mist: "mist",
    fog: "fog",
    haze: "haze",
  };

  const weatherClass = weatherClasses[condition] || "clear";
  body.classList.add(weatherClass);
}

// Load Manila 5-day forecast
async function loadManilaForecast() {
  const city = "Manila";
  const forecastContainer = document.getElementById("forecastContainer");

  try {
    const url = `${FORECAST_URL}?q=${city},PH&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Forecast error:", error);
    forecastContainer.innerHTML =
      '<p class="forecast-error">Unable to load forecast</p>';
  }
}

// Display 5-day forecast
function displayForecast(data) {
  const forecastContainer = document.getElementById("forecastContainer");

  // Group forecasts by day (API returns 3-hour intervals)
  const dailyForecasts = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    // Take midday forecast (12:00) or first available
    if (!dailyForecasts[day] || date.getHours() === 12) {
      dailyForecasts[day] = {
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        date: date,
      };
    }
  });

  // Convert to array and take first 5 days
  const forecastArray = Object.entries(dailyForecasts)
    .slice(0, 5)
    .map(([day, data]) => ({ day, ...data }));

  // Generate HTML
  forecastContainer.innerHTML = forecastArray
    .map(
      (forecast) => `
    <div class="forecast-card">
      <div class="forecast-day">${forecast.day}</div>
      <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}" class="forecast-icon">
      <div class="forecast-temp">${forecast.temp}°C</div>
      <div class="forecast-desc">${forecast.description}</div>
    </div>
  `
    )
    .join("");
}
