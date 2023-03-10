import {saveFavoriteCities, getFavoriteCities, getCurrentCity,} from './wAppStorage.js'
import {addDataToForecastSection} from './forecast.js'

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

const form = document.querySelector('.window__input');
const btnRequest = document.querySelector('.window__input-loop');
const input = document.querySelector('.window__input-text');
const getCity = getCurrentCity();
let favoriteArr = [];

function getWeatherData(cityName) {  
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;
    
    return fetch(url).then(response => response.json());  
} 
function addDataToNowSection(inputCity) {
    getWeatherData(inputCity).then(data => { 
        document.querySelector('.city__name').innerHTML = data.name;
        document.querySelector('.city__celcium').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        let icon = data.weather[0].icon;
        document.querySelector('.city__weather-pic').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
    }).catch((error) => {
        alert('UPS...');
    })
}

function addDataToDetailsSection(inputCity) {
    getWeatherData(inputCity).then(data => { 
        document.querySelector('.city__name--detailed').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = `Temperature: ${Math.round(data.main.temp - 273) + '&deg;'}`;
        document.querySelector('.feels-like').innerHTML = `Feels like: ${Math.round(data.main.feels_like - 273) + '&deg;'}`;
        document.querySelector('.weather-description').innerHTML = `Weather: ${data.weather[0].main}`;
        let sunRise = data.sys.sunrise;
        let sunriseTime = new Date(sunRise * 1000);
        let riseHours = sunriseTime.getHours().toString().padStart(2, '0');
        let riseMinutes = sunriseTime.getMinutes().toString().padStart(2, '0');
        document.querySelector('.sunrise').innerHTML = `Sunrise: ${riseHours}:${riseMinutes}`;
        let sunSet = data.sys.sunset;
        let sunsetTime = new Date(sunSet * 1000);
        let setHours = sunsetTime.getHours().toString().padStart(2, '0');
        let setMinutes = sunsetTime.getMinutes().toString().padStart(2, '0');
        document.querySelector('.sunset').innerHTML = `Sunset: ${setHours}:${setMinutes}`;
    }).catch((error) => {
        alert('UPS...');
    })
}

form.addEventListener('submit', e => {
    e.preventDefault();
    
    addDataToNowSection(input.value);
    addDataToDetailsSection(input.value);
    addDataToForecastSection(input.value);
});

btnRequest.addEventListener('click', () => {
    addDataToNowSection(input.value);
    addDataToDetailsSection(input.value);
    addDataToForecastSection(input.value);
    }
);

const addButton = document.querySelector('.city__add-button');

addButton.addEventListener ('click', () => {
    const addedLoc = createLocsLicst();
    const addedList = document.querySelector('.added-locs__list');
    addedList.append(addedLoc);

    favoriteArr.push(input.value);
    saveFavoriteCities(favoriteArr);
});

function createLocsLicst (cityName) {    
    const addedListItem = document.createElement('dt');
    addedListItem.className = 'added-locs__list-item';

    let addedCityName;
    if(cityName) {
         addedCityName = cityName;
    } else {
        addedCityName = document.querySelector('.city__name').innerHTML;
    }
    addedListItem.textContent = addedCityName;
    
    addedListItem.addEventListener('click', () => {
        addDataToNowSection(addedCityName);
        addDataToDetailsSection(addedCityName);
        addDataToForecastSection(addedCityName);
    }
);

    const locDelBtn = document.createElement('input');
    locDelBtn.className = 'added-locs__delBtn';
    locDelBtn.type = 'image';
    locDelBtn.src = 'img/delBtn.png';

    locDelBtn.addEventListener('click', (e) => {
        deleteAddedLoc(e.target);
    });

    const addedLoc = document.createElement('div');
    addedLoc.className = 'added-locs__item-block';

    addedLoc.append(addedListItem, locDelBtn);
    
    return addedLoc;
};

function deleteAddedLoc (target) {
    const addedList = target.closest('.added-locs__list');
    const addedLoc = target.closest('.added-locs__item-block');  
    addedList.removeChild(addedLoc);

    const city = target.previousElementSibling.textContent;
    favoriteArr.forEach((item, index) => {
        if(item.toLowerCase() === city.toLowerCase()) {
            favoriteArr.splice(index, 1)
        }
    })
    
    saveFavoriteCities(favoriteArr);
};

window.addEventListener('load', () => {
    const cities = getFavoriteCities();
    favoriteArr = cities;
    if(cities && cities.length) {
        cities.forEach(item => {
            const addedLoc = createLocsLicst(item);
            const addedList = document.querySelector('.added-locs__list');
            addedList.append(addedLoc);
        })
    }
    if(getCity === undefined) return
    else if (addDataToNowSection(getCity));
    else if (addDataToDetailsSection(getCity));
})

