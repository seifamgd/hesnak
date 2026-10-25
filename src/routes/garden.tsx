import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState, setState } from "@/lib/store";
import { House, TreePalm, Trees, Gem, Heart, Info, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/garden")({
  head: () => ({ meta: [{ title: "حديقتي — حصنك" }, { name: "description", content: "حديقة تفاعلية تشجعك على المحافظة على الذكر في تطبيق حصنك." }] }),
  component: Garden,
});

const ITEMS = [
  { id: "ikhlas", title: "سورة الإخلاص", text: "اقرأ سورة الإخلاص 10 مرات", detail: "ورد في الحديث الوعد ببيت في الجنة لمن قرأ سورة الإخلاص عشر مرات.", source: "مسند أحمد (15610)؛ صححه الألباني في صحيح الجامع (6472)", icon: House, symbol: "🏡", color: "from-amber-200 to-orange-100", unit: "بيت", threshold: 10 },
  { id: "palm", title: "سبحان الله العظيم وبحمده", text: "قل: سبحان الله العظيم وبحمده", detail: "ورد في الحديث أن من قالها غُرست له نخلة في الجنة.", source: "جامع الترمذي (3464)؛ صححه الألباني في صحيح الترمذي", icon: TreePalm, symbol: "🌴", color: "from-lime-200 to-emerald-100", unit: "نخلة", threshold: 1 },
  { id: "treasure", title: "لا حول ولا قوة إلا بالله", text: "قل: لا حول ولا قوة إلا بالله", detail: "وُصفت بأنها كنز من كنوز الجنة.", source: "صحيح البخاري (6384)، وصحيح مسلم (2704)", icon: Gem, symbol: "💎", color: "from-sky-200 to-cyan-100", unit: "كنز", threshold: 1 },
  { id: "trees", title: "التسبيح والتحميد والتهليل والتكبير", text: "سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر", detail: "ورد أن بكل واحدة من هذه الكلمات تُغرس شجرة في الجنة.", source: "سنن ابن ماجه (3807)؛ صححه الألباني في صحيح ابن ماجه", icon: Trees, symbol: "🌳", color: "from-green-200 to-lime-100", unit: "شجرة", threshold: 1 },
  { id: "bayt", title: "بيت الحمد", text: "بيت الحمد مرتبط بالصبر عند المصيبة", detail: "هذا الوعد ورد في سياق من مات له ولد فحمد الله واسترجع وصبر؛ لا يعني أن قول العبارة في أي وقت وحده يثبت هذا الوعد.", source: "جامع الترمذي (1021)؛ حسنه الألباني في صحيح الترمذي", icon: Heart, symbol: "🕌", color: "from-violet-200 to-rose-100", unit: "بيت الحمد", threshold: 1 },
];

