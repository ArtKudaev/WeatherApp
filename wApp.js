const input = document.querySelector('.window__input-text');
const btnRequest = document.querySelector('.window__input-loop');

input.addEventListener('keyup', e => {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const cityName = input.value;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    
    if (e.keyCode === 13) {
        
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                console.log("ERROR")
                throw Error
            }
        })
        .then(data => { 
            console.log(data)
            document.querySelector('.city__name').innerHTML = data.name;
            document.querySelector('.city__celcium').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.city__weather-pic').innerHTML = data.weather[0]['icon'];
        }).catch(error => {
            console.log(error)
        })
        }
});

btnRequest.addEventListener('click', () => {
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
                console.log("ERROR")
                throw Error
            }
        })
        .then(data => { 
            console.log(data)
            document.querySelector('.city__name').innerHTML = data.name;
            document.querySelector('.city__celcium').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.city__weather-pic').innerHTML = data.weather[0]['icon'];
        }).catch(error => {
            console.log(error)
        })
        }
);