export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UpdateUserProfileInput {
  name: string;
  email: string;
}

export type CurrencyCode = "BRL" | "USD" | "EUR";

export type DateFormat = "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd";

export interface UserPreferences {
  currency: CurrencyCode;
  dateFormat: DateFormat;
}

export interface UpdateUserPreferencesInput {
  currency: CurrencyCode;
  dateFormat: DateFormat;
}
