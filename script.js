document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".search-button");
    const searchBox =    document.querySelector(".search-box");
    const weatherIcon = document.querySelector(".weather-info img");
    const temperature = document.querySelector(".weather-info-text h2");
    const description = document.querySelector(".weather-info-text h4");

    searchButton.addEventListener("click", function () {
        const city = searchBox.value.trim();

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        fetchWeatherData(city);
    });

    function fetchWeatherData(city) {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = "ae6c0e529e939c7b3f2abb74ef811ce9";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= 
        ${city}&units=metric&appid=${apiKey }`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found.");
                }
                return response.json();
            })
            .then(data => {
                updateWeatherInfo(data);
            })
            .catch(error => {
                alert(error.message);
            });
    }

    function updateWeatherInfo(data) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        weatherIcon.src = iconUrl;
        temperature.textContent = `${Math.round(data.main.temp)} °C`;
        description.textContent = data.weather[0].description;
    }
});
