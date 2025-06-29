
    document.getElementById('get-weather').addEventListener('click', getWeather);

        async function getWeather() {
            const apiKey = '95bc597a8038129d8b2d0281d746eb6c'; // Replace with your OpenWeatherMap API key
            const city = document.getElementById('city').value;
            const weatherResult = document.getElementById('weather-result');
            
            if (city === '') {
                weatherResult.innerHTML = '<p>Please enter a city name.</p>';
                return;
            }
        
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                
                if (data.cod === '404') {
                    weatherResult.innerHTML = '<p>City not found. Please try again.</p>';
                } else {
                    const weatherCondition = data.weather[0].main.toLowerCase();
                    const weatherImage = getWeatherImage(weatherCondition);
                    
                    const weatherHTML = `
                        <h2>${data.name}</h2>
                        <img src="${weatherImage}" alt="${weatherCondition}" class="weather-img">
                        <p>Temperature: ${data.main.temp} °C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                    `;
                    weatherResult.innerHTML = weatherHTML;
                }
            } catch (error) {
                weatherResult.innerHTML = `<p>An error occurred: ${error.message}</p>`;
            }
        }
        
        function getWeatherImage(condition) {
            switch (condition) {
                case 'clear':
                    return 'clear.jpg'; // Replace with actual image URLs
                case 'clouds':
                    return 'clouds.jpg';
                case 'rain':
                    return 'Rain.jpg';
                case 'snow':
                    return 'snow.jpg';
                case 'storm':
                    return 'storm.jpg';
                case 'haze':
                    return 'haze.jpg';
                    case 'mist':
                    return 'mist.avif';
                default: 
                    return 'https://example.com/default.png'; // Default image
            }
        }
        
