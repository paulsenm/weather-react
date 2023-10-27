import { useState } from "react";


import {getWxFromZip, getLocation, getWeather} from "./utils/api";
// getWxFromZip(21212);
import ZipForm from "./components/ZipForm";
import CurrentDay from "./components/CurrentDay";
import WeatherListItem from './components/WeatherListItem';

const defaultZip = 21212;


function App(){   //const [weatherObj, setWeatherObj] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [locationObj, setLocationObj] = useState(null);
  const [zipFormSubmitted, setZipFormSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleSubmit = async (zipCode = 21212) => {
    try{
        getLocation(zipCode)
          .then(
            (location) => {
              console.log("From App.HandleSubmit.location: ", location);
              setLocationObj(location);
              return getWeather(location);
            }
          )
          .then(
            (weatherDataResponse) => {
              console.log("Weather data was:: ", weatherDataResponse);
              setWeatherData(weatherDataResponse);
              return weatherDataResponse;
            }
          )
          .then(
            (wxDa) => {
              if(wxDa != null){
                setZipFormSubmitted(true)
              }
            }
          )
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

  const handleDayClick = (index) => {
    setSelectedDay(index);
  }
  
  return (
    <div id="app-container">
      <ZipForm onSubmit={handleSubmit} weatherData={weatherData} locationObj={locationObj}/>
      {zipFormSubmitted && <CurrentDay weatherData={ weatherData} locationObj={locationObj} /> }
      {zipFormSubmitted && < WeatherListItem forecastDay={weatherData.daily[0]} />}
    </div>
  );
}

export default App;