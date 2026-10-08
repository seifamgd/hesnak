import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAppState, t as actions } from "./store-CznF9jD2.mjs";
import { a as Heart, u as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ZikrCard-DQQ1dUfF.js
var import_jsx_runtime = require_jsx_runtime();
function FavButton({ id }) {
	const { favorites } = useAppState();
	const on = favorites.includes(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: (e) => {
			e.stopPropagation();
			actions.toggleFav(id);
		},
		"aria-pressed": on,
		"aria-label": on ? "إزالة من المفضلة" : "إضافة إلى المفضلة",
		className: "flex h-12 w-12 items-center justify-center rounded-full transition-transform active:scale-90",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-6 w-6 ${on ? "fill-destructive text-destructive" : "text-muted-foreground"}` })
	});
}
function ZikrMeta({ z }) {
	const { settings } = useAppState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 text-sm",
		children: [settings.showVirtue && z.virtue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "rounded-xl bg-accent px-3 py-2 text-accent-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-bold",
				children: "الفضل: "
			}), z.virtue]
		}), settings.showSource && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted-foreground",
			children: ["📖 ", z.source]
		})]
	});
}
function CountBadge({ count, repeat }) {
	const done = count >= repeat;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex min-w-20 items-center justify-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${done ? "bg-success text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
		children: [
			done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "h-4 w-4",
				"aria-hidden": true
			}),
			count,
			" / ",
			repeat
		]
	});
}
//#endregion
export { FavButton as n, ZikrMeta as r, CountBadge as t };
