import { create } from 'zustand';

type Mode = 'light' | 'dark';

type State = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
};

export const useThemeStore = create<State>((set) => ({
  mode: 'light',
  setMode: (m) => set({ mode: m }),
  toggle: () => set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
}));
