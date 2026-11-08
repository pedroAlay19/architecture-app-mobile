import { queryClient } from "@/lib/queryClient";
import { useSessionStore } from "@/modules/auth/store/sesion.store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const token = useSessionStore((s) => s.token);
  const isHydrated = useSessionStore((s) => s.isHydrated);
  const hydrate = useSessionStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) return null;

  const isLoggedIn = !!token;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)"/>
          </Stack.Protected>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(app)"/>
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
      <Toast />
    </>
    
);
}
