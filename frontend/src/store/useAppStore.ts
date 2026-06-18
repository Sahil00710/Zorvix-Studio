import { create } from "zustand";

interface AppState {
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),
}));
