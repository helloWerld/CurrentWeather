// Elements

// Search Bar
const locationForm = document.getElementById("locationForm");
locationForm.addEventListener("submit", handleClick);

// Current Weather Location
const currentLocation = document.getElementById("weatherCity");

// Current Weather Conditions
const currentWeatherConditions = document.getElementById('conditions');

//Current Temperature
const currentTemp = document.getElementById("temp");

//Current Feels Like
const currentFeelsLike = document.getElementById("feels");

//Current Humidity
const currentHumidity = document.getElementById("humidity");

//Current Wind Speed
const currentWind = document.getElementById("wind");

//Current Visibility
const currentVis = document.getElementById("vis");

//Tomrrow Weather
const dayOneCond = document.getElementById('dayOneCond');
const dayOneTempHi = document.getElementById('dayOneTempHi');
const dayOneTempLo = document.getElementById('dayOneTempLo');

//Next Day Weather
const dayTwoCond = document.getElementById('dayTwoCond');
const dayTwoTempHi = document.getElementById('dayTwoTempHi');
const dayTwoTempLo = document.getElementById('dayTwoTempLo');


function handleClick(event) {
    event.preventDefault();
    let location = document.getElementById('locationInput').value;
    console.log(location);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'abc508b46fmsh813f8910b29d2d8p14d034jsn6fe2aa7a93ff',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            updateWeather(response);
        })
        .catch(err => console.error(err));
    
    document.getElementById('locationInput').value = "";
}

function updateWeather(response) {
    // Update Location
    currentLocation.innerHTML = `${response.location.name}, ${response.location.region}`;

    // Update Conditions
    currentWeatherConditions.innerHTML = cleanResponse(`${response.current.condition.text}`);
    updateBackground(currentWeatherConditions.innerHTML);

    //Update Temperature
    currentTemp.innerHTML = `${Math.floor(response.current.temp_f)}`;

    //Update Feels Like
    currentFeelsLike.innerHTML = `Feels Like ${Math.floor(response.current.feelslike_f)}°`;

    //Update Humidity
    currentHumidity.innerHTML = `${response.current.humidity}%`;

    //Update Wind Speed
    currentWind.innerHTML = `${Math.floor(response.current.wind_mph)} mph`;

    //Update Visibility
    currentVis.innerHTML = `${response.current.vis_miles} miles`;

    //Current Next Next Day Weather
    dayOneCond.innerHTML = cleanResponse(`${response.forecast.forecastday[1].day.condition.text}`);
    dayOneTempHi.innerHTML = `${Math.floor(response.forecast.forecastday[1].day.maxtemp_f)}`
    dayOneTempLo.innerHTML = `${Math.floor(response.forecast.forecastday[1].day.mintemp_f)}`

    //Current Next Next Next Day Weather
    dayTwoCond.innerHTML = cleanResponse(`${response.forecast.forecastday[2].day.condition.text}`);
    dayTwoTempHi.innerHTML = `${Math.floor(response.forecast.forecastday[2].day.maxtemp_f)}`
    dayTwoTempLo.innerHTML = `${Math.floor(response.forecast.forecastday[2].day.mintemp_f)}`
}

//Clean responses of unnecessary words to keep them short
function cleanResponse(conditions) {
    let cleanConditions = conditions;
    const removeWords = ['light', 'moderate', 'heavy', 'patchy', 'possible', 'or'];

    for (let i = 0; i < removeWords.length; i++){
        if (cleanConditions.toLowerCase().includes(removeWords[i])) {
            console.log('Entered clean function');
            let newConditions = cleanConditions.toLowerCase().replace(removeWords[i], "");
            console.log(`Cleaned the word ${removeWords[i]} from ${cleanConditions}`);
            console.log(`New conditions: ${newConditions}`);
            cleanConditions = newConditions;
        }
    }
    return cleanConditions.trim().replace(cleanConditions.trim()[0], cleanConditions.trim()[0].toUpperCase());
}

//Background image/video changing function
function updateBackground(currentWeatherConditions) {
    const check = currentWeatherConditions.toLowerCase();
    if (check.includes('sunny')) {
        document.body.style.background = 'url(backgrounds/sunny.gif)';
    } else if (check.includes('rain') || check.includes('drizzle')) {
        document.body.style.background = 'url(backgrounds/rain.gif)';
    } else if (check.includes('mist') || check.includes('fog')) {
        document.body.style.background = 'url(backgrounds/mist.gif)';
    } else if (check.includes('clear')) {
        document.body.style.background = 'url(backgrounds/clear.gif)';
    } else if (check.includes('overcast')) {
        document.body.style.background = 'url(backgrounds/overcast.gif)';
    } else if (check.includes('cloudy')) {
        document.body.style.background = 'url(backgrounds/cloudy.gif)';
    } else if (check.includes('snow')) {
        document.body.style.background = 'url(backgrounds/snow.gif)';
    } else {
        document.body.style.background = 'url(backgrounds/cloud.png)';
    }
}

window.addEventListener("load", () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'abc508b46fmsh813f8910b29d2d8p14d034jsn6fe2aa7a93ff',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=33414&days=3`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            updateWeather(response);
        })
        .catch(err => console.error(err));
});
