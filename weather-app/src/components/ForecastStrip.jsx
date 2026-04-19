import { WMO, WMO_ICON } from "../utils/formatters";

export default function ForecastStrip({ forecast }) {
  return (
    <div style={s.section}>
      <p style={s.title}>7-Day Forecast</p>
      <div style={s.grid}>
        {forecast.map((day, i) => (
          <div key={day.date} style={{ ...s.card, ...(i === 0 ? s.today : {}) }}>
            <p style={s.day}>{i === 0 ? "Today" : day.day}</p>
            <p style={s.icon}>{WMO_ICON(day.code)}</p>
            <p style={s.desc}>{WMO[day.code] || "—"}</p>
            <div style={s.temps}>
              <span style={s.max}>{Math.round(day.max)}°</span>
              <span style={s.min}>{Math.round(day.min)}°</span>
            </div>
            {day.precip > 0 && (
              <p style={s.precip}>{day.precip} mm</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  section: { padding:"0 2rem 2rem" },
  title: {
    fontSize:"0.68rem", fontWeight:"600", color:"#475569",
    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"0.75rem",
  },
  grid: {
    display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"10px",
  },
  card: {
    background:"#1e293b", border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:"12px", padding:"0.9rem 0.5rem",
    textAlign:"center", display:"flex",
    flexDirection:"column", alignItems:"center", gap:"4px",
  },
  today: {
    border:"1px solid rgba(14,165,233,0.3)",
    background:"rgba(14,165,233,0.07)",
  },
  day:   { fontSize:"0.7rem", fontWeight:"600", color:"#64748b", textTransform:"uppercase", letterSpacing:"0.05em" },
  icon:  { fontSize:"1.4rem", lineHeight:1, margin:"4px 0" },
  desc:  { fontSize:"0.62rem", color:"#475569", textAlign:"center", lineHeight:1.3 },
  temps: { display:"flex", gap:"6px", alignItems:"baseline", marginTop:"4px" },
  max:   { fontSize:"0.9rem", fontWeight:"600", color:"#f1f5f9" },
  min:   { fontSize:"0.78rem", color:"#475569" },
  precip:{ fontSize:"0.62rem", color:"#60a5fa", marginTop:"2px" },
};