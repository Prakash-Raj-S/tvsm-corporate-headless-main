async function fetchLocationDetails(coordinates, tokenLatLong, fetchWithLatLong) {
  if (coordinates && tokenLatLong) {
    try {
      const { latitude, longitude } = coordinates;
      const url = fetchWithLatLong
        ? `https://api.latlong.in/v2/location_details.json?location=${latitude},${longitude}&access_token=${tokenLatLong}`
        : `https://api.latlong.in/v2/location_details.json?location=${coordinates}&access_token=${tokenLatLong}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch location details');
      }
      const data = await res.json();
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

      return data;
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  }
}

export default fetchLocationDetails;
