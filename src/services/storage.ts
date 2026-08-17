import {
  INITIAL_PARCELS,
  INITIAL_INVOICES,
  INITIAL_RETURNS,
  INITIAL_CLAIMS,
  INITIAL_USERS,
  MOROCCAN_CITIES_TARIFS,
  INITIAL_AGENCIES,
} from '../data/mockData';
import { Parcel, Invoice, ReturnItem, ClaimTicket, User, CityTarif, Agency } from '../types';

const STORAGE_KEYS = {
  PARCELS: 'livrih_parcels_v2',
  INVOICES: 'livrih_invoices_v2',
  RETURNS: 'livrih_returns_v2',
  CLAIMS: 'livrih_claims_v2',
  USERS: 'livrih_users_v2',
  ACTIVE_USER: 'livrih_active_user_v2',
  LANGUAGE: 'livrih_lang_v2',
};

// Safe JSON parser
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for cross-component reactivity
    window.dispatchEvent(new CustomEvent('livrih_storage_change', { detail: { key } }));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
}

export const StorageService = {
  // Parcels
  getParcels(): Parcel[] {
    return safeGet<Parcel[]>(STORAGE_KEYS.PARCELS, INITIAL_PARCELS);
  },
  setParcels(parcels: Parcel[]): void {
    safeSet(STORAGE_KEYS.PARCELS, parcels);
  },

  // Invoices
  getInvoices(): Invoice[] {
    return safeGet<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  },
  setInvoices(invoices: Invoice[]): void {
    safeSet(STORAGE_KEYS.INVOICES, invoices);
  },

  // Returns
  getReturns(): ReturnItem[] {
    return safeGet<ReturnItem[]>(STORAGE_KEYS.RETURNS, INITIAL_RETURNS);
  },
  setReturns(returns: ReturnItem[]): void {
    safeSet(STORAGE_KEYS.RETURNS, returns);
  },

  // Claims
  getClaims(): ClaimTicket[] {
    return safeGet<ClaimTicket[]>(STORAGE_KEYS.CLAIMS, INITIAL_CLAIMS);
  },
  setClaims(claims: ClaimTicket[]): void {
    safeSet(STORAGE_KEYS.CLAIMS, claims);
  },

  // Users
  getUsers(): User[] {
    return safeGet<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  setUsers(users: User[]): void {
    safeSet(STORAGE_KEYS.USERS, users);
  },

  // Active User session
  getActiveUser(): User | null {
    return safeGet<User | null>(STORAGE_KEYS.ACTIVE_USER, null);
  },
  setActiveUser(user: User | null): void {
    safeSet(STORAGE_KEYS.ACTIVE_USER, user);
  },

  // Tarifs
  getCitiesTarifs(): CityTarif[] {
    return MOROCCAN_CITIES_TARIFS;
  },

  // Agencies
  getAgencies(): Agency[] {
    return INITIAL_AGENCIES;
  },

  // Language
  getSavedLanguage(): 'ar' | 'fr' | 'en' {
    return safeGet<'ar' | 'fr' | 'en'>(STORAGE_KEYS.LANGUAGE, 'ar');
  },
  setSavedLanguage(lang: 'ar' | 'fr' | 'en'): void {
    safeSet(STORAGE_KEYS.LANGUAGE, lang);
  },

  // Reset to original seed
  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.PARCELS);
    localStorage.removeItem(STORAGE_KEYS.INVOICES);
    localStorage.removeItem(STORAGE_KEYS.RETURNS);
    localStorage.removeItem(STORAGE_KEYS.CLAIMS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
    window.location.reload();
  },
};
