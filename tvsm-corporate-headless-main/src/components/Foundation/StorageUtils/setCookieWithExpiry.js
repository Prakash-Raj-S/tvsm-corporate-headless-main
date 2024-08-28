// Function to set an item in cookie with expiry time
export default function setCookieWithExpiry(key, value, minutes) {
  const now = new Date();
  const expiryTime = now.getTime() + 60000 * minutes; // Convert minutes to milliseconds
  const expiryDate = new Date(expiryTime);

  // Encode the value so it can be safely stored in a cookie
  const encodedValue = encodeURIComponent(value);

  // Set the cookie with expiry
  document.cookie = `${key}=${encodedValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=None; Secure`;
}
