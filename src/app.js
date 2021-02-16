//Date 
function formatDate (date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;

  
  let now = new Date(targetTimestamp);

  let dayIndex = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday,`
  ];
  let day = days[now.getDay()];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
  let month = months[now.getMonth()];
  return  `${day} ${month} ${dayIndex} ${year}, ${hours}:${minutes}`;
}
// Hours for Forecasts
function formatHours(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

return `${hours}:${minutes}`;

}
// Search Form

function displayTemperature(response) {
console.log(response.data.main.temp);
let temperatureElement = document.querySelector("#temperature")
celsiusTemperature=response.data.main.temp;
temperatureElement.innerHTML=Math.round(celsiusTemperature);

let cityElement = document.querySelector("#city");
cityElement.innerHTML=response.data.name;

let countryElement = document.querySelector("#country");
countryElement.innerHTML= response.data.sys.country;

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML= response.data.weather[0].description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML= response.data.main.humidity;

let windElement = document.querySelector("#wind");
windElement.innerHTML= Math.round(response.data.wind.speed);

let feelElement = document.querySelector("#feel");
celsiusFeels=response.data.main.feels_like;
feelElement.innerHTML=Math.round(celsiusFeels);

 let dateElement=document.querySelector("#date")
 dateElement.innerHTML = formatDate(
  new Date(),
  response.data.timezone);
  
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `src/images/${response.data.weather[0].icon}.svg`);
iconElement.setAttribute("alt",response.data.weather[0].description);

}
function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];
let localTimestamp = forecast.dt + response.data.city.timezone;

forecastElement.innerHTML  += `
<div class="col-2">
<h3>
${formatHours(localTimestamp * 1000)}
</h3>
<img src="src/images/${
  forecast.weather[0].icon
}.svg" class="forecast-images" style="width:60px;height:60px;padding:5px"/>
<div class="weather-forecast-temperature">
<strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°    
</div>
</div> 
`
}
}

function search(city) {
let apiKey="11c6b1943d69dd9ab2b79eb46ab8283b";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayTemperature);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
event.preventDefault();

let cityInputElement= document.querySelector("#city-input");
search(cityInputElement.value);
}

// Current Location Button
function searchPosition(position) {
  let apiKey = "11c6b1943d69dd9ab2b79eb46ab8283b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);


}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
// Conversion to Fahrenheit | Celsius
function displayFahrenheitTemperature(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

let fahrenheitFeelsElement = document.querySelector("#feel");
let fahrenheitFeels = (celsiusFeels * 9/ 5) + 32;
fahrenheitFeelsElement.innerHTML = Math.round(fahrenheitFeels);


}
function displayCelsiusTemperature(event) {
 event.preventDefault();
 fahrenheitLink.classList.remove("active");
 celsiusLink.classList.add("active");
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);

 let fahrenheitFeelsElement = document.querySelector("#feel");
 fahrenheitFeelsElement.innerHTML = Math.round(celsiusFeels);
}

// Sticky Note Searches
function searchLima(event) {
  event.preventDefault();
  search("Lima");
}
function searchPorto(event) {
  event.preventDefault();
  search("Porto");
}
function searchPlovdiv(event) {
  event.preventDefault();
  search("Plovdiv");
}
function searchAntananarivo(event) {
  event.preventDefault();
  search("Antananarivo");
}
function searchHavana(event) {
  event.preventDefault();
  search("Havana");
}
let clickLima = document.querySelector("#lima");
clickLima.addEventListener("click", searchLima);
let clickPorto = document.querySelector("#porto");
clickPorto.addEventListener("click", searchPorto);
let clickPlovdiv = document.querySelector("#plovdiv");
clickPlovdiv.addEventListener("click", searchPlovdiv);
let clickAntananarivo = document.querySelector("#antananarivo");
clickAntananarivo.addEventListener("click", searchAntananarivo);
let clickHavana = document.querySelector("#havana");
clickHavana.addEventListener("click", searchHavana);
// Global Variables
let celsiusTemperature = null;
let celsiusFeels = null;

let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let requestLocalWeather = document.querySelector("#location");
requestLocalWeather.addEventListener("click", getCurrentLocation);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
search("Vienna");