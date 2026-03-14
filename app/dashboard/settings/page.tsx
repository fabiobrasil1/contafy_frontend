"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { PreferencesForm } from "@/components/forms/PreferencesForm";
import { BillingSection } from "@/components/dashboard/BillingSection";
import {
  useUserProfile,
  useUpdateUserProfile,
  useUserPreferences,
  useUpdateUserPreferences,
} from "@/lib/api/settings";
import type { ProfileFormValues } from "@/components/forms/profile-form-schema";
import type { PreferencesFormValues } from "@/components/forms/preferences-form-schema";
import { User, Sliders, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();

  const { data: preferences, isLoading: preferencesLoading } =
    useUserPreferences();
  const updatePreferencesMutation = useUpdateUserPreferences();

  function handleProfileSubmit(values: ProfileFormValues) {
    updateProfileMutation.mutate(values);
  }

  function handlePreferencesSubmit(values: PreferencesFormValues) {
    updatePreferencesMutation.mutate(values);
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie seu perfil, preferências e faturamento.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Sliders className="h-4 w-4" />
            Preferências
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Faturamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Atualize seu nome e e-mail. Essas informações podem ser usadas
                para notificações e login.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profileLoading ? (
                <p className="text-sm text-muted-foreground">
                  Carregando perfil...
                </p>
              ) : (
                <ProfileForm
                  defaultValues={
                    profile
                      ? { name: profile.name, email: profile.email }
                      : undefined
                  }
                  onSubmit={handleProfileSubmit}
                  isSubmitting={updateProfileMutation.isPending}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>
                Defina a moeda e o formato de data exibidos no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {preferencesLoading ? (
                <p className="text-sm text-muted-foreground">
                  Carregando preferências...
                </p>
              ) : (
                <PreferencesForm
                  defaultValues={preferences}
                  onSubmit={handlePreferencesSubmit}
                  isSubmitting={updatePreferencesMutation.isPending}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <BillingSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
