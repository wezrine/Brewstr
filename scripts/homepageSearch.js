const homeSearchButton = document.getElementById('homeSearchButton')
const homeCityTextBox = document.getElementById('homeCityTextBox')
const homeStateDropdown = document.getElementById('homeStateDropdown')

homeSearchButton.addEventListener('click', function() {
    const city = homeCityTextBox.value
    const state = homeStateDropdown.value

    window.location = `/listings?city=${city}&state=${state}`
})