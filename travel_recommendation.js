function submitForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}


let jsonData = {};

        // Fetch the JSON data from the file
        function fetchData() {
            fetch('./travel_recommendation_api.json')  // Specify your JSON file path here
                .then(response => response.json())
                .then(data => {
                    jsonData = data;
                    console.log('Data fetched:', jsonData); // Log data to check if it's loaded correctly
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Function to handle the search and filter
        function handleSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = ''; // Clear previous results

            if (searchTerm) {
                const filteredData = filterData(searchTerm, jsonData);
                displayResults(filteredData);
            }
        }

        // Function to filter the data based on search term
        // Function to filter the data based on search term
        function filterData(searchTerm, data) {
            const filtered = {};

            // Check if the search term matches any key (like 'countries', 'temples', etc.)
            Object.keys(data).forEach((key) => {
                if (key.toLowerCase().includes(searchTerm)) {
                    // If the key name matches the search term, include the whole category in the results
                    filtered[key] = data[key];
                } else {
                    // Otherwise, filter each category's elements by name, description, or cities' names
                    filtered[key] = data[key].filter((item) => {
                        return item.name.toLowerCase().includes(searchTerm) ||
                            (item.cities && item.cities.some(city => city.name.toLowerCase().includes(searchTerm))) ||
                            (item.description && item.description.toLowerCase().includes(searchTerm));
                    });
                }
            });

            return filtered;
        }

        // Function to display filtered results
        function displayResults(filteredData) {
            const resultContainer = document.getElementById('result');
            console.log(filteredData);
            Object.keys(filteredData).forEach((key) => {
                const category = filteredData[key];
                
                category.forEach((item) => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('result-item');
                    itemElement.innerHTML = `
                        <div class ="search-item-result">
                        <img class= "search-img" src="${item.imageUrl?item.imageUrl:item.cities[0].imageUrl}"></img>
                        <h3>${item.name}</h3>
                        <p>${item.description?item.description:''}</p>
                        </div>
                    `;
                    resultContainer.appendChild(itemElement);
                });
            });
        }

        function clearResults() {
            document.getElementById('searchInput').value = '';
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = ''; // Clear previous results
        }

        // Add event listener to button
        console.log(document.getElementById('searchButton'));
        document.getElementById('searchButton').addEventListener('click', handleSearch);
        document.getElementById('clearButton').addEventListener('click', clearResults);

        // Fetch data when the page loads
        window.onload = fetchData;