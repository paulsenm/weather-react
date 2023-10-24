import { useState } from "react";


import {getWxFromZip, getLocation, getWeather} from "./utils/api";
// getWxFromZip(21212);
import ZipForm from "./components/ZipForm";
import CurrentDay from "./components/CurrentDay";

const defaultZip = 21212;


async function App() {
  //const [weatherObj, setWeatherObj] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [locationObj, setLocationObj] = useState(null);
  const defaultLocResp = await getLocation(defaultZip);
  const defaultWxResp = await getWeather(defaultLocResp);
  // setLocationObj(defaultLocResp);
  // setWeatherData(defaultWxResp);

  const handleSubmit = async (zipCode) => {
    try{
      console.log("Zip code passed into app() was: ", zipCode);
      //weatherObj = getWxFromZip(zipCode);
      const locationResponse = await getLocation(zipCode);
      const weatherResponse = await getWeather(locationResponse.data);

      setLocationObj(locationResponse);
      setWeatherData(weatherResponse);
      console.log("Wx data from app: ", weatherResponse);
    } 
    catch(error){
      if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
          // request never left
          console.log(error.request);
          }
          else {
          // anything else
          console.log(error.message);
          }
      }
    }
  
  return (
    <div>
      <ZipForm onSubmit={handleSubmit}/>
      <CurrentDay weatherData={ weatherData} locationObj={locationObj} />
    </div>
  )
}

export default App;