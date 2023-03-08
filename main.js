import {saveFavoriteCities, getFavoriteCities, getCurrentCity} from './wAppStorage.js'

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

const form = document.querySelector('.window__input');
const btnRequest = document.querySelector('.window__input-loop');
const input = document.querySelector('.window__input-text');
const tata = getCurrentCity();
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
        
form.addEventListener('submit', e => {
    e.preventDefault();
    
    addDataToNowSection(input.value);
});

btnRequest.addEventListener('click', () => {
    addDataToNowSection(input.value)
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
    if(tata === undefined) return
    else addDataToNowSection(tata);
})

const activeButton = document.querySelectorAll('.city__details-button');
const activeContent = document.querySelectorAll('.city__temperature');

activeButton.forEach(function(elem) {
    elem.addEventListener ('click', activeTab);
})

function activeTab() {
    activeButton.forEach(function(elem){
        elem.classList.remove('active');
    })
    this.classList.add('active');
    let tabName = this.getAttribute('data-tab');

    activeTavContent(tabName);
}

function activeTavContent(tabName) {
    activeContent.forEach(function(item) {
        item.classList.contains('tabName') ? item.classList.add('active') : item.classList.remove('active');
    })
}






/* activeButton.forEach(function(button) {
    button.addEventListener ('click', () => {
        let currentButton = button;
        
        activeButton.forEach(function(button) {
        button.classList.remove('active');
        });

        currentButton.classList.add('active');
    });
}); */

