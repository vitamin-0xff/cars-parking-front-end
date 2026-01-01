// api.ts

import {
  ApiPage,
  ApiError,
  PageParams,
  UUID,
  // Responses
  UserResponse,
  PlaceResponse,
  ParkingResponse,
  ParkingSpotResponse,
  EntryGateResponse,
  CountryResponse,
  ClientResponse,
  CityResponse,
  CardResponse,
  ParkingEventResponse,
  GateMovementResponse,
  CreditSupplingResponse,
  Message,
  // DTOs
  UserCreate,
  UserUpdate,
  PlaceCreate,
  PlaceUpdate,
  ParkingCreate,
  ParkingUpdate,
  ParkingSpotCreate,
  ParkingSpotUpdate,
  EntryGateCreate,
  EntryGateUpdate,
  CountryCreate,
  CountryUpdate,
  ClientCreate,
  ClientUpdate,
  CityCreate,
  CityUpdate,
  CardCreate,
  CardUpdate,
  ParkingEventCreate,
  GateMovementCreate,
  CreditSupplingCreate,
  ApiResponse,
  CountryFuzzySearch,
  CardCreateV1,
} from './types';
import axios, {Axios} from 'axios'

// Base URL
const BASE_URL = 'http://localhost:8080';

// Helper to build query string
const buildQuery = (params: Record<string, any>): string => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => search.append(key, v));
    } else if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });
  return search.toString();
};

