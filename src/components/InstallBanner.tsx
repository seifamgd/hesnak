import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void> };

export function InstallBanner() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone;
    if (standalone || localStorage.getItem("install-dismissed")) return;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIos(isIos);
    if (isIos) setHidden(false);
    const h = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
      setHidden(false);
    };
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);

  if (hidden) return null;
  const dismiss = () => {
    localStorage.setItem("install-dismissed", "1");
    setHidden(true);
  };

  return (
    <div role="region" aria-label="تثبيت التطبيق" className="relative rounded-2xl border border-gold/40 bg-accent p-4 text-accent-foreground">
      <button onClick={dismiss} aria-label="إغلاق" className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center">
        <X className="h-5 w-5" />
      </button>
      <p className="font-bold">📲 ثبّت التطبيق على جوالك</p>
      {ios ? (
        <p className="mt-1 text-sm">
          من Safari: اضغط زر المشاركة <span aria-hidden>⬆️</span> ثم «إضافة إلى الشاشة الرئيسية».
        </p>
      ) : (
        <button
          onClick={async () => {
            await evt?.prompt();
            setHidden(true);
          }}
          className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-4 text-primary-foreground"
        >
          <Download className="h-5 w-5" /> ثبّت الآن
        </button>
      )}
    </div>
  );
}
