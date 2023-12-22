let body = document.querySelector("body");

body.addEventListener('click', function (e) {
    if (document.querySelector("#item-menu-popup") !== null) {
        body.removeChild(document.querySelector("#item-menu-popup"));
    }
});