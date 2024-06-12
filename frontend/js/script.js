const foodSelect = document.getElementById('foodSelect');
    const activitySelect = document.getElementById('activitySelect');

    // Function to fetch data from API and render it to the select element
    function fetchAndRenderOptions(apiUrl, selectElement) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Assuming the API returns an array of objects with 'id' and 'name' properties
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.name;
                    selectElement.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Fetch and render options for food and activity
    fetchAndRenderOptions('/food', foodSelect);
    fetchAndRenderOptions('/activity', activitySelect);