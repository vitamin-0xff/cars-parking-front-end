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

export type CountryCreateInput = z.infer<typeof countryCreateValidator>;
export type CityCreateInput = z.infer<typeof cityCreateValidator>;

export {countryCreateValidator, cityCreateValidator}