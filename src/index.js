// --- Refactored JavaScript Code ---

function changeBackground(condition) {
    let backgroundUrl = "";
    const description = condition.toLowerCase();

    if (description.includes("clear") || description.includes("sun")) {
        backgroundUrl = "https://images.unsplash.com/photo-1590055531615-f1624a7243c5?w=800";
    } else if (description.includes("clouds")) {
        backgroundUrl = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800";
    } else if (description.includes("rain") || description.includes("drizzle")) {
        backgroundUrl = "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800";
    } else if (description.includes("snow")) {
        backgroundUrl = "https://images.unsplash.com/photo-1542601098-8fc114e1937b?w=800";
    } else if (description.includes("thunderstorm")) {
        backgroundUrl = "https://images.unsplash.com/photo-1605727226503-92a5aa4a4344?w=800";
    } else {
        // Default background
        backgroundUrl = "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800";
    }
    document.body.style.backgroundImage = `url('${backgroundUrl}')`;
}

function displayWeatherData(response) {
    const data = response.data;
    const date = new Date(data.time * 1000);

    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#time").innerHTML = formatDate(date);
    document.querySelector("#description").innerHTML = data.condition.description;
    document.querySelector("#humidity").innerHTML = `${data.temperature.humidity}%`;
    document.querySelector("#wind-speed").innerHTML = `${data.wind.speed} km/h`;
    document.querySelector("#feels-like").innerHTML = `${Math.round(data.temperature.feels_like)}°`;
    document.querySelector("#weather-temperature-value").innerHTML = Math.round(data.temperature.current);
    document.querySelector("#weather-icon").src = data.condition.icon_url;

    changeBackground(data.condition.description);
    getForecast(data.city);
}

function formatDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    const apiKey = "a23921o2t3f0b57e86a4e973079a01b8";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherData).catch(err => alert("City not found. Please try again."));
}

function handleSearchSubmission(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function displayForecast(response) {
    let forecastHtml = "";
    response.data.daily.forEach(function(day, index) {
        if (index > 0 && index < 6) { // Get next 5 days
            forecastHtml += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">
                            <strong>${Math.round(day.temperature.maximum)}°</strong>
                        </span>
                        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>`;
        }
    });
    document.querySelector("#weather-forecast").innerHTML = forecastHtml;
}

function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function getForecast(city) {
    const apiKey = "a23921o2t3f0b57e86a4e973079a01b8";
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

// Event Listener
const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmission);

// Initial Load - Set a default city
searchCity("Gaborone");
