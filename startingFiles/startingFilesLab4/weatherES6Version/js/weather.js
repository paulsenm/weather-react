const regeneratorRuntime = require("regenerator-runtime");

import {getWeekday} from './dates';
import parseForecast from './weatherParsing';

// 5 day 3 hour increments as of winter 2023
// https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
// location to lat and lon
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59
  
class Weather {

  constructor() {
    this.state = {
      timezoneOffset: 0, 
      zipcode: "",
      city: {},
      forecast: [],
      selectedDate: null
    };

    this.weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&"
    this.geoUrl = "http://api.openweathermap.org/geo/1.0/zip?"
    this.apikey = "appid=e366707bc2ea3e949fb1c0a16ce76d59"

    this.$form = document.querySelector('#zipForm');
    this.$zipcode = document.querySelector('#zipcode');
    this.$weatherList = document.querySelector('#weatherList');
    this.$currentDay = document.querySelector('#currentDay');

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.$form.addEventListener("submit", this.onFormSubmit);
    this.renderWeatherList = this.renderWeatherList.bind(this);
    this.renderWeatherListItem = this.renderWeatherListItem.bind(this);
    this.addItemClickHandlers = this.addItemClickHandlers.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.state.zipcode = this.$zipcode.value;
    fetch(`${this.geoUrl}zip=${this.state.zipcode},US&${this.apikey}`)
      .then(response => response.json())
      .then(data => {
        this.state.city.name = data.name;
        this.state.city.lat = data.lat;
        this.state.city.lng = data.lon;
        fetch(`${this.weatherUrl}lat=${this.state.city.lat}&lon=${this.state.city.lng}&${this.apikey}`)
          .then(response => response.json())
          .then(data => {  
            this.state.timezoneOffset = data.city.timezone;
            console.log(data);
            // data.list is an array of 5 days of forecast info at 3 hour intervals
            // my function returns a list of 4 forecast objects
            this.state.forecast = parseForecast(data.list, this.state.timezoneOffset);
            this.$zipcode.value = "";
            this.renderWeatherList(this.state.forecast);
            this.clearCurrentDay();
            this.addItemClickHandlers();
          })
          .catch(error => {
            alert('There was a problem getting weather info!'); 
          });
      })
      .catch(error => {
        alert('There was a problem getting location information!')
      });
  }


  renderWeatherListItem(forecastDay, index) {
    const date = forecastDay.dt;
    const weekday = getWeekday(date);
   
   return `
    <div class="weather-list-item" data-index="${index}">
      <h2>${date.getMonth() + 1} / ${date.getDate()}</h2>
      <h3>${weekday}</h3>
      <h3>${forecastDay.minTemp.toFixed(1)}&deg;F &#124; ${forecastDay.maxTemp.toFixed(1)}&deg;F</h3>
    </div>
`;
  }

  renderWeatherList(forecast) {
    const itemsHTML = forecast.map((forecastDay, index) => this.renderWeatherListItem(forecastDay, index)).join('');
    this.$weatherList.innerHTML = 
      `<div class="weather-list flex-parent">
          ${itemsHTML}
      </div>`;
  }

  addItemClickHandlers() {
    const items = document.querySelectorAll('.weather-list-item');
    for (let i = 0; i < items.length; i++)
      items[i].onclick = this.renderCurrentDay.bind(this, i);
  }

  renderCurrentDay(index) {
    const city = this.state.city;
    const day = this.state.forecast[index];
    const date = day.dt;
    const weekday = getWeekday(date);

   const dayHTML = `
      <div class="current-day">
        <h1 class="day-header">${weekday} in ${city.name}</h1>
        <div class="weather">
        <p>
            <img src='http://openweathermap.org/img/w/${day.icon}.png' alt='${day.description}'/>
            ${day.description}
        </p>
      </div>
      <div class="details flex-parent">
        <div class="temperature-breakdown">
          <p>Morning Temperature: ${day.morningTemp}&deg;F</p>
          <p>Day Temperature: ${day.dayTemp}&deg;F</p>
          <p>Evening Temperature: ${day.eveningTemp}&deg;F</p>
          <p>Night Temperature: ${day.nightTemp}&deg;F</p>
        </div>
        <div class="misc-details">
          <p>Atmospheric Pressure: ${day.pressure} hPa</p>
          <p>Humidity: ${day.humidity}%</p>
          <p>Wind Speed: ${day.wind} mph</p>
        </div>
      </div>
    </div>
    `;
    this.$currentDay.innerHTML = dayHTML;
  }

  clearCurrentDay() {
    this.$currentDay.innerHTML = "";
  }
}

window.addEventListener("load", () => new Weather());

