import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CznF9jD2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var today = () => (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
var DEFAULT = {
	settings: {
		fontSize: 1,
		theme: "system",
		vibrate: true,
		autoAdvance: true,
		showVirtue: true,
		showSource: true,
		morningTime: "06:00",
		eveningTime: "17:00",
		remindersOn: false
	},
	favorites: [],
	progress: {
		date: "",
		counts: {}
	},
	last: null,
	tasbih: {
		count: 0,
		total: 0,
		target: 33
	},
	lastNotified: {}
};
var KEY = "azkar-state-v1";
var state = DEFAULT;
var loaded = false;
var listeners = /* @__PURE__ */ new Set();
function load() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) {
			const p = JSON.parse(raw);
			state = {
				...DEFAULT,
				...p,
				settings: {
					...DEFAULT.settings,
					...p.settings
				},
				tasbih: {
					...DEFAULT.tasbih,
					...p.tasbih
				}
			};
		}
	} catch {}
	if (state.progress.date !== today()) state = {
		...state,
		progress: {
			date: today(),
			counts: {}
		}
	};
}
function setState(fn) {
	load();
	state = fn(state);
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {}
	listeners.forEach((l) => l());
}
function getState() {
	load();
	return state;
}
function subscribe(l) {
	listeners.add(l);
	if (!loaded) {
		load();
		queueMicrotask(l);
	}
	return () => listeners.delete(l);
}
function useAppState() {
	return (0, import_react.useSyncExternalStore)(subscribe, getState, () => DEFAULT);
}
var actions = {
	toggleFav: (id) => setState((s) => ({
		...s,
		favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id]
	})),
	setCount: (id, n) => setState((s) => ({
		...s,
		progress: {
			date: today(),
			counts: {
				...s.progress.date === today() ? s.progress.counts : {},
				[id]: n
			}
		}
	})),
	setLast: (category, index) => setState((s) => ({
		...s,
		last: {
			category,
			index
		}
	})),
	setSettings: (p) => setState((s) => ({
		...s,
		settings: {
			...s.settings,
			...p
		}
	}))
};
function vibrate(ms = 15) {
	if (getState().settings.vibrate && typeof navigator !== "undefined" && "vibrate" in navigator) try {
		navigator.vibrate(ms);
	} catch {}
}
//#endregion
export { vibrate as i, setState as n, useAppState as r, actions as t };
