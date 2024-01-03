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
  feelsLike.innerHTML = `RealFeel: ${Math.round(feelsLikeTemperature)}°C`;
  windSpeed.innerHTML = `${currentWindSpeed} km/h`;
  description.innerHTML = `${currentDescription}`;
  imgIcon.src = iconUrl;
}
function updateTime(date) {
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
function displayForecast() {
  let days = ["Thur", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastElement = "";

  days.forEach(function (day) {
    forecastElement += `
      <div class="weather-forecast-day">
          <div class="weather-forecast-date">
            ${day}
          </div>
          <div class="weather-forcast-icon">
           <img
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAYxJREFUaN7tmMERgyAQRS2BEizBEizBEiyBEizBEizBEiyB679Zgh1sLpsMIRgRAZOZdeYfNBPY94FdoCKi6p9VCYAACIAACIAAvF5OPgAUgBHACoAsrfxdVQmfpAAAOgCbE7irDUD3cwAA+oPAXXW3AABoAczs5MKuqwDnfSOhigJwsG4gDc9titDA/x8cNbkAPhbmzvcUMiEgwQDslNvJwr9RRvWpAFpP4xOAOjMAfRuJIAArt3vTYQEAEw3Awa8e55WVkeiuUQgBmD2ZQxUM/NVvLIDPeVM4+CQA603OXwZ4uq13MlEpLVah0wDqUADNDdzp/p7Gs5WYflDTvwMQgP4OgM2ey1zRdcSulgCY0gDGKoQTL9CJ3+00vbAO24zdjcY6rzhg78LcOabOKQCGBAAh6bhnwM0poNNVABU5R23V3wI5qAN7/ZszR8rOc4IKFrexXIDvPe22ya5VDq5bngs2dhTbrNcqBwAmUQIYiwNk2EPp0gBNrp2pXO4KgAAIgAAIgAAIgAC86wECCuvGtH3EIQAAAABJRU5ErkJggg=="
              alt=""
              width="40px"
            />
          </div>
          <div class="weather-forecast-temperature"> <strong>18&deg;C </strong></div>
          <div class="weather-forecast-temperature">12&deg;C</div>
      </div>
      `;
  });
  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastElement;
}
let date = new Date();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmission);
let searchButton = document.querySelector("#search-form-btn");
searchButton.addEventListener("click", handleSearchSubmission);
updateTime(date);
displayForecast();
