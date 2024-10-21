# Plantify: Smart Plant Health Monitoring System

**Plantify** is an IoT-based project designed to monitor and visualize plant health. By utilizing NodeMCU, sensors, and AI models, Plantify provides real-time insights into environmental conditions and visualizes plant health.

## Project Overview

Plantify employs the following components:

- **NodeMCU**: Microcontroller for Wi-Fi connectivity.
- **DHT11 Sensor**: Measures temperature and humidity.
- **Soil Moisture Sensor**: Measures soil moisture levels.
- **AI Models**: 
  - Converts sensor data into descriptive prompts.
  - Generates an image of the plant based on environmental data.

Data from these sensors is transmitted to an ESP web server and accessed via API calls, with AI models visualizing the plant's condition.

## Features

- **Real-time Monitoring**: Continuous tracking of temperature, humidity, and soil moisture.
- **Web Integration**: Displays sensor data on a web interface through API calls.
- **AI Visualization**: Generates plant images based on environmental data.
- **CORS Support**: Enables cross-origin requests for seamless data fetching.

## Project Structure

```plaintext
Plantify/
│
├── src/
│   ├── nodemcu_server/
│   │   └── main_code.ino             # Arduino code for NodeMCU
│   ├── api_calls/
│   │   └── fetchData.js              # JavaScript for API calls
│   └── ai_models/                     # AI model scripts (optional)
│
├── web/
│   ├── index.html                     # Web interface
│   ├── styles.css                     # Styling for the interface
│   └── app.js                         # Frontend logic
│
├── docs/
│   └── *Documentation Files*          # API, sensor details, etc.
│
└── images/
    └── example_plant_image.png        # Sample AI-generated image
```

## Setup Instructions

### NodeMCU Setup
- Connect the DHT11 and Soil Moisture sensors to NodeMCU.
- Upload the Arduino code for NodeMCU provided in the `src/nodemcu_server/` directory using the Arduino IDE.
- The ESP web server will serve the sensor data.

### Web Interface Setup
- Open the `index.html` file located in the `web/` directory to view real-time data.
- The interface will automatically refresh sensor data every 10 seconds using API calls.

### API Calls
- The JavaScript file for API calls can be found in the `src/api_calls/` directory, which fetches sensor data from the ESP server and updates the webpage.

### AI Models (Optional)
- Add AI models to the `src/ai_models/` directory.
  - The prompt generation model creates prompts from sensor data, while the image generation model visualizes the plant’s condition.

## How It Works
1. **Sensors:** NodeMCU collects temperature, humidity, and soil moisture data.
2. **Web Server:** ESP8266 serves this data as a JSON API.
3. **Frontend:** The web interface fetches the sensor data and displays it.
4. **AI Models:** (Optional) AI generates plant images based on sensor data.

## Contributors
- Anshit Agarwal - IoT and Frontend
- Kaustubh Salodkar - IoT and Frontend
- Krish Teckchandani - AI/ML Model
- Sudhanshu Tamhankar - AI/ML Model

## Technologies Used
- NodeMCU (ESP8266)
- DHT11 Sensor
- Soil Moisture Sensor
- JavaScript (API Calls)
- HTML/CSS (Frontend)
- AI/ML Models for data-to-image generation

## License
This project is licensed under the MIT License.
