import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const weatherDescriptions = {};

const convertToDecimal = (coord, dir) => {
  if (!coord) return 0;
  let degrees, minutes;
  if (dir === "N" || dir === "S") {
    degrees = parseFloat(coord.slice(0, 2));
    minutes = parseFloat(coord.slice(2));
  } else {
    degrees = parseFloat(coord.slice(0, 3));
    minutes = parseFloat(coord.slice(3));
  }
  let decimal = degrees + minutes / 60;
  if (dir === "S" || dir === "W") decimal *= -1;
  return decimal;
};

const formatTime = (time) =>
  time ? `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}` : "—";

const formatDate = (date) => {
  if (!date) return "—";
  const year = parseInt(date.slice(4, 6));
  const fullYear = year > 50 ? `19${year}` : `20${year}`;
  return `${fullYear}-${date.slice(2, 4)}-${date.slice(0, 2)}`;
};

const convertSpeed = (knots) =>
  knots ? (parseFloat(knots) * 1.852).toFixed(2) : "—";

const Row = ({ label, value, badge }) => (
  <div style={s.row}>
    <span style={s.rowLabel}>{label}</span>
    <span style={badge ? { ...s.rowValue, ...s.badge(badge) } : s.rowValue}>
      {value}
    </span>
  </div>
);

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const parseNMEA = () => {
    if (!input.trim()) { setError("Please paste an NMEA sentence."); return; }
    const parts = input.trim().split(",");
    if (parts.length < 6) { setError("Invalid sentence format."); setData(null); return; }

    try {
      if (parts[0] === "$GPGGA") {
        setData({ type: "GPGGA", time: parts[1], lat: parts[2], latDir: parts[3],
          lon: parts[4], lonDir: parts[5], fix: parts[6], satellites: parts[7],
          altitude: parts[9], altUnit: parts[10] });
        setError("");
      } else if (parts[0] === "$GPRMC") {
        setData({ type: "GPRMC", time: parts[1], status: parts[2],
          lat: parts[3], latDir: parts[4], lon: parts[5], lonDir: parts[6],
          speed: parts[7], course: parts[8], date: parts[9] });
        setError("");
      } else {
        setError("Unsupported sentence type. Use GPGGA or GPRMC.");
        setData(null);
      }
    } catch {
      setError("Failed to parse sentence.");
      setData(null);
    }
  };

  const latitude  = data ? convertToDecimal(data.lat, data.latDir) : 0;
  const longitude = data ? convertToDecimal(data.lon, data.lonDir) : 0;
  const hasCoords = data && latitude !== 0 && longitude !== 0;

  return (
    <div style={s.page}>
      {/* ── TOP BAR ── */}
      <div style={s.topbar}>
        <div style={s.brand}>NMEA Decoder</div>
        <div style={s.brandSub}>GPS sentence parser · GPGGA &amp; GPRMC</div>
      </div>

      {/* ── BODY ── */}
      <div style={s.body}>

        {/* LEFT PANEL */}
        <div style={s.left}>
          <div style={s.sectionLabel}>Input</div>
          <textarea
            style={s.textarea}
            placeholder={"Paste NMEA sentence here...\n\nExample:\n$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,,*6A"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={s.btn} onClick={parseNMEA}>Decode</button>
          {error && <div style={s.error}>{error}</div>}

          {data && (
            <>
              <div style={{ ...s.sectionLabel, marginTop: "1.5rem" }}>
                Parsed Fields
                <span style={s.typeBadge}>{data.type}</span>
              </div>

              <div style={s.table}>
                <Row label="Time (UTC)" value={formatTime(data.time)} />
                {data.status !== undefined && (
                  <Row
                    label="Status"
                    value={data.status === "A" ? "Valid fix" : "No fix"}
                    badge={data.status === "A" ? "green" : "red"}
                  />
                )}
                <Row label="Latitude"  value={`${latitude.toFixed(6)}°  (${data.lat} ${data.latDir})`} />
                <Row label="Longitude" value={`${longitude.toFixed(6)}°  (${data.lon} ${data.lonDir})`} />
                {data.speed !== undefined && (
                  <Row label="Speed" value={`${convertSpeed(data.speed)} km/h  (${data.speed} kn)`} />
                )}
                {data.course !== undefined && data.course && (
                  <Row label="Course" value={`${data.course}°`} />
                )}
                {data.date && (
                  <Row label="Date" value={formatDate(data.date)} />
                )}
                {data.satellites !== undefined && (
                  <Row label="Satellites" value={data.satellites} />
                )}
                {data.fix !== undefined && (
                  <Row
                    label="Fix Quality"
                    value={data.fix === "1" ? "GPS fix" : data.fix === "2" ? "DGPS fix" : "No fix"}
                    badge={data.fix === "0" ? "red" : "green"}
                  />
                )}
                {data.altitude !== undefined && data.altitude && (
                  <Row label="Altitude" value={`${data.altitude} ${data.altUnit || "M"}`} />
                )}
              </div>
            </>
          )}

          {!data && !error && (
            <div style={s.placeholder}>
              Decoded fields will appear here after parsing.
            </div>
          )}
        </div>

        {/* RIGHT PANEL — MAP */}
        <div style={s.right}>
          <div style={s.sectionLabel}>Location Map</div>
          <div style={s.mapWrap}>
            {hasCoords ? (
              <MapContainer
                key={`${latitude}-${longitude}`}
                center={[latitude, longitude]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[latitude, longitude]}>
                  <Popup>
                    {latitude.toFixed(5)}°, {longitude.toFixed(5)}°
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div style={s.mapEmpty}>
                <div style={s.mapEmptyIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <p style={s.mapEmptyText}>Map will appear once a valid sentence is decoded</p>
              </div>
            )}
          </div>

          {hasCoords && (
            <div style={s.coordBar}>
              <span style={s.coordItem}>Lat: {latitude.toFixed(6)}°</span>
              <span style={s.coordDivider}>·</span>
              <span style={s.coordItem}>Lon: {longitude.toFixed(6)}°</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── STYLES ──
const s = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  topbar: {
    padding: "1.25rem 2rem",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
  },
  brand: {
    fontSize: "1.15rem",
    fontWeight: "600",
    color: "#f1f5f9",
    letterSpacing: "-0.01em",
  },
  brandSub: {
    fontSize: "0.8rem",
    color: "#475569",
  },
  body: {
    display: "flex",
    flex: 1,
    gap: 0,
    minHeight: "calc(100vh - 60px)",
  },
  left: {
    width: "420px",
    minWidth: "380px",
    padding: "1.75rem 2rem",
    borderRight: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    overflowY: "auto",
  },
  right: {
    flex: 1,
    padding: "1.75rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sectionLabel: {
    fontSize: "0.7rem",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  typeBadge: {
    background: "rgba(56,189,248,0.12)",
    color: "#38bdf8",
    fontSize: "0.68rem",
    padding: "2px 8px",
    borderRadius: "4px",
    fontWeight: "600",
    letterSpacing: "0.05em",
  },
  textarea: {
    width: "100%",
    height: "130px",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#1e293b",
    color: "#e2e8f0",
    fontSize: "0.82rem",
    fontFamily: "'Fira Code', 'Courier New', monospace",
    resize: "vertical",
    lineHeight: 1.6,
    outline: "none",
  },
  btn: {
    width: "100%",
    padding: "11px",
    borderRadius: "10px",
    border: "none",
    background: "#0ea5e9",
    color: "white",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    letterSpacing: "0.01em",
  },
  error: {
    background: "rgba(248,113,113,0.1)",
    color: "#f87171",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "0.82rem",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 12px",
    background: "#1e293b",
    borderRadius: "8px",
    gap: "12px",
  },
  rowLabel: {
    fontSize: "0.78rem",
    color: "#64748b",
    fontWeight: "500",
    whiteSpace: "nowrap",
    minWidth: "100px",
  },
  rowValue: {
    fontSize: "0.82rem",
    color: "#e2e8f0",
    textAlign: "right",
    fontFamily: "'Fira Code', 'Courier New', monospace",
  },
  badge: (color) => ({
    background: color === "green" ? "rgba(34,197,94,0.12)" : "rgba(248,113,113,0.12)",
    color: color === "green" ? "#4ade80" : "#f87171",
    padding: "2px 10px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontFamily: "'Segoe UI', sans-serif",
    fontWeight: "500",
  }),
  placeholder: {
    color: "#334155",
    fontSize: "0.82rem",
    padding: "1rem 0",
    textAlign: "center",
  },
  mapWrap: {
    flex: 1,
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    minHeight: "400px",
    background: "#1e293b",
  },
  mapEmpty: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  mapEmptyIcon: {
    opacity: 0.4,
  },
  mapEmptyText: {
    color: "#475569",
    fontSize: "0.82rem",
    textAlign: "center",
    maxWidth: "220px",
    lineHeight: 1.5,
  },
  coordBar: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    padding: "8px 14px",
    background: "#1e293b",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.07)",
  },
  coordItem: {
    fontSize: "0.78rem",
    color: "#94a3b8",
    fontFamily: "'Fira Code', monospace",
  },
  coordDivider: {
    color: "#334155",
  },
};