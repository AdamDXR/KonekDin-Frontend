import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowRight,
  BellRing,
  BookMarked,
  CalendarDays,
  CheckCircle2,
  FileText,
  Mail,
  MessageSquareMore,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPE_CONFIG = {
  application: {
    label: "Pengajuan Tutor",
    accent: "bg-violet-500",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    titleColor: "text-violet-700",
    icon: FileText,
    keywords: ["pengajuan", "tutor", "admin", "disetujui", "ditolak", "peninjauan"],
  },
  booking: {
    label: "Pesanan Baru",
    accent: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    titleColor: "text-emerald-700",
    icon: BookMarked,
    keywords: ["pesanan", "memesan", "booking", "jadwal"],
    action: { label: "Lihat Jadwal Mengajar", href: "/tutor/jadwal-mengajar" },
  },
  review: {
    label: "Ulasan Baru",
    accent: "bg-amber-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    titleColor: "text-amber-700",
    icon: MessageSquareMore,
    keywords: ["ulasan", "bintang", "review", "learner"],
    action: { label: "Lihat Ulasan", href: "/tutor/ulasan" },
  },
  payment: {
    label: "Pembayaran",
    accent: "bg-teal-500",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    titleColor: "text-teal-700",
    icon: CheckCircle2,
    keywords: ["pembayaran", "dana", "transfer", "lunas", "verifikasi"],
  },
  session_reminder: {
    label: "Pengingat Sesi",
    accent: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    titleColor: "text-orange-600",
    icon: CalendarDays,
    keywords: ["sesi", "belajar", "mengajar", "besok", "30 menit", "jadwal"],
    action: { label: "Lihat Jadwal Mengajar", href: "/tutor/jadwal-mengajar" },
  },
  session_reminder_h1: {
    label: "Pengingat H-1",
    accent: "bg-slate-700",
    iconBg: "bg-slate-200",
    iconColor: "text-slate-700",
    titleColor: "text-slate-700",
    icon: BellRing,
    keywords: ["h-1", "besok", "jadwal", "mengajar", "siapkan"],
    action: { label: "Lihat Jadwal Mengajar", href: "/tutor/jadwal-mengajar" },
  },
};

const TYPE_ALIASES = {
  application: ["application", "pengajuan"],
  booking: ["booking", "pesanan", "order"],
  review: ["review", "ulasan"],
  payment: ["payment", "pembayaran", "paid", "withdraw", "transfer"],
  session_reminder: ["session_reminder", "reminder", "pengingat"],
  session_reminder_h1: ["session_reminder_h1", "h-1", "reminder_h1", "besok"],
};

function getTypeKey(type) {
  const normalized = String(type || "").toLowerCase();
  return (
    Object.keys(TYPE_ALIASES).find((key) =>
      TYPE_ALIASES[key].some((alias) => normalized.includes(alias))
  ) || "session_reminder_h1"
  );
}

function formatMessage(message) {
  if (Array.isArray(message)) {
    return message
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object") return part.bold || part.text || "";
        return "";
      })
      .join("");
  }

  return String(message || "");
}

function extractDisplaySegments(notification, keywords = []) {
  const text = formatMessage(notification.message);
  if (!text) return [{ text: "Tidak ada detail notifikasi.", bold: false }];

  const segments = [];
  let cursor = 0;
  const lower = text.toLowerCase();

  while (cursor < text.length) {
    const matches = keywords
      .map((keyword) => ({
        keyword,
        index: lower.indexOf(keyword.toLowerCase(), cursor),
      }))
      .filter((item) => item.index >= cursor)
      .sort((a, b) => a.index - b.index);

    const match = matches[0];
    if (!match) {
      segments.push({ text: text.slice(cursor), bold: false });
      break;
    }

    if (match.index > cursor) {
      segments.push({ text: text.slice(cursor, match.index), bold: false });
    }

    segments.push({
      text: text.slice(match.index, match.index + match.keyword.length),
      bold: true,
    });
    cursor = match.index + match.keyword.length;
  }

  return segments.filter((segment) => segment.text);
}

