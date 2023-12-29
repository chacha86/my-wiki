import { searchKeydownEvent } from "../ui/search_result_renderer.js";
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

searchInput.addEventListener('keyup', searchKeydownEvent);

body.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target.id !== 'search-input' && e.target.id !== 'search-box') {
        searchBox.style.display = 'none';
    }
});