const activeButton = document.querySelectorAll('.city__details-button');
const activeContent = document.querySelectorAll('.city__temperature');

activeButton.forEach(function(elem) {
    elem.addEventListener ('click', activeTab);
});

function activeTab() {
    activeButton.forEach(function(elem){
        elem.classList.remove('active');
    })
    this.classList.add('active');
    let tabName = this.getAttribute('data-tab');

    activeTabContent(tabName);
}

function activeTabContent(tabName) {
    activeContent.forEach(function(item) {
        item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
    })
}


/* const SERVER_URL_FORECAST = 'http://api.openweathermap.org/data/2.5/forecast'

function getForecastData(cityName) {  
    const url = (`${SERVER_URL_FORECAST}?q=${cityName}&cnt=5&appid=${API_KEY}`);
    console.log(url);
    return fetch(url).then(response => response.json());  
};
        
function addDataToForecastSection(inputCity) {
    getForecastData(inputCity).then(data => { 
        document.querySelector('.city-for-forecast').innerHTML = data.city.name;
        // First period
        let currentDateTime0 = data.list[0].dt;
        let currentDate0 = new Date(currentDateTime0 * 1000);
        let date0 = currentDate0.getDate();
        let months0 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let month0 = months0[currentDate0.getMonth()];
        document.querySelector('.data0').innerHTML = `${date0} ${month0}`;
        let hours0 = currentDate0.getHours().toString().padStart(2, '0');
        let minutes0 = currentDate0.getMinutes().toString().padStart(2, '0');
        document.querySelector('.time0').innerHTML = `${hours0}:${minutes0}`;
        document.querySelector('.now0').innerHTML = `Temperature: ${Math.round(data.list[0].main.temp - 273) + '&deg'}`;
        document.querySelector('.feels-like0').innerHTML = `Feels like: ${Math.round(data.list[0].main.feels_like - 273) + '&deg'}`;
        document.querySelector('.title0').innerHTML = data.list[0].weather[0].main;
        let icon0 = data.list[0].weather[0].icon;
        document.querySelector('.pic0').src = 'http://openweathermap.org/img/wn/' + icon0 + '@2x.png';
        // Second period
        let currentDateTime1 = data.list[1].dt;
        let currentDate1 = new Date(currentDateTime1 * 1000);
        let date1 = currentDate1.getDate();
        let months1 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let month1 = months1[currentDate1.getMonth()];
        document.querySelector('.data1').innerHTML = `${date1} ${month1}`;
        let hours1 = currentDate1.getHours().toString().padStart(2, '0');
        let minutes1 = currentDate1.getMinutes().toString().padStart(2, '0');
        document.querySelector('.time1').innerHTML = `${hours1}:${minutes1}`;
        document.querySelector('.now1').innerHTML = `Temperature: ${Math.round(data.list[1].main.temp - 273) + '&deg'}`;
        document.querySelector('.feels-like1').innerHTML = `Feels like: ${Math.round(data.list[1].main.feels_like - 273) + '&deg'}`;
        document.querySelector('.title1').innerHTML = data.list[1].weather[0].main;
        let icon1 = data.list[1].weather[0].icon;
        document.querySelector('.pic1').src = 'http://openweathermap.org/img/wn/' + icon1 + '@2x.png';
        // Third period
        let currentDateTime2 = data.list[2].dt;
        let currentDate2 = new Date(currentDateTime2 * 1000);
        let date2 = currentDate2.getDate();
        let months2 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let month2 = months2[currentDate2.getMonth()];
        document.querySelector('.data2').innerHTML = `${date2} ${month2}`;
        let hours2 = currentDate2.getHours().toString().padStart(2, '0');
        let minutes2 = currentDate2.getMinutes().toString().padStart(2, '0');
        document.querySelector('.time2').innerHTML = `${hours2}:${minutes2}`;
        document.querySelector('.now2').innerHTML = `Temperature: ${Math.round(data.list[2].main.temp - 273) + '&deg'}`;
        document.querySelector('.feels-like2').innerHTML = `Feels like: ${Math.round(data.list[2].main.feels_like - 273) + '&deg'}`;
        document.querySelector('.title2').innerHTML = data.list[2].weather[0].main;
        let icon2 = data.list[2].weather[0].icon;
        document.querySelector('.pic2').src = 'http://openweathermap.org/img/wn/' + icon2 + '@2x.png';        
    }).catch((error) => {
        alert('WHAAT?');
    })
}; */