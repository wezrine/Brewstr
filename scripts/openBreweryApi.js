const cityTextBox = document.getElementById("cityTextBox")
const stateDropdown = document.getElementById("stateDropdown")
const submitButton = document.getElementById("submitButton")

const breweriesContainer = document.getElementById("breweriesContainer")

function fetchBreweriesByQueryString() {
    const urlParams = new
    URLSearchParams(window.location.search)
    const city = urlParams.get('city')
    const state = urlParams.get('state')
    fetchBreweriesByCityState(city, state)
}
fetchBreweriesByQueryString()

function fetchBreweriesByCityState(city, state) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&by_city=${city}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "fb7457a28cmsh8446e8ae6d62e1dp123bf0jsn87f55a1983ba",
            "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com"
        }
    }).then(response => {
        console.log(response);
        return response.json();
    }).then((result) => {
        console.log(result);
        displayBreweries(result)
    }).catch(err => {
        console.error(err);
    });
}

submitButton.addEventListener("click", function () {
    const city = cityTextBox.value
    const state = stateDropdown.value

    fetchBreweriesByCityState(city, state)

    cityTextBox.value = ""
    stateDropdown.value = ""
})

function displayBreweries(result) {
    
    breweriesContainer.innerHTML = ""

    for (let index = 0; index < result.length; index++) {
        let brewery = result[index]
        const breweryItem = `
        <div class="col-lg-12 col-md-12">
        <div class="listing-item-container list-layout" data-marker-id="1">
            <a href="/brewery/${brewery.id}" class="listing-item">
                
                <!-- Image -->
                <div class="listing-item-image">
                    <img src="images/listing-item-01.jpg" alt="">
                    <span class="tag">${brewery.brewery_type}</span>
                </div>
                
                <!-- Content -->
                <div class="listing-item-content">

                    <div class="listing-item-inner">
                        <h3>${brewery.name}</i></h3>
                        <span>${brewery.street} ${brewery.city}, ${abbreviateState(brewery.state)} ${brewery.postal_code}</span>
                    </div>
                </div>
            </a>
            <form method="POST" action="/save-brewery">
                <input type="hidden" value="${brewery.id}" name="breweryId">
                <span class="like-icon"><button type="submit" style="width:100%;height:100%;opacity:0;border:none;"></button></span>
            </form>
        </div>
        </div>
        `
        breweriesContainer.insertAdjacentHTML('beforeend', breweryItem)
    }

    stateDropdown.value = disabled
    cityTextBox.value = ""
}

function abbreviateState(input) {
    const states = [
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['American Samoa', 'AS'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['Armed Forces Americas', 'AA'],
        ['Armed Forces Europe', 'AE'],
        ['Armed Forces Pacific', 'AP'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District Of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Guam', 'GU'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Marshall Islands', 'MH'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Northern Mariana Islands', 'NP'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Puerto Rico', 'PR'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['US Virgin Islands', 'VI'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    var i;
    input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    for (i = 0; i < states.length; i++) {
        if (states[i][0] == input) {
            return (states[i][1]);
        }
    }
}

