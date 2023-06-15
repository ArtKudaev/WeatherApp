import {saveFavoriteCities, getFavoriteCities, getCurrentCity, setCookie, getCookie} from './wAppStorage.js'
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
        let sunRise = format(sunrise * 1000, 'HH:mm');
        document.querySelector('.sunrise').innerHTML = `Sunrise: ${sunRise}`;
        let sunSet = format(sunset * 1000, 'HH:mm');
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

setCookie('saveLocationCookie', getCurrentCity(), {
    secure: true,
    'max-age': 3600
});

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
    else if (addDataToNowSection(getCookie('saveLocationCookie')));
    else if (addDataToDetailsSection(getCookie('saveLocationCookie')));
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