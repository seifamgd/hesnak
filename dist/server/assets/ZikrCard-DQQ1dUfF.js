import { r as useAppState, t as actions } from "./store-CznF9jD2.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, Heart } from "lucide-react";
//#region src/components/ZikrCard.tsx
function FavButton({ id }) {
	const { favorites } = useAppState();
	const on = favorites.includes(id);
	return /* @__PURE__ */ jsx("button", {
		onClick: (e) => {
			e.stopPropagation();
			actions.toggleFav(id);
		},
		"aria-pressed": on,
		"aria-label": on ? "إزالة من المفضلة" : "إضافة إلى المفضلة",
		className: "flex h-12 w-12 items-center justify-center rounded-full transition-transform active:scale-90",
		children: /* @__PURE__ */ jsx(Heart, { className: `h-6 w-6 ${on ? "fill-destructive text-destructive" : "text-muted-foreground"}` })
	});
}
function ZikrMeta({ z }) {
	const { settings } = useAppState();
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2 text-sm",
		children: [settings.showVirtue && z.virtue && /* @__PURE__ */ jsxs("p", {
			className: "rounded-xl bg-accent px-3 py-2 text-accent-foreground",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-bold",
				children: "الفضل: "
			}), z.virtue]
		}), settings.showSource && /* @__PURE__ */ jsxs("p", {
			className: "text-muted-foreground",
			children: ["📖 ", z.source]
		})]
	});
}
function CountBadge({ count, repeat }) {
	const done = count >= repeat;
	return /* @__PURE__ */ jsxs("span", {
		className: `inline-flex min-w-20 items-center justify-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${done ? "bg-success text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
		children: [
			done && /* @__PURE__ */ jsx(Check, {
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
