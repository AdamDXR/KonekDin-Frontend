import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function TutorCard({ tutor, actionNode }) {
  const navigate = useNavigate();

  return (
    <div className="relative p-6 pt-5 border border-[#C6C5D4]/30 shadow-sm hover:shadow-md transition-all duration-300 rounded-[20px] group flex flex-col bg-white overflow-hidden h-full">
      {/* Ribbon - Top Tutor */}
      {tutor.isTopTutor && (
        <div className="absolute top-0 right-4 w-[46px] h-[52px] bg-gradient-to-b from-[#FBBF24] to-[#CA8A04] rounded-b-lg flex flex-col items-center justify-start pt-1.5 shadow-sm z-10">
          <Star className="w-3.5 h-3.5 fill-white text-white mb-0.5" />
          <span className="text-[8px] font-bold text-white text-center leading-[1.1]">TOP<br/>TUTOR</span>
        </div>
      )}

      {/* Top Section: Photo */}
      <div className="relative w-28 h-28 flex-shrink-0 rounded-[16px] overflow-hidden bg-slate-100 mb-4 shadow-sm border border-slate-100">
        <img 
          src={tutor.image || "https://i.pravatar.cc/150"} 
          alt={tutor.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {tutor.rating}
        </div>
      </div>

      {/* Name & University */}
      <div className="mb-4">
        <h3 className="font-bold text-[18px] text-[#1E1B4B] leading-tight line-clamp-1 mb-1">{tutor.name}</h3>
        <div className="text-[13px] text-[#454652] line-clamp-1">
          {tutor.university}
        </div>
      </div>

      {/* Courses Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tutor.courses?.map((course, index) => (
          <Badge key={index} className="bg-[#F1F5F9] text-[#312E81] hover:bg-[#e2e8f0] border-none shadow-none font-medium px-3 py-1 rounded-md text-xs">
            {course}
          </Badge>
        ))}
      </div>

      {/* Jadwal Tersedia */}
      {tutor.schedule && tutor.schedule.length > 0 && (
        <div className="mb-6 flex-grow">
          <p className="text-[11px] font-semibold text-[#767683] mb-3 tracking-wider">
            JADWAL TERSEDIA
          </p>
          <div className="space-y-2.5">
            {tutor.schedule.slice(0, 2).map((slot, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <span className="bg-[#EAF0E4] text-[#4A5D23] font-bold text-[10px] px-2.5 py-1 rounded-lg w-fit shrink-0 uppercase tracking-wide">
                  {slot.day}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {slot.times?.map((time, tIdx) => (
                    <span key={tIdx} className="bg-white border border-slate-200 text-slate-600 font-semibold text-[10px] px-2 py-1 rounded-md shadow-sm">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {tutor.schedule.length > 2 && (
              <button 
                onClick={() => navigate(`/learner/profil-tutor/${tutor.id}#jadwal-ketersediaan`)}
                className="w-full mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100 text-center"
              >
                Lihat {tutor.schedule.length - 2} jadwal lainnya...
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Action */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        {actionNode || (
          <Button 
            onClick={() => navigate(`/learner/profil-tutor/${tutor.id}`)}
            className="w-full bg-[#0a0f44] hover:bg-[#141a6e] text-white font-bold h-12 rounded-xl"
          >
            Lihat Profil Lengkap
          </Button>
        )}
      </div>
    </div>
  );
}
