export default async function makeApiRequest(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
