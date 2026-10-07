import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Home, Heart, Settings, CircleDot } from "lucide-react";
import { useAppState } from "@/lib/store";
import { startReminderLoop } from "@/lib/reminders";
import { registerSW } from "@/lib/pwa";

const NAV = [
  { to: "/", label: "الرئيسية", Icon: Home },
  { to: "/tasbih", label: "التسبيح", Icon: CircleDot },
  { to: "/favorites", label: "المفضلة", Icon: Heart },
  { to: "/settings", label: "الإعدادات", Icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { settings } = useAppState();

  // الوضع الليلي + حجم الخط
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = settings.theme === "dark" || (settings.theme === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--zikr-size", ["1.35rem", "1.6rem", "1.95rem"][settings.fontSize] ?? "1.6rem");
  }, [settings.fontSize]);

  useEffect(() => {
    registerSW();
    return startReminderLoop();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto w-full max-w-2xl px-4 pt-safe pb-28">{children}</main>
      <nav
        aria-label="التنقل الرئيسي"
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur pb-safe"
      >
        <ul className="mx-auto flex max-w-2xl justify-around">
          {NAV.map(({ to, label, Icon }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs text-muted-foreground transition-colors"
                activeProps={{ className: "text-primary font-bold", "aria-current": "page" }}
              >
                <Icon className="h-6 w-6" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
