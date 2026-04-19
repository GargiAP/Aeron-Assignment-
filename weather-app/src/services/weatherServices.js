const GEO_URL     = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherByCity(city) {
  const geoRes  = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );
  if (!geoRes.ok) throw new Error("Geocoding request failed");
  const geoData = await geoRes.json();
  if (!geoData.results?.length) throw new Error("City not found. Try another name.");

  const { latitude, longitude, name, country } = geoData.results[0];

  const params = new URLSearchParams({
    latitude, longitude,
    current: [
      "temperature_2m", "apparent_temperature",
      "relative_humidity_2m", "wind_speed_10m",
      "wind_direction_10m", "weather_code",
      "precipitation", "uv_index",
    ].join(","),
    hourly: "temperature_2m,precipitation_probability",
    daily: [
      "temperature_2m_max", "temperature_2m_min",
      "weather_code", "precipitation_sum",
      "sunrise", "sunset",
    ].join(","),
    forecast_days: 7,
    timezone: "auto",
  });

  const wRes = await fetch(`${WEATHER_URL}?${params}`);
  if (!wRes.ok) throw new Error("Weather fetch failed");
  const wData = await wRes.json();

  return { raw: wData, name, country };
}