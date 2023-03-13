const SERVER_URL_FORECAST = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

function getForecastData(cityName) {  
    const url = (`${SERVER_URL_FORECAST}?q=${cityName}&cnt=5&appid=${API_KEY}`);
    console.log(url);
    return fetch(url).then(response => response.json());  
};
        
export function addDataToForecastSection(inputCity) {
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
};