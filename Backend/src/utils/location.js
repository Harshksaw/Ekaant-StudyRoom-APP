
const fetch = require('node-fetch');

/**
 * Gets the location name from latitude and longitude using Google Maps Geocoding API.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<string>} A promise that resolves to the location name.
 */

const API= process.env.GOOGLE_API;
console.log(API)
async function getLocationName(latitude, longitude) {
  const apiKey = API; // Replace with your Google Maps API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      // Extract the location name from the first result
      const locationName = data.results[0].formatted_address;
      return locationName;
    } else {
      throw new Error('Failed to get location name');
    }
  } catch (error) {
    console.error('Error getting location name:', error);
    throw error;
  }
}

module.exports = getLocationName;