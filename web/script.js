function fetchData() {
    // ESP8266 server IP address
    const url = 'http://172.30.6.41/';

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
            // Display soil moisture data
            document.getElementById('soil-moisture').value = data.soilMoisture + ' %';
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data every 10 seconds
setInterval(fetchData, 10000);

// Initial fetch
fetchData();
