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

  // Updating the DOM with new data
  temperature.innerHTML = Math.round(currentTemperature);
  humidity.innerHTML = `${currentHumidity}%`;
  feelsLike.innerHTML = `RealFeel: ${Math.round(feelsLikeTemperature)}°C`;
  windSpeed.innerHTML = `${currentWindSpeed} km/h`;
  description.innerHTML = `,${currentDescription}`;
}
function updateTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = updateDay(date);
  if (minutes < 10) {
    minutes = `0${minners}`;
  }
  let time = `${hours}:${minutes}`;
  let timeDisplay = document.querySelector("#time");
  timeDisplay.innerHTML = `${day} ${time}`;
}
function updateDay(date) {
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
let date = new Date();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmission);
updateTime(date);
