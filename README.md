# 🚀 Aeron Systems Assignment  
## Weather Data Viewer & NMEA Decoder


# 🧠 Overview

This project consists of two independent utilities designed to demonstrate **end-to-end data handling**, from real-time API-based applications to low-level data parsing systems:

- 🌦️ **Weather Data Viewer (Web Utility)** – Built using React (Vite)
- 📡 **NMEA Decoder (Data Utility)** – Built using Python

The project showcases the ability to:
- Work with external APIs  
- Process both structured and raw data  
- Build modular and scalable systems  

---

# 🎯 Problem Understanding

Modern systems deal with two types of data:

### 1. Structured Data (User-facing)
- Example: Weather APIs  
- Used in dashboards and applications  

### 2. Raw Device Data (Engineering systems)
- Example: GPS signals (NMEA format)  
- Used in avionics, navigation, and embedded systems  

This project addresses both:

| Data Type | Solution |
|----------|--------|
| Structured API data | Weather App |
| Raw GPS data | NMEA Decoder |

---

# 🏗️ System Design

Both utilities follow a modular architecture:

```

User Input → Data Acquisition → Processing → Output

```

This ensures:
- Clean separation of concerns  
- Scalability  
- Easy debugging  

---

# 🌦️ Weather Data Viewer

## 🎯 Objective

To build a web application that:
- Fetches real-time weather data for any city  
- Displays key weather parameters  
- Visualizes data using graphs  

---

## ⚙️ Features

- 🔍 Search weather by city  
- 🌡️ Temperature display  
- 💧 Humidity display  
- 🌬️ Wind speed display  
- 📊 Graph visualization (Chart.js)  
- ❌ Error handling for invalid input  

---

## 🏗️ Project Structure

```

weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── WeatherGraph.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx

```

---

## 🔌 API Used

OpenWeatherMap API

Example:
```

[https://api.openweathermap.org/data/2.5/weather?q={city}&appid=API_KEY&units=metric](https://api.openweathermap.org/data/2.5/weather?q={city}&appid=API_KEY&units=metric)

```

---

## 🧠 Data Flow

```

User enters city
↓
SearchBar triggers API call
↓
API returns JSON
↓
Data is processed
↓
Displayed on dashboard

```

---

## 🛠️ Tech Stack

- React (Vite)  
- Axios  
- Chart.js  

---

## ▶️ How to Run

```

cd weather-app
npm install
npm run dev

```

Open:
```

[http://localhost:5173](http://localhost:5173)

```

---

# 📡 NMEA Decoder

## 🎯 Objective

To decode raw GPS data (NMEA sentences) into human-readable information.

---

## 🧠 What is NMEA?

NMEA (National Marine Electronics Association) is a standard format used by GPS devices to transmit location data.

Example:
```

$GPGGA,123519,4807.038,N,01131.000,E,...

```

---

## ⚙️ Features

- Accept NMEA sentence input  
- Parse GPGGA & GPRMC sentences  
- Extract:
  - Latitude  
  - Longitude  
  - Time  
  - Satellites  
- Convert coordinates to decimal format  
- Display structured output  
- 📍 Generate Google Maps link  

---

## 🏗️ Project Structure

```

nmea-decoder/
├── parsers/
│   ├── gpgga_parser.py
│   ├── gprmc_parser.py
│
├── utils/
│   ├── validator.py
│   ├── formatter.py
│
├── ui/
│   └── cli_interface.py
│
├── main.py

```

---

## 🧠 Processing Flow

```

User Input
↓
Validation
↓
Parsing
↓
Conversion
↓
Formatted Output + Google Maps Link

```

---

## 🔢 Example Conversion

```

4807.038 → 48 + (7.038 / 60) = 48.1173

```

---

## 📍 Google Maps Integration

Generated link format:
```

[https://maps.google.com/?q=latitude,longitude](https://maps.google.com/?q=latitude,longitude)

```

Example:
```

[https://maps.google.com/?q=48.1173,11.5167](https://maps.google.com/?q=48.1173,11.5167)

```

---

## 🛠️ Tech Stack

- Python 3  
- Tabulate  

---

## ▶️ How to Run

```

cd nmea-decoder
python main.py

```

---

# 🔄 Combined Learning

| Skill | Implementation |
|------|--------------|
| API Integration | Weather App |
| UI Development | React |
| Data Parsing | NMEA Decoder |
| Data Conversion | Coordinate transformation |
| Visualization | Charts |

---

# 🤖 AI Tools Used

- ChatGPT:
  - Architecture design  
  - Debugging  
  - Code guidance  

---

## ✍️ Manual Improvements

- Structured code into modular architecture  
- Improved readability  
- Added validation and error handling  
- Designed scalable project structure  

---

# 🧾 AI Prompts Used

Examples:
- “Design weather app architecture using React”  
- “Explain NMEA parsing with example”  
- “Fix JSX error in Vite”  
- “Convert GPS coordinates to decimal format”  

---

# 📁 Root Structure

```

WHEATHER-APP/
│
├── weather-app/
├── nmea-decoder/
├── README.md

```

---

# 🚀 Future Enhancements

- Integrate NMEA decoder with web UI  
- Add GPS visualization on map  
- Add weather forecast  
- Improve UI/UX  

---

# 🧠 Key Takeaways

- Built both UI-based and system-level utilities  
- Demonstrated handling of real-world data formats  
- Designed scalable architecture  
- Used AI tools effectively with manual refinement  

---

