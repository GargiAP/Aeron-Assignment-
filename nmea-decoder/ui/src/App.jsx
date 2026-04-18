import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // -------- FORMAT FUNCTIONS --------

  const convertToDecimal = (coord, dir) => {
  if (!coord) return "";

  let degrees, minutes;

  // Use direction instead of length (BEST way)
  if (dir === "N" || dir === "S") {
    // Latitude → 2 digits
    degrees = parseFloat(coord.slice(0, 2));
    minutes = parseFloat(coord.slice(2));
  } else {
    // Longitude → 3 digits
    degrees = parseFloat(coord.slice(0, 3));
    minutes = parseFloat(coord.slice(3));
  }

  let decimal = degrees + minutes / 60;

  if (dir === "S" || dir === "W") decimal *= -1;

  return decimal.toFixed(5);
};

  const formatTime = (time) => {
    if (!time) return "";
    return `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `20${date.slice(4, 6)}-${date.slice(2, 4)}-${date.slice(0, 2)}`;
  };

  const convertSpeed = (knots) => {
    if (!knots) return "";
    return (parseFloat(knots) * 1.852).toFixed(2);
  };

  // -------- PARSER --------

  const parseNMEA = () => {
    if (!input) {
      setError("Please paste a sentence");
      return;
    }

    const parts = input.split(",");

    try {
      if (parts[0] === "$GPGGA") {
        const parsed = {
          Type: "GPGGA",
          Time: parts[1],
          Latitude: parts[2] + " " + parts[3],
          Longitude: parts[4] + " " + parts[5],
          Fix_Quality: parts[6],
          Satellites: parts[7],
        };
        setData(parsed);
        setError("");
      } else if (parts[0] === "$GPRMC") {
        const parsed = {
          Type: "GPRMC",
          Time: parts[1],
          Status: parts[2],
          Latitude: parts[3] + " " + parts[4],
          Longitude: parts[5] + " " + parts[6],
          Speed: parts[7],
          Date: parts[9],
        };
        setData(parsed);
        setError("");
      } else {
        setError("Unsupported sentence type");
        setData(null);
      }
    } catch {
      setError("Invalid sentence format");
      setData(null);
    }
  };

  // -------- UI --------

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📡 NMEA Decoder</h1>

        <textarea
          style={styles.textarea}
          placeholder="Paste NMEA sentence..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button style={styles.button} onClick={parseNMEA}>
          Decode
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {data && (
          <table style={styles.table}>
            <tbody>

              <tr>
                <td style={styles.key}>Type</td>
                <td>{data.Type}</td>
              </tr>

              <tr>
                <td style={styles.key}>Time</td>
                <td>{formatTime(data.Time)}</td>
              </tr>

              {data.Status && (
                <tr>
                  <td style={styles.key}>Status</td>
                  <td>{data.Status === "A" ? "✅ Valid" : "❌ Invalid"}</td>
                </tr>
              )}

              <tr>
                <td style={styles.key}>Latitude</td>
                <td>
                  {convertToDecimal(
                    data.Latitude.split(" ")[0],
                    data.Latitude.split(" ")[1]
                  )}°
                </td>
              </tr>

              <tr>
                <td style={styles.key}>Longitude</td>
                <td>
                  {convertToDecimal(
                    data.Longitude.split(" ")[0],
                    data.Longitude.split(" ")[1]
                  )}°
                </td>
              </tr>

              {data.Speed && (
                <tr>
                  <td style={styles.key}>Speed</td>
                  <td>{convertSpeed(data.Speed)} km/h</td>
                </tr>
              )}

              {data.Date && (
                <tr>
                  <td style={styles.key}>Date</td>
                  <td>{formatDate(data.Date)}</td>
                </tr>
              )}

              {data.Satellites && (
                <tr>
                  <td style={styles.key}>Satellites</td>
                  <td>{data.Satellites}</td>
                </tr>
              )}

              {data.Fix_Quality && (
                <tr>
                  <td style={styles.key}>Fix Quality</td>
                  <td>
                    {data.Fix_Quality === "1"
                      ? "GPS Fix"
                      : data.Fix_Quality === "0"
                      ? "No Fix"
                      : data.Fix_Quality}
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;

// -------- STYLES --------

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#1e293b",
    color: "white",
    padding: "30px",
    borderRadius: "16px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#38bdf8",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  table: {
    marginTop: "20px",
    width: "100%",
    borderCollapse: "collapse",
  },
  key: {
    border: "1px solid #ccc",
    padding: "8px",
    fontWeight: "bold",
    width: "50%",
  },
};