import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { byCategory, getCategory } from "@/data/azkar";
import { actions, useAppState, vibrate } from "@/lib/store";
import { CountBadge, FavButton, ZikrMeta } from "@/components/ZikrCard";

export const Route = createFileRoute("/category/$id")({
  validateSearch: (s: Record<string, unknown>) => ({ i: Number(s["i"]) || 0 }),
  loader: ({ params }) => {
    const cat = getCategory(params.id);
    if (!cat) throw notFound();
    return { title: cat.title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — حصنك` : "حصنك" },
      { name: "description", content: loaderData ? `${loaderData.title} من حصن المسلم بالتشكيل مع العدد والفضل والمصدر.` : "أذكار" },
      { property: "og:title", content: loaderData?.title ?? "حصنك" },
      { property: "og:description", content: "أذكار صحيحة بالتشكيل مع عداد التكرار." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useParams();
  const { i } = Route.useSearch();
  const nav = useNavigate({ from: Route.fullPath });
  const cat = getCategory(id)!;
  const items = byCategory(id);
  const idx = Math.min(Math.max(0, i), items.length - 1);
  const z = items[idx]!;
  const { progress, settings } = useAppState();
  const count = progress.counts[z.id] ?? 0;
  const done = count >= z.repeat;
  const completed = items.filter((x) => (progress.counts[x.id] ?? 0) >= x.repeat).length;
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const go = (n: number) => nav({ search: { i: n }, replace: true });

  useEffect(() => {
    actions.setLast(id, idx);
    return () => clearTimeout(timer.current);
  }, [id, idx]);

  const tap = () => {
    if (done) return;
    const n = count + 1;
    actions.setCount(z.id, n);
    vibrate(n >= z.repeat ? 60 : 15);
    if (n >= z.repeat && settings.autoAdvance && idx < items.length - 1) {
      timer.current = setTimeout(() => go(idx + 1), 500);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between pt-2">
        <Link to="/" aria-label="رجوع" className="flex h-12 w-12 items-center justify-center rounded-full">
          <ChevronRight className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold">
          {cat.emoji} {cat.title}
        </h1>
        <span className="w-12 text-center text-sm text-muted-foreground">
          {idx + 1}/{items.length}
        </span>
      </header>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={completed}
        aria-label="التقدم في القسم"
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(completed / items.length) * 100}%` }} />
      </div>

      <article key={z.id} className="animate-zikr rounded-3xl border bg-card p-5 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <CountBadge count={count} repeat={z.repeat} />
          <FavButton id={z.id} />
        </div>
        <button
          onClick={tap}
          aria-label={`اضغط للعد. ${count} من ${z.repeat}`}
          className={`block w-full rounded-2xl p-2 text-start transition-all active:scale-[0.99] ${done ? "opacity-70" : ""}`}
        >
          <p className="font-quran leading-[2.1]" style={{ fontSize: "var(--zikr-size, 1.6rem)" }}>
            {z.text}
          </p>
        </button>
        <div className="mt-4">
          <ZikrMeta z={z} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={tap}
            disabled={done}
            className="min-h-14 flex-1 rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition-transform active:scale-95 disabled:bg-success"
          >
            {done ? "✓ تمّ" : "اضغط للعد"}
          </button>
          <button
            onClick={() => actions.setCount(z.id, 0)}
            aria-label="إعادة عد هذا الذكر"
            className="flex h-14 w-14 items-center justify-center rounded-2xl border"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </article>

      <div className="flex gap-3">
        <button
          onClick={() => go(idx - 1)}
          disabled={idx === 0}
          className="flex min-h-12 flex-1 items-center justify-center gap-1 rounded-2xl border bg-card disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" /> السابق
        </button>
        <button
          onClick={() => go(idx + 1)}
          disabled={idx === items.length - 1}
          className="flex min-h-12 flex-1 items-center justify-center gap-1 rounded-2xl border bg-card disabled:opacity-40"
        >
          التالي <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      {completed === items.length && (
        <p className="rounded-2xl bg-secondary p-4 text-center font-bold text-secondary-foreground">
          🎉 أتممت {cat.title}، تقبّل الله منك
        </p>
      )}
    </div>
  );
}
