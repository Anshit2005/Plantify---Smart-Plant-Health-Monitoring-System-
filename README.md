# 🌿 Plantify: Smart Plant Health Monitoring System

**Plantify** is an innovative IoT-based project developed as part of a Design Credit that monitors and visualizes plant health. By combining NodeMCU, sensors, and AI models, Plantify provides real-time insights into a plant's environmental conditions and visualizes its health.

---

## 🚀 Project Overview

Plantify uses the following components to monitor plant health:
- **NodeMCU**: Microcontroller for Wi-Fi connectivity.
- **DHT11 Sensor**: Measures temperature and humidity.
- **Soil Moisture Sensor**: Measures soil moisture levels.
- **AI Models**: 
  - **Model 1**: Converts sensor data into a descriptive prompt.
  - **Model 2**: Generates an image of the plant based on environmental data.

Data from these sensors is transmitted to an ESP web server and fetched via API calls, with the AI models creating an image to visualize the plant's condition.

---

## 🛠️ Features

- **🌡️ Real-time Monitoring**: Continuously monitors temperature, humidity, and soil moisture.
- **🌐 Web Integration**: Fetches sensor data from NodeMCU via API calls and displays it on a web interface.
- **🤖 AI Visualization**: Generates plant images based on the environmental data using AI models.
- **⚙️ CORS-Enabled**: Supports cross-origin requests for seamless data fetching from the ESP web server.

---

## 📂 Project Structure

```plaintext
Plantify/
│
├── src/
│   ├── nodemcu_server/
│   │   └── main_code.ino             # Arduino code for NodeMCU
│   ├── api_calls/
│   │   └── fetchData.js              # JavaScript for API calls
│   └── ai_models/                    # AI model scripts (optional)
│
├── web/
│   ├── index.html                    # Web interface
│   ├── styles.css                    # Styling for the interface
│   └── app.js                        # Frontend logic
│
├── docs/
│   └── *Documentation Files*         # API, sensor details, etc.
│
└── images/
    └── example_plant_image.png       # Sample AI-generated image
```

---

## 📡 Setup Instructions

### 1. **NodeMCU Setup**
- Connect the DHT11 and Soil Moisture sensors to NodeMCU.
- Upload the [main_code.ino](src/nodemcu_server/main_code.ino) using Arduino IDE.
- The ESP web server will serve the sensor data.

### 2. **Web Interface Setup**
- Open [index.html](web/index.html) to view real-time data.
- The interface will automatically refresh sensor data every 10 seconds using API calls.

### 3. **API Calls**
- The [fetchData.js](src/api_calls/fetchData.js) file fetches sensor data from the ESP server and updates the webpage.

### 4. **AI Models** (Optional)
- Add AI models to `src/ai_models/`.
- The **prompt generation model** creates prompts from sensor data.
- The **image generation model** visualizes the plant’s condition.

---

## 🌱 How It Works

1. **Sensors**: NodeMCU collects temperature, humidity, and soil moisture data.
2. **Web Server**: ESP8266 serves this data as a JSON API.
3. **Frontend**: The web interface fetches the sensor data and displays it.
4. **AI Models**: (Optional) AI generates plant images based on sensor data.

---

## 💻 Example Code Snippets

### Arduino Code (NodeMCU)

```cpp
#include <ESP8266WiFi.h>
#include <DHT.h>

// Your network credentials
const char* ssid     = "Your_SSID";
const char* password = "Your_PASSWORD";

// Sensor and server setup
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
  server.begin();
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int soilMoisture = analogRead(A0);
    float soilMoisturePercent = map(soilMoisture, 1023, 0, 0, 100);

    String jsonResponse = "{\"temperature\": " + String(t) + ", \"humidity\": " + String(h) + ", \"soilMoisture\": " + String(soilMoisturePercent) + "}";
    client.println("HTTP/1.1 200 OK");
    client.println("Content-type: application/json");
    client.println();
    client.println(jsonResponse);
  }
}
```

### JavaScript Code (API Calls)

```javascript
function fetchData() {
    const url = 'http://192.168.145.184/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('temperature').value = data.temperature + ' °C';
            document.getElementById('humidity').value = data.humidity + ' %';
            document.getElementById('soil-moisture').value = data.soilMoisture + ' %';
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data every 10 seconds
setInterval(fetchData, 10000);

// Initial fetch
fetchData();
```

---

## 🧑‍💻 Contributors

- **[Your Name]** - Developer
- **[Collaborator 1]** - AI Model Integration
- **[Collaborator 2]** - Web Development

---

## 🔧 Technologies Used

- **NodeMCU (ESP8266)**
- **DHT11 Sensor**
- **Soil Moisture Sensor**
- **JavaScript (API Calls)**
- **HTML/CSS (Frontend)**
- **AI/ML Models** for data-to-image generation

---

## 🤝 Collaboration

1. **Create a new repository**:  
   - Go to [GitHub](https://github.com) > Create new repository > Name it **Plantify**.
   - Initialize it with a README and `.gitignore`.

2. **Upload your files**:  
   - Push your local project files to the newly created GitHub repository.

3. **Add Collaborators**:  
   - Go to **Settings** in your repository > **Manage access** > **Invite collaborators** by their GitHub username or email.

---

## 📄 License

This project is licensed under the MIT License.

---

```

Feel free to copy and paste this directly into your `README.md` file! If you need any adjustments or additional sections, just let me know!