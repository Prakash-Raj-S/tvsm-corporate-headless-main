import { useEffect, useState } from 'react';
import getCookieWithExpiry from '../StorageUtils/getCookieWithExpiry';
import setCookieWithExpiry from '../StorageUtils/setCookieWithExpiry';

function useLatLongToken() {
  const [tokenLatLong, setTokenLatLong] = useState(null);

  useEffect(() => {
    const fetchLatLongToken = async () => {
      let tokenLatLongFromCookie = getCookieWithExpiry('tokenLatLong');

      if (!tokenLatLongFromCookie) {
        try {
          const response = await fetch('https://api.latlong.in/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'client_credentials',
              client_id: 'bd2c1166e2275cd651b256fcee41486aacf3bcdaad98eb13947d70314e10d223',
              client_secret: 'b7ec91eb8b89b43df70d73afe0b5be78bbbf743dee65c2c04a15d58bf8040036',
            }),
          });

          if (response.ok) {
            const data = await response.json();
            tokenLatLongFromCookie = data.access_token;
            setCookieWithExpiry('tokenLatLong', tokenLatLongFromCookie, 55);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }

      setTokenLatLong(tokenLatLongFromCookie);
    };

    fetchLatLongToken();
  }, []);

  return tokenLatLong;
}

export default useLatLongToken;
