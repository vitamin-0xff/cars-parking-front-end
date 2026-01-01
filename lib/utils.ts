import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  if(!string || string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
