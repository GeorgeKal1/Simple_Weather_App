const button= document.getElementById('fetchWeatherBtn');
const cityInput = document.getElementById('cityInput') as HTMLInputElement;
const cityName = document.getElementById('cityName') as HTMLElement;
const temperature = document.getElementById('temperature') as HTMLElement;
const description = document.getElementById('description') as HTMLElement;
const viewMoreBtn = document.getElementById('viewMoreBtn') as HTMLButtonElement;
const icon= document.getElementById('icon') as HTMLImageElement;
let apikey='Your_API_Key_Here'; // Replace with your OpenWeatherMap API key
let weatherData: any;

button?.addEventListener('click',()=>{
    const city= cityInput.value;
    getData(city);
});


// View More details button functionality;
viewMoreBtn?.addEventListener('click',()=>{
    temperature.innerHTML = `Temperature: ${weatherData?.main.temp} °C<br>
                                    Feels Like: ${weatherData?.main.feels_like} °C<br>
                                    Humidity: ${weatherData?.main.humidity} %<br>
                                    Wind Speed: ${weatherData?.wind.speed} m/s<br>`;
    temperature.style.backgroundColor = '#3ea0b3ff';
    temperature.style.borderRadius = '10px';
    description.innerHTML = `Description: ${weatherData?.weather[0].description}<br>
                                    Pressure: ${weatherData?.main.pressure} hPa<br>
                                    Visibility: ${weatherData?.visibility} meters<br>
                                    Cloudiness: ${weatherData?.clouds.all} %<br>
                                    Country: ${weatherData?.sys.country}<br>
                                    Sunrise: ${new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString()}<br>
                                    Sunset: ${new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString()}<br>`;
    description.style.backgroundColor = '#3ea0b3ff';
    description.style.borderRadius = '10px';    
    viewMoreBtn.style.display = 'none'; 
    icon.innerHTML = `<img src="images/${weatherData?.weather[0].icon}.png" alt="Weather Icon">`;
    icon.style.display = 'block';
});

function clearData(){
    icon.style.display = 'none';
    cityName.textContent = '';
    temperature.innerHTML = '';
    description.innerHTML = '';
    viewMoreBtn.style.display = 'none';
    temperature.style.backgroundColor = 'inherit';
    description.style.backgroundColor = 'inherit';  
}

function getData(city: string){
    clearData();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        .then(response => response.json())
        .then(data =>{
            weatherData = data;
            console.log(data);
            if(data.cod === 200){
                cityName.textContent = `City: ${data.name}`;
                temperature.innerHTML = `Temperature: ${data.main.temp} °C`;
                description.innerHTML = `Description: ${data.weather[0].description}`;
                viewMoreBtn.style.display = 'inline-block';
            } else {
                cityName.textContent = `City not found`;
                temperature.innerHTML = '';
                description.innerHTML = '';
        }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        })
}


