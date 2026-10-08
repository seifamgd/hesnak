import "react";
//#region src/lib/store.ts
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
//#endregion
//#region src/lib/reminders.ts
async function notify(title, body) {
	try {
		const reg = await navigator.serviceWorker?.getRegistration();
		if (reg) return reg.showNotification(title, {
			body,
			icon: "/icon-192.png",
			lang: "ar",
			dir: "rtl"
		});
		new Notification(title, {
			body,
			icon: "/icon-192.png",
			lang: "ar",
			dir: "rtl"
		});
	} catch {}
}
function check() {
	const { settings, lastNotified } = getState();
	if (!settings.remindersOn || typeof Notification === "undefined" || Notification.permission !== "granted") return;
	const now = /* @__PURE__ */ new Date();
	const hm = now.toTimeString().slice(0, 5);
	const day = now.toLocaleDateString("en-CA");
	const items = [{
		key: "morning",
		time: settings.morningTime,
		title: "أذكار الصباح 🕌",
		body: "حان وقت أذكار الصباح، ابدأ يومك بذكر الله"
	}, {
		key: "evening",
		time: settings.eveningTime,
		title: "أذكار المساء 🌙",
		body: "حان وقت أذكار المساء"
	}];
	for (const it of items) if (hm >= it.time && lastNotified[it.key] !== day) {
		setState((s) => ({
			...s,
			lastNotified: {
				...s.lastNotified,
				[it.key]: day
			}
		}));
		const [h = 0, m = 0] = it.time.split(":").map(Number);
		if (now.getHours() * 60 + now.getMinutes() - (h * 60 + m) <= 60) notify(it.title, it.body);
	}
}
function startReminderLoop() {
	check();
	const t = setInterval(check, 3e4);
	return () => clearInterval(t);
}
async function requestPermission() {
	if (typeof Notification === "undefined") return "unsupported";
	return Notification.requestPermission();
}
//#endregion
export { startReminderLoop as n, requestPermission as t };
