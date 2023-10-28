import { getWeekday, getDate } from "../utils/dates";

function WeatherListItem({onDayClick, forecastDay, timeZoneOffset, index}) {
    const date = getDate(forecastDay.dt, timeZoneOffset);
    const weekday = getWeekday(date);
    const icon = forecastDay.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
    //const index = 0;

    const handleClick = (event) => {
        onDayClick(index, event);
    }

    return (
            <div className="weather-list-item" data-index={index} onClick={handleClick}>
                <p>
                    <img src={iconUrl} alt={forecastDay.description}/>
                    {forecastDay.description}
               </p>
                <h2>{date.getMonth() + 1} / {date.getDate()}</h2>
                <h3>{weekday}</h3>
                <h3>{forecastDay.temp.min.toFixed(1)}&deg;F &#124; {forecastDay.temp.max.toFixed(1)}&deg;F</h3>
            </div>
    )

}

export default WeatherListItem;