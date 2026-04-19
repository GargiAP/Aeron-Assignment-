Aeron Systems – AI Prototyping Intern Assignment
Submitted by: Gargi Atul Pratapwar
Date: 19/04/2026
Repository: 

Table of Contents

Project Overview
Part 1 – Weather Data Viewer (Web Utility)
Part 2 – NMEA Sentence Decoder (Data Utility)
AI Tools Used
Manual Changes Made
Repository Structure
Prompts Used


Project Overview
This repository contains two utilities built as part of the Aeron Systems AI Prototyping Intern assignment:
PartUtilityTypePart 1Weather Data ViewerReact Web App (Vite)Part 2NMEA Sentence DecoderPython backend + React UI
Both were built using AI-assisted development (Claude / ChatGPT) with manual refinements. The focus was on rapid prototyping, understanding the generated code, and producing working, usable tools.

Part 1 – Weather Data Viewer (Web Utility)
What it does
A responsive React web application that:

Fetches live weather data for any city using the OpenWeatherMap API (free tier)
Displays temperature, humidity, and wind speed on a clean dashboard
Lets users search and switch cities via a search bar
Plots graphs (temperature variation and rain probability throughout the day) using Recharts
Shows sunrise/sunset times and other metric cards

Tech Stack
LayerTechnologyFrameworkReact 18 + ViteStylingCSS Modules / index.cssChartsRechartsAPIOpenWeatherMap (free tier)HTTPFetch API (native)
Prerequisites

Node.js v18 or higher
npm v9 or higher
A free OpenWeatherMap API key → Get one here

Setup & Installation
bash# 1. Clone the repository
git clone https://github.com/[your-username]/[your-repo].git
cd [your-repo]/weather-app

# 2. Install dependencies
npm install

# 3. Create environment file
# Create a file called .env in the weather-app/ folder:
echo "VITE_WEATHER_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
Then open your browser at: http://localhost:5173
Build for Production
bashnpm run build
# Output will be in the dist/ folder
File Structure
weather-app/
├── src/
│   ├── components/
│   │   ├── ForecastStrip.jsx      # Hourly/daily forecast row
│   │   ├── metricCards.jsx        # Temperature, humidity, wind cards
│   │   ├── SearchBar.jsx          # City search input
│   │   ├── SunriseSunset.jsx      # Sunrise/sunset display
│   │   └── weatherCharts.jsx      # Recharts graphs
│   ├── services/
│   │   └── weatherServices.js     # All API call logic
│   ├── utils/
│   │   └── formatters.js          # Date/unit formatting helpers
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # API key (not committed)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
Environment Variables
VariableDescriptionVITE_WEATHER_API_KEYYour OpenWeatherMap API key

⚠️ Never commit your .env file. It is listed in .gitignore.

How to Use

Open the app in your browser
Type a city name in the search bar (e.g., Bengaluru, London, Tokyo)
Press Enter or click Search
The dashboard updates with live weather data and graphs


Part 2 – NMEA Sentence Decoder (Data Utility)
What it does
A tool that parses standard GPS NMEA 0183 sentences — specifically:

GPGGA – Global Positioning System Fix Data (position, altitude, fix quality)
GPRMC – Recommended Minimum Specific GPS Data (speed, date, magnetic variation)

Users can paste an NMEA sentence into a UI, and the tool formats all parsed fields into a readable table.
Tech Stack
LayerTechnologyBackendPython 3ParsersCustom (gpgga_parser.py, gprmc_parser.py)FrontendReact (Vite) inside ui/CommunicationPython serves data; UI displays it
Prerequisites

Python 3.8 or higher
Node.js v18 or higher (for the UI)
pip

Setup & Installation
Python Backend
bash# Navigate to the nmea-decoder folder
cd nmea-decoder

# (Optional but recommended) Create a virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the decoder
python main.py
React UI (Optional)
bashcd nmea-decoder/ui
npm install
npm run dev
Open: http://localhost:5173
File Structure
nmea-decoder/
├── parsers/
│   ├── gpgga_parser.py     # Parses GPGGA sentences
│   └── gprmc_parser.py     # Parses GPRMC sentences
├── utils/
│   └── convert.py          # Unit conversion helpers (knots→km/h, etc.)
├── ui/                     # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   └── package.json
├── main.py                 # Entry point – run this
├── requirements.txt        # Python dependencies
└── README.md
How to Use (CLI)
Run main.py and paste your NMEA sentence when prompted:
$ python main.py

