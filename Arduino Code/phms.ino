#include <ESP8266WiFi.h>
#include <DHT.h>

// Replace with your network credentials
const char* ssid     = "ANNA";
const char* password = "AN12345NA";

// DHT Sensor setup
#define DHTPIN 2     // DHT11 data pin
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);

// Soil Moisture Sensor setup
#define SOIL_MOISTURE_PIN A0 // Analog pin for soil moisture sensor

// Set web server port number to 80
WiFiServer server(80);

// Variable to store the HTTP request
String header;

void setup() {
  Serial.begin(115200);
  
  // Initialize DHT sensor
  dht.begin();

  // Connect to Wi-Fi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop() {
  WiFiClient client = server.available(); // Listen for incoming clients

  if (client) {                          // If a new client connects,
    Serial.println("New Client.");       // Print message in the serial port
    String currentLine = "";             // Hold incoming data from the client
    
    // While client is connected
    while (client.connected()) {
      if (client.available()) {           // If there's data from the client
        char c = client.read();           // Read the data
        Serial.write(c);                  // Print the data to serial monitor
        header += c;
        
        if (c == '\n') {                  // If the byte is a newline character
          if (currentLine.length() == 0) {
            // Read temperature and humidity
            float h = dht.readHumidity();
            float t = dht.readTemperature();
            
            // Read soil moisture value
            int soilMoistureValue = analogRead(SOIL_MOISTURE_PIN);
            float soilMoisturePercentage = map(soilMoistureValue, 1023, 0, 0, 100);

            // Check if any reads failed and exit early (to try again).
            if (isnan(h) || isnan(t)) {
              Serial.println("Failed to read from DHT sensor!");
              return;
            }

            // Create JSON response
            String jsonResponse = "{\"temperature\": " + String(t) + 
                                  ", \"humidity\": " + String(h) + 
                                  ", \"soilMoisture\": " + String(soilMoisturePercentage) + "}";

            // HTTP Response
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type: application/json");
            client.println("Access-Control-Allow-Origin: *"); // Allow cross-origin requests from any domain
            client.println("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header
            client.println("Connection: close");
            client.println();
            client.println(jsonResponse); // Send JSON response
            
            // Print the JSON data to Serial Monitor
            Serial.println("JSON Response: " + jsonResponse);
            break;
          } else {
            currentLine = ""; // Clear current line
          }
        } else if (c != '\r') {
          currentLine += c; // Add character to currentLine
        }
      }
    }
    
    // Clear the header variable and close connection
    header = "";
    client.stop();
    Serial.println("Client disconnected.");
  }
}
