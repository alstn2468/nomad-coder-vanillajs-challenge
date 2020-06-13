const API_KEY = '5020f2a1f0cfc2399d0f26f4bd0bc688';
const COORDS_LS = 'coords';
const weather = document.querySelector('.js-weather');

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const temperature = json.main.temp;
            const location = json.name;
            weather.innerText = `${Math.floor(
                ((temperature - 32) * 5) / 9
            )}°C, ${location}`;
        });
}

function saveLocation(location) {
    localStorage.setItem(COORDS_LS, JSON.stringify(location));
}

function handleGeoError() {
    console.error('Fail to load location');
}

function handleGeoSuccess(pos) {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const location = {
        latitude,
        longitude,
    };
    saveLocation(location);
    getWeather(location.latitude, location.longitude);
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        getCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();
