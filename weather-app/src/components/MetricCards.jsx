import { formatTime } from "../utils/formatters";

export default function SunriseSunset({ sunrise, sunset }) {
  return (
    <div style={s.box}>
      <div style={s.item}>
        <span style={s.icon}>↑</span>
        <span style={s.label}>Sunrise</span>
        <span style={s.val}>{formatTime(sunrise)}</span>
      </div>
      <div style={s.divider} />
      <div style={s.item}>
        <span style={s.icon}>↓</span>
        <span style={s.label}>Sunset</span>
        <span style={s.val}>{formatTime(sunset)}</span>
      </div>
    </div>
  );
}

const s = {
  box: {
    display:"flex", alignItems:"center", gap:"16px",
    background:"#1e293b", border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:"10px", padding:"10px 16px",
  },
  item:    { display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" },
  icon:    { fontSize:"14px", color:"#f59e0b" },
  label:   { fontSize:"0.65rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.06em" },
  val:     { fontSize:"0.88rem", fontWeight:"600", color:"#f1f5f9" },
  divider: { width:"1px", height:"32px", background:"rgba(255,255,255,0.07)" },
};