import { getWeekday, getDate } from "../utils/dates";

function WeatherListItem({onDayClick, forecastDay, timeZoneOffset, index}) {
    console.log("The timezoneoffset was: ", timeZoneOffset);
    console.log("The forecastDay was: ", forecastDay);
    const date = getDate(forecastDay.dt, timeZoneOffset);
    console.log("Date is: ", date);
    const weekday = getWeekday(date);
    //const index = 0;

    const handleClick = (event) => {
        onDayClick(index, event);
    }

    return (
            <div className="weather-list-item" data-index={index} onClick={handleClick}>
                <h2>{date.getMonth() + 1} / {date.getDate()}</h2>
                <h3>{weekday}</h3>
                <h3>{forecastDay.temp.min.toFixed(1)}&deg;F &#124; {forecastDay.temp.max.toFixed(1)}&deg;F</h3>
            </div>
    )

}

export default WeatherListItem;