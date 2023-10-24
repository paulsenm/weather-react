function zipForm(){
    return(
        <div class="zip-form">
              <form id="zipForm">
                  <div class="flex-parent">
                    <label for="zipcode">Zip</label>
                    <input class="form-control"
                        type="input" id="zipcode" name="zipcode" 
                        value="" required
                    />
                    <button type="submit" class="btn btn-success"> Get the forcast!</button>
                </div>
              </form>
          </div>
    )
}