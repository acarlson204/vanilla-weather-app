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
    let sunriseEpoch = (response.data.sys.sunrise);
    let sunsetEpoch = (response.data.sys.sunset);    
    let sunrise = new Date(sunriseEpoch * 1000);
    let sunset = new Date(sunsetEpoch * 1000);    

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
    sunriseElement.innerHTML = `${sunrise}`;
    sunsetElement.innerHTML = `${sunset}`;
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    search(searchInputElement.value);
}
function displaySunriseSunset(response) {
}
function search(city) {
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
