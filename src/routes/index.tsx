import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AZKAR, CATEGORIES, byCategory, getCategory } from "@/data/azkar";
import { useAppState } from "@/lib/store";
import { InstallBanner } from "@/components/InstallBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "حصنك — أذكار الصباح والمساء وحصن المسلم" },
      { name: "description", content: "تطبيق أذكار عربي: أذكار الصباح والمساء، بعد الصلاة، النوم، السفر وغيرها، مع عداد تسبيح ومفضلة وتذكير يومي." },
      { property: "og:title", content: "حصنك" },
      { property: "og:description", content: "أذكار صحيحة من حصن المسلم مع عداد تسبيح وتذكير يومي." },
    ],
  }),
  component: Index,
});

function Index() {
  const { progress, last } = useAppState();
  const [dayIdx, setDayIdx] = useState(0);
  useEffect(() => {
    const d = Math.floor(Date.now() / 86400000);
    setDayIdx(d % AZKAR.length);
  }, []);
  const daily = AZKAR[dayIdx]!;
  const lastCat = last ? getCategory(last.category) : undefined;

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-primary">حصنك</h1>
        <p className="text-sm text-muted-foreground">﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾</p>
      </header>

      <section aria-labelledby="daily" className="rounded-3xl bg-hero p-5 text-primary-foreground shadow-soft dark:text-foreground">
        <h2 id="daily" className="mb-2 text-sm font-semibold opacity-90">✨ ذكر اليوم</h2>
        <p className="font-quran text-xl leading-loose line-clamp-5">{daily.text}</p>
        <p className="mt-2 text-xs opacity-80">{daily.source}</p>
      </section>

      {lastCat && last && (
        <Link
          to="/category/$id"
          params={{ id: lastCat.id }}
          search={{ i: last.index }}
          className="flex min-h-14 items-center justify-between rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-[0.98]"
        >
          <span>
            <span className="block text-xs text-muted-foreground">تابع من حيث توقفت</span>
            <span className="font-bold">
              {lastCat.emoji} {lastCat.title}
            </span>
          </span>
          <span className="text-sm text-primary">الذكر {last.index + 1} ←</span>
        </Link>
      )}

      <InstallBanner />

      <section aria-labelledby="cats">
        <h2 id="cats" className="mb-3 font-bold">الأقسام</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c) => {
            const items = byCategory(c.id);
            const done = items.filter((z) => (progress.counts[z.id] ?? 0) >= z.repeat).length;
            return (
              <li key={c.id}>
                <Link
                  to="/category/$id"
                  params={{ id: c.id }}
                  search={{ i: 0 }}
                  className="flex h-full min-h-28 flex-col justify-between rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-95"
                >
                  <span className="text-3xl" aria-hidden>{c.emoji}</span>
                  <span className="mt-2 text-sm font-bold leading-snug">{c.title}</span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {done} / {items.length} {done === items.length && items.length > 0 ? "✓" : ""}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
