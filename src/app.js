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
function displayTemperature(response) {
  let temperatureIndicator = document.querySelector("#maintemperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#skydescription");
  let humidityIndicator = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let dateIndicator = document.querySelector("#date");
  temperatureIndicator.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityIndicator.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateIndicator.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "213b9f4d2bf744ddfe96906f0ba3da1f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
