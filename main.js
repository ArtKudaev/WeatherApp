import {saveFavoriteCities, getFavoriteCities, getCurrentCity,} from './wAppStorage.js'
import { format } from 'date-fns';
//import { format } from './node_modules/date-fns/esm/index.js';
//import {addDataToForecastSection} from './forecast.js'

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

const form = document.querySelector('.window__input');
const btnRequest = document.querySelector('.window__input-loop');
const input = document.querySelector('.window__input-text');
const getCity = getCurrentCity();
let favoriteArr = [];

async function getWeatherData(cityName) {  
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;
    
    const responseRaw = await fetch(url);
    const response = await responseRaw.json();

    return response;
};
async function addDataToNowSection(inputCity) {
    try {
        const data = await getWeatherData(inputCity);

        const {
            name: name,
            main: {temp: temp},
            weather: {[0]:{icon: icon}}
        } = data;

        document.querySelector('.city__name').innerHTML = name;
        document.querySelector('.city__celcium').innerHTML = Math.round(temp - 273) + '&deg;';
        document.querySelector('.city__weather-pic').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

    } catch(e) {
        alert('alert(`Уахь: ${e.message}`);');
    };
};

async function addDataToDetailsSection(inputCity) {
    try {
        const data = await getWeatherData(inputCity);

        const {
            name,
            main: {
                temp,
                feels_like,
            },
            sys: {
                sunrise,
                sunset,
            },
            weather,
        } = data;

        document.querySelector('.city__name--detailed').innerHTML = name;
        document.querySelector('.temp').innerHTML = `Temperature: ${Math.round(temp - 273) + '&deg;'}`;
        document.querySelector('.feels-like').innerHTML = `Feels like: ${Math.round(feels_like - 273) + '&deg;'}`;
        document.querySelector('.weather-description').innerHTML = `Weather: ${weather[0].main}`;
        //let sunRise = sunrise;
        let sunRise = format(sunrise * 1000, 'HH:mm');
        //let sunriseTime = new Date(sunRise * 1000);
        //let riseHours = sunriseTime.getHours().toString().padStart(2, '0');
        //let riseMinutes = sunriseTime.getMinutes().toString().padStart(2, '0');
        document.querySelector('.sunrise').innerHTML = `Sunrise: ${sunRise}`;
        //let sunSet = sunset;
        let sunSet = format(sunset * 1000, 'HH:mm');
        //let sunsetTime = new Date(sunSet * 1000);
        //let setHours = sunsetTime.getHours().toString().padStart(2, '0');
        //let setMinutes = sunsetTime.getMinutes().toString().padStart(2, '0');
        document.querySelector('.sunset').innerHTML = `Sunset: ${sunSet}`;
    } catch(e) {
        alert(`Произошла ошибка: ${e.message}`);
    }
};

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    addDataToNowSection(input.value);
    addDataToDetailsSection(input.value);
    const importForecast = await import('./forecast.js');
    importForecast.addDataToForecastSection(input.value);
    //addDataToForecastSection(input.value);
});

btnRequest.addEventListener('click', async () => {
    addDataToNowSection(input.value);
    addDataToDetailsSection(input.value);
    const importForecast = await import('./forecast.js');
    importForecast.addDataToForecastSection(input.value);
    //addDataToForecastSection(input.value);
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