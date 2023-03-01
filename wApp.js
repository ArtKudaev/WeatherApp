import {setCitiesToLS, getCitiesFromLS} from './wAppStorage.js'

const input = document.querySelector('.window__input-text');
const btnRequest = document.querySelector('.window__input-loop');
let favoriteArr = [];


function fetchRequest () {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const cityName = input.value;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    
    if (cityName === '') return;
    
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log("ERROR");
                throw Error
            }
        })
        .then(data => { 
            document.querySelector('.city__name').innerHTML = data.name;
            document.querySelector('.city__celcium').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            let icon = data.weather[0].icon;
            document.querySelector('.city__weather-pic').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        }).catch((error) => {
            alert('UPS...');
        })
}

input.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        fetchRequest ()
    }
});

btnRequest.addEventListener('click', () => {
        fetchRequest ()
    }
);

const addButton = document.querySelector('.city__add-button');

addButton.addEventListener ('click', () => {
    const addedLoc = createLocsLicst();
    const addedList = document.querySelector('.added-locs__list');
    addedList.append(addedLoc);

    favoriteArr.push(input.value);
    setCitiesToLS(favoriteArr);
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

    function addCityToNow () {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const cityName = addedListItem.innerText;
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
               
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    console.log("ERROR");
                    throw Error
                }
            })
            .then(data => { 
                document.querySelector('.city__name').innerHTML = data.name;
                document.querySelector('.city__celcium').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
                let icon = data.weather[0].icon;
                document.querySelector('.city__weather-pic').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                const localStore = data;
                localStorage.setItem('fromLocStore', JSON.stringify(localStore));
            }).catch((error) => {
                alert('UPS..');
            })
    }

    addedListItem.addEventListener('click', () => {
        addCityToNow();
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
    
    setCitiesToLS(favoriteArr);
};

window.addEventListener('load', () => {
    const cities = getCitiesFromLS();
    favoriteArr = cities;
    if(cities && cities.length) {
        cities.forEach(item => {
            const addedLoc = createLocsLicst(item);
            const addedList = document.querySelector('.added-locs__list');
            addedList.append(addedLoc);
        })
    }
})