function getNotificationDate(notification) {
  const raw =
    notification.created_at ||
    notification.date ||
    notification.sent_at ||
    notification.updated_at ||
    notification.raw?.created_at ||
    notification.raw?.date ||
    "";

  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatRelativeDate(date) {
  if (!date) return "Hari ini";

  const now = new Date();
  const diffDays = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      86400000
  );

  if (diffDays === 0) return "HARI INI";
  if (diffDays === 1) return "KEMARIN";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatRelativeTime(date) {
  if (!date) return "Sekarang";

  const diffMs = Date.now() - date.getTime();
  if (diffMs < 10_000) return "Sekarang";

  let relative = formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: id,
  });

  relative = relative.replace(/^sekitar\s+/i, "");
  relative = relative.replace(/^kurang dari\s+/i, "");
  relative = relative.replace(/^1 menit yang lalu$/i, "1 menit yang lalu");

  return relative.charAt(0).toUpperCase() + relative.slice(1);
}

function groupNotifications(items) {
  const map = new Map();

  items.forEach((item) => {
    const label = formatRelativeDate(getNotificationDate(item));
    if (!map.has(label)) map.set(label, []);
    map.get(label).push(item);
  });

  return Array.from(map.entries()).map(([group, groupItems]) => ({
    group,
    items: groupItems,
  }));
}

function NotificationCard({ notification, onAction }) {
  const typeKey = getTypeKey(notification.type);
  const cfg = TYPE_CONFIG[typeKey];
  const Icon = cfg.icon;
  const relativeTime = formatRelativeTime(getNotificationDate(notification));
  const segments = useMemo(
    () => extractDisplaySegments(notification, cfg.keywords),
    [notification, cfg.keywords]
  );

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm bg-white">
      <div className="flex">
        <div className={`w-1 flex-shrink-0 ${cfg.accent}`} />

        <div className="flex-1 px-5 py-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="min-w-0">
              <h3 className={`text-sm font-bold leading-tight ${cfg.titleColor}`}>
                {notification.title || cfg.label}
              </h3>
            </div>

            <span
              className="flex-shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-slate-500 bg-slate-100"
            >
              {relativeTime}
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {segments.map((segment, idx) =>
              segment.bold ? (
                <strong key={idx} className="font-semibold text-slate-900">
                  {segment.text}
                </strong>
              ) : (
                <span key={idx}>{segment.text}</span>
              )
            )}
          </p>

          {cfg.action && (
            <Button
              onClick={() => onAction(cfg.action.href)}
              className="mt-4 bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-5 py-2 h-auto rounded-xl text-sm gap-2"
            >
              {cfg.action.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-start pt-4 pr-5">
          <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
            <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Notifikasi() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchNotifications = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get("/tutor/notifications");
        if (ignore) return;

        const list = response.data?.data ?? [];
        const formatted = list.map((item) => ({
          id: item.id,
          type: item.type || item.category || item.notification_type || "session_reminder_h1",
          title: item.title || "",
          message: item.message || item.data?.message || "",
          read_at: item.read_at || null,
          created_at: item.created_at || item.date || item.sent_at || null,
          raw: item,
        }));

        const sorted = formatted.sort((a, b) => {
          const da = getNotificationDate(a)?.getTime() || 0;
          const db = getNotificationDate(b)?.getTime() || 0;
          return db - da;
        });

        setNotifications(sorted);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Gagal mengambil notifikasi.");
          setNotifications([]);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchNotifications();

    return () => {
      ignore = true;
    };
  }, []);

  const groups = useMemo(() => groupNotifications(notifications), [notifications]);

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Notifikasi</h1>
        <p className="text-slate-500">Update terbaru untuk perjalanan mengajar Anda.</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
          Memuat notifikasi...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-10 text-center text-rose-500">
          {error}
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
          Tidak ada notifikasi baru
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.group}>
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 mb-3 px-1">
                {group.group}
              </p>

              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <NotificationCard
                    key={item.id}
                    notification={item}
                    onAction={(href) => navigate(href)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
