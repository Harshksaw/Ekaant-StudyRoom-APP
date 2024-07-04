import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const BASEURL='https://studyroom-app.onrender.com'
// export const BASEURL="http://127.0.0.1:3000"