import WeatherListItem from "./WeatherListItem"

function WeatherList({forecast, onDayClick}) {
    const wxDailyArray = forecast.daily;
    return (
        <div id="weatherList" className="weather-list flex-parent">
            {
                wxDailyArray.map((forecastDay, index ) => (
                    <WeatherListItem
                        key={forecastDay.dt}
                        index={index}
                        forecastDay={wxDailyArray[index]}
                        onDayClick={onDayClick}
                        timeZoneOffset={forecast.timezone_offset}
                    />
                ))
            }
        </div>
    )
}

export default WeatherList;