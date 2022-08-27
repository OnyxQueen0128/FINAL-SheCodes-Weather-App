function displayTemperature(response) {}

let apiKey = "213b9f4d2bf744ddfe96906f0ba3da1f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(url).then(displayTemperature);
