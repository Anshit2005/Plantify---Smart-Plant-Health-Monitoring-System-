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
