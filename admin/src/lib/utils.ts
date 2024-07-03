import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export const BASEURL='https://studyroom-app.onrender.com'
export const BASEURL="https://orange-cod-74gj6xr76r6fprr4-3000.app.github.dev"