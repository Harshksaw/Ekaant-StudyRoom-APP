import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const BASEURL='http://127.0.0.1:3000'



// export const BASEURL='https://studyroom-app.onrender.com'


export const BASEURL='https://musical-space-spoon-94pgrxq6rg7c74xr-3000.app.github.dev'
// export const BASEURL='https://zany-umbrella-4jqg9rg6qpr37jq-3000.app.github.dev'
// export const BASEURL='https://studyroom-app.onrender.com'