import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASEURL='https://8tzyxt-3000.csb.app'

// export const BASEURL='https://studyroom-app.onrender.com'
// export const BASEURL='https://humble-doodle-74gj6xr7jj7fx7xq-3000.app.github.dev'
// export const BASEURL='https://zany-umbrella-4jqg9rg6qpr37jq-3000.app.github.dev'
// export const BASEURL='https://studyroom-app.onrender.com'