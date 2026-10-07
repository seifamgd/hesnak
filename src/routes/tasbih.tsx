import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { setState, useAppState, vibrate } from "@/lib/store";

export const Route = createFileRoute("/tasbih")({
  head: () => ({
    meta: [
      { title: "عداد التسبيح — حصنك" },
      { name: "description", content: "مسبحة إلكترونية بهدف 33 أو 100 أو عدد مخصص مع حفظ العدد الإجمالي." },
      { property: "og:title", content: "عداد التسبيح" },
      { property: "og:description", content: "مسبحة إلكترونية سهلة مع اهتزاز خفيف." },
    ],
  }),
  component: Tasbih,
});

function Tasbih() {
  const { tasbih } = useAppState();
  const [custom, setCustom] = useState("");
  const pct = Math.min(1, tasbih.count / tasbih.target);
  const R = 120;
  const C = 2 * Math.PI * R;

  const tap = () => {
    const count = tasbih.count + 1;
    const hit = count % tasbih.target === 0;
    vibrate(hit ? [80, 50, 80] : 15);
    setState((s) => ({ ...s, tasbih: { ...s.tasbih, count, total: s.tasbih.total + 1 } }));
  };
  const setTarget = (t: number) => t > 0 && setState((s) => ({ ...s, tasbih: { ...s.tasbih, target: t } }));

  return (
    <div className="space-y-6 pt-2">
      <h1 className="text-2xl font-bold text-primary">📿 عداد التسبيح</h1>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="اختيار الهدف">
        {[33, 100].map((t) => (
          <button
            key={t}
            onClick={() => setTarget(t)}
            aria-pressed={tasbih.target === t}
            className={`min-h-12 rounded-xl px-5 font-bold ${tasbih.target === t ? "bg-primary text-primary-foreground" : "border bg-card"}`}
          >
            {t}
          </button>
        ))}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setTarget(parseInt(custom));
          }}
        >
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="مخصص"
            aria-label="هدف مخصص"
            className="min-h-12 w-24 rounded-xl border bg-card px-3"
          />
          <button className="min-h-12 rounded-xl border bg-card px-4">تعيين</button>
        </form>
      </div>

      <div className="flex justify-center">
        <button
          onClick={tap}
          aria-label={`سبّح. العدد ${tasbih.count}`}
          className="relative flex h-72 w-72 items-center justify-center rounded-full bg-hero text-primary-foreground shadow-soft transition-transform active:scale-95 dark:text-foreground"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 288 288" aria-hidden>
            <circle cx="144" cy="144" r={R} fill="none" strokeWidth="10" className="stroke-primary-foreground/20" />
            <circle
              cx="144"
              cy="144"
              r={R}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-gold transition-all duration-300"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct)}
            />
          </svg>
          <span className="text-center">
            <span className="block text-7xl font-bold tabular-nums" aria-live="polite">{tasbih.count}</span>
            <span className="text-sm opacity-80">من {tasbih.target}</span>
          </span>
        </button>
      </div>

      <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
        <span>
          <span className="block text-xs text-muted-foreground">المجموع الكلي</span>
          <span className="text-xl font-bold tabular-nums">{tasbih.total}</span>
        </span>
        <button
          onClick={() => setState((s) => ({ ...s, tasbih: { ...s.tasbih, count: 0 } }))}
          className="min-h-12 rounded-xl border px-5"
        >
          تصفير
        </button>
      </div>
    </div>
  );
}
