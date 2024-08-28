import React, { useEffect, useState } from 'react';
import getCookieWithExpiry from '../StorageUtils/getCookieWithExpiry'; // Ensure correct path
import useLatLongToken from './useLatLongToken';

const CurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const tokenLatLong = useLatLongToken();

  useEffect(() => {
    const storedLocation = getCookieWithExpiry('userLocation');
    if (storedLocation) {
      setCurrentLocation(JSON.parse(storedLocation));
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setCoordinates({ latitude, longitude });
        });
      }
    }
  }, []); // Empty dependency array, runs once on mount

  async function fetchData() {
    if (coordinates && !currentLocation && tokenLatLong) {
      try {
        const { latitude, longitude } = coordinates;
        const res = await fetch(
          `https://api.latlong.in/v2/location_details.json?location=${latitude},${longitude}&access_token=${tokenLatLong}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch location details');
        }
        const data = await res.json();
        setCurrentLocation(data);
        document.cookie = `userLocation=${JSON.stringify(data)}; path=/;`;

        // Call another API after the first one is successful
        try {
          const response2 = await fetch(
            `/api/Headless/SetCookie?key=userLocation&value=${JSON.stringify(data)}&duration=55`,
            {
              method: 'GET', // or 'GET', depending on the API requirements
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        } catch (error) {
          console.error('Error fetching API data:', error);
        }
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [coordinates, currentLocation, tokenLatLong]); // Include tokenLatLong as dependency

  return (
    <div>
      {currentLocation && (
        <div>
          <h1>{currentLocation.city}</h1>
          <h2>{currentLocation.pincode}</h2>
          <h3>{currentLocation.state}</h3>
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
