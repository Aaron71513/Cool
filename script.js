// Time update
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById("time").textContent = time;
}
setInterval(updateTime, 1000);

// Weather and Location update
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        document.getElementById("location").textContent = `${lat}, ${lon}`;
        document.getElementById("currentLocation").textContent = `${lat}, ${lon}`;

        // Fetch weather data based on location
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const weatherDescription = data.weather[0].description;
                document.getElementById("weather").textContent = `Weather: ${weatherDescription}, Temp: ${temp}°C`;
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });
} else {
    document.getElementById("location").textContent = "Geolocation not available";
}