// Generic fetch wrapper with error handling
const apiCall = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {

    const response = await axios.request<ApiResponse<T>>({
        method: options.method || 'GET',
        url: `${BASE_URL}${url}`,
        data: options.body,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status >= 200 && response.status < 300) {
        if(!response.data.success) {
            throw Error(response.data.error?.message || 'Something went wrong');
        }
        return response.data.data;
    } else {
        throw {
            status: response.status,
            message: response.data.error?.message || 'API Error',
        } as ApiError;
    }
};

// === USER API ===
export const userApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<UserResponse>>(`/v1/api/users?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<UserResponse>(`/v1/api/users/${id}`),

  create: (data: UserCreate) =>
    apiCall<UserResponse>('/v1/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: UserCreate[]) =>
    apiCall<UserResponse[]>('/v1/api/users/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: UserUpdate) =>
    apiCall<UserResponse>(`/v1/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/users/${id}`, { method: 'DELETE' }),
};

// === PLACE API ===
export const placeApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<PlaceResponse>>(`/v1/api/places?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<PlaceResponse>(`/v1/api/places/${id}`),

  getByCityId: (cityId: UUID, params: PageParams) =>
    apiCall<ApiPage<PlaceResponse>>(`/v1/api/places/city/${cityId}?${buildQuery({ size: params.size, page: params.page, sort: params.sort  })}`),

  create: (data: PlaceCreate) =>
    apiCall<PlaceResponse>('/v1/api/places', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: PlaceCreate[]) =>
    apiCall<PlaceResponse[]>('/v1/api/places/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: PlaceUpdate) =>
    apiCall<PlaceResponse>(`/v1/api/places/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/places/${id}`, { method: 'DELETE' }),
};

// === PARKING API ===
export const parkingApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<ParkingResponse>>(`/v1/api/parkings?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<ParkingResponse>(`/v1/api/parkings/${id}`),

  getByPlaceId: (placeId: UUID, params: PageParams) =>
    apiCall<ApiPage<ParkingResponse>>(`/v1/api/parkings/place/${placeId}?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  create: (data: ParkingCreate) =>
    apiCall<ParkingResponse>('/v1/api/parkings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: ParkingCreate[]) =>
    apiCall<ParkingResponse[]>('/v1/api/parkings/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: ParkingUpdate) =>
    apiCall<ParkingResponse>(`/v1/api/parkings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/parkings/${id}`, { method: 'DELETE' }),
};

// === PARKING SPOT API ===
export const parkingSpotApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<ParkingSpotResponse>>(`/v1/api/parking-spots?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<ParkingSpotResponse>(`/v1/api/parking-spots/${id}`),

  getByParkingId: (parkingId: UUID, params: PageParams) =>
    apiCall<ApiPage<ParkingSpotResponse>>(`/v1/api/parking-spots/parking/${parkingId}?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getAvailableByParkingId: (parkingId: UUID, params: PageParams) =>
    apiCall<ApiPage<ParkingSpotResponse>>(`/v1/api/parking-spots/parking/${parkingId}/available?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  create: (data: ParkingSpotCreate) =>
    apiCall<ParkingSpotResponse>('/v1/api/parking-spots', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: ParkingSpotCreate[]) =>
    apiCall<ParkingSpotResponse[]>('/v1/api/parking-spots/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: ParkingSpotUpdate) =>
    apiCall<ParkingSpotResponse>(`/v1/api/parking-spots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/parking-spots/${id}`, { method: 'DELETE' }),

  occupy: (id: UUID) =>
    apiCall<ParkingSpotResponse>(`/v1/api/parking-spots/${id}/occupy`, { method: 'PUT' }),

  free: (id: UUID) =>
    apiCall<ParkingSpotResponse>(`/v1/api/parking-spots/${id}/free`, { method: 'PUT' }),
};

// === ENTRY GATE API ===
export const entryGateApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<EntryGateResponse>>(`/v1/api/entry-gates?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<EntryGateResponse>(`/v1/api/entry-gates/${id}`),

  getByParkingId: (parkingId: UUID, params: PageParams) =>
    apiCall<ApiPage<EntryGateResponse>>(
      `/v1/api/entry-gates/parking/${parkingId}?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`
    ),

  create: (data: EntryGateCreate) =>
    apiCall<EntryGateResponse>('/v1/api/entry-gates', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: EntryGateCreate[]) =>
    apiCall<EntryGateResponse[]>('/v1/api/entry-gates/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: EntryGateUpdate) =>
    apiCall<EntryGateResponse>(`/v1/api/entry-gates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/entry-gates/${id}`, { method: 'DELETE' }),
};

// === COUNTRY API ===
export const countryApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<CountryResponse>>(`/v1/api/countries?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  fuzzySearch: (name: string, signal: AbortSignal, threshold: number = 0.2, limit: number = 10) =>
    apiCall<CountryFuzzySearch[]>(`/v1/api/countries/fuzzySearch?name=${encodeURIComponent(name)}&threshold=${threshold}&limit=${limit}`, { signal }),

  getById: (id: UUID) =>
    apiCall<CountryResponse>(`/v1/api/countries/${id}`),

  create: (data: CountryCreate) =>
    apiCall<CountryResponse>('/v1/api/countries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: CountryCreate[]) =>
    apiCall<CountryResponse[]>('/v1/api/countries/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: CountryUpdate) =>
    apiCall<CountryResponse>(`/v1/api/countries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/countries/${id}`, { method: 'DELETE' }),
};

// === CITY API ===
export const cityApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<CityResponse>>(`/v1/api/cities?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<CityResponse>(`/v1/api/cities/${id}`),

  getByCountryId: (countryId: UUID, params: PageParams) =>
    apiCall<ApiPage<CityResponse>>(
      `/v1/api/cities/country/${countryId}?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`
    ),

  create: (data: CityCreate) =>
    apiCall<CityResponse>('/v1/api/cities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: CityCreate[]) =>
    apiCall<CityResponse[]>('/v1/api/cities/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: UUID, data: CityUpdate) =>
    apiCall<CityResponse>(`/v1/api/cities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/cities/${id}`, { method: 'DELETE' }),
};

// === CLIENT API ===
export const clientApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<ClientResponse>>(`/v1/api/clients/all?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<ClientResponse>(`/v1/api/clients?id=${id}`), // Note: uses query param

  create: (data: ClientCreate) =>
    apiCall<ClientResponse>('/v1/api/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: ClientCreate[]) =>
    apiCall<ClientResponse[]>('/v1/api/clients/all', {
      method: 'POST',
      body: JSON.stringify({ clientsCreate: data }), // Note: query param name
    }),

  update: (id: UUID, data: ClientUpdate) =>
    apiCall<ClientResponse>(`/v1/api/clients?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/clients?id=${id}`, { method: 'DELETE' }),
};

// === CARD API ===
export const cardApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<CardResponse>>(`/v1/api/cards/all?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`),

  getById: (id: UUID) =>
    apiCall<CardResponse>(`/v1/api/cards/${id}`), // Note: query param

  create: (data: CardCreate) =>
    apiCall<CardResponse>('/v1/api/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createV1: (data: CardCreateV1) =>
    apiCall<CardResponse>('/v1/api/cards/v11', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: CardCreate[]) =>
    apiCall<CardResponse[]>('/v1/api/cards/all', {
      method: 'POST',
      body: JSON.stringify({ cardsCreate: data }),
    }),

  update: (id: UUID, data: CardUpdate) =>
    apiCall<CardResponse>(`/v1/api/cards?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/cards?id=${id}`, { method: 'DELETE' }),
};

// === PARKING EVENT API ===
export const parkingEventApi = {
  getAll: (params: PageParams) =>
    apiCall<ApiPage<ParkingEventResponse>>(
      `/v1/api/parkingEvents/all?${buildQuery({ size: params.size, page: params.page, sort: params.sort })}`
    ),

  getById: (id: UUID) =>
    apiCall<ParkingEventResponse>(`/v1/api/parkingEvents?id=${id}`),

  create: (data: ParkingEventCreate) =>
    apiCall<ParkingEventResponse>('/v1/api/parkingEvents', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: ParkingEventCreate[]) =>
    apiCall<ParkingEventResponse[]>('/v1/api/parkingEvents/all', {
      method: 'POST',
      body: JSON.stringify({ parkingEventsCreate: data }),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/v1/api/parkingEvents?id=${id}`, { method: 'DELETE' }),
};

// === GATE MOVEMENT API ===
export const gateMovementApi = {
  getAll: (params: PageParams & { deletedIncluded?: boolean }) => {
    const query = buildQuery({
      pageable: { page: params.page, size: params.size, sort: params.sort },
      deletedIncluded: params.deletedIncluded,
    });
    return apiCall<ApiPage<GateMovementResponse>>(`/gate-movements?${query}`);
  },

  getById: (id: string) =>
    apiCall<GateMovementResponse>(`/gate-movements/${id}`),

  create: (data: GateMovementCreate) =>
    apiCall<GateMovementResponse>('/gate-movements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: GateMovementCreate[]) =>
    apiCall<GateMovementResponse[]>('/gate-movements/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<Message>(`/gate-movements/${id}`, { method: 'DELETE' }),
};

// === CREDIT SUPPLING API ===
export const creditSupplingApi = {
  getAll: (params: PageParams & { deletedIncluded?: boolean }) => {
    const query = buildQuery({
      pageable: { page: params.page, size: params.size, sort: params.sort },
      deletedIncluded: params.deletedIncluded,
    });
    return apiCall<ApiPage<CreditSupplingResponse>>(`/credit-supplings?${query}`);
  },

  getById: (id: UUID) =>
    apiCall<CreditSupplingResponse>(`/credit-supplings/${id}`),

  create: (data: CreditSupplingCreate) =>
    apiCall<CreditSupplingResponse>('/credit-supplings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  createMany: (data: CreditSupplingCreate[]) =>
    apiCall<CreditSupplingResponse[]>('/credit-supplings/all', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (id: UUID) =>
    apiCall<Message>(`/credit-supplings/${id}`, { method: 'DELETE' }),
};

// === ROOT API (optional health check) ===
export const rootApi = {
  get: () => apiCall<Record<string, string>>('/'),
};


// Example usage:
// const [usersPage, error] = await userApi.getAll({ page: 0, size: 20 });
// if (error) console.error(error);
// else console.log(usersPage?.content);