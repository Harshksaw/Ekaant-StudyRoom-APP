const axios = require('axios');
const FormData = require('form-data');

const BASEURL = 'YOUR_API_BASE_URL'; // Replace with your actual API base URL

async function sendRandomLibraryData() {
  const title = `Library ${Math.floor(Math.random() * 100)}`;
  const description = `Description for ${title}`;
  const location = JSON.stringify({ latitude: 40.7128, longitude: -74.0060 });
  const price = Math.floor(Math.random() * 100) + 10;
  const amenities = JSON.stringify(["WiFi", "AC"]);
  const seatLayout = JSON.stringify({ rows: 5, columns: 10 });
  const timeSlot = JSON.stringify([{ start: "09:00", end: "17:00" }]);
  const images = ["image1.png", "image2.png"];

  const formData = new FormData();
  images.forEach(image => formData.append("images", image));
  formData.append("name", title);
  formData.append("description", description);
  formData.append("location", location);
  formData.append("price", price.toString());
  formData.append("amenities", amenities);
  formData.append("seatLayout", seatLayout);
  formData.append("timeSlot", timeSlot);

  // Replace 'AdminId' retrieval method suitable for Node.js environment
  const AdminId = 'Your_AdminId_Here'; // Adjust this line to get AdminId appropriately
  formData.append("libraryOwnerId", JSON.stringify(AdminId));

  try {
    const response = await axios.post(`${BASEURL}/api/v1/library/createLibrary`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error creating library:", error);
  }
}

sendRandomLibraryData();