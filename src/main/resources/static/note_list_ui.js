
// 노트 트리에서 열려있는 노트 재현
// if (localStorage.getItem('openList') !== null) {
//     reproduce();
// }
//
initScrollPosition('left-side-menu-content');
initScrollPosition('left-second-menu-content');

document.querySelectorAll('ul.menu li').forEach((element) => {
    element.addEventListener('contextmenu', (event) => {
        let noteId = element.getAttribute('note-id');
        let noteName = element.getAttribute('note-name');

        event.preventDefault();
        console.log(noteName);
        event.stopPropagation();
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        test(mouseX, mouseY, noteId, noteName);
    })
});

function test(mouseX, mouseY, noteId, noteName) {
    let noteMenuPopup = document.querySelector('#note-menu-popup');
    let body = document.querySelector('body');

    if (noteMenuPopup != null) {
        body.removeChild(noteMenuPopup);
    }
    noteMenuPopup = createNoteMenuPopup(mouseX, mouseY, noteId, noteName);
    body.appendChild(noteMenuPopup);
}

function setTargetNote(noteId, noteName) {
    let modal = document.querySelector('#my_modal_1')
    let form = modal.querySelector('form');
    form.action = '/note/update/' + noteId;
    form.querySelector('input[name="noteName"]').value = noteName;

}
function createNoteMenuPopup(mouseX, mouseY, noteId, noteName) {
    let noteMenuPopup = document.createElement('div');
    noteMenuPopup.setAttribute('class', 'absolute p-[5px] left-['+mouseX+'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
    noteMenuPopup.setAttribute('id', 'note-menu-popup');

    let noteMenuList = document.createElement('ul');
    let del = {
        'text' : '🗑️ 삭제',
        'href' : '/note/delete/' + noteId,
        'onclick' : null
    }
    let addGroup = {
        'text' : '➕ 하위노트추가',
        'href' : '/note/add-group/' + noteId,
        'onclick' : null
    }
    let update = {
        'text' : '🛠️ 이름변경',
        'href' : '#',
        'onclick' : 'my_modal_1.showModal();setTargetNote('+noteId+ ', "' + noteName + '");'
    }
    let move = {
        'text' : '➡️ 노트이동',
        'href' : '/note/move/' + noteId,
        'onclick' : null
    }
    // let noteMenuListItems = ['삭제', '그룹추가', '노트추가', '이름변경', '노트이동'];
    let noteMenuListItems = [del, addGroup, update, move];
    noteMenuListItems.forEach((element) => {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', element.href);
        anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
        if(element.onclick != null){
            anchor.setAttribute('onclick', element.onclick);
        }
        anchor.innerText = element.text;
        listItem.appendChild(anchor);
        noteMenuList.appendChild(listItem);
    });

    noteMenuPopup.appendChild(noteMenuList);

    return noteMenuPopup;
}

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