import { r as useAppState } from "./store-CznF9jD2.js";
import { i as getCategory, n as CATEGORIES, r as byCategory, t as AZKAR } from "./azkar-Dm19sdf5.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Download, X } from "lucide-react";
//#region src/components/InstallBanner.tsx
function InstallBanner() {
	const [evt, setEvt] = useState(null);
	const [ios, setIos] = useState(false);
	const [hidden, setHidden] = useState(true);
	useEffect(() => {
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
	return /* @__PURE__ */ jsxs("div", {
		role: "region",
		"aria-label": "تثبيت التطبيق",
		className: "relative rounded-2xl border border-gold/40 bg-accent p-4 text-accent-foreground",
		children: [
			/* @__PURE__ */ jsx("button", {
				onClick: dismiss,
				"aria-label": "إغلاق",
				className: "absolute left-2 top-2 flex h-10 w-10 items-center justify-center",
				children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ jsx("p", {
				className: "font-bold",
				children: "📲 ثبّت التطبيق على جوالك"
			}),
			ios ? /* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-sm",
				children: [
					"من Safari: اضغط زر المشاركة ",
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						children: "⬆️"
					}),
					" ثم «إضافة إلى الشاشة الرئيسية»."
				]
			}) : /* @__PURE__ */ jsxs("button", {
				onClick: async () => {
					await evt?.prompt();
					setHidden(true);
				},
				className: "mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-4 text-primary-foreground",
				children: [/* @__PURE__ */ jsx(Download, { className: "h-5 w-5" }), " ثبّت الآن"]
			})
		]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Index() {
	const { progress, last } = useAppState();
	const [dayIdx, setDayIdx] = useState(0);
	useEffect(() => {
		const d = Math.floor(Date.now() / 864e5);
		setDayIdx(d % AZKAR.length);
	}, []);
	const daily = AZKAR[dayIdx];
	const lastCat = last ? getCategory(last.category) : void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "pt-2",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-primary",
					children: "حصنك"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾"
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				"aria-labelledby": "daily",
				className: "rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft dark:text-foreground",
				children: [
					/* @__PURE__ */ jsx("h2", {
						id: "daily",
						className: "mb-2 text-sm font-semibold opacity-90",
						children: "✨ ذكر اليوم"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "font-quran text-xl leading-loose line-clamp-5",
						children: daily.text
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs opacity-80",
						children: daily.source
					})
				]
			}),
			lastCat && last && /* @__PURE__ */ jsxs(Link, {
				to: "/category/$id",
				params: { id: lastCat.id },
				search: { i: last.index },
				className: "flex min-h-14 items-center justify-between rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-[0.98]",
				children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: "تابع من حيث توقفت"
				}), /* @__PURE__ */ jsxs("span", {
					className: "font-bold",
					children: [
						lastCat.emoji,
						" ",
						lastCat.title
					]
				})] }), /* @__PURE__ */ jsxs("span", {
					className: "text-sm text-primary",
					children: [
						"الذكر ",
						last.index + 1,
						" ←"
					]
				})]
			}),
			/* @__PURE__ */ jsx(InstallBanner, {}),
			/* @__PURE__ */ jsxs("section", {
				"aria-labelledby": "cats",
				children: [/* @__PURE__ */ jsx("h2", {
					id: "cats",
					className: "mb-3 font-bold",
					children: "الأقسام"
				}), /* @__PURE__ */ jsx("ul", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: CATEGORIES.map((c) => {
						const items = byCategory(c.id);
						const done = items.filter((z) => (progress.counts[z.id] ?? 0) >= z.repeat).length;
						return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
							to: "/category/$id",
							params: { id: c.id },
							search: { i: 0 },
							className: "flex h-full min-h-28 flex-col justify-between rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-95",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-3xl",
									"aria-hidden": true,
									children: c.emoji
								}),
								/* @__PURE__ */ jsx("span", {
									className: "mt-2 text-sm font-bold leading-snug",
									children: c.title
								}),
								/* @__PURE__ */ jsxs("span", {
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
