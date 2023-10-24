
//import getWxFromZip from "./utils/api";
import { getWeekday, getDate } from "../utils/dates";

// function renderCurrentDay(index) {
//     const city = this.state.city;
//     const day = this.state.forecast[index];
//     const date = day.dt;
//     const weekday = getWeekday(date);

//   }

function CurrentDay({weatherData, locationObj}){
    console.log("Wxdata: ", weatherData);
    const day = weatherData.current;
    const date = day.dt;
    const weekday = getWeekday(date);
    const city = locationObj.name;
    const iconUrl = "http://openweathermap.org/img/w/" + day.icon + ".png";
    return(
        <div class="current-day">
        <h1 class="day-header">{weekday} in {city.name}</h1>
        <div class="weather">
        <p>
            <img src={iconUrl} alt={day.description}/>
            {day.description}
        </p>
      </div>
      <div class="details flex-parent">
        <div class="temperature-breakdown">
          <p>Morning Temperature: {day.morningTemp}&deg;F</p>
          <p>Day Temperature: {day.dayTemp}&deg;F</p>
          <p>Evening Temperature: {day.eveningTemp}&deg;F</p>
          <p>Night Temperature: {day.nightTemp}&deg;F</p>
        </div>
        <div class="misc-details">
          <p>Atmospheric Pressure: {day.pressure} hPa</p>
          <p>Humidity: {day.humidity}%</p>
          <p>Wind Speed: {day.wind} mph</p>
        </div>
      </div>
    </div>
    )
}

export default CurrentDay;