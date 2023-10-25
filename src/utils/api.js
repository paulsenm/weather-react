import axios from 'axios';

const OWM_KEY = process.env.REACT_APP_OWM_KEY;
const geoUrl = "http://api.openweathermap.org/geo/1.0/zip?"
const EXCLUDE = "minutely,alerts"; //This data isn't currently used in the app
const geoUrlOneCall = "https://api.openweathermap.org/data/3.0/onecall?";

export const getLocation = async (zipCode = 21212) => {
    const zip = zipCode + ",US";
    const response = await axios.get(geoUrl,
        {
            headers:{
            },
            params:{
                zip: zip,
                appid: OWM_KEY
            }
        }
    );
    const locationObj = {
        lat: response.data.lat,
        lon: response.data.lon,
        city: response.data.name
    }
    console.log("The loc object is: ", locationObj);
    console.log("the location response was: ", response);
    return locationObj;
} 

export const getWeather = async (location) => {
    const response = await axios.get(geoUrlOneCall,
        {
            headers:{
            },
            params:{
                lat: location.lat,
                lon: location.lon,
                exclude: EXCLUDE, 
                units: "imperial",
                appid: OWM_KEY
            }
        }
    );
    console.log("Wx obj from getWx: ",response );
    return response.data;
} 


export const getWxFromZip = async (zip) => {
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
