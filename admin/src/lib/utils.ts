import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASEURL='https://api.studyekaant.com'


// export const BASEURL='http://localhost:3000'



const fetchCities = async () => {
  try { 
    const response = await axios.get(`${BASEURL}/api/v1/app/getApp`); 
    // setCities(response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

// export const BASEURL = "http://127.0.0.1:3009";

// export const BASEURL='https://musical-space-spoon-94pgrxq6rg7c74xr-3000.app.github.dev'
// export const BASEURL='https://zany-umbrella-4jqg9rg6qpr37jq-3000.app.github.dev'
// export const BASEURL='https://studyroom-app.onrender.com'
export { fetchCities };