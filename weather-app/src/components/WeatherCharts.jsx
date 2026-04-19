import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const tooltipStyle = {
  contentStyle: { background:"#0f172a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", fontSize:"12px" },
  labelStyle:   { color:"#94a3b8" },
};

export default function WeatherCharts({ tempData, precipData }) {
  return (
    <div style={s.grid}>
      <div style={s.card}>
        <p style={s.title}>Hourly Temperature (°C)</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={tempData} margin={{top:5,right:10,left:-20,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{fill:"#475569",fontSize:10}} tickLine={false}
              interval={Math.floor(tempData.length / 5)} />
            <YAxis tick={{fill:"#475569",fontSize:10}} tickLine={false} axisLine={false}
              tickFormatter={v => `${v}°`} />
            <Tooltip {...tooltipStyle} itemStyle={{color:"#38bdf8"}}
              formatter={v => [`${v}°C`, "Temp"]} />
            <Line type="monotone" dataKey="value" stroke="#0ea5e9"
              strokeWidth={2} dot={false} activeDot={{r:4,fill:"#0ea5e9"}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={s.card}>
        <p style={s.title}>Precipitation Probability (%)</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={precipData} margin={{top:5,right:10,left:-20,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{fill:"#475569",fontSize:10}} tickLine={false}
              interval={Math.floor(precipData.length / 5)} />
            <YAxis domain={[0,100]} tick={{fill:"#475569",fontSize:10}}
              tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip {...tooltipStyle} itemStyle={{color:"#60a5fa"}}
              formatter={v => [`${v}%`, "Precip"]} />
            <Bar dataKey="value" fill="#3b82f6" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const s = {
  grid: {
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
    gap:"16px", padding:"0 2rem 1.5rem",
  },
  card: {
    background:"#1e293b",
    border:"1px solid rgba(255,255,255,0.06)",
    borderRadius:"12px", padding:"1.2rem",
  },
  title: {
    fontSize:"0.68rem", fontWeight:"600", color:"#475569",
    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:"1rem",
  },
};