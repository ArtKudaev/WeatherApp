const input = document.querySelector('.window__input-text');
const btnRequest = document.querySelector('.window__input-loop');

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
            console.log(data)
            document.querySelector('.city__name').innerHTML = data.name;
            document.querySelector('.city__celcium').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            let icon = data.weather[0].icon;
            document.querySelector('.city__weather-pic').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        }).catch((error) => {
            alert('УАХЬ!!!');
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
    const addedList = document.createElement('dl');
    addedList.className = 'added-locs__list';
    const addedLoc = createLocsLicst();
    addedList.append(addedLoc);
});

function createLocsLicst () {    
    const addedListItem = document.createElement('dt');
    addedListItem.className = 'added-locs__list-item';
    const addedCityName = document.querySelector('.city__name').innerHTML;
    addedListItem.textContent = addedCityName;

    const locDelBtn = document.createElement('button');
    locDelBtn.className = 'added-locs__delBtn';
    locDelBtn.type = 'image';
    locDelBtn.src = 'delBtn.png';

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
};