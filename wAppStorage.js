const KEY = 'favorite-cities';

export function saveFavoriteCities (favoriteArr) {
    localStorage.setItem(KEY, JSON.stringify(favoriteArr))
}

export function getFavoriteCities () {
    return JSON.parse(localStorage.getItem(KEY)) || []
}

export function getCurrentCity() {
    const favoriteCities = JSON.parse(localStorage.getItem(KEY));
    if (favoriteCities === null) {
        return
    }
    else{
        const currentCity = favoriteCities[favoriteCities.length - 1];
        return currentCity;
    }
}

/* let rrr = [data.list[0], data.list[1], data.list[2]];
        rrr.forEach(function(el) {
            let currentDateTime = el.dt;
            let currentDate = new Date(currentDateTime * 1000);
            let date = currentDate.getDate();
            let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            let month = months[currentDate.getMonth()];
            let datka = document.querySelectorAll('.daily-changes__data');
            datka.forEach(function(elem) {
                elem.innerHTML = `${date} ${month}`;
            });
            let hours = currentDate.getHours().toString().padStart(2, '0');
            let minutes = currentDate.getMinutes().toString().padStart(2, '0');
            let vremya = document.querySelectorAll('.daily-changes__time');
            vremya.forEach(function(elem) {
                elem.innerHTML = `${hours}:${minutes}`;
            });
            console.log(el);
        }) */
        /* let datka = document.querySelectorAll('.daily-changes__data');
        datka.forEach(function(elem) {
            elem.innerHTML = `${date} ${month}`;
        });
        let hours = currentDate.getHours().toString().padStart(2, '0');
        let minutes = currentDate.getMinutes().toString().padStart(2, '0');
        let vremya = document.querySelectorAll('.daily-changes__time');
        vremya.forEach(function(elem) {
            elem.innerHTML = `${hours}:${minutes}`;
        });          
        let tempa = document.querySelectorAll('.daily-changes__now');
        tempa.forEach(function(elem) {
            elem.innerHTML = `Temperature: ${Math.round(data.list[0].main.temp - 273) + '&deg'}`;
        });
        let feelsLikes = document.querySelectorAll('.daily-changes__feels-like');
        feelsLikes.forEach(function(elem) {
            elem.innerHTML = `Feels like: ${Math.round(data.list[0].main.feels_like - 273) + '&deg'}`;
        });
        let pogodka =  document.querySelectorAll('.daily-changes__precipitation-title');
        pogodka.forEach(function(elem) {
            elem.innerHTML = data.list[0].weather[0].main;
        });
        let picc = document.querySelectorAll('.daily-changes__precipitation-pic');
        picc.forEach(function(elem) {
            let icon = data.list[0].weather[0].icon;
            elem.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        }); */