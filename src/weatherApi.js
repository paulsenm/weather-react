
import axios from 'axios';

const OWM_KEY = process.env.REACT_APP_OWM_KEY;
const EXCLUDE = "minutely,alerts"; //This data isn't currently used in the app

//const geoUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const geoUrlOneCall = "https://api.openweathermap.org/data/3.0/onecall?";


const getWeather = async (location) => {
    const response = await axios.get(geoUrlOneCall,
        {
            headers:{
            },
            params:{
                lat: location.lat,
                lon: location.lon,
                exclude: EXCLUDE, 
                appid: OWM_KEY
            }
        }
    );
    const locationObj = {
        lat: location.lat,
        lon: location.lon,
        cityName: location.name
    }
    console.log(locationObj);
    return locationObj;
} 

export default getWeather;