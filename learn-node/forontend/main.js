function hitApi() {
    const apiUrl = 'http://localhost:5000/users';
    console.log(`Fetching data from: ${apiUrl}`);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error fetching data:', error));
}

hitApi();
