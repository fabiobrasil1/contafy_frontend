"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
} from "@/lib/mocks/settings.mock";
import type {
  UpdateUserProfileInput,
  UpdateUserPreferencesInput,
} from "@/types/settings";
import { queryKeys } from "./query-keys";

export function useUserProfile() {
  return useQuery({
    queryKey: queryKeys.settings.profile(),
    queryFn: getUserProfile,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserProfileInput) => updateUserProfile(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.profile() });
    },
  });
}

export function useUserPreferences() {
  return useQuery({
    queryKey: queryKeys.settings.preferences(),
    queryFn: getUserPreferences,
  });
}

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateUserPreferencesInput) =>
      updateUserPreferences(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings.preferences(),
      });
    },
  });
}
