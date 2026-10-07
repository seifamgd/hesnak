import { createFileRoute, Link } from "@tanstack/react-router";
import { AZKAR, getCategory } from "@/data/azkar";
import { useAppState } from "@/lib/store";
import { FavButton, ZikrMeta } from "@/components/ZikrCard";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "المفضلة — حصنك" },
      { name: "description", content: "الأذكار التي حفظتها في المفضلة." },
      { property: "og:title", content: "المفضلة — حصنك" },
      { property: "og:description", content: "أذكارك المفضلة في مكان واحد." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { favorites } = useAppState();
  const list = AZKAR.filter((z) => favorites.includes(z.id));
  return (
    <div className="space-y-4 pt-2">
      <h1 className="text-2xl font-bold text-primary">❤️ المفضلة</h1>
      {list.length === 0 ? (
        <p className="rounded-2xl border bg-card p-6 text-center text-muted-foreground">
          لا توجد أذكار في المفضلة بعد. اضغط على القلب بجانب أي ذكر لإضافته.
        </p>
      ) : (
        <ul className="space-y-3">
          {list.map((z) => {
            const c = getCategory(z.category)!;
            return (
              <li key={z.id} className="rounded-2xl border bg-card p-4 shadow-soft">
                <div className="mb-2 flex items-center justify-between">
                  <Link to="/category/$id" params={{ id: c.id }} search={{ i: 0 }} className="text-sm text-primary">
                    {c.emoji} {c.title}
                  </Link>
                  <FavButton id={z.id} />
                </div>
                <p className="font-quran leading-loose" style={{ fontSize: "var(--zikr-size, 1.6rem)" }}>{z.text}</p>
                <p className="my-2 text-sm text-muted-foreground">التكرار: {z.repeat}</p>
                <ZikrMeta z={z} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
