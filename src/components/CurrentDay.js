
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
    const day = weatherData.daily[0];
    const timezoneOffset = weatherData.timezone_offset;
    const date = getDate(day.dt, timezoneOffset);
    const weekday = getWeekday(date);
    const city = locationObj.city;
    const icon = day.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    return(
        <div className="current-day">
        <h1 className="day-header">{weekday} in {city}</h1>
        <div className="weather">
        <p>
            <img src={iconUrl} alt={day.description}/>
            {day.description}
        </p>
      </div>
      <div className="details flex-parent">
        <div className="temperature-breakdown">
          <p>Morning Temperature: {day.temp.morn}&deg;F</p>
          <p>Day Temperature: {day.temp.day}&deg;F</p>
          <p>Evening Temperature: {day.temp.eve}&deg;F</p>
          <p>Night Temperature: {day.temp.night}&deg;F</p>
        </div>
        <div className="misc-details">
          <p>Atmospheric Pressure: {day.pressure} hPa</p>
          <p>Humidity: {day.humidity}%</p>
          <p>Wind Speed: {day.wind_speed} mph</p>
        </div>
      </div>
    </div>
    )
}

export default CurrentDay;