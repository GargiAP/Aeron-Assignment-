import { useState } from "react";

export default function SearchBar({ onSearch, recent }) {
  const [city, setCity] = useState("");

  const handle = (override) => {
    const target = override || city;
    if (target.trim()) onSearch(target.trim());
  };

  return (
    <div style={s.col}>
      <div style={s.row}>
        <input
          style={s.input}
          placeholder="Enter city name..."
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handle()}
        />
        <button style={s.btn} onClick={() => handle()}>Search</button>
      </div>
      {recent.length > 0 && (
        <div style={s.recentRow}>
          <span style={s.recentLabel}>Recent:</span>
          {recent.map(c => (
            <button key={c} style={s.pill} onClick={() => {
              setCity(c); handle(c);
            }}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  col:  { display:"flex", flexDirection:"column", gap:"8px", alignItems:"flex-end" },
  row:  { display:"flex", gap:"8px" },
  input: {
    height:"38px", padding:"0 14px",
    border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px",
    background:"#1e293b", color:"#e2e8f0",
    fontSize:"0.88rem", width:"220px", outline:"none",
  },
  btn: {
    height:"38px", padding:"0 18px",
    background:"#0ea5e9", color:"white",
    border:"none", borderRadius:"8px",
    fontSize:"0.88rem", fontWeight:"600", cursor:"pointer",
  },
  recentRow: { display:"flex", alignItems:"center", gap:"6px", flexWrap:"wrap", justifyContent:"flex-end" },
  recentLabel: { fontSize:"0.7rem", color:"#475569" },
  pill: {
    height:"24px", padding:"0 10px",
    background:"rgba(14,165,233,0.1)", color:"#38bdf8",
    border:"1px solid rgba(14,165,233,0.2)", borderRadius:"20px",
    fontSize:"0.72rem", cursor:"pointer", fontWeight:"500",
  },
};