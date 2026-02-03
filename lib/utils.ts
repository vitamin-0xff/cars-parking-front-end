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

export function objectsDifferenceCallculator(oldObj: any, newObj: any) {
  const changes: any = {};

  function walk(oldVal: any, newVal: any, path: string) {
    // If both are strictly equal → no change
    if (oldVal === newVal) return;

    // Handle non-objects (including null)
    const oldIsObj = oldVal && typeof oldVal === "object";
    const newIsObj = newVal && typeof newVal === "object";

    if (!oldIsObj || !newIsObj) {
      changes[path] = newVal;
      return;
    }

    // Collect all keys from both objects
    const keys = new Set([
      ...Object.keys(oldVal),
      ...Object.keys(newVal)
    ]);

    for (const key of keys) {
      const nextPath = path ? `${path}.${key}` : key;
      walk(oldVal[key], newVal[key], nextPath);
    }
  }

  walk(oldObj, newObj, "");
  return changes;
}


export function removeUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map(removeUndefined)
      .filter(v => v !== undefined) as unknown as T;
  }

  if (value !== null && typeof value === "object") {
    const result: any = {};

    for (const [key, val] of Object.entries(value)) {
      const cleaned = removeUndefined(val);
      if (cleaned !== undefined) {
        result[key] = cleaned;
      }
    }

    return result;
  }

  return value;
}

export const currencies = ['DT', 'USD']
