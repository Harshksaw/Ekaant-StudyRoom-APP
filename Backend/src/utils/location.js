
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


// Example usage
const jsonDataSets = [
  {
      "_id": "669b68cc7ee993548598021e",
      "libraryOwner": "669b6f9b2435e436cae6e401",
      "name": "cu library",
      "longDescription": "2b$10$SoZDq8dqHrs.MP5BOZvKxe9/COUw269nrtWISmQua48d5evsNW.DK2b$10$SoZDq8dqHrs.MP5BOZvKxe9/COUw269nrtWISmQua48d5evsNW.DK",
      "shortDescription": "2b$10$SoZDq8dqHrs.MP5BOZvKxe9/COUw269nrtWISmQua48d5evsNW.DK",
      "thumbnail": [],
      "cardimage": "https://res.cloudinary.com/dzwvmqbv0/image/upload/v1721460937/library-images/o07i9sojpufe9e8qsuoe.jpg",
      "images": [
          "https://res.cloudinary.com/dzwvmqbv0/image/upload/v1721460936/library-images/ukkw9ekdjwzhsyquouzm.jpg",
          "https://res.cloudinary.com/dzwvmqbv0/image/upload/v1721460936/library-images/lnbutn4uv7zg5ellp911.jpg"
      ],
      "location": [
        25.5940947,
        85.1375645
      ],
      "address": {
          "line1": "QTR A/4 ,LIC COLONY, SEC 5/B",
          "line2": "",
          "city": "Chandigarh, Chandigarh, India",
          "state": "",
          "pincode": "827006"
      },
      "deleted": "false",
      "amenities": [
          "coldWater",
          "wifi",
          "ac"
      ],
      "commingSoon": false,
      "approved": true,
      "legal": "323432",
      "__v": 3,
      "price": 2000,
      "rooms": [
          {
              "roomNo": 1,
              "seatLayout": [
                  {
                      "id": "0-1",
                      "label": "0-1"
                  },
                  {
                      "id": "0-2",
                      "label": "0-2"
                  },
                  {
                      "id": "1-2",
                      "label": "1-2"
                  },
                  {
                      "id": "1-1",
                      "label": "1-1"
                  }
              ],
              "_id": "669e126e5f223c39169c62e8",
              "seatbooked": []
          }
      ],
      "timeSlot": [
          {
              "from": "12:10 PM",
              "to": "02:00 PM",
              "price": 2000,
              "_id": "669e126f5f223c39169c62ec"
          },
          {
              "from": null,
              "to": null,
              "price": 0,
              "_id": "669e126f5f223c39169c62ed"
          },
          {
              "from": null,
              "to": null,
              "price": 0,
              "_id": "669e126f5f223c39169c62ee"
          },
          {
              "from": null,
              "to": null,
              "price": 0,
              "_id": "669e126f5f223c39169c62ef"
          }
      ]
  },
  {
      "_id": "669bf2322f55c5ce037297bc",
      "libraryOwner": "669bf1902f55c5ce037297b9",
      "name": "Harsh's",
      "longDescription": "with a great view of sunset",
      "shortDescription": "slient library",
      "thumbnail": [],
      "cardimage": "https://res.cloudinary.com/dzwvmqbv0/image/upload/v1721496113/library-images/pbqjmvimjwkxzehdpxns.jpg",
      "images": [
          "https://res.cloudinary.com/dzwvmqbv0/image/upload/v1721496112/library-images/udosy1oc1zvfptuz67nf.jpg"
      ],
      "location": [
        26.8466937,
        80.94616599999999
      ],
      "address": {
          "line1": "11-c,brs nagar",
          "line2": "11-c,brs nagar",
          "city": "ludhiana",
          "state": "punjab",
          "pincode": "141001"
      },
      "deleted": "false",
      "amenities": [
          "coldWater",
          "wifi",
          "locker",
          "separateWashroom",
          "discussionArea",
          "MovingChair",
          "FloorMat",
          "SeparateParking",
          "CommonParking"
      ],
      "commingSoon": false,
      "approved": true,
      "legal": "Gst",
      "timeSlot": [
          {
              "from": "12:05 PM",
              "to": "12:00 PM",
              "price": 443,
              "_id": "669e31056bcd04223c6af519"
          },
          {
              "from": "12:10 AM",
              "to": "12:20 AM",
              "price": 4223,
              "_id": "669e31056bcd04223c6af51a"
          },
          {
              "from": null,
              "to": null,
              "price": 0,
              "_id": "669e31056bcd04223c6af51b"
          },
          {
              "from": null,
              "to": null,
              "price": 0,
              "_id": "669e31056bcd04223c6af51c"
          }
      ],
      "__v": 5,
      "rooms": [
          {
              "roomNo": 1,
              "seatLayout": [
                  {
                      "id": "2-2",
                      "label": "2-2"
                  },
                  {
                      "id": "1-2",
                      "label": "1-2"
                  },
                  {
                      "id": "0-1",
                      "label": "0-1"
                  },
                  {
                      "id": "1-1",
                      "label": "1-1"
                  },
                  {
                      "id": "2-1",
                      "label": "2-1"
                  }
              ],
              "_id": "669e30cf4e76e596694e3d66",
              "seatbooked": []
          },
          {
              "roomNo": 2,
              "seatLayout": [
                  {
                      "id": "1-1",
                      "label": "1-1"
                  },
                  {
                      "id": "1-2",
                      "label": "1-2"
                  },
                  {
                      "id": "2-2",
                      "label": "2-2"
                  },
                  {
                      "id": "2-1",
                      "label": "2-1"
                  }
              ],
              "_id": "669e31056bcd04223c6af510",
              "seatbooked": []
          }
      ]
  }
]
const targetCoordinate = { lat: 28.7040592, lng: 77.10249019999999 };

// GetNearestLibraries(jsonDataSets, targetCoordinate).then(sortedDataSets => {
//   console.log(sortedDataSets); // Each data set is sorted by distance
//   console.log("🚀 ~ GetNearestLibraries ~ sortedDataSets:", sortedDataSets)
//   return sortedDataSets;
// });





module.exports = { getLocationName, getCityCoordinates , GetNearestLibraries}