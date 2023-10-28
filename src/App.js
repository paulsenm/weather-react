import { useState } from "react";


import { getLocation, getWeather} from "./utils/api";
// getWxFromZip(21212);
import ZipForm from "./components/ZipForm";
import CurrentDay from "./components/CurrentDay";
import WeatherList from "./components/WeatherList";




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
    //let index = event.target.getAttribute("data-index");
    console.log("Index from handleClick was: ", index);
    setSelectedDay(index);
  }
  
  return (
    <div id="app-container">
      <ZipForm onSubmit={handleSubmit} weatherData={weatherData} locationObj={locationObj}/>
      {zipFormSubmitted && <CurrentDay weatherData={ weatherData} locationObj={locationObj} index={selectedDay} /> }
      {zipFormSubmitted && < WeatherList forecast={weatherData} onDayClick={handleDayClick} />}
    </div>
  );
}

export default App;