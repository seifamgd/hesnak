import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAppState } from "./store-CznF9jD2.mjs";
import { i as getCategory, t as AZKAR } from "./azkar-Dm19sdf5.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as FavButton, r as ZikrMeta } from "./ZikrCard-DQQ1dUfF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-oPL2Uoj0.js
var import_jsx_runtime = require_jsx_runtime();
function Favorites() {
	const { favorites } = useAppState();
	const list = AZKAR.filter((z) => favorites.includes(z.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-primary",
			children: "❤️ المفضلة"
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl border bg-card p-6 text-center text-muted-foreground",
			children: "لا توجد أذكار في المفضلة بعد. اضغط على القلب بجانب أي ذكر لإضافته."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: list.map((z) => {
				const c = getCategory(z.category);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border bg-card p-4 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/category/$id",
								params: { id: c.id },
								search: { i: 0 },
								className: "text-sm text-primary",
								children: [
									c.emoji,
									" ",
									c.title
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavButton, { id: z.id })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-quran leading-loose",
							style: { fontSize: "var(--zikr-size, 1.6rem)" },
							children: z.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "my-2 text-sm text-muted-foreground",
							children: ["التكرار: ", z.repeat]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZikrMeta, { z })
					]
				}, z.id);
			})
		})]
	});
}
//#endregion
export { Favorites as component };
