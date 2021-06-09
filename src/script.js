function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wed", "Thursday", "Friday", "Saturday"];
  let weekday = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let day = date.getDay();
  let year = date.getFullYear();
  return `${weekday} ${hour}:${minutes} ${month} ${day} ${year}`;
}

function formatTime(timestamp) {
  let time = new Date(timestamp * 1000);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function formateDay(forecastTimestamp) {
  let weekdate = new Date(forecastTimestamp * 1000);
  let day = weekdate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6b223ba52442c4a0c231ef743ba9a32c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
if (index < 5) {
    forecastHTML = forecastHTML + `<div class="col">
    <div class="upcoming-weekday">${formateDay(forecastDay.dt)}</div>
    <img  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" class="image">
    <div class="forecast-temperature">

      <div class="max-min-wrapper">
        <span class="temp-max" id="temp-max">${Math.round(forecastDay.temp.max)}</span>℃ /
        <span class="temp-min" id="temp-min">${Math.round(forecastDay.temp.min)}</span>℃
      </div>
    </div>
    </div>`
}
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinElement = document.querySelector("#temp-min");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let sunrise = formatTime(response.data.sys.sunrise * 1000);
  let sunset = formatTime(response.data.sys.sunset * 1000);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  tempMaxElement.innerHTML = Math.round(response.data.main.temp_max);
  tempMinElement.innerHTML = Math.round(response.data.main.temp_min);
  sunriseElement.innerHTML = ` ${sunrise}`;
  sunsetElement.innerHTML = ` ${sunset}`;
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function search(city) {
  let apiKey = "6b223ba52442c4a0c231ef743ba9a32c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
