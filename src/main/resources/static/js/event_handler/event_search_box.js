let body = document.querySelector("body");
let searchBox = document.querySelector(".searchBox");
let searchInput = document.querySelector("#search-input");

searchInput.addEventListener('focusin', function (e) {
    searchBox.style.display = 'block';
});

if (searchInput.value !== '') {
    searchBox.style.display = 'block';
}

// searchInput.addEventListener('focusout', function (e) {
//     searchBox.style.display = 'none';
// });

body.addEventListener('click', function (e) {

    const classValue = e.target.getAttribute("class");

    if (classValue != null && classValue.includes('side-control-bar')) {
        return;
    }

    if (classValue != null && classValue.includes('search-content')) {
        return;
    }

    if (e.target.id === 'search-input') {
        return;
    }
    searchBox.style.display = 'none';

});
