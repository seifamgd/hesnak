import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAppState } from "./store-CznF9jD2.mjs";
import { i as getCategory, n as CATEGORIES, r as byCategory, t as AZKAR } from "./azkar-Dm19sdf5.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Download, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cp1vloQY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InstallBanner() {
	const [evt, setEvt] = (0, import_react.useState)(null);
	const [ios, setIos] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone || localStorage.getItem("install-dismissed")) return;
		const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
		setIos(isIos);
		if (isIos) setHidden(false);
		const h = (e) => {
			e.preventDefault();
			setEvt(e);
			setHidden(false);
		};
		window.addEventListener("beforeinstallprompt", h);
		return () => window.removeEventListener("beforeinstallprompt", h);
	}, []);
	if (hidden) return null;
	const dismiss = () => {
		localStorage.setItem("install-dismissed", "1");
		setHidden(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "region",
		"aria-label": "تثبيت التطبيق",
		className: "relative rounded-2xl border border-gold/40 bg-accent p-4 text-accent-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: dismiss,
				"aria-label": "إغلاق",
				className: "absolute left-2 top-2 flex h-10 w-10 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-bold",
				children: "📲 ثبّت التطبيق على جوالك"
			}),
			ios ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm",
				children: [
					"من Safari: اضغط زر المشاركة ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "⬆️"
					}),
					" ثم «إضافة إلى الشاشة الرئيسية»."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: async () => {
					await evt?.prompt();
					setHidden(true);
				},
				className: "mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-4 text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" }), " ثبّت الآن"]
			})
		]
	});
}
function Index() {
	const { progress, last } = useAppState();
	const [dayIdx, setDayIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const d = Math.floor(Date.now() / 864e5);
		setDayIdx(d % AZKAR.length);
	}, []);
	const daily = AZKAR[dayIdx];
	const lastCat = last ? getCategory(last.category) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-primary",
					children: "حصنك"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "daily",
				className: "rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft dark:text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "daily",
						className: "mb-2 text-sm font-semibold opacity-90",
						children: "✨ ذكر اليوم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-quran text-xl leading-loose line-clamp-5",
						children: daily.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs opacity-80",
						children: daily.source
					})
				]
			}),
			lastCat && last && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/category/$id",
				params: { id: lastCat.id },
				search: { i: last.index },
				className: "flex min-h-14 items-center justify-between rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-[0.98]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted-foreground",
					children: "تابع من حيث توقفت"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold",
					children: [
						lastCat.emoji,
						" ",
						lastCat.title
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-primary",
					children: [
						"الذكر ",
						last.index + 1,
						" ←"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "cats",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "cats",
					className: "mb-3 font-bold",
					children: "الأقسام"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: CATEGORIES.map((c) => {
						const items = byCategory(c.id);
						const done = items.filter((z) => (progress.counts[z.id] ?? 0) >= z.repeat).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/category/$id",
							params: { id: c.id },
							search: { i: 0 },
							className: "flex h-full min-h-28 flex-col justify-between rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-95",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl",
									"aria-hidden": true,
									children: c.emoji
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 text-sm font-bold leading-snug",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										done,
										" / ",
										items.length,
										" ",
										done === items.length && items.length > 0 ? "✓" : ""
									]
								})
							]
						}) }, c.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
