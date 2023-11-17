
// 노트 트리에서 열려있는 노트 재현
// if (localStorage.getItem('openList') !== null) {
//     reproduce();
// }
//
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

function initScrollPosition(className) {
    const element = document.querySelector('.' + className);
    const savedPosition = localStorage.getItem(className + '_scrollPosition');
    if (!(savedPosition === 'undefined' || savedPosition == null)) {
        element.scrollTop = savedPosition;
    }
}

function collectOpenList() {
    let tagList = document.querySelectorAll("details");
    let openList = [];
    for (let i = 0; i < tagList.length; i++) {
        result = tagList[i].getAttribute('open');
        if (result !== null) {
            openList.push(tagList[i].getAttribute('note-id'));
        }
    }
    return openList;
}

function getNoteSideWidth() {
    let noteSide = document.querySelector('.left-side-menu');
    return noteSide.offsetWidth;
}

function getPageSideWidth() {
    let pageSide = document.querySelector('.left-second-menu-content');
    return pageSide.offsetWidth;
}
function submitWithOpenList(note) {
    let openList = collectOpenList();
    let noteWidth = getNoteSideWidth();
    let pageWidth = getPageSideWidth();
    let noteUIParam = {
        'openList': openList,
        'noteWidth' : noteWidth,
        'pageWidth' : pageWidth
    };

    let form = document.querySelector('#noteUIForm');
    let input = document.querySelector('#noteUIParamJson');
    input.value = JSON.stringify(noteUIParam);
    let pageUrl = "";
    if(note.getAttribute('page-id') != null){
        pageUrl = '/page/' +note.getAttribute('page-id');
    }
    form.action='/note/' + note.getAttribute('note-id') + pageUrl;
    console.log(form.action);
    form.submit();
}