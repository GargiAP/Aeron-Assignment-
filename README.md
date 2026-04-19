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

---

## 🎯 Objective

The goal of this module is to build a user-facing web application that fetches and visualizes real-time weather data for any city.

The system is designed to:
- Accept user input (city name)
- Convert it into geographical coordinates
- Fetch weather data using those coordinates
- Display the results in a structured and visual format

---

## 🧠 Problem Understanding

Weather data APIs do not always accept city names directly for detailed forecasts. Instead, they require latitude and longitude.

To solve this, the application follows a **two-step data retrieval process**:

1. Convert city → coordinates (Geocoding API)
2. Use coordinates → fetch weather data (Weather API)

---

## 🔌 APIs Used

### 1. Geocoding API

Used to convert city names into latitude and longitude.

```

[https://geocoding-api.open-meteo.com/v1/search](https://geocoding-api.open-meteo.com/v1/search)

```

---

### 2. Weather API

Used to fetch weather details using coordinates.

```

[https://api.open-meteo.com/v1/forecast](https://api.open-meteo.com/v1/forecast)

```

---

## ⚙️ Features Implemented

- 🔍 Search weather by city name  
- 🌡️ Temperature display  
- 💧 Humidity display  
- 🌬️ Wind speed display  
- 🌅 Sunrise & Sunset information  
- 📊 Weather charts (temperature trends)  
- 📅 Forecast strip for upcoming hours/days  
- ❌ Input validation and error handling  

---

## 🏗️ Project Structure

```

weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── metricCards.jsx
│   │   ├── weatherCharts.jsx
│   │   ├── ForecastStrip.jsx
│   │   ├── SunriseSunset.jsx
│   │
│   ├── services/
│   │   └── weatherServices.js
│   │
│   ├── utils/
│   │   └── formatters.js
│   │
│   ├── App.jsx
│   ├── main.jsx

```

---

## 🧠 Data Flow

```

User enters city
↓
SearchBar triggers request
↓
Geocoding API → returns latitude & longitude
↓
Weather API → returns weather data
↓
Data is processed and formatted
↓
Displayed using UI components

````

---

## 🧠 Processing Logic

### Step 1: Geocoding
- Input: City name
- Output: Latitude, Longitude

### Step 2: Weather Fetch
- Input: Coordinates
- Output: Weather JSON data

### Step 3: Data Formatting
- Extract relevant fields
- Format timestamps and values
- Prepare data for charts

### Step 4: Visualization
- Display metrics using cards
- Plot graphs using Chart.js
- Show forecast and sunrise/sunset

---

## 🛠️ Tech Stack

- React (Vite)
- Axios (API calls)
- Chart.js (visualization)
- JavaScript (ES6+)

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js installed (v16+ recommended)
- npm package manager

---

### Steps to Run

```bash
cd weather-app
npm install
npm run dev
````

---

### Access Application

Open in browser:

```
http://localhost:5173
```

---

## ❌ Error Handling

* Invalid city names handled gracefully
* API failures managed with fallback UI
* Empty input validation

---

## 🤖 AI Tools Used

* ChatGPT:

  * Architecture design
  * API integration logic
  * Debugging (Vite + JSX issues)
  * Component structuring

---

## ✍️ Manual Improvements

* Designed modular component structure
* Implemented multi-step API flow (geocoding + weather)
* Improved UI with multiple components (charts, forecast, metrics)
* Added data formatting utilities
* Structured code for scalability and readability

---

## 🧾 AI Prompts Used

Examples:

* “Build weather app using Open-Meteo API with React”
* “How to convert city name to latitude longitude”
* “Create chart visualization using Chart.js”
* “Fix Vite JSX parsing error”
* “Design modular React component structure”

---

## 🚀 Key Highlights

* Uses **real-world API chaining (Geocoding + Weather)**
* Modular React architecture
* Data visualization using charts
* Clean separation of concerns (components, services, utils)
* Production-style structure

---

```



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

