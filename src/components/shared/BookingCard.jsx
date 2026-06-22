import { Calendar, Clock, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function BookingCard({ 
  image, 
  rating, 
  fallback, 
  title, 
  subtitle, 
  date, 
  time, 
  statusNode, 
  actionNode,
  accentColor // misal: "bg-[#0d7c6b]"
}) {
  return (
    <div className={`relative bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow overflow-hidden`}>
      {/* Accent Bar (Optional, mirip di JadwalBelajar) */}
      {accentColor && (
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`} />
      )}

      <div className="flex items-center gap-6 z-10">
        <div className="relative">
          {image ? (
            <img src={image} alt={title} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover" />
          ) : (
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-100">
              <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-xl font-bold">
                {fallback || title?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          )}

          {rating > 0 && (
            <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] sm:text-xs font-bold shadow-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              {rating}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h3>
            {subtitle && (
              <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold hidden sm:inline-flex">{subtitle}</span>
            )}
          </div>
          
          {/* Mobile subtitle fallback */}
          {subtitle && (
            <div className="mb-2 sm:hidden">
              <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">{subtitle}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 w-full md:w-auto z-10">
         {statusNode && (
           <div className="self-end md:self-center">
             {statusNode}
           </div>
         )}
         {actionNode}
      </div>
    </div>
  );
}
