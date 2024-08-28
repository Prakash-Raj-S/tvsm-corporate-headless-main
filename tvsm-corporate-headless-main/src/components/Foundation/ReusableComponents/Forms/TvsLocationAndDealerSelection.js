import React, { useEffect, useState } from 'react';
import useLatLongToken from '../../Geolocation/useLatLongToken';
import useCurrentLocation from '../../Geolocation/useCurrentLocation';
import fetchLocationDetails from '../../Geolocation/fetchLocationDetails';
import fetchDealerDetails from '../../Geolocation/fetchDealerDetails';
import useUtmParams from '../../Utm/useUtmParams';
import { FaLocationCrosshairs } from 'react-icons/fa6';

function TvsLocationAndDealerSelection({
  onLocationChange,
  onLocationError,
  onDealerChange,
  onDealerError,
  dealer,
  setDealer,
  errorMessageLocation,
  errorMessageDealer,
  formSubmitted,
}) {
  const [location, setLocation] = useState('');
  const [touched, setTouched] = useState(false);

  const tokenLatLong = useLatLongToken();
  // const [dealer, setDealer] = useState({});
  const [stores, setStores] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;

    if (newLocation.length >= 3) {
      console.log('fetching suggestions');
      console.log(newLocation + tokenLatLong);
      setShowSuggestions(true);
      fetch(
        `https://api.latlong.in/v2/autocomplete.json?query=${newLocation}&access_token=${tokenLatLong}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => console.error(error));
    }

    setLocation(newLocation);
    onLocationChange(newLocation);

    if (!newLocation) {
      onLocationError('Location is required');
    } else {
      onLocationError(null);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    // Call fetchLocationDetails with the selected suggestion's coordinates
    console.log('suggestion clicked');
    console.log(suggestion);
    setLocation(suggestion.name);
    const data = await fetchLocationDetails(suggestion.geo, tokenLatLong, false);
    console.log(data);

    const dealerDetails = await fetchDealerDetails(data.pincode, tokenLatLong, 'default');

    if (!dealerDetails) {
      onDealerError('Dealer is required');
    } else {
      console.log(dealerDetails);

      if (dealerDetails.stores && dealerDetails.stores.length > 0) {
        setStores(dealerDetails.stores);
        // setDealer(dealerDetails.stores[0].wp_name);
        setDealer(dealerDetails.stores[0]);
      }
      onDealerError(null);
    }
    // setForm({ ...form, location: suggestion.name });
  };
  const handleDealerChange = (event) => {
    const selectedDealerName = event.target.value;

    // Assuming dealers is an array of dealer objects and each dealer has a name property
    const selectedDealer = stores.find((dealer) => dealer.wp_name === selectedDealerName);
    console.log('selected');
    console.log(selectedDealer);

    setDealer(selectedDealer);
  };

  const handleDetectClick = async () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          const data = await fetchLocationDetails(coordinates, tokenLatLong, true);
          console.log('detected location');
          console.log(data);

          const dealerDetails = await fetchDealerDetails(data.pincode, tokenLatLong, 'default');
          console.log(dealerDetails);

          if (dealerDetails.stores && dealerDetails.stores.length > 0) {
            setStores(dealerDetails.stores);
            setDealer(dealerDetails.stores[0]);
            setLocation(data.pincode);
          }

          // setForm({ ...form, location: data.pincode });
        },
        (error) => {
          console.log('Unable to retrieve your location');
        }
      );
    }
  };

  /*
  useEffect(() => {
    if (form.location.length >= 3) {
      fetch(
        `https://api.latlong.in/v2/autocomplete.json?query=${form.location}&access_token=${tokenLatLong}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          debugger;
        })
        .catch((error) => console.error(error));
    }
  }, [form.location]);
  */

  return (
    <>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <a onClick={() => handleDetectClick()}>
          <FaLocationCrosshairs
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </a>
        <div style={{ position: 'relative', display: 'inline-block' }}></div>
        <button type="button" onClick={() => handleDetectClick()}>
          Detect
        </button>
        {showSuggestions && suggestions && suggestions.data && (
          <div className="suggestions">
            {suggestions.data.map((suggestion) => (
              <div key={suggestion.geo} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
        {(formSubmitted || touched) && errorMessageLocation && <p>{errorMessageLocation}</p>}
      </label>
      <label>
        Dealer:
        {dealer ? (
          <select value={dealer.wp_name} onChange={handleDealerChange}>
            {stores.map((store) => (
              <option key={store.id} value={store.wp_name}>
                <strong>{store.wp_name}</strong>
                <h3>{store.address}</h3>
              </option>
            ))}
          </select>
        ) : (
          <select disabled>
            <option value="">Select</option>
          </select>
        )}
        {(formSubmitted || touched) && errorMessageDealer && <p>{errorMessageDealer}</p>}
      </label>
    </>
  );
}

export default TvsLocationAndDealerSelection;
