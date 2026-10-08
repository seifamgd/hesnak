import { i as vibrate, n as setState, r as useAppState } from "./store-CznF9jD2.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/tasbih.tsx?tsr-split=component
function Tasbih() {
	const { tasbih } = useAppState();
	const [custom, setCustom] = useState("");
	const pct = Math.min(1, tasbih.count / tasbih.target);
	const R = 120;
	const C = 2 * Math.PI * R;
	const tap = () => {
		const count = tasbih.count + 1;
		const hit = count % tasbih.target === 0;
		vibrate(hit ? [
			80,
			50,
			80
		] : 15);
		setState((s) => ({
			...s,
			tasbih: {
				...s.tasbih,
				count,
				total: s.tasbih.total + 1
			}
		}));
	};
	const setTarget = (t) => t > 0 && setState((s) => ({
		...s,
		tasbih: {
			...s.tasbih,
			target: t
		}
	}));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 pt-2",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold text-primary",
				children: "📿 عداد التسبيح"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				role: "group",
				"aria-label": "اختيار الهدف",
				children: [[33, 100].map((t) => /* @__PURE__ */ jsx("button", {
					onClick: () => setTarget(t),
					"aria-pressed": tasbih.target === t,
					className: `min-h-12 rounded-xl px-5 font-bold ${tasbih.target === t ? "bg-primary text-primary-foreground" : "border bg-card"}`,
					children: t
				}, t)), /* @__PURE__ */ jsxs("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						setTarget(parseInt(custom));
					},
					children: [/* @__PURE__ */ jsx("input", {
						type: "number",
						inputMode: "numeric",
						min: 1,
						value: custom,
						onChange: (e) => setCustom(e.target.value),
						placeholder: "مخصص",
						"aria-label": "هدف مخصص",
						className: "min-h-12 w-24 rounded-xl border bg-card px-3"
					}), /* @__PURE__ */ jsx("button", {
						className: "min-h-12 rounded-xl border bg-card px-4",
						children: "تعيين"
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-center",
				children: /* @__PURE__ */ jsxs("button", {
					onClick: tap,
					"aria-label": `سبّح. العدد ${tasbih.count}`,
					className: "relative flex h-72 w-72 items-center justify-center rounded-full bg-hero text-primary-foreground shadow-soft transition-transform active:scale-95 dark:text-foreground",
					children: [/* @__PURE__ */ jsxs("svg", {
						className: "absolute inset-0 -rotate-90",
						viewBox: "0 0 288 288",
						"aria-hidden": true,
						children: [/* @__PURE__ */ jsx("circle", {
							cx: "144",
							cy: "144",
							r: R,
							fill: "none",
							strokeWidth: "10",
							className: "stroke-primary-foreground/20"
						}), /* @__PURE__ */ jsx("circle", {
							cx: "144",
							cy: "144",
							r: R,
							fill: "none",
							strokeWidth: "10",
							strokeLinecap: "round",
							className: "stroke-gold transition-all duration-300",
							strokeDasharray: C,
							strokeDashoffset: C * (1 - pct)
						})]
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block text-7xl font-bold tabular-nums",
							"aria-live": "polite",
							children: tasbih.count
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-sm opacity-80",
							children: ["من ", tasbih.target]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between rounded-2xl border bg-card p-4",
				children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: "المجموع الكلي"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xl font-bold tabular-nums",
					children: tasbih.total
				})] }), /* @__PURE__ */ jsx("button", {
					onClick: () => setState((s) => ({
						...s,
						tasbih: {
							...s.tasbih,
							count: 0
						}
					})),
					className: "min-h-12 rounded-xl border px-5",
					children: "تصفير"
				})]
			})
		]
	});
}
//#endregion
export { Tasbih as component };
