import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as vibrate, r as useAppState, t as actions } from "./store-CznF9jD2.mjs";
import { i as getCategory, r as byCategory } from "./azkar-Dm19sdf5.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./category._id-C_luek9T.mjs";
import { c as ChevronRight, l as ChevronLeft, r as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as FavButton, r as ZikrMeta, t as CountBadge } from "./ZikrCard-DQQ1dUfF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._id-B1OmzsrB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { id } = Route.useParams();
	const { i } = Route.useSearch();
	const nav = useNavigate({ from: Route.fullPath });
	const cat = getCategory(id);
	const items = byCategory(id);
	const idx = Math.min(Math.max(0, i), items.length - 1);
	const z = items[idx];
	const { progress, settings } = useAppState();
	const count = progress.counts[z.id] ?? 0;
	const done = count >= z.repeat;
	const completed = items.filter((x) => (progress.counts[x.id] ?? 0) >= x.repeat).length;
	const timer = (0, import_react.useRef)(void 0);
	const go = (n) => nav({
		search: { i: n },
		replace: true
	});
	(0, import_react.useEffect)(() => {
		actions.setLast(id, idx);
		return () => clearTimeout(timer.current);
	}, [id, idx]);
	const tap = () => {
		if (done) return;
		const n = count + 1;
		actions.setCount(z.id, n);
		vibrate(n >= z.repeat ? 60 : 15);
		if (n >= z.repeat && settings.autoAdvance && idx < items.length - 1) timer.current = setTimeout(() => go(idx + 1), 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "رجوع",
						className: "flex h-12 w-12 items-center justify-center rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-lg font-bold",
						children: [
							cat.emoji,
							" ",
							cat.title
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "w-12 text-center text-sm text-muted-foreground",
						children: [
							idx + 1,
							"/",
							items.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "progressbar",
				"aria-valuemin": 0,
				"aria-valuemax": items.length,
				"aria-valuenow": completed,
				"aria-label": "التقدم في القسم",
				className: "h-2 overflow-hidden rounded-full bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-gold transition-all duration-500",
					style: { width: `${completed / items.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "animate-zikr rounded-3xl border bg-card p-5 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountBadge, {
							count,
							repeat: z.repeat
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavButton, { id: z.id })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: tap,
						"aria-label": `اضغط للعد. ${count} من ${z.repeat}`,
						className: `block w-full rounded-2xl p-2 text-start transition-all active:scale-[0.99] ${done ? "opacity-70" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-quran leading-[2.1]",
							style: { fontSize: "var(--zikr-size, 1.6rem)" },
							children: z.text
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZikrMeta, { z })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: tap,
							disabled: done,
							className: "min-h-14 flex-1 rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition-transform active:scale-95 disabled:bg-success",
							children: done ? "✓ تمّ" : "اضغط للعد"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => actions.setCount(z.id, 0),
							"aria-label": "إعادة عد هذا الذكر",
							className: "flex h-14 w-14 items-center justify-center rounded-2xl border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" })
						})]
					})
				]
			}, z.id),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => go(idx - 1),
					disabled: idx === 0,
					className: "flex min-h-12 flex-1 items-center justify-center gap-1 rounded-2xl border bg-card disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" }), " السابق"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => go(idx + 1),
					disabled: idx === items.length - 1,
					className: "flex min-h-12 flex-1 items-center justify-center gap-1 rounded-2xl border bg-card disabled:opacity-40",
					children: ["التالي ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })]
				})]
			}),
			completed === items.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-2xl bg-secondary p-4 text-center font-bold text-secondary-foreground",
				children: [
					"🎉 أتممت ",
					cat.title,
					"، تقبّل الله منك"
				]
			})
		]
	});
}
//#endregion
export { CategoryPage as component };
