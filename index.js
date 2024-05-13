const apiKey = 'ENTER_YOUR_API_KEY';
const apiUrl = 'https://bikeindex.org:443/api/v3/search';

// Function to fetch bikes data
async function fetchBikesData() {
    const url = `${apiUrl}?access_token=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.bikes;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to display bikes data in the UI
function displayBikesData(bikesData) {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = ''; // Clear previous content

    if (bikesData.length === 0) {
        bikesList.innerHTML = '<p>No bike data available.</p>';
        return;
    }

    const ul = document.createElement('ul');
    bikesData.forEach(bike => {
        const li = document.createElement('li');
        li.textContent = `${bike.title} - ${bike.stolen_location}`;
        ul.appendChild(li);
    });

    bikesList.appendChild(ul);
}

// Example usage
fetchBikesData()
    .then(displayBikesData)
    .catch(error => console.error('Error:', error));
