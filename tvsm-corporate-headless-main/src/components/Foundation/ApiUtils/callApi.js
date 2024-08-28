async function callApi(request) {
  try {
    // Make a request to the API endpoint
    const response = await fetch(request.url, {
      method: request.method || 'GET',
      headers: request.headers || {},
      body: request.body ? JSON.stringify(request.body) : null,
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to call API');
    }

    // Parse the JSON response
    const data = await response.json();
    console.log(data); // Log the response data

    // Handle the response data as needed
    // For example, you can update state variables or perform other actions based on the response
    return data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}
