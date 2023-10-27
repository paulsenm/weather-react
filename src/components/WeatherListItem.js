

function WeatherListItem({onDayClick, index, forecastDay}) {


    const handleClick = () => {
        onDayClick(index);
    }

    return (
        <div>
            wx list item
        </div>
    )

}

export default WeatherListItem;