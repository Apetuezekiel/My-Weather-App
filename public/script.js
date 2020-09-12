const api ={ 
    key: "22d3c048e185f4570602d974506b733f",
    baseurl: "https://api.openweathermap.org/data/2.5/"
 };

 const locationElement = document.querySelector('.city-search');
 let city =document.querySelector('.location');
 let currentDay= new Date();
 let date= document.querySelector('.date');
 let iconElement = document.querySelector(".icon-container");
 let currentTemp =document.querySelector('.weather-status .temp');
 let stateOfTheWeather = document.querySelector('.weather-status .weather-state');
 let highLow = document.querySelector('.hi-lo');


locationElement.onfocus = function(){
    'use strict';
    if (this.placeholder === 'Enter Location'){
        this.placeholder = '';
    }
};
locationElement.onblur = function(){
    'use strict';
    if (this.placeholder === ''){
        this.placeholder = 'Enter Location';
    }
};
locationElement.addEventListener('keypress', setQuery);



function setQuery(evnt){
    if(evnt.keyCode == 13){
    showResults(locationElement.value);
    }
};
function showResults (qry){
    fetch(`${api.baseurl}weather?q=${qry}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
    console.log(showResults(qry));
    
    
     function createDate(d){
        let daysOfTheWeek = [ "Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];
        let MonthsOfTheYear = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
        let days= daysOfTheWeek[d.getDay()];
        let date = d.getDate();
        let month = MonthsOfTheYear[d.getMonth()];
        return `${days} ${date} ${month}`;
     }
     function displayResults(weather){ //attaching all the data to the HTML file
        console.log(weather);
        city.innerText = `${weather.name}, ${weather.sys.country}`;
        date.innerText = createDate(currentDay);
        iconElement.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;
        currentTemp.innerHTML = `${Math.round(weather.main.temp)}\xB0C`;
        stateOfTheWeather.innerText = weather.weather[0].main;
        highLow.innerText = `${Math.round(weather.main.temp_min)}\xB0C / ${ Math.round(weather.main.temp_max)}\xB0C`;
    } 
} 