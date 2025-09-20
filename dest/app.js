"use strict";
const button = document.getElementById('fetchWeatherBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const viewMoreBtn = document.getElementById('viewMoreBtn');
const icon = document.getElementById('icon');
let apikey = '8b086032454d2f9166620c8bf1ad1bef';
let weatherData;
button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
    const city = cityInput.value;
    getData(city);
});
// View More details button functionality;
viewMoreBtn === null || viewMoreBtn === void 0 ? void 0 : viewMoreBtn.addEventListener('click', () => {
    temperature.innerHTML = `Temperature: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.main.temp} °C<br>
                                    Feels Like: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.main.feels_like} °C<br>
                                    Humidity: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.main.humidity} %<br>
                                    Wind Speed: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.wind.speed} m/s<br>`;
    temperature.style.backgroundColor = '#3ea0b3ff';
    temperature.style.borderRadius = '10px';
    description.innerHTML = `Description: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.weather[0].description}<br>
                                    Pressure: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.main.pressure} hPa<br>
                                    Visibility: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.visibility} meters<br>
                                    Cloudiness: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.clouds.all} %<br>
                                    Country: ${weatherData === null || weatherData === void 0 ? void 0 : weatherData.sys.country}<br>
                                    Sunrise: ${new Date((weatherData === null || weatherData === void 0 ? void 0 : weatherData.sys.sunrise) * 1000).toLocaleTimeString()}<br>
                                    Sunset: ${new Date((weatherData === null || weatherData === void 0 ? void 0 : weatherData.sys.sunset) * 1000).toLocaleTimeString()}<br>`;
    description.style.backgroundColor = '#3ea0b3ff';
    description.style.borderRadius = '10px';
    viewMoreBtn.style.display = 'none';
    icon.innerHTML = `<img src="images/${weatherData === null || weatherData === void 0 ? void 0 : weatherData.weather[0].icon}.png" alt="Weather Icon">`;
    icon.style.display = 'block';
});
function clearData() {
    icon.style.display = 'none';
    cityName.textContent = '';
    temperature.innerHTML = '';
    description.innerHTML = '';
    viewMoreBtn.style.display = 'none';
    temperature.style.backgroundColor = 'inherit';
    description.style.backgroundColor = 'inherit';
}
function getData(city) {
    clearData();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        .then(response => response.json())
        .then(data => {
        weatherData = data;
        console.log(data);
        if (data.cod === 200) {
            cityName.textContent = `City: ${data.name}`;
            temperature.innerHTML = `Temperature: ${data.main.temp} °C`;
            description.innerHTML = `Description: ${data.weather[0].description}`;
            viewMoreBtn.style.display = 'inline-block';
        }
        else {
            cityName.textContent = `City not found`;
            temperature.innerHTML = '';
            description.innerHTML = '';
        }
    })
        .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}
//# sourceMappingURL=app.js.map