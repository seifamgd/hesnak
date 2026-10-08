import { n as setState, r as useAppState, t as actions } from "./store-CznF9jD2.js";
import { t as requestPermission } from "./reminders-DRiVw26F.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/routes/settings.tsx?tsr-split=component
function Row({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-14 items-center justify-between gap-3 border-b py-2 last:border-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "font-semibold",
			children: label
		}), children]
	});
}
function Toggle({ on, onChange, label }) {
	return /* @__PURE__ */ jsx("button", {
		role: "switch",
		"aria-checked": on,
		"aria-label": label,
		onClick: () => onChange(!on),
		className: `relative h-8 w-14 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`,
		children: /* @__PURE__ */ jsx("span", { className: `absolute top-1 h-6 w-6 rounded-full bg-card shadow transition-all ${on ? "right-7" : "right-1"}` })
	});
}
function Seg({ value, options, onChange }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex rounded-xl bg-muted p-1",
		role: "radiogroup",
		children: options.map((o) => /* @__PURE__ */ jsx("button", {
			role: "radio",
			"aria-checked": value === o.v,
			onClick: () => onChange(o.v),
			className: `min-h-10 rounded-lg px-3 text-sm ${value === o.v ? "bg-card font-bold shadow" : ""}`,
			children: o.l
		}, String(o.v)))
	});
}
function SettingsPage() {
	const { settings: s } = useAppState();
	const [perm, setPerm] = useState("default");
	useEffect(() => {
		setPerm(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
	}, []);
	const enableReminders = async (v) => {
		if (!v) return actions.setSettings({ remindersOn: false });
		const p = await requestPermission();
		setPerm(p);
		if (p === "granted") {
			actions.setSettings({ remindersOn: true });
			toast.success("تم تفعيل التذكير، جزاك الله خيراً 🌿");
		} else if (p === "unsupported") toast.error("متصفحك لا يدعم الإشعارات. على الآيفون ثبّت التطبيق أولاً على الشاشة الرئيسية.");
		else toast.error("لم يتم السماح بالإشعارات. يمكنك تفعيلها من إعدادات المتصفح.");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5 pt-2",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold text-primary",
				children: "⚙️ الإعدادات"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "rounded-2xl border bg-card px-4 shadow-soft",
				children: [
					/* @__PURE__ */ jsx(Row, {
						label: "حجم الخط",
						children: /* @__PURE__ */ jsx(Seg, {
							value: s.fontSize,
							onChange: (v) => actions.setSettings({ fontSize: v }),
							options: [
								{
									v: 0,
									l: "صغير"
								},
								{
									v: 1,
									l: "متوسط"
								},
								{
									v: 2,
									l: "كبير"
								}
							]
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "المظهر",
						children: /* @__PURE__ */ jsx(Seg, {
							value: s.theme,
							onChange: (v) => actions.setSettings({ theme: v }),
							options: [
								{
									v: "system",
									l: "تلقائي"
								},
								{
									v: "light",
									l: "فاتح"
								},
								{
									v: "dark",
									l: "داكن"
								}
							]
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "الاهتزاز",
						children: /* @__PURE__ */ jsx(Toggle, {
							label: "الاهتزاز",
							on: s.vibrate,
							onChange: (v) => actions.setSettings({ vibrate: v })
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "الانتقال التلقائي للذكر التالي",
						children: /* @__PURE__ */ jsx(Toggle, {
							label: "الانتقال التلقائي",
							on: s.autoAdvance,
							onChange: (v) => actions.setSettings({ autoAdvance: v })
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "إظهار الفضل",
						children: /* @__PURE__ */ jsx(Toggle, {
							label: "إظهار الفضل",
							on: s.showVirtue,
							onChange: (v) => actions.setSettings({ showVirtue: v })
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "إظهار المصدر",
						children: /* @__PURE__ */ jsx(Toggle, {
							label: "إظهار المصدر",
							on: s.showSource,
							onChange: (v) => actions.setSettings({ showSource: v })
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "rounded-2xl border bg-card px-4 pb-4 shadow-soft",
				children: [
					/* @__PURE__ */ jsx(Row, {
						label: "🔔 التذكير اليومي",
						children: /* @__PURE__ */ jsx(Toggle, {
							label: "التذكير اليومي",
							on: s.remindersOn && perm === "granted",
							onChange: enableReminders
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "وقت أذكار الصباح",
						children: /* @__PURE__ */ jsx("input", {
							type: "time",
							value: s.morningTime,
							onChange: (e) => actions.setSettings({ morningTime: e.target.value }),
							className: "min-h-11 rounded-xl border bg-background px-3",
							"aria-label": "وقت أذكار الصباح"
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "وقت أذكار المساء",
						children: /* @__PURE__ */ jsx("input", {
							type: "time",
							value: s.eveningTime,
							onChange: (e) => actions.setSettings({ eveningTime: e.target.value }),
							className: "min-h-11 rounded-xl border bg-background px-3",
							"aria-label": "وقت أذكار المساء"
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs leading-relaxed text-muted-foreground",
						children: "سنطلب إذنك لإرسال تذكير لطيف في الوقت الذي تختاره فقط. يصل التذكير عندما يكون التطبيق مفتوحاً أو في الخلفية. على الآيفون: ثبّت التطبيق على الشاشة الرئيسية أولاً لتعمل الإشعارات."
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					if (confirm("هل تريد تصفير تقدّم أذكار اليوم؟")) setState((st) => ({
						...st,
						progress: {
							...st.progress,
							counts: {}
						}
					}));
				},
				className: "min-h-12 w-full rounded-2xl border border-destructive/40 text-destructive",
				children: "تصفير تقدّم اليوم"
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
