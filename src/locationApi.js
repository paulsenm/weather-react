
import axios from 'axios';

const test = process.env.REACT_APP_TEST_VAR;
const test2 = process.env.REACT_APP_TEST_VAR2;
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
    console.log(response);
    return response;
} 

export default getLocation;