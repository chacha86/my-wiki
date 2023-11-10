
// 노트 트리에서 열려있는 노트 재현
if (localStorage.getItem('openList') !== null) {
    reproduce();
}

initScrollPosition('left-side-menu-content');
initScrollPosition('left-second-menu-content');

document.querySelector("#nav-toggle").addEventListener("click", (element) => {

    if (element.target.checked == true) {
        sideMenu = document.querySelector('.left-side-wrap');
        originClass = sideMenu.getAttribute('class');
        sideMenu.setAttribute('class', 'left-side-wrap hidden');
        // sideWrap.removeChild(sideMenu);
    } else {
        sideMenu = document.querySelector('.left-side-wrap');
        sideMenu.setAttribute('class', originClass);
    }
})

function noteEventHandle(className) {
    setCollapse();
    setScroll(className);
}
function initScrollPosition(className) {
    const element = document.querySelector('.' + className);
    const savedPosition = localStorage.getItem(className + '_scrollPosition');
    if (!(savedPosition === 'undefined' || savedPosition == null)) {
        element.scrollTop = savedPosition;
    }
}

function setScroll(className) {
    let element = document.querySelector('.' + className);
    localStorage.setItem(className + '_scrollPosition', element.scrollTop);
}
function setCollapse() {
    let tagList = document.querySelectorAll("details");
    let openList = [];
    for (let i = 0; i < tagList.length; i++) {
        result = tagList[i].getAttribute('open');
        if (result !== null) {
            openList.push(tagList[i].id);
        }
    }
    localStorage.setItem('openList', JSON.stringify(openList));
}

function reproduce() {
    let openList = JSON.parse(localStorage.getItem('openList'));
    for (let i = 0; i < openList.length; i++) {
        let tag = document.querySelector('#' + openList[i]);
        console.log(tag);
        if (tag !== null) tag.setAttribute('open', '');
    }
}
