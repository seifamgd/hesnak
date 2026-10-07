import { Heart, Check } from "lucide-react";
import type { Zikr } from "@/data/azkar";
import { actions, useAppState } from "@/lib/store";

export function FavButton({ id }: { id: string }) {
  const { favorites } = useAppState();
  const on = favorites.includes(id);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        actions.toggleFav(id);
      }}
      aria-pressed={on}
      aria-label={on ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      className="flex h-12 w-12 items-center justify-center rounded-full transition-transform active:scale-90"
    >
      <Heart className={`h-6 w-6 ${on ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
    </button>
  );
}

export function ZikrMeta({ z }: { z: Zikr }) {
  const { settings } = useAppState();
  return (
    <div className="space-y-2 text-sm">
      {settings.showVirtue && z.virtue && (
        <p className="rounded-xl bg-accent px-3 py-2 text-accent-foreground">
          <span className="font-bold">الفضل: </span>
          {z.virtue}
        </p>
      )}
      {settings.showSource && <p className="text-muted-foreground">📖 {z.source}</p>}
    </div>
  );
}

export function CountBadge({ count, repeat }: { count: number; repeat: number }) {
  const done = count >= repeat;
  return (
    <span
      className={`inline-flex min-w-20 items-center justify-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
        done ? "bg-success text-primary-foreground" : "bg-secondary text-secondary-foreground"
      }`}
    >
      {done && <Check className="h-4 w-4" aria-hidden />}
      {count} / {repeat}
    </span>
  );
}
