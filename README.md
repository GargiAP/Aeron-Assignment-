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

# 📡 NMEA Decoder

---

## 🎯 Objective

The objective of this module is to decode raw GPS data (NMEA sentences) into human-readable and usable information.

Unlike standard applications that consume structured APIs, this utility focuses on **processing low-level device data**, similar to what is used in avionics and navigation systems.

---

## 🧠 Problem Understanding

GPS devices do not output clean JSON data. Instead, they transmit information in **NMEA (National Marine Electronics Association) sentence format**, which is:

- Compact  
- Encoded  
- Difficult to interpret directly  

Example:

```

$GPGGA,123519,4807.038,N,01131.000,E,...

```

To make this data useful, it must be:
1. Parsed  
2. Interpreted  
3. Converted into readable format  

---

## ⚙️ Features Implemented

- Accept raw NMEA sentence input  
- Support for:
  - GPGGA (Global Positioning System Fix Data)  
  - GPRMC (Recommended Minimum Data)  
- Extract:
  - Latitude  
  - Longitude  
  - Time  
  - Satellites  
  - Speed (if applicable)  
- Convert coordinates into decimal format  
- Display structured output  
- 📍 Generate Google Maps link  
- Optional UI for interaction  

---

## 🏗️ Project Structure

```

nmea-decoder/
├── parsers/
│   ├── gpgga_parser.py
│   ├── gprmc_parser.py
│
├── utils/
│   ├── convert.py
│
├── ui/
│   ├── src/
│   ├── App.jsx
│   ├── main.jsx
│
├── main.py

```

---

## 🧠 Processing Flow

```

User Input (NMEA sentence)
↓
Validation (format & type)
↓
Parser selection (GPGGA / GPRMC)
↓
Field extraction
↓
Coordinate conversion
↓
Formatted output
↓
Google Maps link generation

```

---

## 🧠 Processing Logic (Detailed)

### Step 1: Input Handling
- Accept raw NMEA sentence from user
- Example:
```

$GPGGA,123519,4807.038,N,01131.000,E,...

```

---

### Step 2: Sentence Identification
- Extract sentence type:
  - `GPGGA` → Fix data  
  - `GPRMC` → Navigation data  

---

### Step 3: Parsing

Split sentence using commas:

```

sentence.split(",")

```

Map indices to meaning:
- Latitude
- Longitude
- Time
- Satellites

---

### Step 4: Coordinate Conversion

NMEA format:
```

4807.038 → 48° 07.038'

```

Converted to decimal:
```

48 + (7.038 / 60) = 48.1173

```

---

### Step 5: Output Formatting

Convert parsed data into readable format:

```

Latitude: 48.1173 N
Longitude: 11.5167 E
Satellites: 8

```

---

### Step 6: Google Maps Integration

Generate URL:

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
- Custom parsing logic  
- Optional React UI (Vite)  

---

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.x installed  
- Node.js (for UI, if used)  

---

### Run Backend (Decoder)

```

cd nmea-decoder
python main.py

```

---

### Run UI (Optional)

```

cd nmea-decoder/ui
npm install
npm run dev

```

---

## ❌ Error Handling

- Invalid sentence format detection  
- Unsupported sentence types handled  
- Missing fields handled safely  

---

## 🤖 AI Tools Used

- ChatGPT:
  - Understanding NMEA format  
  - Designing parsing logic  
  - Debugging implementation  

---

## ✍️ Manual Improvements

- Designed modular parser structure  
- Implemented reusable conversion utilities  
- Added Google Maps integration  
- Structured project into parser, utils, and UI layers  
- Improved readability and scalability  

---

## 🧾 AI Prompts Used

Examples:

- “Explain NMEA sentence parsing with example”  
- “Convert GPS coordinates to decimal format”  
- “How to extract latitude and longitude from GPGGA”  
- “Design modular parser in Python”  

---

## 🚀 Key Highlights

- Works with real-world GPS data format  
- Demonstrates low-level data parsing  
- Converts encoded data into usable format  
- Includes coordinate transformation logic  
- Integrates with Google Maps  

---
```

---
