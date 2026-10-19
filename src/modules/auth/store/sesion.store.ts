import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface SessionState {
  token: string | null;
  isHydrated: boolean;
  setToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  isHydrated: false,
  setToken: async (token) => {
    await SecureStore.setItemAsync('token', token);
    set({ token });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ token: null });
  },
  hydrate: async () => {
    const token = await SecureStore.getItemAsync('token');
    set({ token, isHydrated: true });
  },
}));