// types.ts

export type UUID = string;

// Generic API response wrappers
export interface ApiResponse<T> {
  data: T;
  error: ApiError | null;
  status: number;
  success: boolean;
}

export interface ApiPage<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Common
export interface Message {
  message: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum ParkingStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  MAINTENANCE = 'MAINTENANCE',
}

export enum ParkingSpotType {
  CAR = 'CAR',
  EV = 'EV',
  HANDICAP = 'HANDICAP',
}

export enum Direction {
  IN = 'IN',
  OUT = 'OUT',
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  EXPIRED = 'EXPIRED',
}

export enum CreditSource {
  ADMIN = 'ADMIN',
  ONLINE = 'ONLINE',
}

export enum CreditStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

// Models - Response
export interface UserResponse {
  id: UUID;
  fullName: string;
  email: string;
  phone: string;
  status: UserStatus;
  createdAt: string; // ISO date-time
}

export interface CountryResponse {
  id: UUID;
  name: string;
  isoCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityResponse {
  id: UUID;
  name: string;
  latitude: number;
  longitude: number;
  zoomFactor: number;
  stateCode: string;
  country: CountryResponse;
  createdAt: string;
}

export interface PlaceResponse {
  id: UUID;
  name: string;
  addressLine: string;
  city: CityResponse;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface ParkingResponse {
  id: UUID;
  city: CityResponse;
  name: string;
  latitude: number;
  longitude: number;
  totalCapacity: number;
  currentOccupied: number;
  status: ParkingStatus;
  createdAt: string;
}

export interface ParkingSpotResponse {
  id: UUID;
  parking: ParkingResponse;
  level: string;
  spotNumber: string;
  type: ParkingSpotType;
  occupied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EntryGateResponse {
  id: UUID;
  parking: ParkingResponse;
  name: string;
  direction: Direction;
  hardwareId: string;
  active: boolean;
  createdAt: string;
}

export interface ClientResponse {
  id: UUID;
  fullName: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CardResponse {
  id: UUID;
  client: ClientResponse;
  cardNumber: string;
  creditBalance: number;
  status: CardStatus;
  issuedAt: string;
  expiresAt: string;
  createdAt: string;
}

export interface ParkingEventResponse {
  id: UUID;
  client: ClientResponse;
  card: CardResponse;
  parking: ParkingResponse;
  entryGate: EntryGateResponse;
  direction: Direction;
  creditsCharged: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface GateMovementResponse {
  id: string;
  placedAt: string;
  entryGate: EntryGateResponse;
  previousParking: ParkingResponse | null;
  newParking: ParkingResponse;
  reason: string;
  deletedAt: string | null;
}

export interface CreditSupplingResponse {
  id: UUID;
  card: CardResponse;
  amount: number;
  feeTaken: number;
  source: CreditSource;
  status: CreditStatus;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
  createdAt: string;
}

// Create / Update DTOs
export interface UserCreate {
  fullName: string;
  email: string;
  phone: string;
  status: UserStatus;
}

export interface UserUpdate {
  fullName?: string;
  email?: string;
  phone?: string;
  status?: UserStatus;
}

export interface PlaceCreate {
  name: string;
  addressLine: string;
  cityId: UUID;
  latitude: number;
  longitude: number;
}

export interface PlaceUpdate {
  name?: string;
  addressLine?: string;
  cityId?: UUID;
  latitude?: number;
  longitude?: number;
}

export interface ParkingCreate {
  cityId: UUID;
  name: string;
  latitude: number;
  longitude: number;
  totalCapacity: number;
  currentOccupied: number;
  status: ParkingStatus;
}

export interface ParkingUpdate {
  placeId?: UUID;
  name?: string;
  latitude?: number;
  longitude?: number;
  totalCapacity?: number;
  currentOccupied?: number;
  status?: ParkingStatus;
}

export interface ParkingSpotCreate {
  parkingId: UUID;
  level: string;
  spotNumber: string;
  type: ParkingSpotType;
}

export interface ParkingSpotUpdate {
  level?: string;
  spotNumber?: string;
  type?: ParkingSpotType;
  occupied?: boolean;
}

export interface EntryGateCreate {
  parkingId: UUID;
  name: string;
  direction: Direction;
  hardwareId: string;
  active: boolean;
}

export interface EntryGateUpdate {
  parkingId?: UUID;
  name?: string;
  direction?: Direction;
  hardwareId?: string;
  active?: boolean;
}

export interface CountryCreate {
  name: string;
  isoCode: string;
  latitude: number;
  longitude: number;
  zoomFactor: number;
}

export interface CountryUpdate {
  name?: string;
  isoCode?: string;
}

export interface CityCreate {
  name: string;
  latitude: number;
  longitude: number;
  zoomFactor: number;
  stateCode: string;
  countryId: UUID;
}

export interface CityUpdate {
  name?: string;
  postalCode?: string;
  stateCode?: string;
  countryId?: UUID;
}

export interface ClientCreate {
  fullName: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ClientUpdate {
  fullName?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface CardCreate {
  clientId: UUID;
  cardNumber: string;
  creditBalance: number;
  status: CardStatus;
  issuedAt: string;
  expiresAt: string;
}

export interface CardCreateV1 {
  client: ClientCreate;
  creditBalance: number;
  issuedAt: string;
  expiresAt: string;
}

export interface CardUpdate {
  clientId?: UUID;
  cardNumber?: string;
  creditBalance?: number;
  status?: CardStatus;
  issuedAt?: string;
  expiresAt?: string;
}

export interface ParkingEventCreate {
  cardId: UUID;
  parkingId: UUID;
  entryGateId: UUID;
  direction: Direction;
  creditsCharged: number;
}

export interface GateMovementCreate {
  entryGateId: UUID;
  previousParkingId?: UUID;
  newParkingId: UUID;
  reason?: string;
}

export interface CreditSupplingCreate {
  cardId: UUID;
  amount: number;
  feeTaken: number;
  source: CreditSource;
  status: CreditStatus;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
}

export interface CountryFuzzySearch {
  name: string;
  isoCode: string;
  latitude: number;
  longitude: number;
  zoomFactor: number;
  id: UUID;
  sim: number;
}

// Pagination params
export interface PageParams {
  page?: number;
  size?: number;
  sort?: string[];
}

// Error handling
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}