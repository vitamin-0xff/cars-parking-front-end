import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string) {
  if(!string || string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateToDDMMYYYY(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

export function formatDateToMMDDYYYY(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}-${year}`;
}

export function browserFromatDate(date: Date): string {
  return formatDateToYYYYMMDD(date);
}

export function mayNotSepcified(value: string | null | undefined): string {
    if(!value || value.trim() === '') {
        return 'Not Specified';
    }
    return value;
}

export function toDateValue(stringDate: string | null | undefined, formatter?: (date: Date) => string): string {
    if(!stringDate || stringDate.trim() === '') {
        return 'Not Specified';
    }
    if(formatter) {
        return formatter(new Date(stringDate));
    }
    return (new Date(stringDate)).toISOString(); // in case no formatter is provided return ISO string
}


export const currencies = ['DT', 'USD']
