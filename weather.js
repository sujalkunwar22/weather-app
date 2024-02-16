const apiKey = "8245aad24c246aef1da88ab25bf5d120";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://cdn1.iconfinder.com/data/icons/andriod-app/32/cloud-256.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/sunny-outline-256.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "https://cdn1.iconfinder.com/data/icons/weather-306/100/Icon_13-2-61_12-256.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "https://cdn3.iconfinder.com/data/icons/weather-610/64/weather_drizzle_rain_cloud-256.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "https://cdn3.iconfinder.com/data/icons/weather-solic/24/Foggy-256.png"
        }
        const timestamp = Math.floor(Date.now() / 1000) + data.timezone ;
        const date = new Date(timestamp * 1000);
        const localDateTime = date.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC'
        });
        document.getElementById('dateTime').textContent = localDateTime
        document.getElementById('dateTime').style.color = "black";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
checkWeather("Kathmandu");