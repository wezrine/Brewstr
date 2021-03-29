var fetch = require('node-fetch')

function fetchBreweryById(id) {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "fb7457a28cmsh8446e8ae6d62e1dp123bf0jsn87f55a1983ba",
            "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com"
        }
    }).then(response => {
        return response.json();
    }).then((result) => {
        console.log(result);
        fetchedBreweryById(result)
    }).catch(err => {
        console.error(err);
    });
}

function fetchedBreweryById() {
    console.log('hi')
}

module.exports = fetchBreweryById