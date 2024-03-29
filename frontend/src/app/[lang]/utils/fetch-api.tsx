import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {},
  fallbackData = null // Allow specifying fallback data
) {
  try {
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    const response = await fetch(requestUrl, mergedOptions);
    
    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);

    // Implement fallback logic
    if (fallbackData) {
      console.log("Returning fallback data due to an error.");
      return fallbackData;
    }

    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
