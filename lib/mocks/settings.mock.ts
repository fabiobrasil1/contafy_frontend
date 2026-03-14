import type {
  UserProfile,
  UpdateUserProfileInput,
  UserPreferences,
  UpdateUserPreferencesInput,
} from "@/types/settings";

function mockDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

let mockProfile: UserProfile = {
  id: "user-1",
  name: "Usuário Contafy",
  email: "usuario@contafy.com.br",
};

let mockPreferences: UserPreferences = {
  currency: "BRL",
  dateFormat: "dd/MM/yyyy",
};

export function getUserProfile(): Promise<UserProfile> {
  return mockDelay({ ...mockProfile });
}

export function updateUserProfile(
  input: UpdateUserProfileInput
): Promise<UserProfile> {
  mockProfile = { ...mockProfile, ...input };
  return mockDelay({ ...mockProfile });
}

export function getUserPreferences(): Promise<UserPreferences> {
  return mockDelay({ ...mockPreferences });
}

export function updateUserPreferences(
  input: UpdateUserPreferencesInput
): Promise<UserPreferences> {
  mockPreferences = { ...mockPreferences, ...input };
  return mockDelay({ ...mockPreferences });
}
