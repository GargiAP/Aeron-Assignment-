import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const WMO = {
  0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",
  45:"Foggy",48:"Icy fog",51:"Light drizzle",53:"Drizzle",55:"Heavy drizzle",
  61:"Light rain",63:"Rain",65:"Heavy rain",71:"Light snow",73:"Snow",
  75:"Heavy snow",80:"Rain showers",81:"Heavy showers",95:"Thunderstorm",
};

const UV_LABEL = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very high";
  return "Extreme";
};

const WIND_DIR = (deg) => {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
};

const WMO_ICON = (code) => {
  if (code === 0 || code === 1) return "☀️";
  if (code === 2 || code === 3) return "⛅";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
};

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const formatTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

export default function App() {
  const [city, setCity]       = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [recent, setRecent]   = useState([]);

  const fetchWeather = async (overrideCity) => {
    const target = (overrideCity || city).trim();
    if (!target) { setError("Please enter a city name."); return; }
    setLoading(true); setError(""); setWeather(null);

    try {
      // Step 1 — geocode
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(target)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.results?.length) {
        setError("City not found. Try another name.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2 — weather
      const params = new URLSearchParams({
        latitude, longitude,
        current: [
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "wind_speed_10m",
          "wind_direction_10m",
          "weather_code",
          "precipitation",
          "uv_index",
        ].join(","),
        hourly: "temperature_2m,precipitation_probability",
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "weather_code",
          "precipitation_sum",
          "sunrise",
          "sunset",
        ].join(","),
        forecast_days: 7,
        timezone: "auto",
      });

      const wRes  = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      const wData = await wRes.json();
      const cur   = wData.current;
      const daily = wData.daily;

      // slice to today's 24 hours only
      const hourlyLabels = wData.hourly.time
        .slice(0, 24)
        .map(t => t.split("T")[1].slice(0, 5));

      const tempData = hourlyLabels.map((time, i) => ({
        time,
        value: wData.hourly.temperature_2m[i],
      }));

      const precipData = hourlyLabels.map((time, i) => ({
        time,
        value: wData.hourly.precipitation_probability[i],
      }));

      const forecast = daily.time.map((date, i) => ({
        date,
        day:    DAY_NAMES[new Date(date).getDay()],
        max:    daily.temperature_2m_max[i],
        min:    daily.temperature_2m_min[i],
        code:   daily.weather_code[i],
        precip: daily.precipitation_sum[i],
      }));

      setWeather({
        city: name, country,
        temp:     cur.temperature_2m,
        feels:    cur.apparent_temperature,
        humidity: cur.relative_humidity_2m,
        wind:     cur.wind_speed_10m,
        windDir:  cur.wind_direction_10m,
        precip:   cur.precipitation,
        uv:       cur.uv_index,
        code:     cur.weather_code,
        sunrise:  daily.sunrise[0],
        sunset:   daily.sunset[0],
        tempData, precipData, forecast,
      });

      setRecent(prev => [name, ...prev.filter(c => c !== name)].slice(0, 4));
      setCity(name);

    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={s.page}>

      {/* TOP BAR */}
      <div style={s.topbar}>
        <div style={s.brand}>
          Weather<span style={s.brandAccent}>Dashboard</span>
        </div>
        <div style={s.searchCol}>
          <div style={s.searchRow}>
            <input
              style={s.input}
              placeholder="Enter city name..."
              value={city}
              onChange={e => setCity(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchWeather()}
            />
            <button style={s.btn} onClick={() => fetchWeather()}>Search</button>
          </div>
          {recent.length > 0 && (
            <div style={s.recentRow}>
              <span style={s.recentLabel}>Recent:</span>
              {recent.map(c => (
                <button key={c} style={s.pill}
                  onClick={() => { setCity(c); fetchWeather(c); }}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && <p style={s.muted}>Fetching weather data...</p>}
      {error   && <div style={s.error}>{error}</div>}

      {!weather && !loading && !error && (
        <div style={s.empty}>
          <p style={s.emptyText}>Search a city to see its weather dashboard</p>
        </div>
      )}

      {weather && (
        <div>

          {/* LOCATION + SUNRISE/SUNSET */}
          <div style={s.location}>
            <div style={s.locationTop}>
              <div>
                <h2 style={s.cityName}>
                  {weather.city}, {weather.country}
                  <span style={s.badge}>{WMO[weather.code] || "Unknown"}</span>
                </h2>
                <p style={s.meta}>
                  {new Date().toLocaleDateString("en-GB", {
                    weekday: "long", year: "numeric",
                    month: "long", day: "numeric"
                  })}
                  &nbsp;·&nbsp;Data via Open-Meteo
                </p>
              </div>
              <div style={s.sunRow}>
                <div style={s.sunItem}>
                  <span style={s.sunIcon}>↑</span>
                  <span style={s.sunLabel}>Sunrise</span>
                  <span style={s.sunVal}>{formatTime(weather.sunrise)}</span>
                </div>
                <div style={s.sunDivider} />
                <div style={s.sunItem}>
                  <span style={s.sunIcon}>↓</span>
                  <span style={s.sunLabel}>Sunset</span>
                  <span style={s.sunVal}>{formatTime(weather.sunset)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* METRIC CARDS */}
          <div style={s.cards}>
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

          {/* CHARTS */}
          <div style={s.charts}>
            <div style={s.chartCard}>
              <p style={s.chartTitle}>Hourly Temperature (°C)</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weather.tempData}
                  margin={{top:5,right:10,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time"
                    tick={{fill:"#475569",fontSize:10}}
                    tickLine={false}
                    interval={Math.floor(weather.tempData.length / 5)} />
                  <YAxis
                    tick={{fill:"#475569",fontSize:10}}
                    tickLine={false} axisLine={false}
                    tickFormatter={v => `${v}°`} />
                  <Tooltip
                    contentStyle={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",fontSize:"12px"}}
                    labelStyle={{color:"#94a3b8"}}
                    itemStyle={{color:"#38bdf8"}}
                    formatter={v => [`${v}°C`, "Temp"]}
                  />
                  <Line type="monotone" dataKey="value"
                    stroke="#0ea5e9" strokeWidth={2}
                    dot={false} activeDot={{r:4,fill:"#0ea5e9"}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={s.chartCard}>
              <p style={s.chartTitle}>Precipitation Probability (%)</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weather.precipData}
                  margin={{top:5,right:10,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time"
                    tick={{fill:"#475569",fontSize:10}}
                    tickLine={false}
                    interval={Math.floor(weather.precipData.length / 5)} />
                  <YAxis domain={[0,100]}
                    tick={{fill:"#475569",fontSize:10}}
                    tickLine={false} axisLine={false}
                    tickFormatter={v => `${v}%`} />
                  <Tooltip
                    contentStyle={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",fontSize:"12px"}}
                    labelStyle={{color:"#94a3b8"}}
                    itemStyle={{color:"#60a5fa"}}
                    formatter={v => [`${v}%`, "Precip"]}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-DAY FORECAST */}
          <div style={s.forecastSection}>
            <p style={s.chartTitle}>7-Day Forecast</p>
            <div style={s.forecastRow}>
              {weather.forecast.map((day, i) => (
                <div key={day.date} style={{
                  ...s.forecastCard,
                  ...(i === 0 ? s.forecastCardToday : {})
                }}>
                  <p style={s.forecastDay}>{i === 0 ? "Today" : day.day}</p>
                  <p style={s.forecastIcon}>{WMO_ICON(day.code)}</p>
                  <p style={s.forecastDesc}>{WMO[day.code] || "—"}</p>
                  <div style={s.forecastTemps}>
                    <span style={s.forecastMax}>{Math.round(day.max)}°</span>
                    <span style={s.forecastMin}>{Math.round(day.min)}°</span>
                  </div>
                  {day.precip > 0 && (
                    <p style={s.forecastPrecip}>{day.precip} mm</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function Card({ label, value, sub, accent }) {
  return (
    <div style={{ ...s.card, ...(accent ? s.cardAccent : {}) }}>
      <p style={s.cardLabel}>{label}</p>
      <p style={s.cardValue}>{value}</p>
      <p style={s.cardSub}>{sub}</p>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "'Inter','Segoe UI',sans-serif",
  },
  topbar: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "1.25rem 2rem",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    flexWrap: "wrap",
    gap: "1rem",
  },
  brand: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#f1f5f9",
    letterSpacing: "-0.02em",
    paddingTop: "6px",
  },
  brandAccent: { color: "#0ea5e9" },
  searchCol: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-end",
  },
  searchRow: { display: "flex", gap: "8px" },
  input: {
    height: "38px",
    padding: "0 14px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    background: "#1e293b",
    color: "#e2e8f0",
    fontSize: "0.88rem",
    width: "220px",
    outline: "none",
  },
  btn: {
    height: "38px",
    padding: "0 18px",
    background: "#0ea5e9",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.88rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  recentRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  recentLabel: { fontSize: "0.7rem", color: "#475569" },
  pill: {
    height: "24px",
    padding: "0 10px",
    background: "rgba(14,165,233,0.1)",
    color: "#38bdf8",
    border: "1px solid rgba(14,165,233,0.2)",
    borderRadius: "20px",
    fontSize: "0.72rem",
    cursor: "pointer",
    fontWeight: "500",
  },
  muted: { color: "#475569", fontSize: "0.88rem", padding: "2rem" },
  error: {
    margin: "1rem 2rem",
    background: "rgba(248,113,113,0.1)",
    color: "#f87171",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "0.85rem",
  },
  empty: {
    display: "flex", alignItems: "center",
    justifyContent: "center", minHeight: "60vh",
  },
  emptyText: { color: "#334155", fontSize: "0.9rem" },
  location: { padding: "1.75rem 2rem 1rem" },
  locationTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
  },
  cityName: { fontSize: "1.5rem", fontWeight: "600", color: "#f1f5f9" },
  badge: {
    display: "inline-block",
    background: "rgba(14,165,233,0.12)",
    color: "#38bdf8",
    fontSize: "0.7rem",
    padding: "2px 10px",
    borderRadius: "20px",
    fontWeight: "600",
    marginLeft: "10px",
    verticalAlign: "middle",
  },
  meta: { fontSize: "0.8rem", color: "#475569", marginTop: "4px" },
  sunRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    padding: "10px 16px",
  },
  sunItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  sunIcon: { fontSize: "14px", color: "#f59e0b" },
  sunLabel: {
    fontSize: "0.65rem", color: "#475569",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  sunVal: { fontSize: "0.88rem", fontWeight: "600", color: "#f1f5f9" },
  sunDivider: {
    width: "1px", height: "32px",
    background: "rgba(255,255,255,0.07)",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
    gap: "12px",
    padding: "0 2rem 1.5rem",
  },
  card: {
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "1rem 1.2rem",
  },
  cardAccent: { borderTop: "2px solid #0ea5e9" },
  cardLabel: {
    fontSize: "0.68rem", color: "#475569",
    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px",
  },
  cardValue: {
    fontSize: "1.65rem", fontWeight: "600",
    color: "#f1f5f9", lineHeight: 1,
  },
  cardSub: { fontSize: "0.74rem", color: "#334155", marginTop: "5px" },
  charts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "16px",
    padding: "0 2rem 1.5rem",
  },
  chartCard: {
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "1.2rem",
  },
  chartTitle: {
    fontSize: "0.68rem", fontWeight: "600", color: "#475569",
    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem",
  },
  forecastSection: { padding: "0 2rem 2rem" },
  forecastRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: "10px",
    marginTop: "0.75rem",
  },
  forecastCard: {
    background: "#1e293b",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "0.9rem 0.5rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  forecastCardToday: {
    border: "1px solid rgba(14,165,233,0.3)",
    background: "rgba(14,165,233,0.07)",
  },
  forecastDay: {
    fontSize: "0.7rem", fontWeight: "600",
    color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em",
  },
  forecastIcon: { fontSize: "1.4rem", lineHeight: 1, margin: "4px 0" },
  forecastDesc: {
    fontSize: "0.62rem", color: "#475569",
    textAlign: "center", lineHeight: 1.3,
  },
  forecastTemps: {
    display: "flex", gap: "6px",
    alignItems: "baseline", marginTop: "4px",
  },
  forecastMax: { fontSize: "0.9rem", fontWeight: "600", color: "#f1f5f9" },
  forecastMin: { fontSize: "0.78rem", color: "#475569" },
  forecastPrecip: { fontSize: "0.62rem", color: "#60a5fa", marginTop: "2px" },
};