Enter NMEA sentence: $GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47
Example Output:
FieldValueMessage TypeGPGGAUTC Time12:35:19Latitude48° 7.038' NLongitude11° 31.000' EFix QualityGPS Fix (1)Satellites8HDOP0.9Altitude545.4 m
How to Use (UI)

Run the UI with npm run dev inside nmea-decoder/ui/
Paste any GPGGA or GPRMC sentence into the input box
Click Decode
View the parsed fields in the formatted table below

Sample NMEA Sentences for Testing
# GPGGA
$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47

# GPRMC
$GPRMC,220516,A,5133.82,N,00042.24,W,173.8,231.8,130694,004.2,W*70
requirements.txt
# No third-party libraries required for core parsing
# Add below if needed:
# flask==2.3.0    ← only if serving via HTTP

AI Tools Used
ToolUsed ForClaude (Anthropic)Primary development assistant — component structure, API integration, debugging, gitignore adviceChatGPTSecondary reference for NMEA sentence format details

AI chat history is included in this repository as a PDF/JSON file in the /ai-prompts/ folder.


Manual Changes Made
These are changes I made myself after reviewing AI-generated code:
Weather App

Adjusted the .env variable naming to use Vite's required VITE_ prefix (AI used REACT_APP_ which is for Create React App, not Vite)
Reorganized component file names to follow consistent casing (metricCards.jsx → confirmed naming)
Manually tuned CSS for responsive layout on mobile screens
Fixed the weatherServices.js API endpoint to use the correct units=metric parameter for Celsius

NMEA Decoder

Wrote the checksum validation logic manually after AI generated it incorrectly (XOR of bytes between $ and *)
Adjusted field indexing in gpgga_parser.py — AI was off by one on the altitude field index
Added the __pycache__ entries to .gitignore after noticing they were being tracked
Created the root-level .gitignore for the Python side (AI only generated one inside ui/)


Repository Structure (Full)
/
├── weather-app/              # Part 1 – React Weather Dashboard
│   ├── src/
│   ├── .env                  # Not committed – add your API key
│   ├── .gitignore
│   └── package.json
│
├── nmea-decoder/             # Part 2 – NMEA Sentence Decoder
│   ├── parsers/
│   ├── utils/
│   ├── ui/                   # React UI for NMEA decoder
│   ├── main.py
│   └── requirements.txt
│
├── ai-prompts/               # AI chat history (PDF/JSON)
│   └── claude-chat.pdf
│
└── README.md                 # This file

Prompts Used
Below are the key prompts used during development:
Weather App Prompts
1. "Build a React weather dashboard using OpenWeatherMap API that shows 
   temperature, humidity, and wind speed for a searched city. Use Vite 
   and include a search bar component."

2. "Add a Recharts line graph showing temperature variation throughout 
   the day using the forecast endpoint."

3. "Create a SunriseSunset component that takes Unix timestamps and 
   displays them in local time format."

4. "The API call is failing — here's the error: [error]. Fix the 
   weatherServices.js fetch function."
NMEA Decoder Prompts
1. "Write a Python script that parses a GPGGA NMEA sentence and prints 
   each field with its name and value in a table format."

2. "Now do the same for GPRMC sentences. Refer to this field list: 
   [field list pasted from NMEA spec]."

3. "Add checksum validation to both parsers. The checksum is the XOR 
   of all bytes between $ and *."

4. "Build a simple React UI where users can paste an NMEA sentence, 
   click Decode, and see the parsed output as a table."

Full chat history with all prompts and responses is available in /ai-prompts/.


Notes for the Reviewer

Both utilities run independently — you do not need to run both at the same time
The Weather App requires an internet connection and a valid API key
The NMEA Decoder works fully offline once installed
Tested on Windows 11 (x86) and should work on Debian (ARM) with the same steps
The screen recording (.mp4) in this repo demonstrates full installation and functionality of both tools
ShareContentpdf
