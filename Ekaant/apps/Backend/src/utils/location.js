
const fetch = require('node-fetch');

/**
 * Gets the location name from latitude and longitude using Google Maps Geocoding API.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<string>} A promise that resolves to the location name.
 */

const API = process.env.GOOGLE_API;
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
async function getCityCoordinates(cityName) {
  // Replace with your chosen API endpoint and API key
  const apiKey = API;
  const apiEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName},India&key=${apiKey}`;

  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error('Error fetching coordinates:', data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}
// Function to calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Function to process multiple JSON data sets
async function GetNearestLibraries(jsonDataSets, targetCoordinate) {
  return jsonDataSets.map(dataSet => {
    dataSet.distance = calculateDistance(dataSet.location[0], dataSet.location[1], targetCoordinate[0], targetCoordinate[1]);
    return dataSet;
  }).sort((a, b) => a.distance - b.distance);
}



const targetCoordinate = { lat: 28.7040592, lng: 77.10249019999999 };

// GetNearestLibraries(jsonDataSets, targetCoordinate).then(sortedDataSets => {
//   console.log(sortedDataSets); // Each data set is sorted by distance
//   console.log("🚀 ~ GetNearestLibraries ~ sortedDataSets:", sortedDataSets)
//   return sortedDataSets;
// });





module.exports = { getLocationName, getCityCoordinates , GetNearestLibraries}