export const get = async (url, options = {}) => {
  try {
    const response: Response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.status);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error)
  }
}