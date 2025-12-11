// Configuration
const API_KEY = "e08aa8b63603da21c838f1959cb4a43a"; // Replace with your OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const weatherDisplay = document.getElementById("weatherDisplay");
const errorMessage = document.getElementById("errorMessage");

// Initialize - Load Manila weather on startup
window.addEventListener("load", () => {
  loadManilaWeather();
});

// Load Manila weather
async function loadManilaWeather() {
  const city = "Manila";

  if (API_KEY === "e08aa8b63603da21c838f1959cb4a43a") {
    showError("Please add your OpenWeatherMap API key in app.js");
    return;
  }

  showError("");

  try {
    const url = `${API_URL}?q=${city},PH&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message || "Failed to fetch weather data");
    weatherDisplay.classList.add("hidden");
  }
}

// Display weather data
function displayWeather(data) {
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
  body.className = ""; // Remove all classes

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

// Show error message
function showError(message) {
  errorMessage.textContent = message;
}
