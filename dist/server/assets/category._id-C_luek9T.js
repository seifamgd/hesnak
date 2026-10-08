import { i as getCategory } from "./azkar-Dm19sdf5.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/category.$id.tsx
var $$splitComponentImporter = () => import("./category._id-B1OmzsrB.js");
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
