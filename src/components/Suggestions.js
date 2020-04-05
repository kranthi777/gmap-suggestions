import React,{useEffect} from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Geocode from "react-geocode";

// set Google Maps Geocoding API.
Geocode.setApiKey("AIzaSyAJLPYT-hAwJSgYfjAhlFL3qSxAE3pn6cw");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");
 
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();

export default function Suggestions(props) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });


  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    let place = results[0];
    postHandleSelect(place, latLng);
  };

  const postHandleSelect = (place, latLng) => {
    let length = place.address_components.length;
    let address = {
      id: (place.geometry && place.place_id || ''),
      name: (place.address_components[0] && place.address_components[0].short_name || ''),
      line1: (place.address_components[1] && place.address_components[1].short_name || ''),
      line2: (place.address_components[1] && place.address_components[1].short_name || ''),
      city: (place.address_components[length-4] && place.address_components[length-4].short_name || ''),
      state: (place.address_components[length-3] && place.address_components[length-3].long_name || ''),
      postalCode: (place.address_components[length-1] && place.address_components[length-1].short_name || ''),
      landmark: (place.address_components[1] && place.address_components[1].short_name || ''),
      addressType: 'Other'
    };
    setAddress(place.formatted_address);
    setCoordinates(latLng);
    props.setPopulateAddress(address);
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  
  const showPosition = (position) => {
    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
      response => {
        const address = response.results[0];
        postHandleSelect(address, {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  return (
    <div className="col-sm-12">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div>
              <hr/>
              <h6>Add a New Address</h6>
              <div className="input-group">
                <input type="text" id="location" {...getInputProps({ placeholder: "Enter Area / Locality" })} className="form-control input-lg" placeholder="Enter Area / Locality" name="search"/>
                <div className="input-group-btn">
                  <button className="btn btn-primary btn-locate" onClick={()=>getLocation()}>Locate Me</button>
                </div>
              </div>
            </div>

            <div className="list-group">
              {loading ? <div>...loading</div> : null}
              
              {suggestions.map(suggestion => {
                const style = {
                  color: suggestion.active ? "red" : "blue"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    <a className="list-group-item">{suggestion.description}</a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}