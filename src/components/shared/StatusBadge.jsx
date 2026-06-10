export default function StatusBadge({ status, className = "" }) {
  const s = String(status).toUpperCase();

  let bg = "bg-[#e8eaef]";
  let text = "text-[#696d76]";
  let label = status;
  let customStyle = "";

  if (s === "AVAILABLE") {
    bg = "bg-[#fdeed9]";
    text = "text-[#e87714]";
  } else if (s === "BOOKED" || s === "LUNAS" || s === "PAID") {
    bg = "bg-[#e5efeb]";
    text = "text-[#0a6d63]";
    if (s === "LUNAS" || s === "PAID") {
      // Untuk UI Learner, mereka pakai styling lunas yang agak beda (bg-teal-700 text-white)
      bg = "bg-teal-700";
      text = "text-white";
      label = "Lunas";
      customStyle = "text-sm font-bold px-3 py-1"; // Samakan dengan style font button
    }
  } else if (s === "UNPAID" || s === "BELUM BAYAR") {
    bg = "bg-orange-100";
    text = "text-orange-600";
    label = "Belum Bayar";
    customStyle = "text-sm font-bold px-3 py-1"; // Samakan dengan style font button
  } else if (s === "NON AVAILABLE") {
    bg = "bg-[#e8eaef]";
    text = "text-[#696d76]";
  }

  // Jika ada customStyle (Lunas/Belum Bayar), gunakan itu, jika tidak gunakan default 10px font-extrabold
  const finalStyle = className || (customStyle ? `inline-flex items-center justify-center rounded-full ${customStyle}` : "inline-flex items-center justify-center text-[10px] font-extrabold px-4 py-1.5 rounded-full tracking-wider");

  return (
    <span className={`${bg} ${text} ${finalStyle}`}>
      {label}
    </span>
  );
}