function Garden() {
  const { garden } = useAppState();
  const [selected, setSelected] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const total = Object.values(garden).reduce((sum, n) => sum + n, 0);
  const chosen = ITEMS.find((item) => item.id === selected);
  const add = (id: string) => setState((s) => ({ ...s, garden: { ...s.garden, [id]: (s.garden[id] ?? 0) + 1 } }));
  const reset = () => setState((s) => ({ ...s, garden: {} }));

  return (
    <div className="space-y-5 pt-2">
      <header className="flex items-start justify-between gap-3">
        <div><p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">مساحة خاصة بيك</p><h1 className="mt-1 text-2xl font-bold text-primary">حديقتي في حصنك 🌿</h1><p className="mt-2 text-sm text-muted-foreground">كل ما تسجّل ذكر، حديقتك تكبر وتفكّرك بفضل الذكر.</p></div>
        <button onClick={() => setShowInfo(!showInfo)} aria-label="معلومات عن الحديقة" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-card"><Info className="h-5 w-5" /></button>
      </header>
      {showInfo && <div className="rounded-2xl border bg-card p-4 text-sm leading-7 text-muted-foreground">الحديقة وسيلة تشجيعية لتسجيل الأذكار وليست قياسًا للثواب أو ضمانًا له. الثواب والقبول بيد الله، والأيقونات لا تعني أن الأجر تحقق أو أن العدد المسجل يعادل وعدًا شرعيًا بعينه.</div>}

      <section className="relative isolate min-h-[310px] overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-gradient-to-b from-sky-100 via-emerald-100 to-emerald-300 p-4 shadow-soft dark:from-slate-800 dark:via-emerald-950 dark:to-emerald-900" aria-label="مشهد الحديقة">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/35 to-transparent" />
        <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-amber-200/80 blur-[1px]" />
        <div className="absolute -bottom-16 -left-8 h-48 w-[120%] rounded-[50%] bg-emerald-500/50" />
        <div className="absolute -bottom-20 left-1/4 h-44 w-[110%] rounded-[50%] bg-emerald-600/50" />
        <div className="relative z-10 flex items-center justify-between rounded-2xl border border-white/50 bg-white/55 px-4 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
          <span><span className="block text-xs text-emerald-950/70 dark:text-emerald-100/70">الذكر المسجّل</span><span className="text-2xl font-extrabold text-emerald-950 dark:text-white">{total}</span></span>
          <span className="text-left text-xs font-semibold text-emerald-950/80 dark:text-emerald-100">🌱 استمر على الذكر<br />خطوة صغيرة كل يوم</span>
        </div>
        <div className="relative z-10 mt-5 grid grid-cols-3 gap-3">
          {ITEMS.map((item, index) => {
            const count = garden[item.id] ?? 0;
            const Icon = item.icon;
            const amount = item.id === "ikhlas" ? Math.floor(count / 10) : item.id === "trees" ? count * 4 : count;
            return <button key={item.id} onClick={() => setSelected(item.id)} className={`flex min-h-[98px] flex-col items-center justify-center rounded-2xl border border-white/60 bg-gradient-to-br ${item.color} p-2 text-center shadow-md transition-transform active:scale-95 ${selected === item.id ? "ring-2 ring-emerald-800 ring-offset-2 ring-offset-emerald-200" : ""}`}>
              <span className="text-3xl" aria-hidden>{amount > 0 || (item.id === "bayt" && count > 0) ? item.symbol : index === 0 ? "🌱" : "🌿"}</span>
              <span className="mt-1 text-xs font-bold text-emerald-950">{item.id === "bayt" ? "تذكير بالحديث" : item.id === "ikhlas" ? `بيوت: ${amount}` : item.id === "trees" ? `أشجار: ${amount}` : `${item.unit}: ${amount}`}</span>
              <span className="mt-0.5 line-clamp-1 text-[10px] text-emerald-950/75">{item.title}</span>
              <Icon className="mt-1 h-4 w-4 text-emerald-900/70" aria-hidden />
            </button>;
          })}
        </div>
        <p className="relative z-10 mt-5 rounded-xl bg-emerald-950/15 px-3 py-2 text-center text-xs text-emerald-950 dark:text-emerald-50">حديقتك تفضل محفوظة على نفس الجهاز 🌱</p>
      </section>

      {chosen && <section className="rounded-2xl border bg-card p-4 shadow-soft">
        <div className="flex items-start gap-3"><span className="text-3xl">{chosen.symbol}</span><div className="min-w-0 flex-1"><h2 className="font-bold">{chosen.title}</h2><p className="mt-1 text-sm text-muted-foreground">{chosen.text}</p></div></div>
        <p className="mt-3 text-sm leading-7">{chosen.detail}</p><p className="mt-2 text-xs leading-6 text-muted-foreground">المصدر: {chosen.source}</p>
        {chosen.id === "bayt" ? (
          <button onClick={() => setSelected(null)} className="mt-4 min-h-12 w-full rounded-xl bg-primary px-4 font-bold text-primary-foreground">تم الاطلاع على الحديث</button>
        ) : (
          <><button onClick={() => add(chosen.id)} className="mt-4 min-h-12 w-full rounded-xl bg-primary px-4 font-bold text-primary-foreground">سجّل مرة واحدة ✓</button>
          <p className="mt-2 text-center text-xs text-muted-foreground">العدد المسجّل: {garden[chosen.id] ?? 0} — سجّل بعد ما تقول الذكر فعلًا.</p></>
        )}
      </section>}

      <section className="space-y-3"><h2 className="font-bold">اختار ذكر وابدأ 🌱</h2>{ITEMS.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setSelected(selected === item.id ? null : item.id)} className="flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-right transition-colors hover:bg-muted/50"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"><Icon className="h-6 w-6" /></span><span className="min-w-0 flex-1"><span className="block font-bold">{item.title}</span><span className="mt-1 block text-sm text-muted-foreground">{item.text}</span></span><span className="text-sm font-bold text-primary">{garden[item.id] ?? 0}</span></button>; })}</section>
      <button onClick={reset} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm text-muted-foreground"><RotateCcw className="h-4 w-4" /> تصفير الحديقة</button>
      <p className="pb-2 text-center text-xs leading-6 text-muted-foreground">تنبيه: الحديقة أداة تحفيزية فقط، وليست حسابًا للثواب. يُستحسن مراجعة تخريج الأحاديث مع مصدر موثوق قبل نشرها.</p>
    </div>
  );
}
