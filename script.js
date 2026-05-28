const weatherElements = {
    location: document.getElementById("location"),
    temperature: document.getElementById("temperature"),
    condition: document.getElementById("condition"),
    humidity: document.getElementById("humidity")
};
const API_KEY = "61c36e043900757bd3e7463369981c71";

const updateWeatherUI = (data) => {

    weatherElements.location.textContent =
        `${data.name}, ${data.sys.country}`;

    weatherElements.temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    weatherElements.condition.textContent =
        data.weather[0].description;

    weatherElements.humidity.textContent =
        `${data.main.humidity}%`;
};

const showError = (message) => {
    weatherElements.location.textContent = message;
};

const fetchWeather = async (latitude, longitude) => {

    const endpoint =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }

        const weatherData = await response.json();

        updateWeatherUI(weatherData);

    } catch (error) {

        console.error(error);

        showError("Weather information unavailable");
    }
};

const detectVisitorLocation = () => {

    if (!navigator.geolocation) {
        showError("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        ({ coords }) => {
            fetchWeather(coords.latitude, coords.longitude);
        },

        () => {
            showError("Location permission denied");
        }

    );
};

document.addEventListener("DOMContentLoaded", detectVisitorLocation);