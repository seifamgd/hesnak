import { r as useAppState } from "./store-CznF9jD2.js";
import { n as startReminderLoop } from "./reminders-DRiVw26F.js";
import { t as Route$5 } from "./category._id-C_luek9T.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CircleDot, Heart, Home, Settings } from "lucide-react";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-DlFIqMAd.css";
//#endregion
//#region src/lib/pwa.ts
async function registerSW() {
	if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
	const h = location.hostname;
	if ((() => {
		try {
			return window.self !== window.top;
		} catch {
			return true;
		}
	})() || h.startsWith("id-preview--") || h.startsWith("preview--") || new URLSearchParams(location.search).get("sw") === "off") {
		const regs = await navigator.serviceWorker.getRegistrations();
		await Promise.all(regs.filter((r) => r.active?.scriptURL.endsWith("/sw.js")).map((r) => r.unregister()));
		return;
	}
	try {
		await navigator.serviceWorker.register("/sw.js", { scope: "/" });
	} catch {}
}
//#endregion
//#region src/components/AppShell.tsx
var NAV = [
	{
		to: "/",
		label: "الرئيسية",
		Icon: Home
	},
	{
		to: "/tasbih",
		label: "التسبيح",
		Icon: CircleDot
	},
	{
		to: "/favorites",
		label: "المفضلة",
		Icon: Heart
	},
	{
		to: "/settings",
		label: "الإعدادات",
		Icon: Settings
	}
];
function AppShell({ children }) {
	const { settings } = useAppState();
	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = () => {
			const dark = settings.theme === "dark" || settings.theme === "system" && mq.matches;
			document.documentElement.classList.toggle("dark", dark);
		};
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, [settings.theme]);
	useEffect(() => {
		document.documentElement.style.setProperty("--zikr-size", [
			"1.35rem",
			"1.6rem",
			"1.95rem"
		][settings.fontSize] ?? "1.6rem");
	}, [settings.fontSize]);
	useEffect(() => {
		registerSW();
		return startReminderLoop();
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ jsx("main", {
			className: "mx-auto w-full max-w-2xl px-4 pt-safe pb-28",
			children
		}), /* @__PURE__ */ jsx("nav", {
			"aria-label": "التنقل الرئيسي",
			className: "fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur pb-safe",
			children: /* @__PURE__ */ jsx("ul", {
				className: "mx-auto flex max-w-2xl justify-around",
				children: NAV.map(({ to, label, Icon }) => /* @__PURE__ */ jsx("li", {
					className: "flex-1",
					children: /* @__PURE__ */ jsxs(Link, {
						to,
						activeOptions: { exact: to === "/" },
						className: "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs text-muted-foreground transition-colors",
						activeProps: {
							className: "text-primary font-bold",
							"aria-current": "page"
						},
						children: [/* @__PURE__ */ jsx(Icon, {
							className: "h-6 w-6",
							"aria-hidden": true
						}), label]
					})
				}, to))
			})
		})]
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "الصفحة غير موجودة"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex rounded-xl bg-primary px-5 py-3 text-primary-foreground",
						children: "العودة للرئيسية"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-xl font-semibold text-foreground",
				children: "حدث خطأ أثناء التحميل"
			}), /* @__PURE__ */ jsx("button", {
				onClick: () => {
					router.invalidate();
					reset();
				},
				className: "mt-6 rounded-xl bg-primary px-5 py-3 text-primary-foreground",
				children: "حاول مرة أخرى"
			})]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "حصنك" },
			{
				name: "description",
				content: "أذكار الصباح والمساء وأذكار اليوم والليلة من حصن المسلم."
			},
			{
				name: "theme-color",
				content: "#1f5f4f"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "حصنك"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(Outlet, {}) }), /* @__PURE__ */ jsx(Toaster$1, {
			position: "top-center",
			dir: "rtl"
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$3 = () => import("./routes-Cp1vloQY.js");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "حصنك — أذكار الصباح والمساء وحصن المسلم" },
		{
			name: "description",
			content: "تطبيق أذكار عربي: أذكار الصباح والمساء، بعد الصلاة، النوم، السفر وغيرها، مع عداد تسبيح ومفضلة وتذكير يومي."
		},
		{
			property: "og:title",
			content: "حصنك"
		},
		{
			property: "og:description",
			content: "أذكار صحيحة من حصن المسلم مع عداد تسبيح وتذكير يومي."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/favorites.tsx
var $$splitComponentImporter$2 = () => import("./favorites-oPL2Uoj0.js");
var Route$2 = createFileRoute("/favorites")({
	head: () => ({ meta: [
		{ title: "المفضلة — حصنك" },
		{
			name: "description",
			content: "الأذكار التي حفظتها في المفضلة."
		},
		{
			property: "og:title",
			content: "المفضلة — حصنك"
		},
		{
			property: "og:description",
			content: "أذكارك المفضلة في مكان واحد."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/settings.tsx
var $$splitComponentImporter$1 = () => import("./settings-Do4yv2m8.js");
var Route$1 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "الإعدادات — حصنك" },
		{
			name: "description",
			content: "حجم الخط، الوضع الليلي، الاهتزاز، والتذكير اليومي بأذكار الصباح والمساء."
		},
		{
			property: "og:title",
			content: "الإعدادات — حصنك"
		},
		{
			property: "og:description",
			content: "خصص تجربة الأذكار."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/tasbih.tsx
var $$splitComponentImporter = () => import("./tasbih-B464Ke14.js");
var Route = createFileRoute("/tasbih")({
	head: () => ({ meta: [
		{ title: "عداد التسبيح — حصنك" },
		{
			name: "description",
			content: "مسبحة إلكترونية بهدف 33 أو 100 أو عدد مخصص مع حفظ العدد الإجمالي."
		},
		{
			property: "og:title",
			content: "عداد التسبيح"
		},
		{
			property: "og:description",
			content: "مسبحة إلكترونية سهلة مع اهتزاز خفيف."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	FavoritesRoute: Route$2.update({
		id: "/favorites",
		path: "/favorites",
		getParentRoute: () => Route$4
	}),
	SettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$4
	}),
	TasbihRoute: Route.update({
		id: "/tasbih",
		path: "/tasbih",
		getParentRoute: () => Route$4
	}),
	CategoryIdRoute: Route$5.update({
		id: "/category/$id",
		path: "/category/$id",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
