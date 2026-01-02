import { z } from 'zod';
import { capitalizeFirstLetter } from './utils';

const countryCreateValidator = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).transform((name) => capitalizeFirstLetter(name.trim())),
  isoCode: z.string().trim().min(2, { message: "ISO Code must be at least 2 characters" }).max(3, { message: "ISO Code must be at most 3 characters" }).transform((code) => code.toUpperCase().trim()),
});

const cityCreateValidator = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).transform((name) => capitalizeFirstLetter(name.trim())),
  postalCode: z.string().trim().min(2, { message: "ISO Code must be at least 2 characters" }).max(6, { message: "ISO Code must be at most 3 characters" }).transform((code) => code.toUpperCase().trim()),
  stateCode: z.string().trim().min(1, { message: "State Code is required" }),
  countryId: z.string().uuid({ message: "Invalid Country ID" }),
});

const cardCreateValidator = z.object({
  name: z.string().trim().min(2, { message: "Name at least 2 character" }).max(40, { message: "Fullname at max 40 character" }).transform((name) => name.trim().toLowerCase()),
  lastName: z.string().trim().min(2, { message: "Lastname at least 2 character" }).max(40, { message: "Fullname at max 40 character" }).transform((value) => value.trim().toLowerCase()),
  email: z.string().trim().email({ message: "Invalid email address" }).transform((email) => email.toLowerCase().trim()),
  phone: z.string().trim().min(7, { message: "Phone number must be at least 7 digits" }).max(15, { message: "Phone number must be at most 15 digits" }).transform((phone) => phone.trim()),
  issuedAt: z.string().trim().max(12, { message: "invalid date" }).transform((val) => val.trim()),
  expiredAt: z.string().trim().max(12, { message: "invalid date" }).transform((val) => val.trim()),
  creditBalance: z.coerce.number().min(0, { message: "Credit balance cannot be negative" }),
});

const parkingCreateValidator = z.object({
  name: z.string().trim().min(2, { message: "Name at least 2 character" }).max(40, { message: "Fullname at max 40 character" }).transform((name) => name.trim().toLowerCase()),
  totalCapacity: z.coerce.number().min(1, { message: "Total capacity must be at least 1" }),
});

export type CountryCreateInput = z.infer<typeof countryCreateValidator>;
export type CityCreateInput = z.infer<typeof cityCreateValidator>;
export type CardCreateInput = z.infer<typeof cardCreateValidator>;
export type ParkingCreateInput = z.infer<typeof parkingCreateValidator>;

export {countryCreateValidator, cityCreateValidator, cardCreateValidator, parkingCreateValidator};