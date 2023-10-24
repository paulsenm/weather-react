
import axios from 'axios';

const OWM_KEY = process.env.REACT_APP_OWM_KEY;
//import axiosKey from './apiKeys';

//const envKey = 
const geoUrl = "http://api.openweathermap.org/geo/1.0/zip?"



const getLocation = async (zipCode = 21212) => {
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
        lon: response.data.lon
    }
    console.log("The loc object is: ", locationObj);
    return response;
} 

export default getLocation;