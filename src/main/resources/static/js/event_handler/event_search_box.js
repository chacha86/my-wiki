let body = document.querySelector("body");
let searchBox = document.querySelector(".searchBox");
let searchInput = document.querySelector("#search-input");

searchInput.addEventListener('focusin', function (e) {
    searchBox.style.display = 'block';
});

if (searchInput.value !== '') {
    searchBox.style.display = 'block';
}

searchInput.addEventListener('focusout', function (e) {
    searchBox.style.display = 'none';
});

body.addEventListener('click', function (e) {
    if (e.target.id !== 'search-input') {
        searchBox.style.display = 'none';
    }
});
