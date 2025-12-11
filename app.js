// Configuration
const API_KEY = "e08aa8b63603da21c838f1959cb4a43a"; // Replace with your OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// State
let currentCity = "";
let favorites = [];

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const errorMessage = document.getElementById("errorMessage");
const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");

// Event listeners
searchBtn.addEventListener("click", searchWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchWeather();
});
favoriteBtn.addEventListener("click", toggleFavorite);

// Initialize
loadFavoritesFromStorage();
renderFavorites();

// Load default city on startup
window.addEventListener("load", () => {
  cityInput.value = "Manila";
  searchWeather();
});

// Search for weather
async function searchWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  if (API_KEY === "YOUR_API_KEY_HERE") {
    showError("Please add your OpenWeatherMap API key in app.js");
    return;
  }

  showError("");
  searchBtn.textContent = "Loading...";
  searchBtn.disabled = true;

  try {
    const url = `${API_URL}?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    currentCity = data.name;
    displayWeather(data);
    updateFavoriteButton();
  } catch (error) {
    showError(error.message || "Failed to fetch weather data");
    weatherDisplay.classList.add("hidden");
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
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

// Load favorites from memory
function loadFavoritesFromStorage() {
  favorites = [];
}

// Render favorites list
function renderFavorites() {
  if (favorites.length === 0) {
    favoritesList.innerHTML =
      '<p class="no-favorites">No favorites yet. Add some cities!</p>';
    return;
  }

  favoritesList.innerHTML = favorites
    .map(
      (city) => `
        <div class="favorite-tag">
            <span onclick="loadCityWeather('${city}')">${city}</span>
            <span class="remove-favorite" onclick="removeFavorite('${city}')">×</span>
        </div>
    `
    )
    .join("");
}

// Toggle favorite
function toggleFavorite() {
  if (!currentCity) return;

  const index = favorites.indexOf(currentCity);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(currentCity);
  }

  renderFavorites();
  updateFavoriteButton();
}

// Update favorite button
function updateFavoriteButton() {
  const isFavorite = favorites.includes(currentCity);
  favoriteBtn.textContent = isFavorite
    ? "⭐ Remove from Favorites"
    : "⭐ Add to Favorites";
  favoriteBtn.classList.toggle("is-favorite", isFavorite);
}

// Load weather for a favorite city
function loadCityWeather(city) {
  cityInput.value = city;
  searchWeather();
}

// Remove favorite
function removeFavorite(city) {
  const index = favorites.indexOf(city);
  if (index > -1) {
    favorites.splice(index, 1);
  }

  renderFavorites();

  if (currentCity === city) {
    updateFavoriteButton();
  }
}
