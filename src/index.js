function handleSearchSubmission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value;
  let cityToUpdate = document.querySelector("#city");
  cityToUpdate.innerHTML = `${city} weather`;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "a23921o2t3f0b57e86a4e973079a01b8";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
function showWeather(response) {
  let currentTemperature = response.data.temperature.current;
  let currentHumidity = response.data.temperature.humidity;
  let feelsLikeTemperature = response.data.temperature.feels_like;
  let currentWindSpeed = response.data.wind.speed;
  let currentDescription = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;

  let temperature = document.querySelector("#weather-temperature-value");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#weather-feel-like-value");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let imgIcon = document.querySelector("#weather-icon");

  temperature.innerHTML = `${Math.round(currentTemperature)}°`;
  humidity.innerHTML = `${currentHumidity}%`;
  feelsLike.innerHTML = `FeelsLike: ${Math.round(feelsLikeTemperature)}°C`;
  windSpeed.innerHTML = `${currentWindSpeed} m/s`;
  description.innerHTML = `${currentDescription}`;
  imgIcon.src = iconUrl;

  getForecast(response.data.city);
}
function updateTime() {
  let date = new Date();
  console.log(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = updateDay(date);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  let timeDisplay = document.querySelector("#time");
  timeDisplay.innerHTML = `${day} ${time}`;
}
function updateDay() {
  let date = new Date();
  let dayOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = dayOfTheWeek[date.getDay()];
  return weekDay;
}
function getForecast(city) {
  let apiKey = "a23921o2t3f0b57e86a4e973079a01b8";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(url).then(displayForecast);
}
function displayForecast(response) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastElement = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastElement += `
      <div class="weather-forecast-day">
          <div class="weather-forecast-date">
            ${days[index]}
          </div>
          <img
             src= ${day.condition.icon_url} class="weather-forecast-icon"
              width="40px"
            />
          <span class="weather-forecast-temperature"> <strong>${Math.round(
            day.temperature.maximum
          )}&deg;C </strong></span>
          <span class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}&deg;C</div>
      </span>
      `;
    }
  });
  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastElement;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmission);
let searchButton = document.querySelector("#search-form-btn");
searchButton.addEventListener("click", handleSearchSubmission);
updateTime();
