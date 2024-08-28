// Function to get an item from cookie with expiry time validation
export default function getCookieWithExpiry(key) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});

  const itemStr = cookies[key];
  if (!itemStr) {
    return null;
  }
  const item = itemStr;
  const now = new Date();
  if (now.getTime() > item.expiry) {
    // Remove expired cookie by setting expiry date to past
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    return null;
  }
  return item.value;
}
