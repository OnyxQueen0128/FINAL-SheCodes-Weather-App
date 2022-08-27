function displayTemperature(response) {
  let temperatureIndicator = document.querySelector("#maintemperature");
  let cityName = document.querySelector("#city");
  let weatherDescription = document.querySelector("#skydescription");
  let humidityIndicator = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  temperatureIndicator.innerHTML = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityIndicator.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

let apiKey = "213b9f4d2bf744ddfe96906f0ba3da1f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
