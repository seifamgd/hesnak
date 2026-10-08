import { i as getCategory } from "./azkar-Dm19sdf5.mjs";
import { J as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._id-C_luek9T.js
var $$splitComponentImporter = () => import("./category._id-B1OmzsrB.mjs");
var Route = createFileRoute("/category/$id")({
	validateSearch: (s) => ({ i: Number(s["i"]) || 0 }),
	loader: ({ params }) => {
		const cat = getCategory(params.id);
		if (!cat) throw notFound();
		return { title: cat.title };
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: loaderData ? `${loaderData.title} — حصنك` : "حصنك" },
		{
			name: "description",
			content: loaderData ? `${loaderData.title} من حصن المسلم بالتشكيل مع العدد والفضل والمصدر.` : "أذكار"
		},
		{
			property: "og:title",
			content: loaderData?.title ?? "حصنك"
		},
		{
			property: "og:description",
			content: "أذكار صحيحة بالتشكيل مع عداد التكرار."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
