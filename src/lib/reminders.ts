// التذكير اليومي بأذكار الصباح والمساء
// ملاحظة: الإشعارات المحلية تعمل أثناء فتح التطبيق أو بقائه في الخلفية.
// على iOS (16.4+) تعمل الإشعارات فقط بعد تثبيت التطبيق على الشاشة الرئيسية.
// إرسال تذكير والتطبيق مغلق تماماً يحتاج خادم Push، وهو غير مُفعّل هنا.
import { getState, setState } from "./store";

async function notify(title: string, body: string) {
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) return reg.showNotification(title, { body, icon: "/icon-192.png", lang: "ar", dir: "rtl" });
    new Notification(title, { body, icon: "/icon-192.png", lang: "ar", dir: "rtl" });
  } catch {
    /* ignore */
  }
}

function check() {
  const { settings, lastNotified } = getState();
  if (!settings.remindersOn || typeof Notification === "undefined" || Notification.permission !== "granted") return;
  const now = new Date();
  const hm = now.toTimeString().slice(0, 5);
  const day = now.toLocaleDateString("en-CA");
  const items = [
    { key: "morning", time: settings.morningTime, title: "أذكار الصباح 🕌", body: "حان وقت أذكار الصباح، ابدأ يومك بذكر الله" },
    { key: "evening", time: settings.eveningTime, title: "أذكار المساء 🌙", body: "حان وقت أذكار المساء" },
  ];
  for (const it of items) {
    if (hm >= it.time && lastNotified[it.key] !== day) {
      setState((s) => ({ ...s, lastNotified: { ...s.lastNotified, [it.key]: day } }));
      // لا نرسل تذكيراً متأخراً أكثر من ساعة
      const [h = 0, m = 0] = it.time.split(":").map(Number);
      if (now.getHours() * 60 + now.getMinutes() - (h * 60 + m) <= 60) notify(it.title, it.body);
    }
  }
}

export function startReminderLoop() {
  check();
  const t = setInterval(check, 30_000);
  return () => clearInterval(t);
}

export async function requestPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.requestPermission();
}
