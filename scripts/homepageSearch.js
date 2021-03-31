const homeSearchButton = document.getElementById('homeSearchButton')
const cityTextBox = document.getElementById('cityTextBox')

homeSearchButton.addEventListener('click', function() {
    window.location.href = '/listings'
    cityTextBox.value = "Worked"
})