
// Fetch stolen bikes in a given location
async function fetchStolenBikes(location) {
    const apiKey = 'ENTER_YOUR_API_KEY';
    const apiUrl = 'https://bikeindex.org:443/api/v3/search/stolen';
    const url = `${apiUrl}?location=${location}&proximity_square=5&access_token=${apiKey}`;

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

// Display stolen bikes in the UI
function displayBikes(bikes) {
    const bikesList = document.getElementById('bikesList');
    bikesList.innerHTML = ''; // to clear all previous data

    if (bikes.length === 0) {
        bikesList.innerHTML = '<p>No stolen bikes found in this area.</p>';
        return;
    }

    const ul = document.createElement('ul');
    bikes.forEach(bike => {
        const li = document.createElement('li');
        li.textContent = `${bike.title} - ${bike.stolen_location}`;
        ul.appendChild(li);
    });

    bikesList.appendChild(ul);
}

