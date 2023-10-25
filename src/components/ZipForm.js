import { useState } from "react";
import CurrentDay from "./CurrentDay";

function ZipForm({onSubmit, weatherData, locationObj}){
    const [zipcode, setZipcode] = useState(21212);

    const handleChange = (event) => {
        console.log("Event target value was: ", event.target.value);
        setZipcode(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(zipcode);
    }

    return(
        <div className="zip-form">
              <form id="zipForm" onSubmit={handleSubmit} >
                  <div className="flex-parent">
                    <label htmlFor="zipcode">Zip</label>
                    <input className="form-control"
                        onChange={handleChange}
                        type="input" id="zipcode" name="zipcode" 
                        value={zipcode} required
                    />
                    <button type="submit" className="btn btn-success" > Get the forcast!</button>
                </div>
              </form>
          </div>
          
    )
}

export default ZipForm;