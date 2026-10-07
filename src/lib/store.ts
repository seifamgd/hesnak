// حالة التطبيق المحفوظة في localStorage
import { useSyncExternalStore } from "react";

export type Settings = {
  fontSize: 0 | 1 | 2;
  theme: "system" | "light" | "dark";
  vibrate: boolean;
  autoAdvance: boolean;
  showVirtue: boolean;
  showSource: boolean;
  morningTime: string;
  eveningTime: string;
  remindersOn: boolean;
};

export type State = {
  settings: Settings;
  favorites: string[];
  progress: { date: string; counts: Record<string, number> };
  last: { category: string; index: number } | null;
  tasbih: { count: number; total: number; target: number };
  lastNotified: Record<string, string>;
};

const today = () => new Date().toLocaleDateString("en-CA");

const DEFAULT: State = {
  settings: {
    fontSize: 1,
    theme: "system",
    vibrate: true,
    autoAdvance: true,
    showVirtue: true,
    showSource: true,
    morningTime: "06:00",
    eveningTime: "17:00",
    remindersOn: false,
  },
  favorites: [],
  progress: { date: "", counts: {} },
  last: null,
  tasbih: { count: 0, total: 0, target: 33 },
  lastNotified: {},
};

const KEY = "azkar-state-v1";
let state: State = DEFAULT;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      state = { ...DEFAULT, ...p, settings: { ...DEFAULT.settings, ...p.settings }, tasbih: { ...DEFAULT.tasbih, ...p.tasbih } };
    }
  } catch {
    /* ignore */
  }
  // تصفير التقدم اليومي
  if (state.progress.date !== today()) state = { ...state, progress: { date: today(), counts: {} } };
}

export function setState(fn: (s: State) => State) {
  load();
  state = fn(state);
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function getState() {
  load();
  return state;
}

function subscribe(l: () => void) {
  listeners.add(l);
  if (!loaded) {
    load();
    queueMicrotask(l);
  }
  return () => listeners.delete(l);
}

export function useAppState(): State {
  return useSyncExternalStore(subscribe, getState, () => DEFAULT);
}

export const actions = {
  toggleFav: (id: string) =>
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id],
    })),
  setCount: (id: string, n: number) =>
    setState((s) => ({
      ...s,
      progress: { date: today(), counts: { ...(s.progress.date === today() ? s.progress.counts : {}), [id]: n } },
    })),
  setLast: (category: string, index: number) => setState((s) => ({ ...s, last: { category, index } })),
  setSettings: (p: Partial<Settings>) => setState((s) => ({ ...s, settings: { ...s.settings, ...p } })),
};

export function vibrate(ms: number | number[] = 15) {
  if (getState().settings.vibrate && typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* ignore */
    }
  }
}
