
// 노트 트리에서 열려있는 노트 재현
// if (localStorage.getItem('openList') !== null) {
//     reproduce();
// }

initScrollPosition('left-side-menu-content');
initScrollPosition('left-second-menu-content');

// localStorage.getItem('leftSideMenuWidth') !== null ? document.querySelector('.left-side-menu').style.width = localStorage.getItem('leftSideMenuWidth') + 'px' : '';
// localStorage.getItem('leftSecondMenuContentWidth') !== null ? document.querySelector('.left-second-menu-content').style.width = localStorage.getItem('leftSecondMenuContentWidth') + 'px' : '';

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

function noteEventHandle(className, noteTag) {
    setWidth();
    setScroll(className);
    setCollapse(noteTag);
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
function setCollapse(noteTag) {
    let tagList = document.querySelectorAll("details");
    let openList = [];
    for (let i = 0; i < tagList.length; i++) {
        result = tagList[i].getAttribute('open');
        if (result !== null) {
            openList.push(tagList[i].id);
        }
    }

    let treeForm = document.querySelector('#tree-form');
    openList.forEach((item, index) => {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'openList';
        input.value = item;
        treeForm.appendChild(input);
    });
    treeForm.action = '/note/' + noteTag.getAttribute('note-id') + '/page/' + 1;
    treeForm.submit();

    // localStorage.setItem('openList', JSON.stringify(openList));
}

function setWidth() {
    let leftSideMenu = document.querySelector('.left-side-menu');
    let leftSideMenuWidth = leftSideMenu.offsetWidth;
    let leftSecondMenuContent = document.querySelector('.left-second-menu-content');
    let leftSecondMenuContentWidth = leftSecondMenuContent.offsetWidth;

    localStorage.setItem('leftSideMenuWidth', leftSideMenuWidth);
    localStorage.setItem('leftSecondMenuContentWidth', leftSecondMenuContentWidth);

}
function reproduce() {
    let openList = JSON.parse(localStorage.getItem('openList'));
    for (let i = 0; i < openList.length; i++) {
        let tag = document.querySelector('#' + openList[i]);
        console.log(tag);
        if (tag !== null) tag.setAttribute('open', '');
    }
}
