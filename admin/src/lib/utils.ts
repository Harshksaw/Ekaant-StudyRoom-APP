import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const BASEURL="http://127.0.0.1:3000"
// export const BASEURL="https://jubilant-space-disco-gwgvjp5x96wc996q-3000.app.github.dev"