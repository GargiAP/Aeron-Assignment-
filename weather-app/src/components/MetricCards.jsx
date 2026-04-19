import { UV_LABEL, WIND_DIR } from "../utils/formatters";

function Card({ label, value, sub, accent }) {
  return (
    <div style={{ ...s.card, ...(accent ? s.accent : {}) }}>
      <p style={s.label}>{label}</p>
      <p style={s.value}>{value}</p>
      <p style={s.sub}>{sub}</p>
    </div>
  );
}

export default function MetricCards({ weather }) {
  return (
    <div style={s.grid}>
      <Card accent
        label="Temperature"
        value={`${weather.temp}°C`}
        sub={`Feels like ${weather.feels}°C`}
      />
      <Card
        label="Humidity"
        value={`${weather.humidity}%`}
        sub="Relative humidity"
      />
      <Card
        label="Wind"
        value={`${weather.wind} km/h`}
        sub={`Direction: ${WIND_DIR(weather.windDir)}`}
      />
      <Card
        label="Precipitation"
        value={`${weather.precip} mm`}
        sub="Today total"
      />
      <Card
        label="UV Index"
        value={weather.uv}
        sub={UV_LABEL(weather.uv)}
      />
    </div>
  );
}

const s = {
  grid: {
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
    gap:"12px", padding:"0 2rem 1.5rem",
  },
  card: {
    background:"#1e293b",
    border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:"12px", padding:"1rem 1.2rem",
  },
  accent: { borderTop:"2px solid #0ea5e9" },
  label: { fontSize:"0.68rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"6px" },
  value: { fontSize:"1.65rem", fontWeight:"600", color:"#f1f5f9", lineHeight:1 },
  sub:   { fontSize:"0.74rem", color:"#334155", marginTop:"5px" },
};