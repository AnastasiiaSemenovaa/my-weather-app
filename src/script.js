let now = new Date();
let newTime = document.querySelector("#date-now");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
newTime.innerHTML = ` Your current time is: ${hours}:${minutes} (${day}) `;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = [`Thu`, `Fri`, `Sat`, `Sun`];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="weather-forecast">
<div class="row">
<div class="col-3">
<div class = "weather-forecast-date">
${day} </div>
  <img src="https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png"
  alt="clear"
  width="42"/>
  <div class = "weather-forecast-temperatures">
  <span class="weather-forecast-max">
  18</span>
  <span class="weather-forecast-min">
  13</span>
  </div>
  </div>
  </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherConditins(response) {
  document.querySelector("#place").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(city) {
  let apiKey = "4f742d5e3ae8bb2ee757c24af4be3d50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditins);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-name").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "4f742d5e3ae8bb2ee757c24af4be3d50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditins);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
displayForecast();
