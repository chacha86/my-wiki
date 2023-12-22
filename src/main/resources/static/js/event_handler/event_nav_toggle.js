document.querySelector("#nav-toggle").addEventListener("click", (element) => {

    let sideMenu = document.querySelector('.left-side-wrap');
    let originClass = 'left-side-wrap h-[calc(100vh-95px)] flex relative';
    let hiddenClass = 'left-side-wrap hidden';
    let targetClass = originClass;

    if (element.target.checked === true) {
        targetClass = hiddenClass;
    }
    sideMenu.setAttribute('class', targetClass);
})
