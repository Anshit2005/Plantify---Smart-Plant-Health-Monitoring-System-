Plantify: Smart Plant Health Monitoring System 🌿
Project Overview
Plantify is a smart IoT-based plant health monitoring system designed to monitor and visualize the health of plants in real time. The system uses a combination of temperature, humidity, and soil moisture sensors connected to a NodeMCU. The data is processed through two AI models:

Prompt Generation Model: Converts sensor data into a descriptive prompt.
Image Generation Model: Produces an image representing the plant’s potential appearance based on environmental conditions.
This repository contains all the necessary code for setting up the system, including sensor data collection, server communication, API calls, and AI model integration.

Features
Real-time Monitoring: Tracks temperature, humidity, and soil moisture using NodeMCU and DHT11 sensors.
Web Integration: Fetches sensor data from an ESP web server and displays it on a user-friendly interface.
AI-Driven Visualization: Utilizes AI models to generate an image depicting the plant’s potential condition based on the current environmental data.
Cross-Origin Accessibility: The server responds with CORS headers to allow the website to make API calls seamlessly.
Technology Stack
Hardware:

NodeMCU ESP8266
DHT11 Sensor (for temperature and humidity)
Soil Moisture Sensor
Software:

Arduino IDE for NodeMCU programming
JavaScript for front-end API integration
Python (for AI model development)
HTML/CSS/JavaScript for web interface
AI Models:

Prompt Generation: Converts sensor values into natural language descriptions.
Image Generation: Generates an image of the plant’s appearance based on environmental factors.
Project Structure
plaintext
Copy code
Plantify/
│
├── README.md                        # Project overview and instructions
├── LICENSE                          # License information (optional)
├── .gitignore                       # Files to ignore in the repository
├── src/
│   ├── nodemcu_server/
│   │   ├── main_code.ino            # Arduino code for NodeMCU
│   ├── api_calls/
│   │   ├── fetchData.js             # JavaScript for fetching data via API
│   └── ai_models/                   # (Placeholder for AI models)
│
├── web/
│   ├── index.html                   # Web interface HTML
│   ├── styles.css                   # Web interface styling
│   └── app.js                       # Frontend JavaScript logic
│
├── docs/
│   ├── Project_Overview.md          # Detailed project overview
│   ├── Sensor_Details.md            # Description of sensors and wiring
│   ├── AI_Model_Workflow.md         # Explanation of AI models
│   ├── API_Documentation.md         # API documentation for data fetching
│   └── Web_Integration.md           # Web interface integration details
└── images/
    ├── example_plant_image.png      # Example AI-generated plant image
Setup Instructions
1. NodeMCU Setup
Connect the DHT11 and Soil Moisture Sensor to the NodeMCU.
Upload the main_code.ino to the NodeMCU using the Arduino IDE.
The NodeMCU will collect temperature, humidity, and soil moisture data.
The ESP web server will be available at the local IP address shown in the serial monitor after connecting to Wi-Fi.
2. Web Interface Setup
Open the index.html file in your browser.
The website will make API calls every 10 seconds to fetch the latest sensor data from the ESP web server.
3. API Calls
The script fetchData.js makes periodic API requests to the ESP8266 server to retrieve the sensor values.
The sensor data (temperature, humidity, soil moisture) is then displayed on the web interface.
4. AI Models (Optional)
Add your AI model scripts to the src/ai_models/ directory.
The Prompt Generation Model will create a prompt based on sensor data.
The Image Generation Model will generate an image of the plant based on the prompt.
Example Data Flow
Sensors: DHT11 and Soil Moisture sensors collect data and send it to the NodeMCU.
ESP Server: The NodeMCU hosts a web server that serves the sensor data as JSON.
API Calls: The frontend fetches this JSON data and displays it in real time.
AI Models: (Optional) The AI models generate plant visualizations based on sensor values.
How to Use
Connect the NodeMCU and sensors, ensuring they are properly wired.
Run the web interface to start displaying real-time sensor data.
Optional: Run the AI models to visualize how the plant might look under the current environmental conditions.
Contributing
Feel free to contribute! Fork the repository and submit a pull request, or open an issue if you encounter any bugs or have feature requests.

License
This project is licensed under the MIT License. See the LICENSE file for more information.