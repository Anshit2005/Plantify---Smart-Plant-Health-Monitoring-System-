// Function to fetch sensor data
function fetchData() {
    const url = 'http://172.30.1.172/';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            document.getElementById('temperature').value = data.temperature + ' °C';
            document.getElementById('humidity').value = data.humidity + ' %';
            document.getElementById('soil-moisture').value = data.soilMoisture + ' %';
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch generated image from ML model
async function generateImage() {
    const humidity = document.getElementById('humidity').value;
    const temperature = document.getElementById('temperature').value;
    const soilMoisture = document.getElementById('soil-moisture').value;

    try {
        const response = await fetch('http://172.30.3.70:5000/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                air: {
                    humidity: humidity,
                    temperature: temperature,
                    soilMoisture: soilMoisture
                }
            })
        });document.getElementById("generate-image-btn").addEventListener("click", async () => {
            try {
                const response = await fetch("http://localhost:5000/generate-image-and-description");
                const data = await response.json();
        
                // Update the image
                document.getElementById("live-plant-image").src = data.imageUrl;
        
                // Update the description
                const desc = data.description || "No description available.";
                document.getElementById("plant-description").innerText = desc;
        
                // Update the data fields
                document.getElementById("temperature").value = `Temperature: ${data.temperature} °C`;
                document.getElementById("humidity").value = `Humidity: ${data.humidity}%`;
                document.getElementById("soil-moisture").value = `Soil Moisture: ${data.soilMoisture}%`;
        
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch image and description. Please try again.");
            }
        });
        

        if (!response.ok) {
            throw new Error(`Error fetching image: ${response.statusText}`);
        }

        const data = await response.json();
        const imageUrl = data.image_url;
        //const desc =data.description;

        const livePlantImage = document.getElementById('live-plant-image');
        livePlantImage.src = `${imageUrl}?t=${new Date().getTime()}`; // Prevent caching
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch data every 10 seconds
setInterval(fetchData, 10000);

// Initial fetch
fetchData();

// Add event listener to "Generate Image" button
document.addEventListener('DOMContentLoaded', () => {
    const generateImageBtn = document.getElementById('generate-image-btn');
    if (generateImageBtn) {
        generateImageBtn.addEventListener('click', generateImage);
    }
});
