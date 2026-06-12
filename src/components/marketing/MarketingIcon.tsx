import {
  ArrowRight,
  CalendarCheck,
  LayoutGrid,
  Mic2,
  Newspaper,
  ShoppingBag,
  Store,
  TrendingUp,
  Users,
  Video,
  Check,
} from "lucide-react";

const icons = {
  "arrow-right": ArrowRight,
  "calendar-check": CalendarCheck,
  "layout-grid": LayoutGrid,
  "mic-2": Mic2,
  newspaper: Newspaper,
  "shopping-bag": ShoppingBag,
  store: Store,
  "trending-up": TrendingUp,
  users: Users,
  video: Video,
  check: Check,
};

type IconName = keyof typeof icons;

export function MarketingIcon({ name }: { name: string }) {
  const LucideIcon = icons[name as IconName];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon className="lucide-react-icon" aria-hidden="true" />;
}
