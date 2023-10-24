
// import axios from 'axios';

import getLocation from '../locationApi';
import getWeather from '../weatherApi';


function getWxFromZip(zip){
    getLocation(zip)
        .then((location) => {
            return getWeather(location.data);
        }
    )
    .then(
        (weatherData) => {
            console.log(weatherData);
            return weatherData;
        }
    )
}

export default getWxFromZip;