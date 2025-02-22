'use client';

import { create } from 'zustand';

interface FilterState {
  status: string;
  gender: string;
  species: string;
  origin: string;
  isCollapsed: boolean;
  theme: 'dark' | 'light'; // Tema durumu
  setFilter: (
    key: keyof Omit<
      FilterState,
      'setFilter' | 'toggleCollapsed' | 'setTheme' | 'isCollapsed' | 'theme'
    >,
    value: string
  ) => void;
  toggleCollapsed: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  status: '',
  gender: '',
  species: '',
  origin: '',
  isCollapsed: false,
  theme: 'dark', // Varsayılan tema: dark
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setTheme: (theme) => set({ theme }),
}));
