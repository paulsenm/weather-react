
import getLocation from "../src/locationApi";
import getWeather from "./weatherApi";
getLocation(23232);
const testLocation = {lat: 44, lon: 123};
getWeather(testLocation);
function App() {
  return (
    <div>
      App
    </div>
  )
}

export default App;