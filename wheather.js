const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeatherMap API key

document.getElementById("btn").addEventListener("click", () => {
    const city = document.getElementById("searchbar").value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            showError();
            return;
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        showError();
    }
}

function updateUI(data) {
    document.getElementById("errormessage").classList.add("errormessage-hidden");

    document.getElementById("city").textContent = data.name;
    document.getElementById("current-temperature").textContent = Math.round(data.main.temp);
    document.querySelector(".feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} m/s`;
    document.querySelector(".weather-icon img").src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function showError() {
    document.getElementById("errormessage").classList.remove("errormessage-hidden");
}
