import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { actions, setState, useAppState } from "@/lib/store";
import { requestPermission } from "@/lib/reminders";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — حصنك" },
      { name: "description", content: "حجم الخط، الوضع الليلي، الاهتزاز، والتذكير اليومي بأذكار الصباح والمساء." },
      { property: "og:title", content: "الإعدادات — حصنك" },
      { property: "og:description", content: "خصص تجربة الأذكار." },
    ],
  }),
  component: SettingsPage,
});

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-3 border-b py-2 last:border-0">
      <span className="font-semibold">{label}</span>
      {children}
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-8 w-14 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-card shadow transition-all ${on ? "right-7" : "right-1"}`} />
    </button>
  );
}

function Seg<T extends string | number>({ value, options, onChange }: { value: T; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-xl bg-muted p-1" role="radiogroup">
      {options.map((o) => (
        <button
          key={String(o.v)}
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={`min-h-10 rounded-lg px-3 text-sm ${value === o.v ? "bg-card font-bold shadow" : ""}`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

function SettingsPage() {
  const { settings: s } = useAppState();
  const [perm, setPerm] = useState<string>("default");
  useEffect(() => {
    setPerm(typeof Notification === "undefined" ? "unsupported" : Notification.permission);
  }, []);

  const enableReminders = async (v: boolean) => {
    if (!v) return actions.setSettings({ remindersOn: false });
    const p = await requestPermission();
    setPerm(p);
    if (p === "granted") {
      actions.setSettings({ remindersOn: true });
      toast.success("تم تفعيل التذكير، جزاك الله خيراً 🌿");
    } else if (p === "unsupported") {
      toast.error("متصفحك لا يدعم الإشعارات. على الآيفون ثبّت التطبيق أولاً على الشاشة الرئيسية.");
    } else {
      toast.error("لم يتم السماح بالإشعارات. يمكنك تفعيلها من إعدادات المتصفح.");
    }
  };

  return (
    <div className="space-y-5 pt-2">
      <h1 className="text-2xl font-bold text-primary">⚙️ الإعدادات</h1>

      <section className="rounded-2xl border bg-card px-4 shadow-soft">
        <Row label="حجم الخط">
          <Seg value={s.fontSize} onChange={(v) => actions.setSettings({ fontSize: v })} options={[{ v: 0, l: "صغير" }, { v: 1, l: "متوسط" }, { v: 2, l: "كبير" }]} />
        </Row>
        <Row label="المظهر">
          <Seg value={s.theme} onChange={(v) => actions.setSettings({ theme: v })} options={[{ v: "system", l: "تلقائي" }, { v: "light", l: "فاتح" }, { v: "dark", l: "داكن" }]} />
        </Row>
        <Row label="الاهتزاز">
          <Toggle label="الاهتزاز" on={s.vibrate} onChange={(v) => actions.setSettings({ vibrate: v })} />
        </Row>
        <Row label="الانتقال التلقائي للذكر التالي">
          <Toggle label="الانتقال التلقائي" on={s.autoAdvance} onChange={(v) => actions.setSettings({ autoAdvance: v })} />
        </Row>
        <Row label="إظهار الفضل">
          <Toggle label="إظهار الفضل" on={s.showVirtue} onChange={(v) => actions.setSettings({ showVirtue: v })} />
        </Row>
        <Row label="إظهار المصدر">
          <Toggle label="إظهار المصدر" on={s.showSource} onChange={(v) => actions.setSettings({ showSource: v })} />
        </Row>
      </section>

      <section className="rounded-2xl border bg-card px-4 pb-4 shadow-soft">
        <Row label="🔔 التذكير اليومي">
          <Toggle label="التذكير اليومي" on={s.remindersOn && perm === "granted"} onChange={enableReminders} />
        </Row>
        <Row label="وقت أذكار الصباح">
          <input type="time" value={s.morningTime} onChange={(e) => actions.setSettings({ morningTime: e.target.value })} className="min-h-11 rounded-xl border bg-background px-3" aria-label="وقت أذكار الصباح" />
        </Row>
        <Row label="وقت أذكار المساء">
          <input type="time" value={s.eveningTime} onChange={(e) => actions.setSettings({ eveningTime: e.target.value })} className="min-h-11 rounded-xl border bg-background px-3" aria-label="وقت أذكار المساء" />
        </Row>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          سنطلب إذنك لإرسال تذكير لطيف في الوقت الذي تختاره فقط. يصل التذكير عندما يكون التطبيق مفتوحاً أو في الخلفية.
          على الآيفون: ثبّت التطبيق على الشاشة الرئيسية أولاً لتعمل الإشعارات.
        </p>
      </section>

      <button
        onClick={() => {
          if (confirm("هل تريد تصفير تقدّم أذكار اليوم؟")) setState((st) => ({ ...st, progress: { ...st.progress, counts: {} } }));
        }}
        className="min-h-12 w-full rounded-2xl border border-destructive/40 text-destructive"
      >
        تصفير تقدّم اليوم
      </button>
    </div>
  );
}
