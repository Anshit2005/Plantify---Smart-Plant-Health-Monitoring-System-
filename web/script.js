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
            // console.log('Received data:', data);
            document.getElementById('temperature').value = data.temperature + ' °C';
            document.getElementById('humidity').value = data.humidity + ' %';
            document.getElementById('soil-moisture').value = data.soilMoisture + ' %';
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch generated image from ML model
async function generateImage() {
    // const humidity = document.getElementById('humidity').value;
    // const temperature = document.getElementById('temperature').value;
    // const soilMoisture = document.getElementById('soil-moisture').value;

    const url = 'http://172.30.1.172/';
    const response = await fetch(url);
    const data = await response.json();
    const humidity = data.humidity;
    const temperature = data.temperature;
    const soilMoisture = data.soilMoisture;


    console.log(`request sent with data :Humidity: ${humidity}, Temperature: ${temperature}, Soil Moisture: ${soilMoisture}`);




    try {
        const response = await fetch('http://localhost:5000/generate-image', {
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
        });
        
        // console.log('Response:', response);
     

        const data = await response.json();
        const imageUrl = data.image_url;
        const descr = data.description || "No description available.";
        // const descr =data.description;
        console.log('Image URL:', imageUrl);
        console.log('Description:', descr);

        const livePlantImage = document.getElementById('live-plant-image');
        livePlantImage.src = `C:\\Users\\Sudhanshu Tamhankar\\Desktop\\Codes\\Neem_Dataset\\${imageUrl}`; // Prevent caching
        // "static\image_1886.png"


            // Update the image
            // document.getElementById("live-plant-image").src = data.imageUrl;

            // Update the description
            document.getElementById("plant-description").innerText = descr;
    
            // Update the data fields
            // document.getElementById("temperature").value = `Temperature: ${data.temperature} °C`;
            // document.getElementById("humidity").value = `Humidity: ${data.humidity}%`;
            // document.getElementById("soil-moisture").value = `Soil Moisture: ${data.soilMoisture}%`;



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

