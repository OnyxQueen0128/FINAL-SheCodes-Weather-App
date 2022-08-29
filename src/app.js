function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hours}:${minutes}`;
}
function dispalyForecast(response) {
  let forecastIndicators = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather-forecast-date">
                ${day} 
              </div> 
              <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="" width="42">
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">
                  18</span>°
                <span class="weather-forecast-temperature-min">
                  12</span>°
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastIndicators.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = ` https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function displayTemperature(response) {
  let temperatureIndicator = document.querySelector("#maintemperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#skydescription");
  let humidityIndicator = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let dateIndicator = document.querySelector("#date");
  let iconIndicator = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;
  temperatureIndicator.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityIndicator.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateIndicator.innerHTML = formatDate(response.data.dt * 1000);
  iconIndicator.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconIndicator.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "213b9f4d2bf744ddfe96906f0ba3da1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function inputSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayFarenheightTemp(event) {
  event.preventDefault();
  let farenheightTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureIndicator = document.querySelector("#maintemperature");
  temperatureIndicator.innerHTML = Math.round(farenheightTemperature);
  celciusLink.classList.remove("active");
  farenheightLink.classList.add("active");
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureIndicator = document.querySelector("#maintemperature");
  temperatureIndicator.innerHTML = Math.round(celciusTemperature);
  farenheightLink.classList.remove("active");
  celciusLink.classList.add("active");
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", inputSearch);

let farenheightLink = document.querySelector("#farenheight-link");
farenheightLink.addEventListener("click", displayFarenheightTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Zurich");
